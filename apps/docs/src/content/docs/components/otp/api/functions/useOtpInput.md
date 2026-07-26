---
editUrl: false
next: false
prev: false
title: "useOtpInput"
---

```ts
function useOtpInput(options?): UseOtpInputResult;
```

The headless state machine behind every tier of `<OtpInput>`: one real input,
controlled/uncontrolled value, selection tracking, paste distribution, and
per-slot state — with prop-getters that *merge* the caller's handlers rather
than clobbering them. Budgeted at about 2 kB brotli so a custom renderer pays
only for the logic, never the default look.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `options` | [`UseOtpInputOptions`](/components/otp/api/interfaces/useotpinputoptions/) |

## Returns

[`UseOtpInputResult`](/components/otp/api/interfaces/useotpinputresult/)
