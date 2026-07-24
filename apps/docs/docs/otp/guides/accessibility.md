---
sidebar_position: 4
---

# Accessibility

Because there is exactly one real `<input>`, a screen reader announces **a single "one-time code, edit
text"** — not "1 of 6" repeated six times. The painted slots are `aria-hidden` decoration.

| Aspect         | Behaviour                                                                      |
| -------------- | ------------------------------------------------------------------------------ |
| Semantics      | One native text `<input>` carries the value; slots are `aria-hidden`           |
| Naming         | `label` or `aria-label` names the field — required; no silent unlabelled input |
| Errors         | `invalid` → `aria-invalid`; `aria-describedby` points at external error text   |
| Focus          | The whole control is one tab stop; `:focus-visible` comes from the platform    |
| Keyboard       | Native: typing, backspace, delete, arrows, Home/End, shift-select, undo        |
| Reduced motion | The caret blink respects `prefers-reduced-motion` (honoured in CSS)            |

## Naming

Always pass an accessible name. In development, an unlabelled field warns in the console.

```tsx
<OtpInput length={6} label="One-time code" />
<OtpInput length={6} aria-label="SMS verification code" />
```

## Error wiring

```tsx live
function Invalid() {
  const [code, setCode] = useState('12')
  return (
    <div>
      <OtpInput
        length={6}
        value={code}
        onChange={setCode}
        invalid
        aria-describedby="err"
        label="Code"
      />
      <p id="err" style={{ color: 'crimson', fontSize: '0.9rem' }}>
        That code has expired
      </p>
    </div>
  )
}
```

## Verified, not asserted

Accessibility is checked with **axe** in CI — over the component in a real browser and over the whole
playground page (duplicate ids, orphaned `aria-describedby` targets, landmark structure) — across
Chromium, Firefox and WebKit.

## Known limitation

In `slotInteraction="spatial"` mode, iOS Safari can show a faint native `::selection` highlight. The
default auto-degrades to `"crush"` on iOS to avoid it; consumers who need a pristine iOS selection can
force `"crush"`. See [Spatial slots](./spatial-slots.md).
