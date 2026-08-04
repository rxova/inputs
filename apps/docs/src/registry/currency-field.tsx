'use client'

/**
 * A labelled currency field, ready to drop into a form.
 *
 * Distributed through the registry at /r/currency-field.json, so `shadcn add`
 * copies this file into your project and you own it from there. The component
 * itself stays an npm dependency — this is the wiring around it.
 *
 * Unlike the OTP and rating fields this one uses a real `<label htmlFor>`: the
 * currency input IS a plain `<input>`, so the label points at something a click
 * can usefully focus.
 */
import { useId } from 'react'
import { CurrencyInput, type CurrencyInputProps } from '@rxova/react-intl-currency-input'

import './currency-field.css'

export interface CurrencyFieldProps extends CurrencyInputProps {
  /** Visible label, and the accessible name. */
  children?: React.ReactNode
  /** Helper text under the field. Announced via `aria-describedby`. */
  description?: string
  /** Error text. Its presence is what marks the field invalid. */
  error?: string
}

export function CurrencyField({ children, description, error, id, ...props }: CurrencyFieldProps) {
  const generated = useId()
  const fieldId = id ?? generated
  const describedBy = [description && `${fieldId}-description`, error && `${fieldId}-error`]
    .filter(Boolean)
    .join(' ')

  return (
    <div className="rx-field" data-invalid={error ? '' : undefined}>
      {children ? (
        <label className="rx-field__label" htmlFor={fieldId}>
          {children}
        </label>
      ) : null}

      <CurrencyInput
        {...props}
        id={fieldId}
        invalid={Boolean(error)}
        aria-describedby={describedBy || undefined}
      />

      {description ? (
        <p className="rx-field__description" id={`${fieldId}-description`}>
          {description}
        </p>
      ) : null}
      {error ? (
        <p className="rx-field__error" id={`${fieldId}-error`} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}
