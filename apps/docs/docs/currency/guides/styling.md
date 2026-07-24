---
sidebar_position: 3
sidebar_label: Styling
---

# Styling

`CurrencyInput` renders one native `<input>` and ships no CSS. There is no theme to reset, no
generated wrapper to work around, and no stylesheet to put in your bundle. Give it a `className`, an
inline `style`, or any native `data-*` attribute and style it exactly like the rest of your form.

Already using a component library? The exported `useCurrencyInput` hook drives its input without
replacing its visuals. See the [shadcn/ui, Radix Themes, MUI, Chakra, Mantine, and Ant Design
recipes](../recipes/ui-libraries.md).

:::tip Every control below is live
The playground renders the real currency input. Change its locale, spacing, type size, alignment,
and colors to see the editable and formatted states—not a mock-up.
:::

## Interactive playground

Use this to sketch the visual contract for your field. Focus the input to see its editable form,
type a value, and blur it to see the locale apply grouping and place the currency symbol. The panel
underneath is valid CSS you can paste into your own stylesheet.

```tsx live
function StylingPlayground() {
  const [value, setValue] = React.useState(1234567.89)
  const [locale, setLocale] = React.useState('bg-BG')
  const [fontSize, setFontSize] = React.useState(1)
  const [padding, setPadding] = React.useState(0.75)
  const [radius, setRadius] = React.useState(0.5)
  const [align, setAlign] = React.useState('end')
  const [border, setBorder] = React.useState('#94a3b8')
  const [surface, setSurface] = React.useState('#ffffff')
  const [text, setText] = React.useState('#0f172a')

  const style = {
    boxSizing: 'border-box',
    inlineSize: '100%',
    maxInlineSize: '24rem',
    minBlockSize: '2.75rem',
    border: `1px solid ${border}`,
    borderRadius: `${radius}rem`,
    padding: `${padding * 0.75}rem ${padding}rem`,
    background: surface,
    color: text,
    font: 'inherit',
    fontSize: `${fontSize}rem`,
    fontVariantNumeric: 'tabular-nums',
    textAlign: align,
  }

  const Row = ({ label, children, output }) => (
    <label
      style={{
        display: 'grid',
        gridTemplateColumns: '5.5rem minmax(8rem, 1fr) 4.5rem',
        alignItems: 'center',
        gap: '0.75rem',
      }}
    >
      <span style={{ fontSize: '0.875rem' }}>{label}</span>
      {children}
      <code style={{ textAlign: 'end' }}>{output}</code>
    </label>
  )

  const css = `.money-input {
  box-sizing: border-box;
  inline-size: 100%;
  max-inline-size: 24rem;
  min-block-size: 2.75rem;
  border: 1px solid ${border};
  border-radius: ${radius}rem;
  padding: ${padding * 0.75}rem ${padding}rem;
  background: ${surface};
  color: ${text};
  font: inherit;
  font-size: ${fontSize}rem;
  font-variant-numeric: tabular-nums;
  text-align: ${align};
}`

  return (
    <div style={{ display: 'grid', gap: '1.25rem' }}>
      <div style={{ display: 'grid', gap: '0.5rem' }}>
        <label htmlFor="styled-amount" style={{ fontWeight: 650 }}>
          Amount
        </label>
        <CurrencyInput
          id="styled-amount"
          locale={locale}
          currency={locale === 'ar-EG' ? 'EGP' : locale === 'hi-IN' ? 'INR' : 'EUR'}
          value={value}
          onValueChange={setValue}
          style={style}
        />
        <span style={{ color: '#475569', fontSize: '0.875rem' }}>
          Focus, edit, then blur to see the two display states.
        </span>
      </div>

      <div style={{ display: 'grid', gap: '0.625rem', maxWidth: 520 }}>
        <label style={{ display: 'grid', gridTemplateColumns: '5.5rem 1fr', gap: '0.75rem' }}>
          <span style={{ fontSize: '0.875rem' }}>locale</span>
          <select value={locale} onChange={(event) => setLocale(event.target.value)}>
            <option value="bg-BG">bg-BG · Bulgarian</option>
            <option value="en-US">en-US · English</option>
            <option value="de-DE">de-DE · German</option>
            <option value="fr-FR">fr-FR · French</option>
            <option value="hi-IN">hi-IN · Hindi</option>
            <option value="ar-EG">ar-EG · Arabic</option>
          </select>
        </label>
        <Row label="type size" output={`${fontSize}rem`}>
          <input
            type="range"
            min={0.75}
            max={2}
            step={0.125}
            value={fontSize}
            onChange={(event) => setFontSize(+event.target.value)}
          />
        </Row>
        <Row label="spacing" output={`${padding}rem`}>
          <input
            type="range"
            min={0.25}
            max={1.5}
            step={0.125}
            value={padding}
            onChange={(event) => setPadding(+event.target.value)}
          />
        </Row>
        <Row label="radius" output={`${radius}rem`}>
          <input
            type="range"
            min={0}
            max={1.5}
            step={0.125}
            value={radius}
            onChange={(event) => setRadius(+event.target.value)}
          />
        </Row>
        <label style={{ display: 'grid', gridTemplateColumns: '5.5rem 1fr', gap: '0.75rem' }}>
          <span style={{ fontSize: '0.875rem' }}>alignment</span>
          <select value={align} onChange={(event) => setAlign(event.target.value)}>
            <option value="start">start</option>
            <option value="center">center</option>
            <option value="end">end</option>
          </select>
        </label>
        {[
          ['border', border, setBorder],
          ['surface', surface, setSurface],
          ['text', text, setText],
        ].map(([label, color, setColor]) => (
          <Row key={label} label={label} output={color}>
            <input type="color" value={color} onChange={(event) => setColor(event.target.value)} />
          </Row>
        ))}
      </div>

      <pre style={{ margin: 0 }}>{css}</pre>
    </div>
  )
}
```

