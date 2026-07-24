import { useCallback, useMemo, useRef, useState } from 'react'
import type { ChangeEvent, FocusEvent, KeyboardEvent } from 'react'
import { flushSync } from 'react-dom'
import { createCurrencyFormatter, resolveLocale } from './intl'
import type { UseCurrencyInputOptions, UseCurrencyInputResult } from './types'

/** Coerce anything to a usable amount: non-finite → null. */
function toValue(v: number | null | undefined): number | null {
  return v == null || !Number.isFinite(v) ? null : v
}

/**
 * Headless currency-input state machine.
 *
 * In `'live'` mode (the default) the field formats as you type — grouping and
 * the symbol stay visible — and the caret is kept in place by counting the
 * significant characters (digits and the decimal separator) to its left,
 * reformatting, then placing it after the same count. Because it counts *digits*
 * rather than characters, the group separators that appear and disappear never
 * move it.
 *
 * In `'blur'` mode the field shows a plain number while focused and only formats
 * on blur, so there is no caret to manage at all.
 *
 * Either way the value is the source of truth and is always a `number` (or
 * `null`); the displayed string is a view.
 */
export function useCurrencyInput(options: UseCurrencyInputOptions): UseCurrencyInputResult {
  const {
    locale,
    language,
    country,
    currency,
    value: controlledValue,
    defaultValue = null,
    onValueChange,
    maximumFractionDigits,
    minimumFractionDigits,
    currencyDisplay,
    numberingSystem,
    allowNegative,
    step,
    transformRawValue,
    formatMode,
  } = options

  const mode = formatMode ?? 'live'
  const resolvedLocale = resolveLocale(locale, language, country)

  const formatter = useMemo(
    () =>
      createCurrencyFormatter({
        locale: resolvedLocale,
        currency,
        currencyDisplay,
        numberingSystem,
        minimumFractionDigits,
        maximumFractionDigits,
        allowNegative,
      }),
    [
      resolvedLocale,
      currency,
      currencyDisplay,
      numberingSystem,
      minimumFractionDigits,
      maximumFractionDigits,
      allowNegative,
    ],
  )

  const isControlled = controlledValue !== undefined
  const [internalValue, setInternalValue] = useState<number | null>(() => toValue(defaultValue))
  const value = isControlled ? toValue(controlledValue) : internalValue

  // `null` means "not editing" — the display then falls back to the formatted
  // value. Any string (including '') means the field is focused.
  const [editingText, setEditingText] = useState<string | null>(null)
  const focused = editingText !== null

  const inputRef = useRef<HTMLInputElement | null>(null)

  // Set the caret imperatively while the field is focused. Called only from the
  // focused change/keydown paths, right after a synchronous (flushSync) reformat
  // so the DOM already holds `next`. No-op when the ref is not attached.
  const placeCaret = useCallback((next: string, caret: number) => {
    const el = inputRef.current
    if (!el) return
    // React skips a no-op controlled update after a rejected keystroke, so force
    // the DOM value back in sync before positioning the caret.
    if (el.value !== next) el.value = next
    el.setSelectionRange(caret, caret)
  }, [])

  const emit = useCallback(
    (next: number | null, raw: string) => {
      onValueChange?.(next, {
        value: next,
        formatted: formatter.format(next),
        raw,
      })
    },
    [formatter, onValueChange],
  )

  // ---- Caret math (live mode) ----------------------------------------------

  const countSignificant = useCallback(
    (s: string, upto: number): number => {
      let count = 0
      const end = Math.min(upto, s.length)
      for (let i = 0; i < end; i++) if (formatter.isSignificantChar(s.charAt(i))) count++
      return count
    },
    [formatter],
  )

  const caretForSignificant = useCallback(
    (s: string, n: number): number => {
      if (n <= 0) {
        for (let i = 0; i < s.length; i++) if (formatter.isSignificantChar(s.charAt(i))) return i
        return s.length
      }
      let count = 0
      for (let i = 0; i < s.length; i++) {
        if (formatter.isSignificantChar(s.charAt(i))) {
          count++
          if (count === n) return i + 1
        }
      }
      return s.length
    },
    [formatter],
  )

  // Reformat a just-edited string, keeping the caret anchored to the same digit.
  const applyLive = useCallback(
    (userStr: string, userCaret: number) => {
      const transformed = transformRawValue?.(userStr) ?? userStr
      const significantBefore = countSignificant(userStr, userCaret)
      const raw = formatter.extractEditing(transformed)
      const nextDisplay = formatter.formatEditing(raw)
      const nextValue = formatter.editValue(raw)
      const nextCaret = caretForSignificant(nextDisplay, significantBefore)
      // Commit synchronously so the DOM is reformatted before we set the caret.
      flushSync(() => {
        setEditingText(nextDisplay)
        if (!isControlled) setInternalValue(nextValue)
      })
      placeCaret(nextDisplay, nextCaret)
      emit(nextValue, formatter.editPlain(raw))
    },
    [
      transformRawValue,
      countSignificant,
      caretForSignificant,
      placeCaret,
      formatter,
      isControlled,
      emit,
    ],
  )

  // ---- Event handlers -------------------------------------------------------

  const handleFocus = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      // Commit the editable representation before the browser continues its
      // focus action. Select-all/fill, autofill, and password-manager flows can
      // otherwise compute a selection against the previous string.
      flushSync(() => {
        setEditingText(mode === 'live' ? formatter.format(value) : formatter.toEditable(value))
      })
      event.currentTarget.select()
    },
    [mode, formatter, value],
  )

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (mode === 'live') {
        const el = event.target
        applyLive(el.value, el.selectionStart ?? el.value.length)
        return
      }
      const raw = transformRawValue?.(event.target.value) ?? event.target.value
      const text = formatter.sanitize(raw)
      setEditingText(text)
      const next = formatter.parse(text)
      if (!isControlled) setInternalValue(next)
      emit(next, text)
    },
    [mode, applyLive, formatter, isControlled, emit, transformRawValue],
  )

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      // Backspace onto a group separator deletes the digit before it, not the
      // decorative separator (which would just reappear on reformat).
      if (
        mode === 'live' &&
        event.key === 'Backspace' &&
        !event.altKey &&
        !event.ctrlKey &&
        !event.metaKey &&
        event.currentTarget.selectionStart === event.currentTarget.selectionEnd
      ) {
        const el = event.currentTarget
        const pos = el.selectionStart ?? 0
        if (pos > 0 && !formatter.isSignificantChar(el.value.charAt(pos - 1))) {
          let del = pos - 1
          while (del >= 0 && !formatter.isSignificantChar(el.value.charAt(del))) del--
          if (del >= 0) {
            event.preventDefault()
            applyLive(el.value.slice(0, del) + el.value.slice(pos), del)
            return
          }
        }
      }

      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return
      if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return
      if (step === undefined || !Number.isFinite(step) || step <= 0) return

      event.preventDefault()
      const direction = event.key === 'ArrowUp' ? 1 : -1
      const scale = 10 ** formatter.maximumFractionDigits
      const candidate = Math.round(((value ?? 0) + direction * step) * scale) / scale
      // Sanitizing a forbidden negative would drop its sign and turn an
      // ArrowDown into a positive increment. Clamp at zero before sanitizing.
      const stepped = allowNegative ? candidate : Math.max(0, candidate)
      const next = formatter.parse(formatter.sanitize(formatter.toEditable(stepped)))
      const nextText = mode === 'live' ? formatter.format(next) : formatter.toEditable(next)
      // A keydown reaches here only while the field is focused, so it is always
      // in editing mode — set the text unconditionally.
      flushSync(() => {
        if (!isControlled) setInternalValue(next)
        setEditingText(nextText)
      })
      if (mode === 'live') {
        placeCaret(
          nextText,
          caretForSignificant(nextText, countSignificant(nextText, nextText.length)),
        )
      }
      emit(next, nextText)
    },
    [
      mode,
      formatter,
      applyLive,
      step,
      value,
      allowNegative,
      isControlled,
      placeCaret,
      caretForSignificant,
      countSignificant,
      emit,
    ],
  )

  const handleBlur = useCallback(() => {
    // Leave editing mode; the display reverts to the formatted value.
    setEditingText(null)
  }, [])

  const setValue = useCallback(
    (next: number | null) => {
      const normalized = toValue(next)
      if (!isControlled) setInternalValue(normalized)
      if (editingText !== null) {
        setEditingText(
          mode === 'live' ? formatter.format(normalized) : formatter.toEditable(normalized),
        )
      }
    },
    [isControlled, editingText, formatter, mode],
  )

  // Preserve meaningful in-progress text (e.g. a trailing `5,`) when it parses
  // to the current value, but derive fresh text for a genuine external value,
  // locale, or currency change.
  const display =
    editingText === null
      ? formatter.format(value)
      : Object.is(formatter.parse(editingText), value)
        ? editingText
        : mode === 'live'
          ? formatter.format(value)
          : formatter.toEditable(value)

  return {
    inputProps: {
      type: 'text',
      inputMode: 'decimal',
      autoComplete: 'off',
      value: display,
      onChange: handleChange,
      onFocus: handleFocus,
      onBlur: handleBlur,
      onKeyDown: handleKeyDown,
    },
    ref: inputRef,
    value,
    display,
    focused,
    setValue,
    format: formatter.format,
    parse: formatter.parse,
    decimalSeparator: formatter.decimalSeparator,
    groupSeparator: formatter.groupSeparator,
    currencySymbol: formatter.currencySymbol,
  }
}
