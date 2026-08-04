---
'@rxova/react-intl-currency-input': patch
---

Ship an `llms.txt` in the package. Coding agents read `node_modules` after an install, so this puts the install line, a working example and the full prop table where they will actually be found — including that the amount comes from `onValueChange` rather than `event.target.value` (which is localized), that an empty field is `null` and not `0`, and that the hook's `ref` is what keeps the caret in place in `'live'` mode.
