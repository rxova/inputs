---
'@rxova/react-intl-currency-input': minor
---

Add `onValueChange` as a deprecated compatibility alias for the value-first `onChange` API introduced
in 0.2.0. Both handlers fire when supplied, and development builds warn once so consumers can migrate
incrementally with `npx @rxova/codemod currency-on-change`.
