---
editUrl: false
next: false
prev: false
title: "UseOtpInputResult"
---

## Properties

### baseId

```ts
baseId: string;
```

Base id; slots derive `${baseId}-slot-0`, ...

***

### clear

```ts
clear: () => void;
```

Reset to empty and refocus.

#### Returns

`void`

***

### focus

```ts
focus: () => void;
```

Focus the underlying input.

#### Returns

`void`

***

### getContainerProps

```ts
getContainerProps: (props?) => HTMLAttributes<HTMLDivElement>;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `props?` | `HTMLAttributes`\<`HTMLDivElement`\> |

#### Returns

`HTMLAttributes`\<`HTMLDivElement`\>

***

### getInputProps

```ts
getInputProps: (props?) => InputHTMLAttributes<HTMLInputElement> & object;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `props?` | `InputHTMLAttributes`\<`HTMLInputElement`\> |

#### Returns

`InputHTMLAttributes`\<`HTMLInputElement`\> & `object`

***

### getSlotProps

```ts
getSlotProps: (index, props?) => HTMLAttributes<HTMLDivElement>;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `index` | `number` |
| `props?` | `HTMLAttributes`\<`HTMLDivElement`\> |

#### Returns

`HTMLAttributes`\<`HTMLDivElement`\>

***

### inputRef

```ts
inputRef: object;
```

Structural rather than `RefObject`: in @types/react 18 `RefObject.current`
is readonly, in 19 it is mutable. Declaring the shape keeps this assignable
under both, which matters because `react >= 18` is the peer.

#### current

```ts
current: HTMLInputElement | null;
```

***

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

The underlying input holds focus.

***

### length

```ts
length: number;
```

Slot count after normalization.

***

### setValue

```ts
setValue: (value) => void;
```

Commit a value programmatically (sanitized like any other input). Used by WebOTP autofill.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `string` |

#### Returns

`void`

***

### slots

```ts
slots: OtpSlotState[];
```

Per-slot state, in order.

***

### value

```ts
value: string;
```

The current sanitized value.
