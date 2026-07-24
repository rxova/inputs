---
sidebar_position: 2
sidebar_label: Formik
---

# Formik

Bind the field with `useField` and push updates through `setValue`:

```tsx
import { useField } from 'formik'
import { OtpInput } from '@rxova/react-otp-input'

function CodeField() {
  const [field, meta, helpers] = useField<string>('code')
  return (
    <>
      <OtpInput
        length={6}
        label="One-time code"
        name="code"
        value={field.value}
        onChange={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        invalid={Boolean(meta.touched && meta.error)}
        aria-describedby={meta.touched && meta.error ? 'code-error' : undefined}
      />
      {meta.touched && meta.error && (
        <p id="code-error" role="alert">
          {meta.error}
        </p>
      )}
    </>
  )
}
```

Drop `<CodeField />` inside a `<Formik>` / `<Form>` with an `initialValues={{ code: '' }}`. Validate
in `validationSchema` or `validate` as usual — the value is a plain `string`.
