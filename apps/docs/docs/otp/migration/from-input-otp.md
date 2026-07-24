---
sidebar_position: 1
sidebar_label: from input-otp
---

# Migrating from input-otp

`@rxova/react-otp-input` shares input-otp's single-input architecture, so the mental model carries over — you
gain spatial tap-to-edit, WebOTP, and a form-library-friendly `onChange`.

## Props

| input-otp                     | @rxova/react-otp-input                          | Notes                                                                |
| ----------------------------- | ----------------------------------------------- | -------------------------------------------------------------------- |
| `maxLength`                   | `length`                                        | Number of slots                                                      |
| `value` / `onChange`          | `value` / `onChange`                            | Both emit a `string`                                                 |
| `onComplete`                  | `onComplete`                                    | Fires when the value fills                                           |
| `render={({ slots }) => …}`   | `render={({ slots }) => …}` or the compound API | See below                                                            |
| `containerClassName`          | `className`                                     | On the root                                                          |
| `pattern`                     | `mode` or `pattern`                             | `mode="numeric" \| "alphanumeric" \| "alpha"`, or a custom `pattern` |
| `pushPasswordManagerStrategy` | _(not needed)_                                  | No width hack; the field never shifts layout                         |
| —                             | `slotInteraction`                               | `"spatial"` (default) enables tap-to-edit                            |
| —                             | `webOTP`                                        | Opt into WebOTP SMS retrieval                                        |
| —                             | `mask`, `placeholder`, `invalid`, `label`       | First-class                                                          |

## Slots: from render prop to compound

input-otp gives you a render prop and you hand-build the slot markup (the shadcn `InputOTPSlot`
pattern). That still works here via `render`. But the grouped `123–456` layout everyone copies is now
first-party:

```tsx
// input-otp — render prop + your own slot component
<OTP maxLength={6} render={({ slots }) => (
  <>
    <div>{slots.slice(0, 3).map((s, i) => <Slot key={i} {...s} />)}</div>
    <Separator />
    <div>{slots.slice(3).map((s, i) => <Slot key={i} {...s} />)}</div>
  </>
)} />

// @rxova/react-otp-input — the compound API, shipped
<OtpInput length={6} value={code} onChange={setCode} label="Code">
  <OtpGroup><OtpSlot index={0} /><OtpSlot index={1} /><OtpSlot index={2} /></OtpGroup>
  <OtpSeparator>–</OtpSeparator>
  <OtpGroup><OtpSlot index={3} /><OtpSlot index={4} /><OtpSlot index={5} /></OtpGroup>
</OtpInput>
```

## What changes for the better

- **Tap a middle slot to edit it** — [input-otp #32](https://github.com/guilhermerodz/input-otp/issues/32);
  it's the default here.
- **No password-manager width hack** — no `pushPasswordManagerStrategy`, no layout shift.
- **`translate="no"`** — no crash on Chrome auto-translate.
- **WebOTP** — `webOTP` / `useWebOTP`.
- **Forms** — `<Controller>` and native `name` both work; `onChange` is a `string`.

## Styling

input-otp's `data-active` / `data-char` slot attributes map onto `[data-active]`, `[data-filled]`,
and `[data-state]`. There is no CSS to import — style with `--otp-*` tokens instead. See
[Styling](../guides/styling.md).
