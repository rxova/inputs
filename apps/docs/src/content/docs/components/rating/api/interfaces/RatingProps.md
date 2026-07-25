---
editUrl: false
next: false
prev: false
title: "RatingProps"
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

### aria-describedby?

```ts
optional aria-describedby?: string;
```

ids of external error/help text.

***

### className?

```ts
optional className?: string;
```

***

### defaultValue?

```ts
optional defaultValue?: number;
```

Uncontrolled initial score. Ignored when `value` is provided.

***

### dir?

```ts
optional dir?: "ltr" | "rtl";
```

Flips the fill origin.

#### Default

```ts
inherited from the DOM
```

***

### disabled?

```ts
optional disabled?: boolean;
```

***

### emptyIcon?

```ts
optional emptyIcon?: RatingIcon;
```

Empty/track icon.

#### Default

same as `icon`, dimmed via `--rfs-empty-filter`

***

### formatLabel?

```ts
optional formatLabel?: (value, max) => string;
```

Formats the default accessible name.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `number` |
| `max` | `number` |

#### Returns

`string`

#### Default

`${value} out of ${max}`

***

### formatOptionLabel?

```ts
optional formatOptionLabel?: (value, max) => string;
```

Accessible name for one option, e.g. for `aria-label` on each radio.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `number` |
| `max` | `number` |

#### Returns

`string`

***

### icon?

```ts
optional icon?: RatingIcon;
```

Filled icon. A function receives per-icon state.

#### Default

```ts
a built-in star
```

***

### id?

```ts
optional id?: string;
```

Base id; option inputs derive `${id}-1`, `${id}-2`, ...

***

### invalid?

```ts
optional invalid?: boolean;
```

Sets `aria-invalid` and `data-invalid` on the group.

***

### label?

```ts
optional label?: string;
```

Accessible name for the group.

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

Called in development whenever a prop is coerced to keep the component
functional — see [RatingWarning](/components/rating/api/interfaces/ratingwarning/). The coerced result still renders,
so this never changes what the user sees; it only surfaces the mistake.
When omitted, the same warnings go to `console.warn`. The entire path is
stripped from production builds, so this is a no-op there.

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

### required?

```ts
optional required?: boolean;
```

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

### style?

```ts
optional style?: CSSProperties;
```

***

### value?

```ts
optional value?: number;
```

Controlled score. Clamped to [0, max]; NaN/Infinity become 0.
