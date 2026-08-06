'use client'

// Meta-package: re-exports every rxova input component so consumers can
// `npm i @rxova/react-inputs` and import the whole suite from one entry point.
export * from '@rxova/react-intl-currency-input'
export * from '@rxova/react-rating-input'
export * from '@rxova/react-otp-input'
export * from '@rxova/react-password-input'
export * from '@rxova/react-phone-input'

// Date and time intentionally keep their shared ISO helpers in their own
// packages; those names cannot identify which value shape they operate on once
// both packages are merged into this namespace.
export {
  DateInput,
  useDateInput,
  MAX_YEAR,
  MIN_YEAR,
  datePieces,
  daysInMonth,
  isLeapYear,
  monthNames,
  segmentOrder,
} from '@rxova/react-date-input'
export type {
  DateInputProps,
  DateParts,
  DatePiece,
  DatePlaceholders,
  DateSegment,
  DateSegmentLabels,
  DateSegmentState,
  DateWarning,
  DateWarningCode,
  UseDateInputOptions,
  UseDateInputResult,
} from '@rxova/react-date-input'
