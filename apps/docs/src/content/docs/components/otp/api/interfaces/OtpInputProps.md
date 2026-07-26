---
editUrl: false
next: false
prev: false
title: "OtpInputProps"
---

## Properties

### aria-describedby?

```ts
optional aria-describedby?: string;
```

id(s) of external error/help text.

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

The attribute that unlocks iOS/Android SMS suggestions.

#### Default

```ts
'one-time-code'
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

Blur the input once complete (dismisses the mobile keyboard).

#### Default

```ts
false
```

***

### children?

```ts
optional children?: ReactNode;
```

***

### className?

```ts
optional className?: string;
```

***

### defaultValue?

```ts
optional defaultValue?: string;
```

Uncontrolled initial value. Ignored when `value` is provided.

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

Base id; slots derive `${id}-slot-0`, ...

***

### inputRef?

```ts
optional inputRef?: Ref<HTMLInputElement>;
```

Ref to the underlying `<input>`.

***

### invalid?

```ts
optional invalid?: boolean;
```

Sets `aria-invalid` and `data-invalid`.

***

### label?

```ts
optional label?: string;
```

Accessible name for the field.

***

### length?

```ts
optional length?: number;
```

Number of slots. Positive integer.

#### Default

```ts
6
```

***

### mask?

```ts
optional mask?: string | boolean;
```

Render a mask char instead of the value (sensitive codes). `true` -> '•'.

***

### mode?

```ts
optional mode?: OtpMode;
```

Drives inputMode, pattern, autoCapitalize.

#### Default

```ts
'numeric'
```

***

### name?

```ts
optional name?: string;
```

Posts natively in a `<form>` and is the name RHF/Formik bind to.

***

### nonce?

```ts
optional nonce?: string;
```

CSP nonce applied to any injected style.

***

### onBlur?

```ts
optional onBlur?: (event) => void;
```

Fires when focus leaves the whole control, never between slots.

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

Emits the sanitized **string** (not an event).

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

Fires once the value reaches `length`. The only completion hook — the
library never calls `form.requestSubmit()` for you; wire submit/verify here.

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

Clean pasted text before distributing.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `pasted` | `string` |

#### Returns

`string`

#### Default

strips whitespace and `- . _` separators

***

### pattern?

```ts
optional pattern?: string | RegExp;
```

Override the allowed-character test (per char). Beats `mode` when set.

***

### placeholder?

```ts
optional placeholder?: string;
```

Per-slot placeholder shown while empty.

***

### readOnly?

```ts
optional readOnly?: boolean;
```

***

### render?

```ts
optional render?: (ctx) => ReactNode;
```

Tier 3 escape hatch. Ignored when children are provided.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `ctx` | [`OtpRenderContext`](/components/otp/api/interfaces/otprendercontext/) |

#### Returns

`ReactNode`

***

### required?

```ts
optional required?: boolean;
```

***

### slotInteraction?

```ts
optional slotInteraction?: OtpSlotInteraction;
```

'spatial' = tap any slot to edit it (auto-degrades to 'crush' on iOS, which
cannot fully hide `::selection`); 'crush' = collapsed-input behaviour everywhere.

#### Default

```ts
'spatial'
```

***

### style?

```ts
optional style?: CSSProperties;
```

***

### transform?

```ts
optional transform?: (value) => string;
```

Normalize each committed value (e.g. `s => s.toUpperCase()`). Applied after `pattern`.

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

Controlled value. Sanitized to allowed chars and clamped to `length`; never throws.

***

### webOTP?

```ts
optional webOTP?: boolean;
```

Opt into the WebOTP API (Android Chrome): programmatic SMS retrieval +
AbortController cleanup. Layered on top of `autocomplete`, never instead of
it.

#### Default

```ts
false
```
