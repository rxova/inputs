---
sidebar_position: 7
sidebar_label: UI libraries
---

# UI libraries and custom inputs

`CurrencyInput` is the ready-made native input. When a design system already provides the input
element, use the exported `useCurrencyInput` hook instead. It owns the currency state machine and
returns native-compatible `inputProps`; the UI library keeps ownership of labels, borders, helper
text, slots, themes, and layout.

```tsx
import { useState } from 'react'
import { useCurrencyInput } from '@rxova/react-intl-currency-input'

function HeadlessExample() {
  const [value, setValue] = useState<number | null>(null)
  const currency = useCurrencyInput({
    locale: 'bg-BG',
    currency: 'EUR',
    value,
    onValueChange: setValue,
  })

  return <input {...currency.inputProps} aria-label="Amount" />
}
```

The examples below all use that same contract. No adapter package is required.

## shadcn/ui

shadcn's [`Input`](https://ui.shadcn.com/docs/components/input) is a styled native input copied into
your application, so the hook props spread directly onto it. Keep error semantics on both the field
and the control.

```tsx
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCurrencyInput } from '@rxova/react-intl-currency-input'

export function ShadcnPrice() {
  const [value, setValue] = useState<number | null>(null)
  const invalid = value !== null && value < 1
  const { inputProps } = useCurrencyInput({
    locale: 'bg-BG',
    currency: 'EUR',
    value,
    onValueChange: setValue,
  })

  return (
    <div className="grid gap-2" data-invalid={invalid || undefined}>
      <Label htmlFor="price">Price</Label>
      <Input
        {...inputProps}
        id="price"
        name="price"
        aria-invalid={invalid || undefined}
        aria-describedby={invalid ? 'price-error' : undefined}
        className="text-end tabular-nums"
      />
      {invalid && (
        <p id="price-error" className="text-sm text-destructive">
          Price must be at least 1 €.
        </p>
      )}
    </div>
  )
}
```

## Radix Themes

