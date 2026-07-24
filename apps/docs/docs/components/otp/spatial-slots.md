---
sidebar_position: 1
---

import useBaseUrl from '@docusaurus/useBaseUrl';

# Spatial slots

The flagship. Because the real input's characters sit at their true slot pitch, a click or tap lands
the caret on the slot under your finger — so you can **edit any slot, not just the last one**.

<img src={useBaseUrl('/img/otp/examples/interactive-tap-edit.gif')} alt="Tapping a middle slot to edit it in place" width="280" />

Try it — type a code, then click the third box and retype it:

```tsx live
function Spatial() {
  const [code, setCode] = useState('482913')
  return <OtpInput length={6} value={code} onChange={setCode} label="Editable code" />
}
```

This is what a collapsed single-input field can't do: crushing the input to a ~1 px column means a
click has no character to land on, so the caret only moves by arrow key.

## `slotInteraction`

| Value                   | Behaviour                                                                             |
| ----------------------- | ------------------------------------------------------------------------------------- |
| `"spatial"` _(default)_ | Tap any slot to edit it. **Auto-degrades to `"crush"` on iOS.**                       |
| `"crush"`               | The collapsed-input technique everywhere. Tap-to-edit falls back to keyboard + caret. |

```tsx
<OtpInput length={6} value={code} onChange={setCode} label="Code" />                       // spatial (default)
<OtpInput length={6} value={code} onChange={setCode} label="Code" slotInteraction="crush" />
```

## The iOS tradeoff

iOS Safari cannot fully style `::selection` to transparent, so a real selection spanning slots can
show a faint native highlight. The default therefore **feature-detects iOS and silently falls back to
`"crush"` there** — tap-to-edit stays keyboard-plus-caret on iOS, full spatial everywhere else.

- Keep `"spatial"` explicitly to force spatial on iOS and accept the highlight.
- Use `"crush"` to force the collapsed-input behaviour on every platform.

The escape hatch is one prop, not a fork. It's the same kind of documented, chosen default as any
platform limitation — surfaced here rather than hidden.

## How it works

The input overlays the whole row with transparent text and a transparent caret. A layout effect
measures the rendered slot width and gap, then sets the input's `letter-spacing` and `text-indent` so
each glyph centres in its slot. Everything visible — the characters and the blinking caret — is
painted per slot from the input's live selection state.
