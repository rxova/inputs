---
sidebar_position: 4
sidebar_label: TanStack Form
---

# TanStack Form

Bind `field.state.value` and `field.handleChange`; pass `field.handleBlur` for touched state.

```tsx
import { useForm } from '@tanstack/react-form'
import { CurrencyInput } from '@rxova/react-intl-currency-input'

function PriceForm() {
  const form = useForm({
    defaultValues: { price: 0 },
    onSubmit: ({ value }) => console.log(value.price),
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        void form.handleSubmit()
      }}
    >
      <form.Field name="price">
        {(field) => (
          <>
            <label htmlFor="price">Price</label>
            <CurrencyInput
              id="price"
              locale="ja-JP"
              currency="JPY"
              value={field.state.value}
              onValueChange={(value) => field.handleChange(value ?? 0)}
              onBlur={field.handleBlur}
              name={field.name}
            />
          </>
        )}
      </form.Field>
      <button type="submit">Submit</button>
    </form>
  )
}
```
