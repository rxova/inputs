---
sidebar_position: 5
sidebar_label: Native forms
---

# Native forms (no library)

Give the field a `name` and it participates in a plain `<form>`.

```tsx
import { CurrencyInput } from '@rxova/react-intl-currency-input'

function PriceForm() {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        console.log(data.get('price'))
      }}
    >
      <label htmlFor="price">Price</label>
      <CurrencyInput id="price" name="price" locale="en-US" currency="USD" defaultValue={50000} />
      <button type="submit">Submit</button>
    </form>
  )
}
```

:::note The value a native form submits
Because the visible field carries the `name` (so it is identifiable to form libraries and to
`<label htmlFor>`), a plain form submits the **formatted display string** under that name, not the
raw number. If you need the raw number server-side, read it from `onValueChange` and post it
yourself, or use one of the [form-library recipes](./react-hook-form.md), which manage the number in
JavaScript.
:::

For most apps the recommended path is a form library — the recipes in this section each yield a clean
`number` with no parsing on your side.
