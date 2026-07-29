/**
 * Fails the docs build if any rxova.org link written outside the docs site
 * points at a route the site does not emit.
 *
 * starlight-links-validator only inspects links between pages of this site. The
 * READMEs link to the same pages by absolute URL, from outside it — so when the
 * Docusaurus-era routes were restructured into components/<name>/*, every
 * "Documentation →" link in every package README silently became a 404 and
 * nothing caught it. package.json `homepage` had the same problem, and that one
 * is what npm renders as the package page's home link.
 *
 * Checked against the built dist rather than the content directory: redirects
 * are a legitimate destination (see the `redirects` map in astro.config.mjs) and
 * only exist as build output. Anchors are resolved too, since the guides were
 * folded into per-component About pages as headings — a link to the page that
 * misses the section is the same broken promise in a quieter form.
 *
 * Offline: reads files only.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const docsRoot = resolve(fileURLToPath(new URL('.', import.meta.url)), '..')
const repoRoot = resolve(docsRoot, '../..')
const dist = join(docsRoot, 'dist')

/** Where the aggregator mounts this site; dist paths are relative to it. */
const MOUNT = '/packages/react-inputs'
const SITE = `https://rxova.org${MOUNT}`

const SKIP_DIRS = new Set([
  'node_modules',
  'dist',
  '.git',
  '.turbo',
  '.astro',
  '.claude',
  'coverage',
])

function* walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue
      yield* walk(join(dir, entry.name))
      continue
    }
    // CHANGELOGs are a historical record — the URLs in them were correct when
    // that version shipped and rewriting them would be a lie.
    if (entry.name === 'CHANGELOG.md') continue
    if (entry.name.endsWith('.md') || entry.name === 'package.json') yield join(dir, entry.name)
  }
}

/** Every rxova.org docs URL in the repo, with the file it came from. */
function collectLinks() {
  const found = []
  for (const file of walk(repoRoot)) {
    const text = readFileSync(file, 'utf8')
    for (const [url] of text.matchAll(
      /https:\/\/rxova\.org\/packages\/react-inputs[^\s)"'`<>\]]*/g,
    )) {
      found.push({ url: url.replace(/[.,]$/, ''), file: relative(repoRoot, file) })
    }
  }
  return found
}

const readIfFile = (path) => {
  try {
    return statSync(path).isFile() ? readFileSync(path, 'utf8') : null
  } catch {
    return null
  }
}

/** The emitted HTML for a route, or null if the site has no such route. */
function resolveRoute(pathname) {
  const clean = pathname.replace(/^\/+|\/+$/g, '')
  // build.format: 'directory' — a route is <route>/index.html. The bare .html
  // fallback covers anything emitted flat.
  return readIfFile(join(dist, clean, 'index.html')) ?? readIfFile(join(dist, `${clean}.html`))
}

const failures = []

for (const { url, file } of collectLinks()) {
  const { pathname, hash } = new URL(url)
  if (!pathname.startsWith(MOUNT)) continue

  const route = pathname.slice(MOUNT.length) || '/'
  const html = resolveRoute(route)

  if (html === null) {
    failures.push(`${file}\n  ${url}\n  → no page or redirect at ${route}`)
    continue
  }

  // A redirect stub has no content of its own, so its anchors live on the
  // destination. Following it here would test the same thing twice; the
  // destination is checked on its own whenever something links to it directly.
  const isRedirect = /http-equiv="refresh"/i.test(html)
  if (!hash || isRedirect) continue

  const id = hash.slice(1)
  if (!html.includes(`id="${id}"`)) {
    failures.push(`${file}\n  ${url}\n  → ${route} exists but has no #${id}`)
  }
}

if (failures.length) {
  console.error(
    `\n${failures.length} broken ${SITE} link(s):\n\n${failures.join('\n\n')}\n\n` +
      'Either fix the link, or add a redirect in apps/docs/astro.config.mjs if the\n' +
      'route is one that already shipped in a published README.\n',
  )
  process.exit(1)
}

console.log(`✓ every ${SITE} link in the repo resolves`)
