import React from 'react'
import {
  CurrencyInput,
  useCurrencyInput,
  currencyForCountry,
} from '@rxova/react-intl-currency-input'
import { Rating, useRating } from '@rxova/react-rating-input'
import { OtpInput, OtpGroup, OtpSlot, OtpSeparator, useOtpInput } from '@rxova/react-otp-input'

/**
 * Everything available inside a ```tsx live code block. Spreading React exposes
 * the hooks (useState, etc.) directly, and every component's exports make the
 * suite usable without an import statement (react-live cannot process imports).
 */
const ReactLiveScope = {
  React,
  ...React,
  CurrencyInput,
  useCurrencyInput,
  currencyForCountry,
  Rating,
  useRating,
  OtpInput,
  OtpGroup,
  OtpSlot,
  OtpSeparator,
  useOtpInput,
}

export default ReactLiveScope
