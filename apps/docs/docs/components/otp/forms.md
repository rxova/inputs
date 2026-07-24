---
sidebar_position: 3
---

# Forms

`onChange` emits the sanitized **`string`** — the newly entered code, not a DOM event — and the
underlying real input posts natively under `name`. That combination drops into every form library.

```tsx
// The single input IS the form field.
<OtpInput name="code" length={6} label="One-time code" />
```

## What each prop is for

| Prop                 | Purpose                                                         |
| -------------------- | --------------------------------------------------------------- |
| `value` / `onChange` | Controlled value; `onChange(value: string)`                     |
| `defaultValue`       | Uncontrolled initial value                                      |
| `onComplete`         | Fires once the value reaches `length` — wire submit/verify here |
| `name`               | Posts natively in a `<form>`; the name RHF/Formik bind to       |
| `onBlur`             | Fires when focus leaves the whole control, never between slots  |
| `invalid`            | Sets `aria-invalid` and `data-invalid`                          |
| `aria-describedby`   | id(s) of external error/help text                               |
| `inputRef`           | Ref to the underlying `<input>` (focus management)              |

## `onComplete`, not auto-submit

The library never touches your `<form>`. When the code fills, `onComplete(value)` fires — submit,
verify, or advance focus from there. That keeps the decision yours:

```tsx live
function Complete() {
  const [code, setCode] = useState('')
  const [status, setStatus] = useState('waiting')
  return (
    <div>
      <OtpInput
        length={4}
        value={code}
        onChange={setCode}
        onComplete={(v) => setStatus(`verifying ${v}…`)}
        label="Code"
      />
      <p style={{ fontSize: '0.9rem' }}>{status}</p>
    </div>
  )
}
```

## Library recipes

The same three props — `value`, `onChange`, `name` — bind to every form library. Expand one for the
essential wiring, then follow the link for the full example with validation and error display.

<details>
<summary><strong>React Hook Form</strong> — <code>&lt;Controller&gt;</code></summary>

```tsx
<Controller
  name="code"
  control={control}
  render={({ field, fieldState }) => (
    <OtpInput
      length={6}
      label="Verification code"
      value={field.value}
      onChange={field.onChange}
      onBlur={field.onBlur}
      name={field.name}
      inputRef={field.ref}
      invalid={fieldState.invalid}
    />
  )}
/>
```

`field.ref` → `inputRef` lets RHF's `setFocus()` and focus-first-error target the input.
Full example: [React Hook Form recipe](/guides/form-libraries).

</details>

<details>
<summary><strong>Formik</strong> — <code>useField</code></summary>

```tsx
const [field, meta, helpers] = useField<string>('code')

<OtpInput
  length={6}
  label="One-time code"
  name="code"
  value={field.value}
  onChange={(value) => helpers.setValue(value)}
  onBlur={() => helpers.setTouched(true)}
  invalid={Boolean(meta.touched && meta.error)}
/>
```

The value is a plain `string`, so `validationSchema` / `validate` work unchanged.
Full example: [Formik recipe](/guides/form-libraries).

</details>

<details>
<summary><strong>React Final Form</strong> — <code>Field</code></summary>

```tsx
<Field name="code">
  {({ input, meta }) => (
    <OtpInput
      length={6}
      label="One-time code"
      name={input.name}
      value={input.value}
      onChange={input.onChange}
      onBlur={input.onBlur}
      invalid={Boolean(meta.touched && meta.error)}
    />
  )}
</Field>
```

An empty field is `''`, which is already a valid empty code — no value guard to write.
Full example: [React Final Form recipe](/guides/form-libraries).

</details>

<details>
<summary><strong>TanStack Form</strong> — <code>form.Field</code></summary>

```tsx
<form.Field name="code">
  {(field) => (
    <OtpInput
      length={6}
      label="One-time code"
      name="code"
      value={field.state.value}
      onChange={(value) => field.handleChange(value)}
      onBlur={field.handleBlur}
      invalid={!field.state.meta.isValid}
    />
  )}
</form.Field>
```

`field.handleChange` receives the `string` code directly — no event to unwrap.
Full example: [TanStack Form recipe](/guides/form-libraries).

</details>

<details>
<summary><strong>Native <code>&lt;form&gt;</code></strong> — no library, posts via <code>name</code></summary>

```tsx
<form
  onSubmit={(e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    verify(data.get('code'))
  }}
>
  <OtpInput name="code" length={6} required label="One-time code" />
  <button type="submit">Verify</button>
</form>
```

`FormData` reads the code straight off the input — no hidden concat field, no serialization step.
Full example: [Native forms recipe](/guides/form-libraries).

</details>

Set `blurOnComplete` to dismiss the mobile keyboard once the code is entered.
