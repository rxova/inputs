---
sidebar_position: 3
sidebar_label: React Final Form
---

# React Final Form

Use a `Field` render prop. React Final Form represents an empty field as `''` — which is already a
valid empty code, so unlike a numeric field there is **no value guard to write**.

```tsx
import { Form, Field } from 'react-final-form'
import { OtpInput } from '@rxova/react-otp-input'

function VerifyForm() {
  return (
    <Form
      onSubmit={(values) => verify(values.code)}
      validate={(v) => (v.code?.length === 6 ? {} : { code: 'Enter all six digits' })}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Field name="code">
            {({ input, meta }) => (
              <>
                <OtpInput
                  length={6}
                  label="One-time code"
                  name={input.name}
                  value={input.value}
                  onChange={input.onChange}
                  onBlur={input.onBlur}
                  invalid={Boolean(meta.touched && meta.error)}
                  aria-describedby={meta.touched && meta.error ? 'code-error' : undefined}
                />
                {meta.touched && meta.error && (
                  <p id="code-error" role="alert">
                    {meta.error}
                  </p>
                )}
              </>
            )}
          </Field>
          <button type="submit">Verify</button>
        </form>
      )}
    />
  )
}
```

## Notes

- `input.onChange` accepts the emitted `string` directly — the field value _is_ the code.
- `input.value` is `''` until the user types; that renders as an empty field, no coercion needed.
- `input.onBlur` marks the field touched when focus leaves the whole control, so
  `meta.touched`-based errors appear only after the user finishes.
