---
sidebar_position: 1
sidebar_label: Getting started
---

# @rxova/react-otp-input

**A headless, accessible one-time-code input for React.** One real `<input>` underneath, real slots
painted on top — so paste, SMS autofill, IME and native form submission come from the platform, and
you can **tap any slot to edit it**, the one thing the incumbent can't do.

## Try it

Type a code, paste `123-456`, or click a middle slot to edit it. It renders and runs right here
(`OtpInput` and `useState` are already in scope).

```tsx live
function TryIt() {
  const [code, setCode] = useState('')
  const [done, setDone] = useState(null)
  return (
    <div>
      <div style={{ fontSize: '1.25rem' }}>
        <OtpInput
          length={6}
          value={code}
          onChange={setCode}
          onComplete={setDone}
          label="Try @rxova/react-otp-input"
        />
      </div>
      <p style={{ margin: '0.75rem 0 0', color: 'var(--ifm-color-emphasis-700)' }}>
        value = <b>{code || 'empty'}</b>
        {done ? ` — completed: ${done}` : ' — type, paste “123-456”, or tap a middle slot'}
      </p>
    </div>
  )
}
```

## Install

```bash
pnpm add @rxova/react-otp-input     # or: npm i / yarn add / bun add
```

`react` (>= 18) is the only peer dependency — nothing else to install, and no stylesheet to import.
Then it is one import: `import { OtpInput } from '@rxova/react-otp-input'`.

```tsx
import { OtpInput } from '@rxova/react-otp-input'

const [code, setCode] = useState('')

<OtpInput length={6} value={code} onChange={setCode} onComplete={verify} label="One-time code" />
```

## Why this one, not another OTP field

- **One real input.** Paste, SMS autofill (`autocomplete="one-time-code"`), IME, undo, and native
  `<form>` submission all come from the platform, not from hand-rolled JavaScript across N inputs.
- **Tap any slot to edit it.** The input's characters sit at their true slot pitch, so a click or tap
  lands the caret where you touched — which a collapsed single-input field physically can't do.
- **WebOTP** — programmatic SMS retrieval ([`useWebOTP`](../recipes/webotp.md)) that no other OTP
  library ships.
- **Headless** — zero runtime dependencies, no stylesheet, ~3.6 kB brotli, styled entirely with
  `--otp-*` tokens and `data-*` hooks.
- **Correct on the seams** — formatted paste, Chrome auto-translate, RTL, alphanumeric, SSR/RSC, and
  a `string` `onChange` that pairs cleanly with every form library.

More on the architecture and its one honest tradeoff in [Why this exists](./why.md).

## Into a form in one line

`onChange` emits the sanitized **`string`**, and the underlying input posts natively under `name`:

[React Hook Form](../recipes/react-hook-form.md) · [Formik](../recipes/formik.md) ·
[React Final Form](../recipes/react-final-form.md) · [TanStack Form](../recipes/tanstack-form.md) ·
[plain `<form>`](../recipes/native-forms.md)

## Next

- [Spatial slots](../guides/spatial-slots.md) — tap-to-edit and the iOS tradeoff
- [Codes & autofill](../guides/codes-and-autofill.md) — paste, SMS, and WebOTP
- [Accessibility](../guides/accessibility.md) · [Styling](../guides/styling.md) · [Forms](../guides/forms.md)
- [Migrating](../migration/from-input-otp.md) from another OTP library
- [API reference](/otp/api) — generated from the source on every build
