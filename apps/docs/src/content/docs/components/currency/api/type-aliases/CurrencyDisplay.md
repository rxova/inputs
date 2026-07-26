---
editUrl: false
next: false
prev: false
title: "CurrencyDisplay"
---

```ts
type CurrencyDisplay = "symbol" | "narrowSymbol" | "code" | "name";
```

How the currency is shown. Passed straight to `Intl.NumberFormat`'s
`currencyDisplay`. `'symbol'` → `€`, `'narrowSymbol'` → `$` even in locales
that would say `US$`, `'code'` → `EUR`, `'name'` → `euros`.
