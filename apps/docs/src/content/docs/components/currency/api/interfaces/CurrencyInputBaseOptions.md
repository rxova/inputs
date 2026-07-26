---
editUrl: false
next: false
prev: false
title: "CurrencyInputBaseOptions"
---

Configuration shared by the hook and the component.

## Extended by

- [`CurrencyInputProps`](/components/currency/api/interfaces/currencyinputprops/)
- [`UseCurrencyInputOptions`](/components/currency/api/interfaces/usecurrencyinputoptions/)

## Properties

### allowNegative?

```ts
optional allowNegative?: boolean;
```

Allow negative amounts (refunds, adjustments).

#### Default

```ts
false
```

***

### country?

```ts
optional country?: string;
```

Convenience: combined into `${language}-${country}` when `locale` is absent.

***

### currency

```ts
currency: string;
```

ISO-4217 currency code, e.g. `'EUR'`, `'BGN'`, `'JPY'`. Required.

***

### currencyDisplay?

```ts
optional currencyDisplay?: CurrencyDisplay;
```

How the currency is displayed.

#### Default

```ts
'symbol'
```

***

### formatMode?

```ts
optional formatMode?: FormatMode;
```

When the field formats. `'live'` (default) formats as you type with a
stable caret; `'blur'` shows a plain number while focused.

#### Default

```ts
'live'
```

***

### language?

```ts
optional language?: string;
```

Convenience: combined into `${language}-${country}` when `locale` is absent.

***

### locale?

```ts
optional locale?: string;
```

BCP-47 locale, e.g. `'bg-BG'`. Takes precedence over `language`/`country`.
When all three are omitted the runtime default locale is used.

***

### maximumFractionDigits?

```ts
optional maximumFractionDigits?: number;
```

Cap on fraction digits. Defaults to the currency's own default
(JPY → 0, EUR → 2, KWD → 3).

***

### minimumFractionDigits?

```ts
optional minimumFractionDigits?: number;
```

Floor on fraction digits in the formatted value.

#### Default

```ts
0
```

***

### numberingSystem?

```ts
optional numberingSystem?: string;
```

Override the numbering system, e.g. `'latn'` to force ASCII digits.

***

### step?

```ts
optional step?: number;
```

Amount added/subtracted by ArrowUp/ArrowDown. Omit to leave arrow keys
untouched. The result is rounded to the currency's fraction precision.

***

### transformRawValue?

```ts
optional transformRawValue?: (raw) => string;
```

Transform browser input before locale-aware sanitization.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `raw` | `string` |

#### Returns

`string`
