---
editUrl: false
next: false
prev: false
title: "RatingWarningCode"
---

```ts
type RatingWarningCode = 
  | "value-non-finite"
  | "value-negative"
  | "value-above-max"
  | "max-non-finite"
  | "max-too-small"
  | "max-non-integer";
```

Stable machine code for a coerced input. Safe to `switch` on; the human
`message` on [RatingWarning](/components/rating/api/interfaces/ratingwarning/) is for logs, this is for logic.
