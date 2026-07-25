---
editUrl: false
next: false
prev: false
title: "CurrencyInputChange"
---

The parsed value plus the two strings that produced it, handed to
`onValueChange` so a consumer never has to re-derive them.

## Properties

### formatted

```ts
formatted: string;
```

The fully localized string the field will show when it loses focus.

***

### raw

```ts
raw: string;
```

The clean, separator-free editable string shown while focused.

***

### value

```ts
value: number | null;
```

The parsed number, or `null` when the field is empty.