## A complete field

The component deliberately owns only currency behavior. Your application owns the label, hint,
validation message, spacing, colors, and layout:

```tsx
import { useId, useState } from 'react'
import { CurrencyInput } from '@rxova/react-intl-currency-input'
import './price-field.css'

export function PriceField() {
  const id = useId()
  const hintId = `${id}-hint`
  const errorId = `${id}-error`
  const [value, setValue] = useState<number | null>(null)
  const invalid = value !== null && value < 0.5

  return (
    <div className="price-field">
      <label className="price-field__label" htmlFor={id}>
        Price <span className="price-field__optional">Optional</span>
      </label>
      <CurrencyInput
        id={id}
        name="price"
        className="price-field__control"
        locale="bg-BG"
        currency="EUR"
        value={value}
        onValueChange={setValue}
        placeholder="0,00"
        invalid={invalid}
        aria-describedby={`${hintId}${invalid ? ` ${errorId}` : ''}`}
      />
      <p id={hintId} className="price-field__hint">
        Enter the price before tax.
      </p>
      {invalid && (
        <p id={errorId} className="price-field__error" role="alert">
          Price must be at least 0,50 €.
        </p>
      )}
    </div>
  )
}
```

```css
.price-field {
  --field-border: #94a3b8;
  --field-focus: #2563eb;
  --field-error: #b42318;
  display: grid;
  gap: 0.375rem;
  inline-size: min(100%, 22rem);
}

.price-field__label {
  color: #0f172a;
  font-weight: 650;
}

.price-field__optional,
.price-field__hint {
  color: #475569;
  font-size: 0.875rem;
  font-weight: 400;
}

.price-field__control {
  box-sizing: border-box;
  inline-size: 100%;
  min-block-size: 2.75rem;
  border: 1px solid var(--field-border);
  border-radius: 0.5rem;
  padding: 0.625rem 0.75rem;
  background: #fff;
  color: #0f172a;
  font: inherit;
  font-variant-numeric: tabular-nums;
  text-align: end;
  transition:
    border-color 120ms,
    box-shadow 120ms;
}

.price-field__control::placeholder {
  color: #64748b;
  opacity: 1;
}

.price-field__control:hover:not(:disabled) {
  border-color: #64748b;
}

.price-field__control:focus-visible {
  border-color: var(--field-focus);
  outline: 3px solid color-mix(in srgb, var(--field-focus) 25%, transparent);
  outline-offset: 1px;
}

.price-field__control[data-invalid] {
  border-color: var(--field-error);
}

.price-field__control[data-invalid]:focus-visible {
  outline-color: color-mix(in srgb, var(--field-error) 25%, transparent);
}

.price-field__control:disabled {
  cursor: not-allowed;
  background: #f1f5f9;
  color: #64748b;
}

.price-field__hint,
.price-field__error {
  margin: 0;
}

.price-field__error {
  color: var(--field-error);
  font-size: 0.875rem;
}
```

That CSS covers the states users need to distinguish: rest, hover, keyboard focus, invalid, and
disabled. `invalid` puts both `aria-invalid="true"` and `data-invalid` on the input, so semantics and
visual styling stay in sync.

## Styling hooks

Every native input prop except the value-management props is forwarded. The most useful styling
hooks are:

| Hook                      | Use it for                                                          |
| ------------------------- | ------------------------------------------------------------------- |
| `className`               | CSS, CSS Modules, CSS-in-JS, or utility classes                     |
| `style`                   | Values calculated at runtime                                        |
| `data-*`                  | Variants owned by your design system, such as `data-size="compact"` |
| `[data-invalid]`          | The invalid state supplied by the `invalid` prop                    |
| `:focus-visible`          | A keyboard-visible focus ring                                       |
| `:disabled`, `:read-only` | Native interaction states                                           |
| `::placeholder`           | Empty-field guidance                                                |

