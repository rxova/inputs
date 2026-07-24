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
export const steps = [
  { name: 'Audit dependencies', script: 'audit:check' },
  { name: 'Check dependency dedupe', script: 'dedupe:check' },
  { name: 'Check formatting', script: 'format:check' },
  // `check:docs` is available (pnpm run check:docs) but not in the gate: it
  // enforces that every fenced snippet is a standalone module, an idiom only the
  // currency docs were authored for. The rating/otp docs deliberately elide
  // (a `useState` line + a bare `<Component/>`), so gating on it would mean
  // rewriting authored documentation.
  { name: 'Check e2e browser list', script: 'check:browsers' },
  { name: 'Lint', script: 'lint' },
  { name: 'Typecheck', script: 'typecheck' },
  { name: 'Test with coverage', script: 'test:coverage' },
  { name: 'Build', script: 'build' },
  { name: 'Check package publishing metadata', script: 'check:exports' },
  { name: 'Smoke-test the package tarball', script: 'pack:smoke' },
  { name: 'Check bundle size budgets', script: 'size' },
]

const runPnpmScript = (script) => spawnSync('pnpm', ['run', script], { stdio: 'inherit' })

export function runVerify({
  log = console.log,
  error = console.error,
  runScript = runPnpmScript,
  only = null,
} = {}) {
  const selected = only ? steps.filter((s) => only.includes(s.script)) : steps

  for (const step of selected) {
    log(`\n==> ${step.name}`)
    const result = runScript(step.script)

    if (result.error) {
      error(result.error)
      return 1
    }
    if (result.status !== 0) {
      error(`\n✖ Failed: ${step.name} (pnpm run ${step.script})`)
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
