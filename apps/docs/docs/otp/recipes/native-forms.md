---
sidebar_position: 5
sidebar_label: Native forms
---

# Native forms

No form library needed. The single real input **is** the field: give it a `name` and it posts in a
`<form>` like any `<input>`.

```tsx
function VerifyForm() {
  return (
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
  )
}
```

`FormData` reads the code straight off the input — no hidden concat field, no serialization step.
`required` participates in native constraint validation.

Prefer to verify the moment the code is complete rather than on a button press? Use `onComplete`:

```tsx
<OtpInput name="code" length={6} onComplete={() => formRef.current?.requestSubmit()} label="Code" />
```
