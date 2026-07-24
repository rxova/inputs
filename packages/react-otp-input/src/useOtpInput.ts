import { useCallback, useId, useMemo, useRef, useState } from 'react'
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect'
import type {
  ClipboardEvent,
  CSSProperties,
  FocusEvent,
  HTMLAttributes,
  InputHTMLAttributes,
  Ref,
  RefCallback,
} from 'react'
import {
  buildSlots,
  defaultPasteTransform,
  inputModeFor,
  isComplete as computeComplete,
  normalizeLength,
  resolveIsAllowed,
  resolveMaskChar,
  sanitize,
  spliceValue,
} from './core'
import type { OtpMode, OtpSlotState } from './types'

export interface UseOtpInputOptions {
  length?: number
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  onComplete?: (value: string) => void
  mode?: OtpMode
  pattern?: RegExp | string
  transform?: (value: string) => string
  pasteTransform?: (pasted: string) => string
  autoComplete?: string
  disabled?: boolean
  readOnly?: boolean
  blurOnComplete?: boolean
  mask?: boolean | string
  placeholder?: string
  name?: string
  required?: boolean
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void
  invalid?: boolean
  'aria-describedby'?: string
  'aria-label'?: string
  label?: string
  id?: string
  inputRef?: Ref<HTMLInputElement>
  dir?: 'ltr' | 'rtl'
  autoFocus?: boolean
}

export interface UseOtpInputResult {
  /** The current sanitized value. */
  value: string
  /** Slot count after normalization. */
  length: number
  /** Per-slot state, in order. */
  slots: OtpSlotState[]
  /** `value.length === length`. */
  isComplete: boolean
  /** The underlying input holds focus. */
  isFocused: boolean
  /** Base id; slots derive `${baseId}-slot-0`, ... */
  baseId: string
  /**
   * Structural rather than `RefObject`: in @types/react 18 `RefObject.current`
   * is readonly, in 19 it is mutable. Declaring the shape keeps this assignable
   * under both, which matters because `react >= 18` is the peer.
   */
  inputRef: { current: HTMLInputElement | null }
  getContainerProps: (props?: HTMLAttributes<HTMLDivElement>) => HTMLAttributes<HTMLDivElement>
  getInputProps: (
    props?: InputHTMLAttributes<HTMLInputElement>,
  ) => InputHTMLAttributes<HTMLInputElement> & { ref: RefCallback<HTMLInputElement> }
  getSlotProps: (
    index: number,
    props?: HTMLAttributes<HTMLDivElement>,
  ) => HTMLAttributes<HTMLDivElement>
  /** Commit a value programmatically (sanitized like any other input). Used by WebOTP autofill. */
  setValue: (value: string) => void
  /** Reset to empty and refocus. */
  clear: () => void
  /** Focus the underlying input. */
  focus: () => void
}

/** Assign a value into a callback or object ref, tolerating either React version's shape. */
function assignRef<T>(ref: Ref<T> | undefined, value: T | null): void {
  if (typeof ref === 'function') ref(value)
  else if (ref) (ref as { current: T | null }).current = value
}

/** HTML `pattern` for the built-in modes; a custom `pattern` prop can't be safely widened to a whole-string test. */
function htmlPatternFor(mode: OtpMode, custom: RegExp | string | undefined): string | undefined {
  if (custom !== undefined) return undefined
  switch (mode) {
    case 'numeric':
      return '[0-9]*'
    case 'alpha':
      return '[A-Za-z]*'
    default:
      return '[A-Za-z0-9]*'
  }
}

/**
 * The headless state machine behind every tier of `<OtpInput>`: one real input,
 * controlled/uncontrolled value, selection tracking, paste distribution, and
 * per-slot state — with prop-getters that *merge* the caller's handlers rather
 * than clobbering them. Budgeted at about 2 kB brotli so a custom renderer pays
 * only for the logic, never the default look.
 */
