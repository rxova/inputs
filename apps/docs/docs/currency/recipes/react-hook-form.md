---
sidebar_position: 1
sidebar_label: React Hook Form
---

# React Hook Form

`onValueChange` emits a `number`, not an event, so the `{...register()}` spread does not apply — use
a `Controller`, the one documented path. `field.onChange` accepts the value directly.

```tsx
import { Controller, useForm } from 'react-hook-form'
import { CurrencyInput } from '@rxova/react-intl-currency-input'

function PriceForm() {
  const { control, handleSubmit } = useForm<{ price: number | null }>({
    defaultValues: { price: null },
  })

  return (
    <form onSubmit={handleSubmit((values) => console.log(values.price))}>
      <Controller
        name="price"
        control={control}
        rules={{ required: 'Enter a price', min: { value: 1, message: 'Must be greater than 0' } }}
        render={({ field, fieldState }) => (
          <>
            <label htmlFor="price">Price</label>
            <CurrencyInput
              id="price"
              locale="de-DE"
              currency="EUR"
              value={field.value ?? null}
              onValueChange={field.onChange}
              onBlur={field.onBlur}
              name={field.name}
              ref={field.ref}
              invalid={fieldState.invalid}
              aria-describedby={fieldState.error ? 'price-error' : undefined}
            />
            {fieldState.error && <p id="price-error">{fieldState.error.message}</p>}
          </>
        )}
      />
      <button type="submit">Submit</button>
    </form>
  )
}
```

The form's `price` value is a `number` (or `null`), ready to submit or validate — no parsing on your
side.
