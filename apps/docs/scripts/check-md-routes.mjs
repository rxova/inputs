#!/usr/bin/env node
// Verify the raw-markdown twins in a built site.
//
// Usage: node ./scripts/check-md-routes.mjs [distDir]
//
// The `.md` routes exist so an agent can read these docs without parsing a
// Starlight page. Their failure mode is the reason this script exists: if a page
// starts using an MDX construct src/lib/mdx-to-markdown.mjs does not handle, the
// build still succeeds and the `.md` still looks like a document — it just has
// `<TabItem label="npm">` sitting in the middle of it, and an agent reading it
// learns something false. Nothing else in the build would notice.
//
// So this asserts the two things that cannot be checked by rendering: that every
// page HAS a twin, and that no twin still contains MDX.
//
// It reads `dist`, never `src/content`. The TypeDoc reference pages are generated
// at build time and gitignored, so on a clean checkout they do not exist as
// source — `dist` is the only place the full set is real.

import { readdir, readFile, stat } from 'node:fs/promises'
import { join, relative, sep, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import { splitFenced } from '../src/lib/mdx-to-markdown.mjs'

export const DEFAULT_DIST = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist')

/**
 * Pages that are deliberately not twinned.
 *
 * The home page is `template: splash` — a marketing page built from Astro
 * components fed by lib/proof.mjs, with almost no prose in its body. See the
 * `isSplash` note in src/lib/docs-md.mjs.
 */
const UNTWINNED = new Set(['index.html'])

/**
 * MDX that must not survive into a `.md`, each with what it means when it does.
 *
 * Checked against the UNFENCED text only. These docs are mostly code snippets,
 * and a snippet may legitimately contain any of these — `components/rating/about`
 * demonstrates a custom icon with `<img src="/badge.svg" />`, which is example
 * code, not a broken link. Scanning the whole document flags it, and the obvious
 * "fix" would be to rewrite URLs inside fences, which corrupts the examples.
 */
export const FORBIDDEN = [
  [/<(?:Tabs|TabItem|CardGrid|Card|LiveExample)\b/, 'an unhandled Starlight/MDX component'],
  [
    /^import\s.+\sfrom\s'@(?:astrojs|components)\//m,
    'an MDX import that should have been stripped',
  ],
  [/\]\(\/(?!\/)/, 'a root-relative link, unresolvable outside the site'],
  [/\b(?:href|src)="\/(?!\/)/, 'a root-relative HTML attribute'],
  [/\bimport\.meta\.env\.BASE_URL/, 'an unresolved BASE_URL expression'],
]

/**
 * Checked against fence OPENER lines, where the info string lives. `live` is the
 * site's marker for an editable example, not a language, so it has no business in
 * a document served as markdown.
 */
export const FORBIDDEN_INFO = [[/\s+live\b/, 'a ```tsx live fence meta that is not a language']]

/**
 * llms-full.txt inlines every page, so it grows with the docs. Past roughly this
 * size it stops fitting comfortably in a context window and quietly becomes the
 * thing it exists to avoid. Fail instead, so the decision to split is made
 * deliberately rather than discovered by an agent truncating it.
 */
export const MAX_LLMS_FULL_BYTES = 800 * 1024

const posix = (p) => p.split(sep).join('/')

/** Every file under `dir` matching `ext`, as paths relative to `dir`. */
export async function collect(dir, ext, root = dir) {
  const found = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) found.push(...(await collect(path, ext, root)))
    else if (entry.isFile() && entry.name.endsWith(ext)) found.push(posix(relative(root, path)))
  }
  return found
}

/** The `.md` twin a built page should have: `a/b/index.html` -> `a/b.md`. */
export function twinFor(htmlPath) {
  return htmlPath === 'index.html' ? 'index.md' : `${htmlPath.replace(/\/index\.html$/, '')}.md`
}

/**
 * A page that is a redirect stub has no content to twin. Astro writes these for
 * every entry in the config's `redirects` map, and there are a dozen of them.
 */
const isRedirect = (html) => /<meta[^>]+http-equiv=["']?refresh/i.test(html)

export async function checkMdRoutes(distDir = DEFAULT_DIST) {
  const failures = []

  const htmlFiles = await collect(distDir, '.html')
  const mdFiles = new Set(await collect(distDir, '.md'))

  for (const html of htmlFiles) {
    if (UNTWINNED.has(html) || html === '404.html') continue
    if (isRedirect(await readFile(join(distDir, html), 'utf8'))) continue

    const twin = twinFor(html)
    if (!mdFiles.has(twin)) failures.push(`${html} has no markdown twin at ${twin}`)
  }

  for (const md of [...mdFiles].sort()) {
    const { unfenced, openers } = splitFenced(await readFile(join(distDir, md), 'utf8'))

    const report = (match, why) => {
      if (match) failures.push(`${md} contains ${why}: ${JSON.stringify(match[0].slice(0, 60))}`)
    }

    for (const [pattern, why] of FORBIDDEN) report(pattern.exec(unfenced), why)
    for (const [pattern, why] of FORBIDDEN_INFO) {
      report(openers.map((line) => pattern.exec(line)).find(Boolean), why)
    }
  }

  // Only checked when it exists, so this script stays usable on a build that
  // predates the llms.txt endpoints.
  const llmsFull = join(distDir, 'llms-full.txt')
  const size = await stat(llmsFull).catch(() => null)
  if (size && size.size > MAX_LLMS_FULL_BYTES) {
    failures.push(
      `llms-full.txt is ${Math.round(size.size / 1024)} kB, over the ` +
        `${MAX_LLMS_FULL_BYTES / 1024} kB budget — split it or raise the budget deliberately`,
    )
  }

  return { failures, pages: htmlFiles.length, twins: mdFiles.size }
}

export function formatFailures(failures) {
  return [`${failures.length} markdown-route problem(s):`, ...failures.map((f) => `  ✗ ${f}`)].join(
    '\n',
  )
}

// Only run as a CLI; the tests import the functions above.
if (import.meta.url === new URL(`file://${process.argv[1]}`).href) {
  const [, , dist = DEFAULT_DIST] = process.argv
  const { failures, twins } = await checkMdRoutes(dist)

  if (failures.length > 0) {
    console.error(formatFailures(failures))
    process.exit(1)
  }
  console.log(`✔ ${twins} markdown twin(s), no MDX left in any of them`)
}
