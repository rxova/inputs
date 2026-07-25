---
editUrl: false
next: false
prev: false
title: "UseRatingOptions"
---

## Properties

### allowClear?

```ts
optional allowClear?: boolean;
```

Re-selecting the current value clears to 0.

#### Default

```ts
true when interactive
```

***

### defaultValue?

```ts
optional defaultValue?: number;
```

Uncontrolled initial score. Ignored when `value` is provided.

***

### disabled?

```ts
optional disabled?: boolean;
```

***

### id?

```ts
optional id?: string;
```

Base id; option inputs derive `${id}-1`, `${id}-2`, ...

***

### max?

```ts
optional max?: number;
```

Number of icons rendered. Positive integer.

#### Default

```ts
5
```

***

### name?

```ts
optional name?: string;
```

Radio group name; also emits a value readable by a native `<form>`.

***

### onBlur?

```ts
optional onBlur?: (event) => void;
```

Fires when focus leaves the whole group, not when moving between icons.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `event` | `FocusEvent`\<`HTMLElement`\> |

#### Returns

`void`

***

### onChange?

```ts
optional onChange?: (value) => void;
```

Providing this makes the component interactive.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `number` |

#### Returns

`void`

***

### onHoverChange?

```ts
optional onHoverChange?: (value) => void;
```

Hover/keyboard preview; `null` when the preview ends.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `number` \| `null` |

#### Returns

`void`

***

### onWarn?

```ts
optional onWarn?: (warning) => void;
```

Callback invoked when a warning is emitted.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `warning` | [`RatingWarning`](/components/rating/api/interfaces/ratingwarning/) |

#### Returns

`void`

***

### precision?

```ts
optional precision?: number;
```

Quantization grid: 1 = whole icons, 0.5 = halves, 0 = continuous.

#### Default

```ts
0
```

***

### readOnly?

```ts
optional readOnly?: boolean;
```

Force read-only even when `onChange` is present.

#### Default

`!onChange`

***

### rounding?

```ts
optional rounding?: RatingRounding;
```

Direction of the snap onto the grid.

#### Default

```ts
'nearest'
```

***

### value?

```ts
optional value?: number;
```

Controlled score. Clamped to [0, max]; NaN/Infinity become 0.
