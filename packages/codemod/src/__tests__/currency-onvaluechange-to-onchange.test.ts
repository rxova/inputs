import { describe, expect, it } from 'vitest'
import { applyTransform } from 'jscodeshift/dist/testUtils'
import transform from '../transforms/currency-onvaluechange-to-onchange'

function run(source: string): string {
  return applyTransform(transform, {}, { source, path: 'test.tsx' }, { parser: 'tsx' })
}

const IMPORT = "import { CurrencyInput } from '@rxova/react-intl-currency-input'"
const HOOK_IMPORT = "import { useCurrencyInput } from '@rxova/react-intl-currency-input'"

describe('<CurrencyInput> attributes', () => {
  it('renames onValueChange to onChange', () => {
    const out = run(
      `${IMPORT}\nconst x = <CurrencyInput currency="USD" onValueChange={setPrice} />`,
    )
    expect(out).toContain('onChange={setPrice}')
    expect(out).not.toContain('onValueChange')
  })

  it('renames a native onChange to onNativeChange', () => {
    const out = run(`${IMPORT}\nconst x = <CurrencyInput currency="USD" onChange={onEvent} />`)
    expect(out).toContain('onNativeChange={onEvent}')
  })

  /**
   * The reason the transform reads every target name before assigning any of
   * them. A sequential rename would walk onValueChange → onChange →
   * onNativeChange and lose the value handler entirely.
   */
  it('swaps both props at once without collapsing them', () => {
    const out = run(
      `${IMPORT}\nconst x = <CurrencyInput currency="USD" onValueChange={setPrice} onChange={onEvent} />`,
    )
    expect(out).toContain('onChange={setPrice}')
    expect(out).toContain('onNativeChange={onEvent}')
    expect(out).not.toContain('onValueChange')
    // setPrice must not have ended up on the native handler.
    expect(out).not.toContain('onNativeChange={setPrice}')
  })

  it('follows an import alias', () => {
    const out = run(
      `import { CurrencyInput as Money } from '@rxova/react-intl-currency-input'\nconst x = <Money currency="USD" onValueChange={setPrice} />`,
    )
    expect(out).toContain('onChange={setPrice}')
    expect(out).not.toContain('onValueChange')
  })

  it('covers the @rxova/react-inputs meta-package', () => {
    const out = run(
      `import { CurrencyInput } from '@rxova/react-inputs'\nconst x = <CurrencyInput currency="USD" onValueChange={setPrice} />`,
    )
    expect(out).toContain('onChange={setPrice}')
  })
})

describe('useCurrencyInput options', () => {
  it('renames onValueChange in the options object', () => {
    const out = run(
      `${HOOK_IMPORT}\nconst cur = useCurrencyInput({ currency: 'USD', onValueChange: setPrice })`,
    )
    expect(out).toContain('onChange: setPrice')
    expect(out).not.toContain('onValueChange')
  })

  it('leaves an existing onChange key alone (the hook has no native option)', () => {
    const out = run(
      `${HOOK_IMPORT}\nconst cur = useCurrencyInput({ currency: 'USD', onChange: setPrice })`,
    )
    expect(out).toBe('')
  })
})

describe('scope', () => {
  it('leaves onChange on unrelated elements untouched', () => {
    const out = run(
      `${IMPORT}\nconst x = <><CurrencyInput currency="USD" onValueChange={setPrice} /><select onChange={pickCurrency} /><input onChange={other} /></>`,
    )
    expect(out).toContain('<select onChange={pickCurrency} />')
    expect(out).toContain('<input onChange={other} />')
    expect(out).not.toContain('onNativeChange')
  })

  it('leaves files without a currency import untouched', () => {
    const out = run(
      `import { OtpInput } from '@rxova/react-otp-input'\nconst x = <OtpInput onChange={setCode} />`,
    )
    expect(out).toBe('')
  })

  it('does not rewrite a same-named component from another package', () => {
    const out = run(
      `import { CurrencyInput } from 'some-other-lib'\nconst x = <CurrencyInput onValueChange={setPrice} />`,
    )
    expect(out).toBe('')
  })
})

describe('spread props', () => {
  it('flags a spread with a TODO banner instead of a partial rewrite', () => {
    const out = run(`${IMPORT}\nconst x = <CurrencyInput currency="USD" {...rest} />`)
    expect(out).toContain('TODO(@rxova/react-intl-currency-input)')
    expect(out).toContain('migrating')
  })

  it('still renames the explicit props alongside a spread', () => {
    const out = run(
      `${IMPORT}\nconst x = <CurrencyInput {...rest} onValueChange={setPrice} onChange={onEvent} />`,
    )
    expect(out).toContain('onChange={setPrice}')
    expect(out).toContain('onNativeChange={onEvent}')
    expect(out).toContain('TODO(@rxova/react-intl-currency-input)')
  })
})