Radix Themes [`TextField.Root`](https://www.radix-ui.com/themes/docs/components/text-field) forwards
native input props and its ref to the internal input. Slots remain available for non-currency
decoration; do not add a fixed `€` or `$` slot because `Intl` already places the localized currency
token on the correct side.

```tsx
import { useState } from 'react'
import { Text, TextField } from '@radix-ui/themes'
import { useCurrencyInput } from '@rxova/react-intl-currency-input'

export function RadixPrice() {
  const [value, setValue] = useState<number | null>(null)
  const invalid = value !== null && value < 1
  const { inputProps } = useCurrencyInput({
    locale: 'de-DE',
    currency: 'EUR',
    value,
    onValueChange: setValue,
  })

  return (
    <label>
      <Text as="div" size="2" weight="bold" mb="1">
        Price
      </Text>
      <TextField.Root
        {...inputProps}
        name="price"
        color={invalid ? 'red' : undefined}
        aria-invalid={invalid || undefined}
        aria-describedby={invalid ? 'radix-price-error' : undefined}
      />
      {invalid && (
        <Text id="radix-price-error" as="div" size="1" color="red" mt="1">
          Price must be at least 1 €.
        </Text>
      )}
    </label>
  )
}
```

## Material UI

MUI's [`TextField`](https://mui.com/material-ui/react-text-field/) owns the label, helper text, and
error presentation. Current MUI versions use `slotProps.htmlInput` for attributes that must land on
the underlying HTML input, so route `inputMode` there and spread the remaining controlled props onto
`TextField`.

```tsx
import { useState } from 'react'
import TextField from '@mui/material/TextField'
import { useCurrencyInput } from '@rxova/react-intl-currency-input'

export function MuiPrice() {
  const [value, setValue] = useState<number | null>(null)
  const invalid = value !== null && value < 1
  const { inputProps } = useCurrencyInput({
    locale: 'de-DE',
    currency: 'EUR',
    value,
    onValueChange: setValue,
  })
  const { inputMode, ...textFieldProps } = inputProps

  return (
    <TextField
      {...textFieldProps}
      name="price"
      label="Price"
      error={invalid}
      helperText={invalid ? 'Price must be at least 1 €.' : 'Enter the price before tax.'}
      slotProps={{ htmlInput: { inputMode } }}
      sx={{ '& input': { textAlign: 'end', fontVariantNumeric: 'tabular-nums' } }}
    />
  )
}
```

Do not use MUI `type="number"`: the hook intentionally supplies `type="text"` plus
`inputMode="decimal"`, allowing locale decimal separators and formatted idle text.

## Chakra UI

Chakra's [`Input`](https://chakra-ui.com/docs/components/input) accepts native input props. Compose
it with `Field` for the visible label, helper text, and error state.

```tsx
import { useState } from 'react'
import { Field, Input } from '@chakra-ui/react'
import { useCurrencyInput } from '@rxova/react-intl-currency-input'

export function ChakraPrice() {
  const [value, setValue] = useState<number | null>(null)
  const invalid = value !== null && value < 1
  const { inputProps } = useCurrencyInput({
    locale: 'fr-FR',
    currency: 'EUR',
    value,
    onValueChange: setValue,
  })

  return (
    <Field.Root invalid={invalid}>
      <Field.Label>Price</Field.Label>
      <Input {...inputProps} name="price" textAlign="end" fontVariantNumeric="tabular-nums" />
      <Field.HelperText>Enter the price before tax.</Field.HelperText>
      <Field.ErrorText>Price must be at least 1 €.</Field.ErrorText>
    </Field.Root>
  )
}
```

## Mantine

Mantine [`TextInput`](https://mantine.dev/core/text-input/) supports all native input props and
provides its own accessible label, description, error message, and Styles API.

```tsx
import { useState } from 'react'
import { TextInput } from '@mantine/core'
import { useCurrencyInput } from '@rxova/react-intl-currency-input'

export function MantinePrice() {
  const [value, setValue] = useState<number | null>(null)
  const invalid = value !== null && value < 1
  const { inputProps } = useCurrencyInput({
    locale: 'fr-FR',
    currency: 'EUR',
    value,
    onValueChange: setValue,
  })

  return (
    <TextInput
      {...inputProps}
      name="price"
      label="Price"
      description="Enter the price before tax."
      error={invalid ? 'Price must be at least 1 €.' : undefined}
      styles={{ input: { textAlign: 'end', fontVariantNumeric: 'tabular-nums' } }}
    />
  )
}
```

## Ant Design

Ant Design [`Input`](https://ant.design/components/input/) also accepts the native controlled-input
contract. Use `Form.Item` for layout and validation presentation, but leave numeric state with the
hook rather than giving the same field to Ant Form's automatic value injection.

```tsx
import { useState } from 'react'
import { Form, Input } from 'antd'
import { useCurrencyInput } from '@rxova/react-intl-currency-input'

export function AntPrice() {
  const [value, setValue] = useState<number | null>(null)
  const invalid = value !== null && value < 1
  const { inputProps } = useCurrencyInput({
    locale: 'en-US',
    currency: 'USD',
    value,
    onValueChange: setValue,
  })

  return (
    <Form.Item
      label="Price"
      validateStatus={invalid ? 'error' : undefined}
      help={invalid ? 'Price must be at least $1.' : 'Enter the price before tax.'}
    >
      <Input
        {...inputProps}
        name="price"
        status={invalid ? 'error' : undefined}
        style={{ textAlign: 'end', fontVariantNumeric: 'tabular-nums' }}
      />
    </Form.Item>
  )
}
```

## What the hook owns

`inputProps` contains the props that must stay together for correct behavior:

| Prop                  | Purpose                                                                               |
| --------------------- | ------------------------------------------------------------------------------------- |
| `value`               | Formatted while idle; plain and locale-editable while focused                         |
| `type="text"`         | Allows localized and formatted text; never replace it with `number`                   |
| `inputMode="decimal"` | Requests a numeric mobile keyboard without imposing number-input parsing              |
| `onChange`            | Sanitizes and parses browser input                                                    |
| `onFocus` / `onBlur`  | Switch between editable and formatted representations                                 |
| `onKeyDown`           | Implements opt-in `step` behavior while preserving modified shortcuts                 |
| `autoComplete`        | Defaults to `off`, but can be adapted by a wrapper if your product requires otherwise |

Spread `inputProps` before visual props so your library can still receive `label`, `error`, `size`,
and theme options. Do not replace its value or event handlers. If you need an application callback,
compose it explicitly:

```tsx
<YourInput
  {...inputProps}
  onBlur={(event) => {
    inputProps.onBlur(event)
    markTouched()
  }}
/>
```

The hook also returns the numeric `value`, current `display`, `focused`, imperative `setValue`,
`format`/`parse` helpers, and the resolved separators and currency symbol. See the
[`useCurrencyInput` API reference](/components/currency/api/functions/useCurrencyInput) for the complete result.
