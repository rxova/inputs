---
'@rxova/react-otp-input': patch
---

Focusing the field with a pointer press no longer flashes a stale slot active before the pressed one: the focus state now commits after the browser has placed the caret, in a single render.
