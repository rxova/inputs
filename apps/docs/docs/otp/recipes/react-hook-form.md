---
sidebar_position: 1
sidebar_label: React Hook Form
---

# React Hook Form

Because `onChange` emits a `string`, wire it through `<Controller>`:

```tsx
import { Controller, useForm } from 'react-hook-form'
import { OtpInput } from '@rxova/react-otp-input'

function VerifyForm() {
  const { control, handleSubmit } = useForm<{ code: string }>({ defaultValues: { code: '' } })

  return (
    <form onSubmit={handleSubmit((values) => verify(values.code))}>
      <Controller
        name="code"
        control={control}
        rules={{ minLength: { value: 6, message: 'Enter all six digits' } }}
        render={({ field, fieldState }) => (
          <>
            <OtpInput
              length={6}
              label="Verification code"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              name={field.name}
              inputRef={field.ref}
              invalid={fieldState.invalid}
              aria-describedby={fieldState.error ? 'code-error' : undefined}
            />
            {fieldState.error && (
              <p id="code-error" role="alert">
                {fieldState.error.message}
              </p>
            )}
          </>
        )}
      />
      <button type="submit">Verify</button>
    </form>
  )
}
```

- `field.value` / `field.onChange` bind the code (a `string`).
- `field.ref` → `inputRef` lets RHF's `setFocus()` and focus-first-error target the input.
- `fieldState.invalid` → `invalid` wires `aria-invalid` and `data-invalid`.

To submit automatically once the code completes, use `onComplete` instead of a submit button:

```tsx
<OtpInput /* …field… */ onComplete={() => formRef.current?.requestSubmit()} />
```
