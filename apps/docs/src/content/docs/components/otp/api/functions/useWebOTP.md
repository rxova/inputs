---
editUrl: false
next: false
prev: false
title: "useWebOTP"
---

```ts
function useWebOTP(__namedParameters): void;
```

Subscribe to the WebOTP API (`navigator.credentials.get({ otp })`) — the SMS
retrieval primitive **no other OTP library ships**. Progressive enhancement,
layered on top of `autocomplete="one-time-code"`, never instead of it: where
the API is absent (everything but Android Chrome) this is a clean no-op.

Aborts the pending request on unmount *and* when `enabled` flips off, which
fixes the leaked-request / dangling-timer class of bug: a `credentials.get`
left in flight past unmount can resolve into a setState on a gone component.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `__namedParameters` | [`UseWebOTPOptions`](/components/otp/api/interfaces/usewebotpoptions/) |

## Returns

`void`
