---
'@rxova/react-inputs': patch
---

Ship an `llms.txt` in the package, pointing at each component's own. Coding agents read `node_modules` after an install, so this is where to say that the meta-package and the individual packages are equivalent under `sideEffects: false`, and that the three components deliberately do not share a value convention — `number | null`, `number` and `string` respectively.
