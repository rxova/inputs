---
sidebar_position: 2
sidebar_label: Formatting options
---

# Formatting options

Sensible defaults come from the currency itself; every knob below is optional.

## Live vs. blur formatting

`formatMode` controls when the field formats.

- **`'live'` (default)** formats as you type — group separators and the symbol stay visible, and the
  caret is kept in place by anchoring it to the digit you typed, so it never jumps. Accepts whichever
  decimal key your keyboard offers (a comma on a German layout, a dot on a US one).
- **`'blur'`** shows a plain, unformatted number while the field is focused and only formats once it
  loses focus. There is no caret management at all — the simplest, most bullet-proof behaviour, at
  the cost of a little polish.

```tsx live
function Demo() {
  const [live, setLive] = React.useState(1234.5)
  const [blur, setBlur] = React.useState(1234.5)
  return (
    <div>
      <p>
        <code>live</code>:{' '}
        <CurrencyInput
          locale="de-DE"
          currency="EUR"
          value={live}
          onValueChange={setLive}
          aria-label="live"
        />
      </p>
      <p>
        <code>blur</code>:{' '}
        <CurrencyInput
          locale="de-DE"
          currency="EUR"
          formatMode="blur"
          value={blur}
          onValueChange={setBlur}
          aria-label="blur"
        />
      </p>
    </div>
  )
}
```

Both emit the same `number`; only the editing experience differs.

## Fraction digits

By default the maximum comes from the currency (JPY → 0, EUR → 2, KWD → 3) and the minimum is `0`, so
no trailing zeros are forced. Override either.

```tsx live
function Demo() {
  const [value, setValue] = React.useState(1234.5)
  return (
    <div>
      <p>
        default:{' '}
        <CurrencyInput
          locale="en-US"
          currency="USD"
          value={value}
          onValueChange={setValue}
          aria-label="a"
        />
      </p>
      <p>
        <code>minimumFractionDigits=2</code>:{' '}
        <CurrencyInput
          locale="en-US"
          currency="USD"
          minimumFractionDigits={2}
          value={value}
          onValueChange={setValue}
          aria-label="b"
        />
      </p>
    </div>
  )
}
```

## Currency display

`currencyDisplay` maps straight through to `Intl`: `'symbol'` (default), `'narrowSymbol'`, `'code'`,
or `'name'`.

```tsx live
function Demo() {
  return (
    <ul>
      {['symbol', 'narrowSymbol', 'code', 'name'].map((d) => (
        <li key={d}>
          <code>{d}</code>:{' '}
          <CurrencyInput
            locale="en-US"
            currency="USD"
            currencyDisplay={d}
            value={1234.5}
            aria-label={d}
          />
        </li>
      ))}
    </ul>
  )
}
```

## Negative amounts

Negatives are rejected unless you opt in with `allowNegative` — useful for refunds or adjustments.

```tsx
<CurrencyInput locale="en-US" currency="USD" allowNegative />
```

## Arrow-key stepping

Pass `step` to make ArrowUp and ArrowDown adjust the amount. The result is normalized to the
currency's maximum fraction digits, avoiding floating-point display artifacts.

```tsx
<CurrencyInput locale="en-US" currency="USD" step={0.25} />
```

Without `step`, the library does not intercept the arrow keys.

## Raw-input transformation

`transformRawValue` runs before locale-aware sanitization. Use it for application-specific cleanup,
not for recreating locale rules:

```tsx
<CurrencyInput locale="en-US" currency="USD" transformRawValue={(raw) => raw.replaceAll('_', '')} />
```

## Empty vs. zero

`value` is `number | null`. `null` (or `undefined`) renders an **empty** field, never `"0"`.
`onValueChange` emits `null` when the user clears the field, so you can tell "nothing entered" from
"entered zero".

## A note on precision

The emitted value is a JavaScript `number`, which is what form libraries and validation schemas
expect. For everyday amounts this is exact. If you need lossless decimals for very large sums, keep
the `raw` string handed to `onValueChange`:

```tsx
<CurrencyInput
  locale="en-US"
  currency="USD"
  onValueChange={(value, meta) => {
    // meta.value    -> number | null
    // meta.formatted -> the localized string
    // meta.raw       -> the clean editable string
  }}
/>
```
