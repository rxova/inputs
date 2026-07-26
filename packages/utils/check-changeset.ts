import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import process from 'node:process'

/**
 * The CI changeset gate. Replaces `changeset status --since=origin/main`, which
 * could only answer "is there a changeset" — it could not validate the shape of
 * one, and its only escape hatch was a label checked in YAML.
 *
 * Shared, near-verbatim, with rxova/brand, rxova/use-everywhere and
 * rxova/journey. Keep the differences to the two repo-specific constants below;
 * everything else should stay diffable across the four copies, because this is
 * one of the files earmarked for @rxova/repo-tooling.
 */

/** Prefixes of the packages whose changes must be released. */
const PUBLISHABLE_PACKAGE_PREFIXES = [
  'packages/react-intl-currency-input/',
  'packages/react-otp-input/',
  'packages/react-rating-input/',
  'packages/react-inputs/',
  'packages/codemod/',
]

/** How to create a changeset here, quoted in the failure message. */
const CREATE_HINT = "'pnpm exec changeset'"

function getEnv(name: string, required = true): string | undefined {
  const value = process.env[name]
  if (!value && required) {
    throw new Error(`Missing required env: ${name}`)
  }
  return value
}

function run(cmd: string): string {
  return execSync(cmd, { encoding: 'utf8' }).trim()
}

function getChangedFiles(baseSha: string, headSha: string, diffFilter?: string): string[] {
  const filterArg = diffFilter ? ` --diff-filter=${diffFilter}` : ''
  const output = run(`git diff --name-only${filterArg} ${baseSha} ${headSha}`)
  if (!output) return []
  return output
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
}

function getChangesetFiles(files: readonly string[]): string[] {
  return files.filter(
    (file) =>
      file.startsWith('.changeset/') && file.endsWith('.md') && path.basename(file) !== 'README.md',
  )
}

function extractFrontmatterPackageCount(markdown: string): number {
  const match = /^---\s*\n([\s\S]*?)\n---\s*(?:\n|$)/.exec(markdown)
  if (!match) {
    return 0
  }

  const frontmatter = match[1] ?? ''
  const packageLines = frontmatter
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => /^"[^"]+"\s*:\s*(patch|minor|major)(?:\s+#.*)?$/.test(line))

  return packageLines.length
}

function ensureSinglePackagePerChangeset(files: readonly string[]): void {
  const errors: string[] = []

  for (const file of files) {
    let content: string
    try {
      content = readFileSync(file, 'utf8')
    } catch {
      errors.push(`- ${file}: could not be read`)
      continue
    }

    const packageCount = extractFrontmatterPackageCount(content)
    if (packageCount !== 1) {
      errors.push(`- ${file}: expected exactly 1 package, found ${String(packageCount)}`)
    }
  }

  if (errors.length > 0) {
    console.error('Invalid changeset format. Use one changeset file per package.')
    console.error(errors.join('\n'))
    process.exit(1)
  }
}

/**
 * Note on the pattern: the `docs/`, `.github/` and `.changeset/` alternatives
 * are anchored by `$`, so they only ever match those exact strings — never a
 * path beneath them. Files in those directories are auto-skipped in practice
 * only when they also carry one of the listed extensions. That is conservative
 * (it demands a changeset more often, never less), so it is left as-is to stay
 * byte-comparable with the other three repos rather than quietly loosening a
 * release gate in four places at once.
 */
function isDocsOrConfigOnly(files: readonly string[]): boolean {
  const allowedPattern = /^(docs\/|\.github\/|\.changeset\/|.*\.(md|txt|yml|yaml|json))$/
  const touchesPackage = files.some((file) =>
    PUBLISHABLE_PACKAGE_PREFIXES.some((prefix) => file.startsWith(prefix)),
  )

  return files.length > 0 && files.every((file) => allowedPattern.test(file)) && !touchesPackage
}

function getLabels(repo: string, prNumber: string, token: string): string[] {
  try {
    const output = run(
      `gh api -H "Authorization: Bearer ${token}" repos/${repo}/issues/${prNumber}/labels --jq '.[].name'`,
    )
    if (!output) return []
    return output
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
  } catch {
    console.warn('Warning: failed to fetch labels via GH API, proceeding without labels.')
    return []
  }
}

function main(): void {
  const baseSha = getEnv('BASE_SHA')
  const headSha = getEnv('HEAD_SHA')
  const repo = getEnv('GITHUB_REPOSITORY')
  const prNumber = getEnv('PR_NUMBER')
  const prTitle = getEnv('PR_TITLE', false) ?? ''
  const ghToken = getEnv('GH_TOKEN', false) ?? ''

  if (!baseSha || !headSha || !repo || !prNumber) {
    throw new Error('Missing required environment for changeset check.')
  }

  const files = getChangedFiles(baseSha, headSha)
  // A second diff excluding deletions: a PR that *removes* a changeset must not
  // count that removal as "a changeset is present".
  const currentFiles = getChangedFiles(baseSha, headSha, 'ACMRTUXB')
  const currentChangesetFiles = getChangesetFiles(currentFiles)

  if (ghToken) {
    const labels = getLabels(repo, prNumber, ghToken)
    if (labels.includes('skip-changeset')) {
      console.log('skip-changeset label present; skipping changeset check.')
      return
    }
  }

  if (prTitle.includes('[skip-changeset]')) {
    console.log('[skip-changeset] found in PR title; skipping changeset check.')
    return
  }

  if (currentChangesetFiles.length > 0) {
    ensureSinglePackagePerChangeset(currentChangesetFiles)
    console.log('Changeset found.')
    return
  }

  if (isDocsOrConfigOnly(files)) {
    console.log('Docs/CI/config-only changes detected; skipping changeset check.')
    return
  }

  console.error(
    `No changeset found. Add one with ${CREATE_HINT} or apply the 'skip-changeset' label.`,
  )
  process.exit(1)
}

main()
