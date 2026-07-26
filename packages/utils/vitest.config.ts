import { defineConfig } from 'vitest/config'

/**
 * Covers the repo's own tooling: the release gate and the changeset check.
 * Separate from the component packages' configs, which run a `unit` and a
 * `browser` project against a 95% per-file coverage threshold — neither applies
 * to scripts that shell out to git and pnpm.
 *
 * `test` and `test:coverage` are the same command here. The component packages
 * distinguish them (the latter adds --coverage and the thresholds), and both
 * verify and CI fan out on the task *name*, so declaring both is what puts
 * these tests in the push gate rather than only in the commit hook.
 */
export default defineConfig({
  test: {
    include: ['*.test.ts'],
    environment: 'node',
    // The changeset tests spawn a real process against a temp git repo, which
    // is comfortably slower than the 5s default on a cold runner.
    testTimeout: 30_000,
  },
})
