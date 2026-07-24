---
sidebar_position: 5
---

# Styling

No stylesheet to import. Only layout-critical CSS is inlined; everything visual is a `--otp-*` custom
property or a `data-*` hook — both covered by semver.

## Custom properties

Set them on `[data-otp-root]` or any ancestor:

```css
[data-otp-root] {
  --otp-slot-size: 2.5rem;
  --otp-gap: 0.5rem;
  --otp-radius: 0.5rem;
  --otp-border: 1px solid #d4d4d8;
  --otp-color: inherit;
  --otp-bg: transparent;
  --otp-font-size: 1.125rem;
  --otp-caret-color: currentColor;
  --otp-active-ring: 2px solid Highlight;
}
```

Try it — everything below is just tokens:

```tsx live
function Themed() {
  const [code, setCode] = useState('123')
  return (
    <div
      style={{
        '--otp-slot-size': '3rem',
        '--otp-radius': '0.9rem',
        '--otp-gap': '0.4rem',
        '--otp-border': '2px solid #5a45d6',
        '--otp-active-ring': '3px solid #f5a623',
        '--otp-font-size': '1.4rem',
      }}
    >
      <OtpInput length={6} value={code} onChange={setCode} label="Themed code" />
    </div>
  )
}
```

## Stable `data-*` hooks

All covered by semver:

- Structure: `[data-otp-root]`, `[data-otp-input]`, `[data-otp-slot]`, `[data-otp-group]`,
  `[data-otp-separator]`, `[data-otp-caret]`
- Per-slot state: `[data-state="filled" | "active" | "empty"]`, plus `[data-active]`, `[data-filled]`,
  `[data-disabled]`, `[data-readonly]`, `[data-invalid]`

```css
[data-otp-slot][data-active] {
  border-color: var(--otp-active-color, #5a45d6);
}
[data-otp-root][data-invalid] [data-otp-slot] {
  border-color: #c0392b;
}
```

## CSP

The only injected style is the caret-blink keyframes. Pass a `nonce` and it lands on that
`<style>` element:

```tsx
<OtpInput length={6} nonce={cspNonce} label="Code" />
```

For full control over the markup, drop to the [`useOtpInput` hook](../recipes/custom-slots.md).
