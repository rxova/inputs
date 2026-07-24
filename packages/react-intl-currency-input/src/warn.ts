/**
 * Development-only diagnostics.
 *
 * Every call is guarded by `process.env.NODE_ENV !== 'production'`, so a
 * production bundler drops the message strings and the `Set` entirely. Warnings
 * are deduplicated by key: a formatter rebuilt on every render must not flood
 * the console with the same message.
 */

const seen = new Set<string>()

const isProd = (): boolean =>
  typeof process !== 'undefined' && process.env.NODE_ENV === 'production'

/** Warn once per unique `key`. No-op in production. */
export function devWarnOnce(key: string, message: string): void {
  if (isProd() || seen.has(key)) return
  seen.add(key)
  // eslint-disable-next-line no-console
  console.warn(`[react-intl-currency-input] ${message}`)
}

/** Test-only: reset the dedupe set so each test starts clean. */
export function resetWarnings(): void {
  seen.clear()
}
