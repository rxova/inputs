---
sidebar_position: 2
sidebar_label: from react-otp-input
---

# Migrating from react-otp-input

`react-otp-input` renders **N separate `<input>`s**; `@rxova/react-otp-input` renders **one**. That single
change fixes a cluster of the N-input problems for free — but it also means the API shifts from
"configure N boxes" to "configure one field."

## Props

| react-otp-input                             | @rxova/react-otp-input                                              | Notes                                                       |
| ------------------------------------------- | ------------------------------------------------------------------- | ----------------------------------------------------------- |
| `numInputs`                                 | `length`                                                            | Number of slots                                             |
| `value` / `onChange`                        | `value` / `onChange`                                                | `onChange` emits a `string` (react-otp-input does too)      |
| `renderInput`                               | _(not needed)_                                                      | You don't render N inputs; use the compound API or `render` |
| `renderSeparator`                           | `<OtpSeparator>`                                                    | Part of the compound API                                    |
| `inputType="number" \| "tel" \| "password"` | `mode` + `mask`                                                     | `mode="numeric"`; `mask` for password style                 |
| `shouldAutoFocus`                           | `autoFocus`                                                         |                                                             |
| `skipDefaultStyles`                         | _(always headless)_                                                 | No styles to skip; use `--otp-*` tokens                     |
| `containerStyle` / `inputStyle`             | `style` / `className` + tokens                                      |                                                             |
| —                                           | `onComplete`, `webOTP`, `slotInteraction`, `invalid`, `placeholder` | New                                                         |

## Before / after

```tsx
// react-otp-input — N inputs, render each one
<OtpInput
  value={code}
  onChange={setCode}
  numInputs={6}
  renderSeparator={<span>-</span>}
  renderInput={(props) => <input {...props} />}
/>

// @rxova/react-otp-input — one field
<OtpInput length={6} value={code} onChange={setCode} label="Code" />
```

## What the single input fixes

- **SMS autofill fills the whole code**, not just the first box.
- **No per-keystroke input-type churn** — the mobile keyboard stays numeric
  ([react-otp-input #327](https://github.com/devfolioco/react-otp-input/issues/327)).
- **Backspace, arrows, Home/End, paste, and selection** are native — no hand-rolled focus juggling.
- **One accessible field**, one tab stop, one `label` — instead of six unlabelled boxes.
- **Native form submission** via `name`; no hidden concat field.

## Styling

Replace `inputStyle` / `focusStyle` with `--otp-*` tokens and the `[data-active]` / `[data-filled]`
hooks. See [Styling](../guides/styling.md) and [Theming](../recipes/theming.md).
