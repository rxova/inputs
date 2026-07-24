---
sidebar_position: 8
sidebar_label: WebOTP
---

# WebOTP

Programmatic SMS retrieval on Android Chrome — the primitive no other OTP library ships. It is
**progressive enhancement**, layered on top of `autocomplete="one-time-code"`, never instead of it,
and a clean no-op everywhere the API is absent.

## On the component

```tsx
<OtpInput length={6} value={code} onChange={setCode} webOTP label="Code" />
```

When the field mounts, it calls `navigator.credentials.get({ otp: { transport: ['sms'] } })`. If the
user grants an incoming code, it fills the whole field at once.

## The standalone hook

Use `useWebOTP` to drive any target — including a custom [headless](/components/otp/custom-slots) render:

```tsx
import { useOtpInput, useWebOTP } from '@rxova/react-otp-input'

function Field() {
  const otp = useOtpInput({ length: 6 })
  useWebOTP({ enabled: true, onReceive: otp.setValue })
  // …render with otp's prop-getters…
}
```

## Cleanup is handled

The request is aborted on unmount **and** when `enabled` flips off — the fix for the leaked-request /
dangling-timer class of bug (a `credentials.get` left in flight past unmount resolving into a
setState on a gone component). Pass your own `signal` to cancel it too:

```tsx
useWebOTP({ enabled, onReceive, signal: controller.signal })
```

It only ever runs where `'OTPCredential' in window` — so on iOS, desktop, and non-Chrome Android it
simply does nothing, and your `autocomplete` suggestion still works.
