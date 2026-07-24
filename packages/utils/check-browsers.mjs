import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import process from 'node:process'

/**
 * Keeps the browser list in the root `e2e:install` in step with the projects
 * every package's Playwright config actually launches.
 *
 * These drifted once already: a `playwright.config.ts` gained firefox and webkit
 * while the release workflow still installed only chromium, and the release job
 * died at launch with "Executable doesn't exist at .../webkit-2311/pw_run.sh".
 * That is a slow, expensive way to discover a one-word mismatch. In the monorepo
 * `e2e:install` lives at the root and each package owns its own config, so this
 * checks every config against the single install list.
 */

const root = process.cwd()

const rootPkg = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'))
const install = rootPkg.scripts['e2e:install']
if (!install) {
  console.error('✖ root package.json has no `e2e:install` script')
  process.exit(1)
}

const packagesDir = resolve(root, 'packages')
const configs = readdirSync(packagesDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => resolve(packagesDir, entry.name, 'playwright.config.ts'))
  .filter(existsSync)

if (configs.length === 0) {
  console.error('✖ found no packages/*/playwright.config.ts to check')
  process.exit(1)
}

let failed = false
const allProjects = new Set()

for (const configPath of configs) {
  const config = readFileSync(configPath, 'utf8')
  const projects = [...config.matchAll(/name:\s*'([a-z]+)'/g)].map((m) => m[1])
  const relative = configPath.slice(root.length + 1)

  if (projects.length === 0) {
    console.error(`✖ could not find any Playwright projects in ${relative}`)
    failed = true
    continue
  }

  const missing = projects.filter((browser) => !install.includes(browser))
  if (missing.length > 0) {
    console.error(
      `✖ ${relative} launches [${projects.join(', ')}] but root \`e2e:install\` only installs:\n` +
        `    ${install}\n` +
        `  Missing: ${missing.join(', ')}\n` +
        '  Add them to the root `e2e:install` script; CI derives its browser set from it.',
    )
    failed = true
  }
  projects.forEach((p) => allProjects.add(p))
}

if (failed) process.exit(1)

console.log(
  `✔ root e2e:install covers every Playwright project across ${String(configs.length)} packages ` +
    `(${[...allProjects].join(', ')})`,
)
