---
sidebar_position: 3
sidebar_label: Accessibility
---

# Accessibility

The component renders a real `<input>`, so most of accessibility is "don't break the native
element" — and it doesn't.

## What you get

- The underlying element is a native `<input type="text" inputmode="decimal">`. `inputmode="decimal"`
  brings up the numeric keypad on mobile **without** the constraints of `type="number"`, which
  forbids group separators and localized decimals.
- Any `aria-*` prop, `id`, `name`, `className`, `style`, and event handler you pass is forwarded to
  the input.
- `ref` forwards to the input, so focus-first-error patterns (`ref.current.focus()`) work.

## Labelling

Give the field an accessible name the usual way — a `<label htmlFor>`, `aria-label`, or
`aria-labelledby`.

```tsx
import { CurrencyInput } from '@rxova/react-intl-currency-input'

function PriceField() {
  return (
    <>
      <label htmlFor="price">Price</label>
      <CurrencyInput id="price" locale="de-DE" currency="EUR" />
    </>
  )
}
```

Because the currency is not always obvious from the number alone, consider naming it — either in the
label ("Price (EUR)") or via `aria-describedby`.

## Validation state

Pass `invalid` to mark the field. It sets `aria-invalid="true"` and a `data-invalid` attribute you
can target for styling, and pairs with `aria-describedby` for the error text.

```tsx
import { CurrencyInput } from '@rxova/react-intl-currency-input'

function PriceField({ hasError }: { hasError: boolean }) {
  return (
    <>
      <label htmlFor="price">Price</label>
      <CurrencyInput
        id="price"
        locale="de-DE"
        currency="EUR"
        invalid={hasError}
        aria-describedby={hasError ? 'price-error' : undefined}
      />
      {hasError && <p id="price-error">Enter a price</p>}
    </>
  )
}
```

The [form recipes](../recipes/react-hook-form.md) wire this up per library.

## Right-to-left

The input inherits `dir` from the DOM, and `Intl` already places the symbol on the correct side for
RTL locales. No extra configuration is needed.
