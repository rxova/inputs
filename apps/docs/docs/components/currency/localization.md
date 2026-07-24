---
sidebar_position: 1
sidebar_label: Localization
---

# Localization

The whole point of the library. You pass a `locale` and a `currency`; everything else — separators,
symbol placement, fraction digits, grouping rules, digits — is read from `Intl.NumberFormat`.

## Locale and currency

```tsx live
function Demo() {
  const [locale, setLocale] = React.useState('bg-BG')
  const [currency, setCurrency] = React.useState('EUR')
  const [value, setValue] = React.useState(1234567.89)
  return (
    <div>
      <label>
        Locale{' '}
        <select value={locale} onChange={(e) => setLocale(e.target.value)}>
          {['bg-BG', 'de-DE', 'fr-FR', 'en-US', 'hi-IN', 'ja-JP', 'ar-EG', 'de-CH'].map((l) => (
            <option key={l}>{l}</option>
          ))}
        </select>
      </label>{' '}
      <label>
        Currency{' '}
        <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
          {['EUR', 'USD', 'JPY', 'INR', 'EGP', 'CHF', 'KWD'].map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </label>
      <p>
        <CurrencyInput
          locale={locale}
          currency={currency}
          value={value}
          onValueChange={setValue}
          aria-label="Amount"
        />
      </p>
    </div>
  )
}
```

## `locale`, or `language` + `country`

You can pass a BCP-47 `locale` directly, or the `language` and `country` separately — whichever your
app already carries. `locale` wins when both are present.

```tsx
import { CurrencyInput } from '@rxova/react-intl-currency-input'

function LocaleExamples() {
  return (
    <>
      {/* Pass a complete BCP-47 locale… */}
      <CurrencyInput locale="bg-BG" currency="EUR" aria-label="Amount by locale" />

      {/* …or pass its language and country separately. */}
      <CurrencyInput language="bg" country="BG" currency="EUR" aria-label="Amount by parts" />
    </>
  )
}
```

## The locales other libraries get wrong

The same `1234567.89`, formatted by the same code — the language decides the separators, symbol side
and digits, the currency decides the fraction count:

![One amount formatted in Bulgarian, German, French, Japanese, Egyptian and Kuwaiti Arabic, Hindi and Swiss German](/img/currency/examples/matrix.png)

None of these is a special case in the code — the same path formats all of them.

| Locale  | Currency | Renders `1234567.89` as | The catch                                     |
| ------- | -------- | ----------------------- | --------------------------------------------- |
| `bg-BG` | EUR      | `1 234 567,89 €`        | Group separator is a **non-breaking space**   |
| `de-DE` | EUR      | `1.234.567,89 €`        | Group is `.`, decimal is `,`, symbol trails   |
| `fr-FR` | EUR      | `1 234 567,89 €`        | Group is a **narrow** no-break space (U+202F) |
| `hi-IN` | INR      | `₹12,34,567.89`         | Lakh grouping — not groups of three           |
| `ja-JP` | JPY      | `￥1,234,567`           | **No** fraction digits                        |
| `ar-KW` | KWD      | (three decimals)        | **Three** fraction digits                     |
| `ar-EG` | EGP      | native Arabic digits    | Non-ASCII digits, right-to-left               |
| `de-CH` | CHF      | `CHF 1'234'567.89`      | Apostrophe group separator                    |

### The Bulgarian rule

Bulgarian only groups above 9999. The library inherits this from CLDR — there is no branch for it.

```tsx live
function Demo() {
  return (
    <ul>
      {[5000, 9999, 10000, 50000].map((n) => (
        <li key={n}>
          <CurrencyInput locale="bg-BG" currency="EUR" value={n} aria-label={String(n)} />
        </li>
      ))}
    </ul>
  )
}
```

## The same currency, in many languages

The currency and the language are independent. Show US dollars to a German user, or euros to a
Bulgarian one — the fraction-digit count follows the **currency** (USD is always 2, JPY always 0,
KWD always 3), while the separators, symbol placement and digits follow the **language**:

![US$ 1,234,567.50 formatted in nine languages](/img/currency/examples/same-currency.png)

```tsx live
function Demo() {
  return (
    <ul>
      {['en-US', 'de-DE', 'fr-FR', 'ja-JP', 'hi-IN', 'ru-RU', 'pt-BR'].map((locale) => (
        <li key={locale}>
          <code>{locale}</code>:{' '}
          <CurrencyInput locale={locale} currency="USD" value={1234567.5} aria-label={locale} />
        </li>
      ))}
    </ul>
  )
}
```

## Native digits

Locales like `ar-EG` render non-ASCII digits by default. While editing, the field shows ASCII digits
(you type on an ASCII keyboard), but on blur it renders in the locale's native digits, right-to-left:

![Typing ASCII into an Arabic field, then blurring to native Arabic-Indic digits](/img/currency/examples/arabic.gif)

It also **parses native digits**, so a paste works. Force a numbering system end-to-end with
`numberingSystem`.

```tsx
<CurrencyInput locale="ar-EG" currency="EGP" numberingSystem="latn" />
```

## A note on `Intl` and Node versions

`Intl` output can differ between ICU versions. If you assert formatted strings in tests, derive the
separators from the formatter rather than hardcoding a literal space.