export function useOtpInput(options: UseOtpInputOptions = {}): UseOtpInputResult {
  const {
    value: valueProp,
    defaultValue = '',
    onChange,
    onComplete,
    mode = 'numeric',
    pattern,
    transform,
    pasteTransform = defaultPasteTransform,
    autoComplete = 'one-time-code',
    disabled = false,
    readOnly = false,
    blurOnComplete = false,
    mask,
    placeholder,
    name,
    required,
    onBlur,
    invalid,
    'aria-describedby': describedBy,
    'aria-label': ariaLabel,
    label,
    id: idProp,
    inputRef: externalInputRef,
    dir,
    autoFocus,
  } = options

  const length = normalizeLength(options.length)
  const reactId = useId()
  const baseId = idProp ?? `otp-${reactId}`

  const isAllowed = useMemo(() => resolveIsAllowed(mode, pattern), [mode, pattern])
  const maskChar = resolveMaskChar(mask)

  const isControlled = valueProp !== undefined
  const [uncontrolled, setUncontrolled] = useState(() =>
    sanitize(defaultValue, length, resolveIsAllowed(mode, pattern), transform),
  )
  const rawValue = isControlled ? valueProp : uncontrolled
  const value = useMemo(
    () => sanitize(rawValue, length, isAllowed, transform),
    [rawValue, length, isAllowed, transform],
  )

  const [selection, setSelection] = useState({ start: 0, end: 0 })
  const [isFocused, setIsFocused] = useState(false)

  const inputRef = useRef<HTMLInputElement | null>(null)
  const pendingCaretRef = useRef<number | null>(null)
  // Guards `onComplete` against firing on every keystroke while already full.
  const lastCompleteRef = useRef<string | null>(null)
  // True between compositionstart and compositionend (IME entry in progress).
  const isComposingRef = useRef(false)

  const setRef = useCallback<RefCallback<HTMLInputElement>>(
    (node) => {
      inputRef.current = node
      assignRef(externalInputRef, node)
    },
    [externalInputRef],
  )

  const syncSelection = useCallback((el: HTMLInputElement) => {
    /* v8 ignore next 2 -- a text input always reports numeric selection offsets */
    const start = el.selectionStart ?? el.value.length
    const end = el.selectionEnd ?? start
    setSelection((prev) => (prev.start === start && prev.end === end ? prev : { start, end }))
  }, [])

  const commit = useCallback(
    (next: string) => {
      const sanitized = sanitize(next, length, isAllowed, transform)
      if (!isControlled) setUncontrolled(sanitized)
      onChange?.(sanitized)
      if (computeComplete(sanitized, length)) {
        if (lastCompleteRef.current !== sanitized) {
          lastCompleteRef.current = sanitized
          onComplete?.(sanitized)
          /* v8 ignore next -- input is mounted whenever a value can complete */
          if (blurOnComplete) inputRef.current?.blur()
        }
      } else {
        lastCompleteRef.current = null
      }
    },
    [length, isAllowed, transform, isControlled, onChange, onComplete, blurOnComplete],
  )

  // After a paste sets a caret target, reapply it once React has re-rendered the
  // controlled value — otherwise the native caret snaps to the end of the field.
  useIsomorphicLayoutEffect(() => {
    const caret = pendingCaretRef.current
    if (caret === null) return
    pendingCaretRef.current = null
    const el = inputRef.current
    /* v8 ignore next -- input is mounted by the time a paste sets a pending caret */
    if (!el) return
    el.setSelectionRange(caret, caret)
    setSelection({ start: caret, end: caret })
  }, [value])

  const handleChange = useCallback(
    (event: { currentTarget: HTMLInputElement }) => {
      // Mid-IME-composition the input holds not-yet-committed text (romaji being
      // converted, etc.). Reprocessing it here would sanitize it away and reset
      // the controlled value under the composer, cancelling the composition —
      // so wait for compositionend to commit the final result.
      if (isComposingRef.current) return
      commit(event.currentTarget.value)
      syncSelection(event.currentTarget)
    },
    [commit, syncSelection],
  )

  const handleCompositionStart = useCallback(() => {
    isComposingRef.current = true
  }, [])

  const handleCompositionEnd = useCallback(
    (event: { currentTarget: HTMLInputElement }) => {
      isComposingRef.current = false
      commit(event.currentTarget.value)
      syncSelection(event.currentTarget)
    },
    [commit, syncSelection],
  )

  const handlePaste = useCallback(
    (event: ClipboardEvent<HTMLInputElement>) => {
      event.preventDefault()
      const el = event.currentTarget
      const cleaned = pasteTransform(event.clipboardData.getData('text'))
      let insert = ''
      for (const char of cleaned) if (isAllowed(char)) insert += char
      /* v8 ignore next 2 -- a text input always reports numeric selection offsets */
      const start = el.selectionStart ?? value.length
      const end = el.selectionEnd ?? start
      const spliced = spliceValue(value, start, end, insert, length)
      commit(spliced.value)
      pendingCaretRef.current = spliced.caret
    },
    [pasteTransform, isAllowed, value, length, commit],
  )

  const slots = useMemo(
    () =>
      buildSlots({
        value,
        length,
        selectionStart: selection.start,
        selectionEnd: selection.end,
        isFocused,
        isDisabled: disabled,
        isReadOnly: readOnly,
        placeholder: placeholder ?? null,
        maskChar,
      }),
    [value, length, selection, isFocused, disabled, readOnly, placeholder, maskChar],
  )

  const isComplete = computeComplete(value, length)

  const clear = useCallback(() => {
    commit('')
    pendingCaretRef.current = 0
    /* v8 ignore next -- input is mounted when clear() is callable */
    inputRef.current?.focus()
  }, [commit])

  const focus = useCallback(() => {
    /* v8 ignore next -- input is mounted when focus() is callable */
    inputRef.current?.focus()
  }, [])

  const getContainerProps = useCallback<UseOtpInputResult['getContainerProps']>(
    (props = {}) => ({
      ...props,
      'data-otp-root': '',
      dir,
      style: { position: 'relative', ...props.style },
    }),
    [dir],
  )

  const getInputProps = useCallback<UseOtpInputResult['getInputProps']>(
    (props = {}) => {
      // The single-input trick: the real characters and caret are invisible, so
      // the only glyphs on screen are the ones the renderer paints per slot.
      const overlayStyle: CSSProperties = {
        color: 'transparent',
        caretColor: 'transparent',
        WebkitTextFillColor: 'transparent',
        background: 'transparent',
        outline: 'none',
        ...props.style,
      }
      return {
        ...props,
        ref: setRef,
        value,
        disabled,
        readOnly,
        name,
        required,
        id: baseId,
        dir,
        autoFocus,
        inputMode: inputModeFor(mode),
        autoComplete,
        autoCapitalize: 'none',
        autoCorrect: 'off',
        spellCheck: false,
        // input-otp crashes on Chrome auto-translate because it assumes one
        // character per slot; opting the field out sidesteps the whole class.
        translate: 'no',
        pattern: htmlPatternFor(mode, pattern),
        maxLength: length,
        'aria-label': ariaLabel ?? label,
        'aria-invalid': invalid ? true : undefined,
        'aria-describedby': describedBy,
        'data-otp-input': '',
        style: overlayStyle,
        onChange: (event) => {
          props.onChange?.(event)
          handleChange(event)
        },
        onPaste: (event) => {
          props.onPaste?.(event)
          handlePaste(event)
        },
        onCompositionStart: (event) => {
          props.onCompositionStart?.(event)
          handleCompositionStart()
        },
        onCompositionEnd: (event) => {
          props.onCompositionEnd?.(event)
          handleCompositionEnd(event)
        },
        onFocus: (event) => {
          props.onFocus?.(event)
          setIsFocused(true)
          syncSelection(event.currentTarget)
        },
        onBlur: (event) => {
          props.onBlur?.(event)
          setIsFocused(false)
          onBlur?.(event)
        },
        onSelect: (event) => {
          props.onSelect?.(event)
          syncSelection(event.currentTarget)
        },
        onKeyUp: (event) => {
          props.onKeyUp?.(event)
          syncSelection(event.currentTarget)
        },
        onClick: (event) => {
          props.onClick?.(event)
          syncSelection(event.currentTarget)
        },
      }
    },
    [
      setRef,
      value,
      disabled,
      readOnly,
      name,
      required,
      baseId,
      dir,
      autoFocus,
      mode,
      autoComplete,
      pattern,
      length,
      ariaLabel,
      label,
      invalid,
      describedBy,
      handleChange,
      handlePaste,
      handleCompositionStart,
      handleCompositionEnd,
      syncSelection,
      onBlur,
    ],
  )

  const getSlotProps = useCallback<UseOtpInputResult['getSlotProps']>(
    (index, props = {}) => {
      const slot = slots[index]
      const state = slot?.isActive ? 'active' : slot?.isFilled ? 'filled' : 'empty'
      return {
        ...props,
        id: `${baseId}-slot-${String(index)}`,
        'aria-hidden': true,
        'data-otp-slot': '',
        'data-state': state,
        ...(slot?.isActive ? { 'data-active': '' } : {}),
        ...(slot?.isFilled ? { 'data-filled': '' } : {}),
        ...(disabled ? { 'data-disabled': '' } : {}),
        ...(readOnly ? { 'data-readonly': '' } : {}),
        ...(invalid ? { 'data-invalid': '' } : {}),
      }
    },
    [slots, baseId, disabled, readOnly, invalid],
  )

  return {
    value,
    length,
    slots,
    isComplete,
    isFocused,
    baseId,
    inputRef,
    getContainerProps,
    getInputProps,
    getSlotProps,
    setValue: commit,
    clear,
    focus,
  }
}
