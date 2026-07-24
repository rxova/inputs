---
sidebar_position: 2
sidebar_label: Formik
---

# Formik

Wire `value` and `onValueChange` to the field; pass Formik's `field.onBlur` through so touched state
works — it reads `event.target.name`, which the underlying input carries.

```tsx
import { Formik, Form, useField } from 'formik'
import { CurrencyInput } from '@rxova/react-intl-currency-input'

function PriceField() {
  const [field, meta, helpers] = useField<number | null>('price')
  return (
    <>
      <label htmlFor="price">Price</label>
      <CurrencyInput
        id="price"
        name="price"
        locale="de-DE"
        currency="EUR"
        value={field.value ?? null}
        onValueChange={(value) => helpers.setValue(value)}
        onBlur={field.onBlur}
        invalid={meta.touched && !!meta.error}
      />
      {meta.touched && meta.error && <p>{meta.error}</p>}
    </>
  )
}

function PriceForm() {
  return (
    <Formik
      initialValues={{ price: null as number | null }}
      validate={(v) => (v.price == null ? { price: 'Enter a price' } : {})}
      onSubmit={(values) => console.log(values.price)}
    >
      <Form>
        <PriceField />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  )
}
```