Because the output is a native input, selectors do not depend on undocumented internal markup.

## CSS Modules

```tsx
import { useState } from 'react'
import { CurrencyInput } from '@rxova/react-intl-currency-input'
import styles from './PriceField.module.css'

function PriceField() {
  const [value, setValue] = useState<number | null>(null)

  return (
    <CurrencyInput
      className={styles.control}
      locale="de-DE"
      currency="EUR"
      value={value}
      onValueChange={setValue}
      aria-label="Price"
    />
  )
}
```

The same `[data-invalid]`, `:focus-visible`, and native-state selectors work inside the module:

```css
.control {
  border: 1px solid var(--border-default);
}

.control[data-invalid] {
  border-color: var(--border-danger);
}
```

## Utility classes

There is no special adapter for Tailwind or similar libraries—just pass the classes you would use
on an ordinary text input:

```tsx
<CurrencyInput
  className="w-full rounded-lg border border-slate-400 bg-white px-3 py-2 text-end tabular-nums text-slate-950 outline-none transition hover:border-slate-600 focus-visible:border-blue-600 focus-visible:ring-4 focus-visible:ring-blue-600/20 disabled:cursor-not-allowed disabled:bg-slate-100 data-[invalid]:border-red-700 data-[invalid]:focus-visible:ring-red-700/20"
  locale="en-US"
  currency="USD"
  invalid={hasError}
/>
```

## Prefixes, suffixes, and icons

Do not add a decorative currency symbol beside the input by default: the localized idle value
already includes one, and its correct side depends on the locale. `$` may lead in one locale while
`US$` or `$US` trails in another.

If the surrounding interface needs an icon or unit, put it in your own wrapper. Keep decoration out
of the accessible name, and let the input retain the full width:

```tsx
<div className="amount-shell">
  <span className="amount-shell__icon" aria-hidden="true">
    ↗
  </span>
  <CurrencyInput className="amount-shell__input" locale="en-US" currency="USD" />
</div>
```

```css
.amount-shell {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  border: 1px solid #94a3b8;
  border-radius: 0.5rem;
}

.amount-shell:focus-within {
  outline: 3px solid rgb(37 99 235 / 25%);
}

.amount-shell__icon {
  padding-inline-start: 0.75rem;
  color: #475569;
}

.amount-shell__input {
  min-inline-size: 0;
  border: 0;
  padding: 0.625rem 0.75rem;
  background: transparent;
  font: inherit;
  outline: 0;
}
```

## RTL and logical properties

Use logical properties such as `inline-size`, `padding-inline`, and `text-align: end`. They follow
the document direction automatically, so the same style works for both Latin and Arabic layouts.
Do not force `direction: ltr`: an Arabic locale may render native Arabic-Indic digits and place the
currency token according to its own bidirectional rules.

The field intentionally changes presentation across interaction states: idle text is fully
localized (`1 234,50 €`), while focused text is the plain editable number (`1234,50`). Give the
control enough width for either representation, and do not position decorations by measuring the
currency symbol.

## Design-system component

Wrap `CurrencyInput` once when your product needs a fixed visual contract. You can preserve the
library's complete prop surface while adding your own size and tone variants:

```tsx
import type { CurrencyInputProps } from '@rxova/react-intl-currency-input'

type MoneyFieldProps = CurrencyInputProps & {
  size?: 'compact' | 'comfortable'
}

export function MoneyField({ size = 'comfortable', className = '', ...props }: MoneyFieldProps) {
  return <CurrencyInput {...props} data-size={size} className={`money-field ${className}`} />
}
```

```css
.money-field[data-size='compact'] {
  min-block-size: 2rem;
  padding: 0.25rem 0.5rem;
}

.money-field[data-size='comfortable'] {
  min-block-size: 2.75rem;
  padding: 0.625rem 0.75rem;
}
```

## Styling checklist

- Preserve a visible `:focus-visible` indicator; do not remove the outline without replacing it.
- Keep text and placeholder contrast readable, including invalid and disabled states.
- Use `font-variant-numeric: tabular-nums` when columns of amounts should align.
- Prefer `text-align: end` and logical spacing so RTL layouts work naturally.
- Reserve enough width for a localized value whose currency token may be longer than one symbol.
- Put labels and validation messages outside the input and connect them with `htmlFor` and
  `aria-describedby`.
- Treat `data-invalid` as a state hook, not as the only error signal; keep `invalid` set so
  assistive technology receives `aria-invalid` too.
