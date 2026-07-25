---
editUrl: false
next: false
prev: false
title: "OtpRenderContext"
---

Context passed to the Tier-3 `render` prop.

## Properties

### isComplete

```ts
isComplete: boolean;
```

`value.length === length`.

***

### isFocused

```ts
isFocused: boolean;
```

The underlying input currently holds focus.

***

### slots

```ts
slots: OtpSlotState[];
```

One entry per slot, in order.

***

### value

```ts
value: string;
```

The current sanitized value.
