---
editUrl: false
next: false
prev: false
title: "CurrencyInput"
---

```ts
const CurrencyInput: ForwardRefExoticComponent<CurrencyInputProps & RefAttributes<HTMLInputElement>>;
```

A localized currency `<input>`. By default it formats as you type
(`formatMode="live"`) with a stable caret; `formatMode="blur"` shows a plain
number while focused instead. Emits a `number` (or `null`) through
`onValueChange`.

`ref` forwards to the underlying `<input>`. React 19 passes `ref` as a normal
prop; `forwardRef` keeps the React 18 peer working.
