---
editUrl: false
next: false
prev: false
title: "UseOtpInputOptions"
---

## Properties

### aria-describedby?

```ts
optional aria-describedby?: string;
```

***

### aria-label?

```ts
optional aria-label?: string;
```

***

### autoComplete?

```ts
optional autoComplete?: string;
```

***

### autoFocus?

```ts
optional autoFocus?: boolean;
```

***

### blurOnComplete?

```ts
optional blurOnComplete?: boolean;
```

***

### defaultValue?

```ts
optional defaultValue?: string;
```

***

### dir?

```ts
optional dir?: "ltr" | "rtl";
```

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

***

### inputRef?

```ts
optional inputRef?: Ref<HTMLInputElement>;
```

***

### invalid?

```ts
optional invalid?: boolean;
```

***

### label?

```ts
optional label?: string;
```

***

### length?

```ts
optional length?: number;
```

***

### mask?

```ts
optional mask?: string | boolean;
```

***

### mode?

```ts
optional mode?: OtpMode;
```

***

### name?

```ts
optional name?: string;
```

***

### onBlur?

```ts
optional onBlur?: (event) => void;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `event` | `FocusEvent`\<`HTMLInputElement`\> |

#### Returns

`void`

***

### onChange?

```ts
optional onChange?: (value) => void;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `string` |

#### Returns

`void`

***

### onComplete?

```ts
optional onComplete?: (value) => void;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `string` |

#### Returns

`void`

***

### pasteTransform?

```ts
optional pasteTransform?: (pasted) => string;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `pasted` | `string` |

#### Returns

`string`

***

### pattern?

```ts
optional pattern?: string | RegExp;
```

***

### placeholder?

```ts
optional placeholder?: string;
```

***

### readOnly?

```ts
optional readOnly?: boolean;
```

***

### required?

```ts
optional required?: boolean;
```

***

### transform?

```ts
optional transform?: (value) => string;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `string` |

#### Returns

`string`

***

### value?

```ts
optional value?: string;
```
