---
editUrl: false
next: false
prev: false
title: "RatingWarning"
---

Emitted when the component keeps itself functional by coercing an
out-of-range prop — a `value` above `max`, a negative or non-finite `value`,
or a `max` that is not a positive integer. The coerced result (`used`) is
what actually renders; the warning is a development-only heads-up that the
input was off, never an error.

## Properties

### code

```ts
code: RatingWarningCode;
```

***

### message

```ts
message: string;
```

Human-readable explanation, safe to log as-is.

***

### prop

```ts
prop: "value" | "defaultValue" | "max";
```

The prop that carried the offending value.

***

### received

```ts
received: number;
```

The value as received, before coercion.

***

### used

```ts
used: number;
```

The value actually used after coercion — what gets painted.
