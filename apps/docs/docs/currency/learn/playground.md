---
sidebar_position: 2
sidebar_label: Live playground
slug: /playground
---

# Live playground

This is the published `CurrencyInput`, running inside the docs. Edit the example itself or use the
controls below it: every change is compiled in the browser, so you can experiment without creating
a project first.

:::tip Two display states
Focus the amount to see the clean editable number. Blur it to let `Intl.NumberFormat` apply the
selected locale's grouping, digits, spacing, and currency placement. Try `bg-BG` with `5000`, then
`50000`, to see the Bulgarian grouping threshold.
:::

```tsx live
function CurrencyPlayground() {
  const [value, setValue] = React.useState(1234567.89)
  const [locale, setLocale] = React.useState('bg-BG')
  const [currency, setCurrency] = React.useState('EUR')
  const [currencyDisplay, setCurrencyDisplay] = React.useState('symbol')
  const [fractionDigits, setFractionDigits] = React.useState('auto')
  const [numberingSystem, setNumberingSystem] = React.useState('locale')
  const [allowNegative, setAllowNegative] = React.useState(false)
  const [step, setStep] = React.useState('none')
  const [change, setChange] = React.useState(null)

  const controlStyle = {
    boxSizing: 'border-box',
    inlineSize: '100%',
    minBlockSize: '2.5rem',
    border: '1px solid #94a3b8',
    borderRadius: '0.5rem',
    padding: '0.5rem 0.625rem',
    background: '#fff',
    color: '#0f172a',
    font: 'inherit',
  }

  const Field = ({ label, children }) => (
    <label style={{ display: 'grid', gap: '0.3rem' }}>
      <span style={{ color: '#334155', fontSize: '0.8rem', fontWeight: 650 }}>{label}</span>
      {children}
    </label>
  )

  const choosePreset = (nextValue, nextLocale, nextCurrency) => {
    setValue(nextValue)
    setLocale(nextLocale)
    setCurrency(nextCurrency)
    setChange(null)
  }

  return (
    <div style={{ display: 'grid', gap: '1.25rem' }}>
      <div
        style={{
          display: 'grid',
          gap: '1rem',
          border: '1px solid #cbd5e1',
          borderRadius: '0.875rem',
          padding: 'clamp(1rem, 4vw, 1.5rem)',
          background: '#f8fafc',
        }}
      >
        <label htmlFor="playground-amount" style={{ fontWeight: 700 }}>
          Amount
        </label>
        <CurrencyInput
          id="playground-amount"
          locale={locale}
          currency={currency}
          value={value}
          currencyDisplay={currencyDisplay}
          maximumFractionDigits={fractionDigits === 'auto' ? undefined : Number(fractionDigits)}
          numberingSystem={numberingSystem === 'locale' ? undefined : numberingSystem}
          allowNegative={allowNegative}
          step={step === 'none' ? undefined : Number(step)}
          onValueChange={(nextValue, meta) => {
            setValue(nextValue)
            setChange(meta)
          }}
          aria-describedby="playground-hint"
          style={{
            ...controlStyle,
            minBlockSize: '3.5rem',
            borderColor: '#64748b',
            fontSize: 'clamp(1.25rem, 5vw, 2rem)',
            fontVariantNumeric: 'tabular-nums',
            textAlign: 'end',
          }}
        />
        <span id="playground-hint" style={{ color: '#475569', fontSize: '0.875rem' }}>
          Focus to edit. Blur to format. When step is enabled, try ArrowUp and ArrowDown.
        </span>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(9rem, 1fr))',
            gap: '0.75rem',
          }}
        >
          <Field label="Locale">
            <select
              value={locale}
              onChange={(event) => setLocale(event.target.value)}
              style={controlStyle}
            >
              <option value="bg-BG">bg-BG · Bulgarian</option>
              <option value="en-US">en-US · English (US)</option>
              <option value="de-DE">de-DE · German</option>
              <option value="fr-FR">fr-FR · French</option>
              <option value="hi-IN">hi-IN · Hindi</option>
              <option value="ja-JP">ja-JP · Japanese</option>
              <option value="ar-EG">ar-EG · Arabic (Egypt)</option>
              <option value="ar-KW">ar-KW · Arabic (Kuwait)</option>
              <option value="de-CH">de-CH · Swiss German</option>
            </select>
          </Field>
          <Field label="Currency">
            <select
              value={currency}
              onChange={(event) => setCurrency(event.target.value)}
              style={controlStyle}
            >
              {['EUR', 'USD', 'BGN', 'GBP', 'JPY', 'INR', 'EGP', 'CHF', 'KWD'].map((code) => (
                <option key={code}>{code}</option>
              ))}
            </select>
          </Field>
          <Field label="Currency display">
            <select
              value={currencyDisplay}
              onChange={(event) => setCurrencyDisplay(event.target.value)}
              style={controlStyle}
            >
              <option value="symbol">symbol</option>
              <option value="narrowSymbol">narrow symbol</option>
              <option value="code">code</option>
              <option value="name">name</option>
            </select>
          </Field>
          <Field label="Maximum decimals">
            <select
              value={fractionDigits}
              onChange={(event) => setFractionDigits(event.target.value)}
              style={controlStyle}
            >
              <option value="auto">currency default</option>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </Field>
          <Field label="Digits">
            <select
              value={numberingSystem}
              onChange={(event) => setNumberingSystem(event.target.value)}
              style={controlStyle}
            >
              <option value="locale">locale default</option>
              <option value="latn">Latin · 0123</option>
              <option value="arab">Arabic-Indic · ٠١٢٣</option>
            </select>
          </Field>
          <Field label="Arrow-key step">
            <select
              value={step}
              onChange={(event) => setStep(event.target.value)}
              style={controlStyle}
            >
              <option value="none">disabled</option>
              <option value="0.01">0.01</option>
              <option value="0.25">0.25</option>
              <option value="1">1</option>
              <option value="100">100</option>
            </select>
          </Field>
        </div>

        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input
            type="checkbox"
            checked={allowNegative}
            onChange={(event) => setAllowNegative(event.target.checked)}
          />
          Allow negative amounts
        </label>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {[
            ['Empty', null, locale, currency],
            ['BG 5,000', 5000, 'bg-BG', 'EUR'],
            ['BG 50,000', 50000, 'bg-BG', 'EUR'],
            ['Indian lakhs', 1234567.89, 'hi-IN', 'INR'],
            ['Arabic digits', 1234567.89, 'ar-EG', 'EGP'],
            ['Kuwaiti dinar', 12.345, 'ar-KW', 'KWD'],
          ].map(([label, nextValue, nextLocale, nextCurrency]) => (
            <button
              key={label}
              type="button"
              onClick={() => choosePreset(nextValue, nextLocale, nextCurrency)}
              style={{
                border: '1px solid #94a3b8',
                borderRadius: '999px',
                padding: '0.4rem 0.7rem',
                background: '#fff',
                color: '#0f172a',
                cursor: 'pointer',
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div
        aria-live="polite"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(10rem, 1fr))',
          gap: '0.75rem',
        }}
      >
        {[
          ['Controlled value', value === null ? 'null' : String(value)],
          ['Last raw input', change ? change.raw || '(empty)' : 'Edit the field'],
          ['Last formatted value', change ? change.formatted || '(empty)' : 'Edit the field'],
        ].map(([label, output]) => (
          <div
            key={label}
            style={{ borderRadius: '0.5rem', padding: '0.75rem', background: '#0f172a' }}
          >
            <div style={{ marginBottom: '0.25rem', color: '#94a3b8', fontSize: '0.75rem' }}>
              {label}
            </div>
            <code style={{ color: '#f8fafc', overflowWrap: 'anywhere' }}>{output}</code>
          </div>
        ))}
      </div>
    </div>
  )
}
```

## Good stress tests

- Switch from `bg-BG` to `hi-IN` with `1234567.89` to compare minimum grouping with lakh grouping.
- Select `JPY` to see the currency default remove decimals, then override **Maximum decimals**.
- Select `ar-EG` and Arabic-Indic digits, then focus and type using either Arabic or Latin digits.
- Enable negative amounts and enter a refund; disable them and try entering another minus sign.
- Enable a step, focus the field, and hold ArrowUp or ArrowDown near zero.
- Change the code directly in the editor—for example, add `minimumFractionDigits={2}` or a
  `transformRawValue` callback.

For a visual-only configurator, continue to the [styling playground](../guides/styling.md). For the
same behaviors inside design-system controls, use the [UI library recipes](../recipes/ui-libraries.md).
