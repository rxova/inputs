import { spawnSync } from 'node:child_process'
import process from 'node:process'

/**
 * One ordered definition of "is this releasable", executed locally by the
 * pre-push hook. CI runs the same checks split across parallel jobs, and the
 * release workflow gates on that CI run succeeding rather than re-running them.
 *
 * The point of a single list is that the local pre-push gate and CI cannot
 * drift: if the audit lived only in the CI workflow, a green local push could
 * still be carrying dependencies CI would have blocked.
 *
 * Ordered cheapest-and-most-likely-to-fail first, so a broken build surfaces
 * in seconds rather than after the browser suite.
 */
/**
 * Every step below is skip-cheap when nothing it reads has changed, and the
 * skipping is driven by *content hashes*, never by a git diff. That distinction
 * is the whole design: `--filter=[HEAD^1]`-style scoping asks git "what changed
 * since some ref", which has no good answer mid-rebase (detached HEAD), after a
 * cherry-pick (the range spans unrelated commits) or on a merge (two parents).
 * Turbo instead hashes the actual file contents that feed each task, so a
 * rebased, cherry-picked or merged tree that ends up byte-identical replays the
 * cache, and one that does not re-runs exactly the packages that differ. There
 * is no git state that can make it silently under-check.
 *
 * The non-Turbo steps get the same property from their own content caches:
 * eslint and prettier both key on file content + config, so an unchanged file
 * is never re-read.
 */
export const steps = [
  { name: 'Audit dependencies', script: 'audit:check' },
  // Cached by Turbo on the lockfile + manifests (see turbo.json) rather than
  // run directly, which is what turns this from the slowest step in the gate
  // into a replay whenever the dependency graph is untouched.
  { name: 'Check dependency dedupe', turbo: ['//#dedupe:check'] },
  { name: 'Check formatting', script: 'format:check' },
  // Runs the checker directly rather than through Turbo: unlike the CI job,
  // which replays a warm remote cache, the pre-push gate should re-verify the
  // snippets from scratch. It is a sub-second parse pass, so there is nothing
  // to save by caching it here.
  { name: 'Check doc snippets', script: 'check:docs' },
  { name: 'Check e2e browser list', script: 'check:browsers' },
  { name: 'Lint', script: 'lint' },
  // One Turbo invocation instead of four sequential `pnpm run`s. Turbo already
  // knows build must precede size and ^build must precede typecheck/test, so
  // handing it the whole set at once lets it parallelise across packages and
  // pay the ~1s pnpm+turbo startup once rather than four times.
  {
    name: 'Typecheck, test, build and size budgets',
    turbo: ['typecheck', 'test:coverage', 'build', 'size'],
  },
  // Kept out of the combined run: both shell out to a real pack/install into a
  // temp dir, and running them concurrently with anything else (or each other)
  // races on the pnpm store, hence --concurrency=1 in their root scripts.
  { name: 'Check package publishing metadata', script: 'check:exports' },
  { name: 'Smoke-test the package tarball', script: 'pack:smoke' },
]

const runPnpmScript = (step) =>
  step.turbo
    ? spawnSync('pnpm', ['exec', 'turbo', 'run', ...step.turbo], { stdio: 'inherit' })
    : spawnSync('pnpm', ['run', step.script], { stdio: 'inherit' })

export function runVerify({
  log = console.log,
  error = console.error,
  runScript = runPnpmScript,
  only = null,
} = {}) {
  const idsOf = (step) => step.turbo ?? [step.script]
  const selected = only ? steps.filter((s) => idsOf(s).some((id) => only.includes(id))) : steps

  for (const step of selected) {
    log(`\n==> ${step.name}`)
    const result = runScript(step)

    if (result.error) {
      error(result.error)
      return 1
    }
    if (result.status !== 0) {
      const invocation = step.turbo
        ? `pnpm exec turbo run ${step.turbo.join(' ')}`
        : `pnpm run ${step.script}`
      error(`\n✖ Failed: ${step.name} (${invocation})`)
      return result.status ?? 1
    }
  }

  log(`\n✔ ${String(selected.length)} checks passed`)
  return 0
}

const isEntrypoint = process.argv[1] && import.meta.url.endsWith(process.argv[1].split('/').pop())

if (isEntrypoint) {
  process.exit(runVerify())
}
