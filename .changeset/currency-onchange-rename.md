---
'@rxova/react-intl-currency-input': minor
---

**Breaking:** `onValueChange` is now `onChange`, and the native passthrough is now `onNativeChange`.

The value handler had the wrong name. Every other input in the suite emits its value through
`onChange`; this one made you learn a second name for the same idea, and reserved the obvious one
for a DOM event most consumers never touched. That is now inverted: `onChange` gives you
`(value: number | null, meta)`, and the raw `ChangeEvent` moved to `onNativeChange`.

No deprecation window — pre-1.0, the old name is removed outright rather than carried along.
TypeScript catches both halves: `onValueChange` no longer exists, and a `ChangeEventHandler` no
longer fits `onChange`. Plain-JS consumers should run the codemod:

    npx @rxova/codemod currency-onvaluechange-to-onchange ./src

It rewrites both props in one pass, on `<CurrencyInput>` elements and `useCurrencyInput` options,
imported from either `@rxova/react-intl-currency-input` or `@rxova/react-inputs`.
