import { afterEach, describe, expect, it, vi } from 'vitest'
import { devWarnOnce, resetWarnings } from '../warn'

afterEach(() => {
  resetWarnings()
  vi.restoreAllMocks()
  delete process.env.NODE_ENV
})

describe('devWarnOnce', () => {
  it('warns once per key and dedupes repeats', () => {
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => undefined)
    devWarnOnce('k', 'first')
    devWarnOnce('k', 'first again')
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy.mock.calls[0]?.[0]).toContain('react-intl-currency-input')
  })

  it('warns again for a different key', () => {
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => undefined)
    devWarnOnce('a', 'one')
    devWarnOnce('b', 'two')
    expect(spy).toHaveBeenCalledTimes(2)
  })

  it('is a no-op in production', () => {
    process.env.NODE_ENV = 'production'
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => undefined)
    devWarnOnce('prod', 'should not print')
    expect(spy).not.toHaveBeenCalled()
  })
})
