---
editUrl: false
next: false
prev: false
title: "OtpInput"
---

```ts
const OtpInput: ForwardRefExoticComponent<OtpInputProps & RefAttributes<HTMLInputElement>>;
```

The single-input, real-slots OTP field. `forwardRef` targets the underlying
`<input>` — the focusable element — so `ref.current.focus()` / `.select()`,
reading `.value`, and React Hook Form's `setFocus()` all work (the `inputRef`
prop is an explicit alias for the same node). The `@__PURE__` annotation lets a
bundle that imports only `useOtpInput` drop this component and its slot
renderers — the seam the size budget guards.
