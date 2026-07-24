---
sidebar_position: 4
sidebar_label: TanStack Form
---

# TanStack Form

Use a `form.Field` render prop. `field.handleChange` takes the emitted `string` directly, and
`field.state.value` starts as the empty string you set in `defaultValues` — already a valid empty
code, so there's nothing to coerce.

```tsx
import { useForm } from '@tanstack/react-form'
import { OtpInput } from '@rxova/react-otp-input'

function VerifyForm() {
  const form = useForm({
    defaultValues: { code: '' },
    onSubmit: ({ value }) => verify(value.code),
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        void form.handleSubmit()
      }}
    >
      <form.Field
        name="code"
        validators={{
          onChange: ({ value }) => (value.length === 6 ? undefined : 'Enter all six digits'),
        }}
      >
        {(field) => (
          <>
            <OtpInput
              length={6}
              label="One-time code"
              name="code"
              value={field.state.value}
              onChange={(value) => field.handleChange(value)}
              onBlur={field.handleBlur}
              invalid={!field.state.meta.isValid}
              aria-describedby={field.state.meta.isValid ? undefined : 'code-error'}
            />
            {!field.state.meta.isValid && (
              <p id="code-error" role="alert">
                {field.state.meta.errors.join(', ')}
              </p>
            )}
          </>
        )}
      </form.Field>
      <button type="submit">Verify</button>
    </form>
  )
}
```

## Notes

- `field.handleChange` receives the `string` code — no event to unwrap.
- `field.handleBlur` marks the field touched when focus leaves the whole control, so validation runs
  at the right time.
- `field.state.meta.isValid` / `field.state.meta.errors` drive `invalid` and the error message.
