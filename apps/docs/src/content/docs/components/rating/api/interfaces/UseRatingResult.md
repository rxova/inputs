---
editUrl: false
next: false
prev: false
title: "UseRatingResult"
---

## Properties

### baseId

```ts
baseId: string;
```

***

### canChange

```ts
canChange: boolean;
```

True when the control will actually accept input (interactive and not disabled).

***

### commit

```ts
commit: (next) => void;
```

Commit a value verbatim (keyboard entry).

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `next` | `number` |

#### Returns

`void`

***

### disabled

```ts
disabled: boolean;
```

***

### displayValue

```ts
displayValue: number;
```

What should be painted right now — the hover preview if any, else `value`.

***

### fills

```ts
fills: number[];
```

Per-icon fill ratios for `displayValue`.

***

### focusedValue

```ts
focusedValue: number | null;
```

***

### handleBlur

```ts
handleBlur: (event) => void;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `event` | `FocusEvent`\<`HTMLElement`\> |

#### Returns

`void`

***

### hoverValue

```ts
hoverValue: number | null;
```

***

### interactive

```ts
interactive: boolean;
```

True when the component renders as a control rather than an image.

***

### max

```ts
max: number;
```

Icon count after normalization.

***

### name

```ts
name: string;
```

***

### rootRef

```ts
rootRef: object;
```

Structural rather than `RefObject`: in @types/react 18 `RefObject.current`
is readonly, in 19 it is mutable. Declaring the shape keeps this assignable
under both, which matters because `react >= 18` is a peer.

#### current

```ts
current: HTMLSpanElement | null;
```

***

### select

```ts
select: (next) => void;
```

Pointer semantics: re-selecting the current value clears it.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `next` | `number` |

#### Returns

`void`

***

### setFocused

```ts
setFocused: (next) => void;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `next` | `number` \| `null` |

#### Returns

`void`

***

### setHover

```ts
setHover: (next) => void;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `next` | `number` \| `null` |

#### Returns

`void`

***

### steps

```ts
steps: number[];
```

Selectable grid values.

***

### value

```ts
value: number;
```

The committed score, clamped and snapped.
