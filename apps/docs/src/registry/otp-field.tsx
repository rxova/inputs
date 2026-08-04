'use client'

/**
 * A labelled one-time-code field, ready to drop into a form.
 *
 * Distributed through the registry at /r/otp-field.json, so `shadcn add` copies
 * this file into your project and you own it from there. The component itself
 * stays an npm dependency — this is the wiring around it (label, description,
 * error, ids), which is the part every project ends up writing by hand and the
 * part that is genuinely yours to change.
 */
import { useId } from 'react'
import { OtpInput, type OtpInputProps } from '@rxova/react-otp-input'

import './otp-field.css'

export interface OtpFieldProps extends OtpInputProps {
  /** Visible label. Also the accessible name — do not pass `label` as well. */
  children?: React.ReactNode
  /** Helper text under the field. Announced via `aria-describedby`. */
  description?: string
  /** Error text. Its presence is what marks the field invalid. */
  error?: string
}

export function OtpField({ children, description, error, id, ...props }: OtpFieldProps) {
  const generated = useId()
  const fieldId = id ?? generated
  const describedBy = [description && `${fieldId}-description`, error && `${fieldId}-error`]
    .filter(Boolean)
    .join(' ')

  return (
    <div className="rx-field" data-invalid={error ? '' : undefined}>
      {children ? (
        // Not a <label htmlFor>: the real input is visually behind the slots, so
        // a label pointing at it is correct for a screen reader but a confusing
        // click target. The accessible name comes from aria-label below instead.
        <span className="rx-field__label" id={`${fieldId}-label`}>
          {children}
        </span>
      ) : null}

      <OtpInput
        {...props}
        id={fieldId}
        invalid={Boolean(error)}
        aria-label={typeof children === 'string' ? children : undefined}
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
