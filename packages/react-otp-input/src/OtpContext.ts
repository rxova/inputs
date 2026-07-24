import { createContext, useContext } from 'react'
import type { OtpSlotState } from './types'
import type { UseOtpInputResult } from './useOtpInput'

/** The slice of hook state the compound children (`OtpSlot`) read by index. */
export interface OtpContextValue {
  slots: OtpSlotState[]
  getSlotProps: UseOtpInputResult['getSlotProps']
}

export const OtpContext = createContext<OtpContextValue | null>(null)

/**
 * Read the context an `<OtpInput>` provides. A compound child rendered outside
 * one is a wiring mistake, not a data value — so unlike a bad `value`, this
 * throws with a pointed message rather than degrading.
 */
export function useOtpContext(component: string): OtpContextValue {
  const ctx = useContext(OtpContext)
  if (ctx === null) {
    throw new Error(`<${component}> must be rendered inside <OtpInput>.`)
  }
  return ctx
}
