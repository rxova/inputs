---
'@rxova/react-rating-input': patch
---

Ship an `llms.txt` in the package. Coding agents read `node_modules` after an install, so this puts the install line, a working example, the full prop table, the CSS custom properties and the `data-*` hooks where they will actually be found — including that omitting `onChange` is how you get a read-only score, and that `precision` is the grid the user's input snaps to, not a rounding rule applied to a value you supply.
