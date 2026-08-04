'use client'

/**
 * A labelled rating field, ready to drop into a form.
 *
 * Distributed through the registry at /r/rating-field.json, so `shadcn add`
 * copies this file into your project and you own it from there. The component
 * itself stays an npm dependency — this is the wiring around it.
 *
 * Note it forwards `onChange` rather than defaulting it: passing `onChange` is
 * what makes the underlying Rating interactive, so a wrapper that always
 * supplied one would make a read-only score impossible to express.
 */
import { useId } from 'react'
import { Rating, type RatingProps } from '@rxova/react-rating-input'

import './rating-field.css'

export interface RatingFieldProps extends RatingProps {
  /** Visible label. Also the accessible name — do not pass `label` as well. */
  children?: React.ReactNode
  /** Helper text under the field. Announced via `aria-describedby`. */
  description?: string
  /** Error text. Its presence is what marks the field invalid. */
  error?: string
}

export function RatingField({ children, description, error, id, ...props }: RatingFieldProps) {
  const generated = useId()
  const fieldId = id ?? generated
  const describedBy = [description && `${fieldId}-description`, error && `${fieldId}-error`]
    .filter(Boolean)
    .join(' ')

  return (
    <div className="rx-field" data-invalid={error ? '' : undefined}>
      {children ? (
        <span className="rx-field__label" id={`${fieldId}-label`}>
          {children}
        </span>
      ) : null}

      <Rating
        {...props}
        id={fieldId}
        invalid={Boolean(error)}
        label={typeof children === 'string' ? children : props.label}
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
