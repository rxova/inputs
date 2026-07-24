---
sidebar_position: 2
---

import useBaseUrl from '@docusaurus/useBaseUrl';

# Codes & autofill

Receiving the code is where OTP fields quietly break. Here every path is treated as the spec.

## Paste

Paste a formatted code and the separators are stripped, the digits distributed, overflow truncated,
and any selection replaced:

<img src={useBaseUrl('/img/otp/examples/interactive-typing.gif')} alt="Typing a six-digit code" width="280" />

```tsx live
function Paste() {
  const [code, setCode] = useState('')
  return (
    <div>
      <OtpInput length={6} value={code} onChange={setCode} label="Paste 123-456" />
      <p style={{ fontSize: '0.9rem' }}>
        value = <b>{code || 'empty'}</b>
      </p>
    </div>
  )
}
```

By default `- . _` and whitespace are stripped. Override `pasteTransform` for anything else:

```tsx
<OtpInput
  length={6}
  value={code}
  onChange={setCode}
  pasteTransform={(text) => text.replace(/[^0-9]/g, '')} // keep digits only
  label="Code"
/>
```

## SMS autofill

The one real input carries `autocomplete="one-time-code"`, so iOS and Android surface the code from an
incoming SMS above the keyboard — and because there is a **single** field, the whole code fills at
once (N-input libraries famously autofill only the first box). Override the attribute if you need to:

```tsx
<OtpInput autoComplete="one-time-code" length={6} /* … */ />
```

## WebOTP (Android Chrome)

Opt into programmatic SMS retrieval — the primitive no other OTP library ships. It's layered _on top
of_ `autocomplete`, never instead of it, and no-ops everywhere the API is absent:

```tsx
<OtpInput length={6} value={code} onChange={setCode} webOTP label="Code" />
```

Full details, including the standalone [`useWebOTP`](/components/otp/webotp) hook and its
AbortController cleanup, in the WebOTP recipe.

## Masking

Render a mask instead of the value for sensitive codes:

```tsx live
function Masked() {
  const [code, setCode] = useState('1234')
  return <OtpInput length={4} value={code} onChange={setCode} mask label="PIN" />
}
```

`mask` accepts `true` (renders `•`) or a custom character (`mask="*"`).

## Garbage never crashes the page

A controlled `value` of `undefined`, a number, an over-length string, disallowed characters, or SMS
junk are all sanitized to the allowed set and clamped to `length`. A code is data; receiving it must
never throw.
