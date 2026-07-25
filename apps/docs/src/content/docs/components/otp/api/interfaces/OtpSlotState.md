---
editUrl: false
next: false
prev: false
title: "OtpSlotState"
---

Per-slot state handed to `<OtpSlot>` (via context), to the `render` prop, and
returned by the hook as `slots`. The analogue of `RatingIconState` in the
sibling repo — a plain, serializable description of one slot, no handlers.

## Properties

### char

```ts
char: string | null;
```

The character in this slot, or `null` when empty. Already masked when `mask` is set.

***

### hasFakeCaret

```ts
hasFakeCaret: boolean;
```

Render the blinking caret here.

***

### index

```ts
index: number;
```

0-based position in the row.

***

### isActive

```ts
isActive: boolean;
```

The caret is at this slot, or a selection covers it.

***

### isDisabled

```ts
isDisabled: boolean;
```

***

### isFilled

```ts
isFilled: boolean;
```

`char !== null`

***

### isReadOnly

```ts
isReadOnly: boolean;
```

***

### placeholder

```ts
placeholder: string | null;
```

Placeholder char for this slot, or `null`.
