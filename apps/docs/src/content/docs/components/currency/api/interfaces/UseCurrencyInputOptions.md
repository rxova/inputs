---
editUrl: false
next: false
prev: false
title: "UseCurrencyInputOptions"
---

Options for [useCurrencyInput](/components/currency/api/functions/usecurrencyinput/).

## Extends

- [`CurrencyInputBaseOptions`](/components/currency/api/interfaces/currencyinputbaseoptions/)

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

#### Inherited from

[`CurrencyInputBaseOptions`](/components/currency/api/interfaces/currencyinputbaseoptions/).[`allowNegative`](/components/currency/api/interfaces/currencyinputbaseoptions/#allownegative)

***

### country?

```ts
optional country?: string;
```

Convenience: combined into `${language}-${country}` when `locale` is absent.

#### Inherited from

[`CurrencyInputBaseOptions`](/components/currency/api/interfaces/currencyinputbaseoptions/).[`country`](/components/currency/api/interfaces/currencyinputbaseoptions/#country)

***

### currency

```ts
currency: string;
```

ISO-4217 currency code, e.g. `'EUR'`, `'BGN'`, `'JPY'`. Required.

#### Inherited from

[`CurrencyInputBaseOptions`](/components/currency/api/interfaces/currencyinputbaseoptions/).[`currency`](/components/currency/api/interfaces/currencyinputbaseoptions/#currency)

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

#### Inherited from

[`CurrencyInputBaseOptions`](/components/currency/api/interfaces/currencyinputbaseoptions/).[`currencyDisplay`](/components/currency/api/interfaces/currencyinputbaseoptions/#currencydisplay)

***

### defaultValue?

```ts
optional defaultValue?: number | null;
```

Uncontrolled initial amount. Ignored once `value` is provided.

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

#### Inherited from

[`CurrencyInputBaseOptions`](/components/currency/api/interfaces/currencyinputbaseoptions/).[`formatMode`](/components/currency/api/interfaces/currencyinputbaseoptions/#formatmode)

***

### language?

```ts
optional language?: string;
```

Convenience: combined into `${language}-${country}` when `locale` is absent.

#### Inherited from

[`CurrencyInputBaseOptions`](/components/currency/api/interfaces/currencyinputbaseoptions/).[`language`](/components/currency/api/interfaces/currencyinputbaseoptions/#language)

***

### locale?

```ts
optional locale?: string;
```

BCP-47 locale, e.g. `'bg-BG'`. Takes precedence over `language`/`country`.
When all three are omitted the runtime default locale is used.

#### Inherited from

[`CurrencyInputBaseOptions`](/components/currency/api/interfaces/currencyinputbaseoptions/).[`locale`](/components/currency/api/interfaces/currencyinputbaseoptions/#locale)

***

### maximumFractionDigits?

```ts
optional maximumFractionDigits?: number;
```

Cap on fraction digits. Defaults to the currency's own default
(JPY → 0, EUR → 2, KWD → 3).

#### Inherited from

[`CurrencyInputBaseOptions`](/components/currency/api/interfaces/currencyinputbaseoptions/).[`maximumFractionDigits`](/components/currency/api/interfaces/currencyinputbaseoptions/#maximumfractiondigits)

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

#### Inherited from

[`CurrencyInputBaseOptions`](/components/currency/api/interfaces/currencyinputbaseoptions/).[`minimumFractionDigits`](/components/currency/api/interfaces/currencyinputbaseoptions/#minimumfractiondigits)

***

### numberingSystem?

```ts
optional numberingSystem?: string;
```

Override the numbering system, e.g. `'latn'` to force ASCII digits.

#### Inherited from

[`CurrencyInputBaseOptions`](/components/currency/api/interfaces/currencyinputbaseoptions/).[`numberingSystem`](/components/currency/api/interfaces/currencyinputbaseoptions/#numberingsystem)

***

### onValueChange?

```ts
optional onValueChange?: (value, meta) => void;
```

Fires on every accepted keystroke with the parsed number (or `null`).

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `number` \| `null` |
| `meta` | [`CurrencyInputChange`](/components/currency/api/interfaces/currencyinputchange/) |

#### Returns

`void`

***

### step?

```ts
optional step?: number;
```

Amount added/subtracted by ArrowUp/ArrowDown. Omit to leave arrow keys
untouched. The result is rounded to the currency's fraction precision.

#### Inherited from

[`CurrencyInputBaseOptions`](/components/currency/api/interfaces/currencyinputbaseoptions/).[`step`](/components/currency/api/interfaces/currencyinputbaseoptions/#step)

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

#### Inherited from

[`CurrencyInputBaseOptions`](/components/currency/api/interfaces/currencyinputbaseoptions/).[`transformRawValue`](/components/currency/api/interfaces/currencyinputbaseoptions/#transformrawvalue)

***

### value?

```ts
optional value?: number | null;
```

Controlled amount. `null`/`undefined` render an empty field, not `"0"`.
