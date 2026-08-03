---
'@rxova/react-otp-input': patch
---

Clicks now land the caret in the slot that was actually pressed, everywhere in the slot. The browser's own click-to-caret mapping broke down at the edges: a press on a slot's top or bottom border fell outside the invisible text's line box and mapped to the first slot, a full field scrolls by the trailing letter-spacing and shifted edge clicks into the next slot, and a separator pushed the second group off the uniform glyph pitch. The caret is now placed geometrically from the pressed point against the rendered slot rects, settling a frame after the click so Chrome's late selection collapse (which fires no `select` event) can't undo it.
