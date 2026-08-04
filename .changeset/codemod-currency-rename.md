---
'@rxova/codemod': minor
---

New transform: `currency-onvaluechange-to-onchange`.

Migrates `@rxova/react-intl-currency-input` 0.1.x to 0.2.0 — `onValueChange` becomes `onChange` and
the old native `onChange` becomes `onNativeChange`, renamed simultaneously so the two never collide.
It follows import aliases, covers both the component and the hook's options object, and leaves
`onChange` on unrelated elements alone. Files where the props arrive through a spread get a `TODO`
banner rather than a silent partial rewrite.
