---
sidebar_position: 3
sidebar_label: React Final Form
---

# React Final Form

React Final Form represents an empty field as `''`, so coerce it to `null` for `value`. The library's
clamp already handles a stray `''`, but the example is explicit.

```tsx
import { Form, Field } from 'react-final-form'
import { CurrencyInput } from '@rxova/react-intl-currency-input'

function PriceForm() {
  return (
    <Form
      onSubmit={(values) => console.log(values.price)}
      validate={(v) => (v.price == null ? { price: 'Enter a price' } : {})}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Field name="price">
            {({ input, meta }) => (
              <>
                <label htmlFor="price">Price</label>
                <CurrencyInput
                  id="price"
                  locale="de-DE"
                  currency="EUR"
                  value={typeof input.value === 'number' ? input.value : null}
                  onValueChange={input.onChange}
                  onBlur={input.onBlur}
                  name={input.name}
                  invalid={meta.touched && !!meta.error}
                />
                {meta.touched && meta.error && <p>{meta.error}</p>}
              </>
            )}
          </Field>
          <button type="submit">Submit</button>
        </form>
      )}
    />
  )
}
```
