---
editUrl: false
next: false
prev: false
title: "UseCurrencyInputResult"
---

Return value of [useCurrencyInput](/components/currency/api/functions/usecurrencyinput/).

## Properties

### currencySymbol

```ts
currencySymbol: string;
```

The resolved currency symbol/code/name for the chosen `currencyDisplay`.

***

### decimalSeparator

```ts
decimalSeparator: string;
```

The locale's decimal separator (e.g. `','` in de-DE).

***

### display

```ts
display: string;
```

The string the input is currently displaying.

***

### focused

```ts
focused: boolean;
```

`true` while the field is focused (showing the editable number).

***

### format

```ts
format: (value) => string;
```

Format a number the way this field would.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `number` \| `null` |

#### Returns

`string`

***

### groupSeparator

```ts
groupSeparator: string;
```

The locale's group separator (may be a non-breaking space, or `''`).

***

### inputProps

```ts
inputProps: CurrencyInputElementProps;
```

Spread these onto an `<input>`; the hook owns its value and events.

***

### parse

```ts
parse: (input) => number | null;
```

Parse a string the way this field would.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `input` | `string` |

#### Returns

`number` \| `null`

***

### ref

```ts
ref: object;
```

Attach to the underlying `<input>`. Required in `'live'` mode so the hook
can keep the caret in place while it reformats; harmless otherwise.

Typed as a plain writable ref object rather than `RefObject`/`MutableRefObject`
so it works across React 18 and 19: React 18's `RefObject.current` is
readonly (breaks the internal bridge assignment) and React 19 deprecates
`MutableRefObject`. A bare `{ current }` is writable and current on both.

#### current

```ts
current: HTMLInputElement | null;
```

***

### setValue

```ts
setValue: (value) => void;
```

Imperatively set the value — e.g. on a form reset.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `number` \| `null` |

#### Returns

`void`

***

### value

```ts
value: number | null;
```

The current parsed value.
