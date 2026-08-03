---
'@rxova/react-otp-input': patch
---

Typing over a full code now works: a collapsed caret inside a complete value expands into a one-character selection over its slot (arrow keys walk it, pointer presses land it), so the next key replaces that character instead of being swallowed by `maxLength`. Keyboard focus now also parks the caret deterministically — on the first empty slot, or over the last character when the code is full — instead of wherever the browser drops it, and a disallowed key can no longer delete the character it was typed over.
