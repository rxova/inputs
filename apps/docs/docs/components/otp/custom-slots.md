---
sidebar_position: 7
sidebar_label: Custom rendering
---

# Custom rendering

Two escape hatches when tokens aren't enough: a **render prop** (keep the input, own the slots) and
the **headless hook** (own everything).

## Render prop

`render` receives the per-slot state and returns your markup. The input overlay is still wired for
you:

```tsx live
function Dashes() {
  const [code, setCode] = useState('42')
  return (
    <OtpInput
      length={4}
      value={code}
      onChange={setCode}
      label="Code"
      render={({ slots }) => (
        <div style={{ display: 'inline-flex', gap: '0.6rem' }}>
          {slots.map((slot) => (
            <span
              key={slot.index}
              style={{
                fontFamily: 'ui-monospace, monospace',
                fontSize: '1.5rem',
                borderBottom: '3px solid currentColor',
                minWidth: '1.6rem',
                textAlign: 'center',
              }}
            >
              {slot.char ?? (slot.hasFakeCaret ? '|' : ' ')}
            </span>
          ))}
        </div>
      )}
    />
  )
}
```

Each slot carries `{ index, char, isFilled, isActive, hasFakeCaret, placeholder, isDisabled, isReadOnly }`.

## Headless hook

`useOtpInput` is the state machine behind every tier. Own the entire markup with its prop-getters:

```tsx
const otp = useOtpInput({ length: 6, value: code, onChange: setCode })

<div {...otp.getContainerProps()}>
  <input {...otp.getInputProps()} />
  {otp.slots.map((s) => (
    <div key={s.index} {...otp.getSlotProps(s.index)}>
      {s.char ?? s.placeholder}
      {s.hasFakeCaret && <span data-otp-caret />}
    </div>
  ))}
</div>
```

The prop-getters **merge** your handlers rather than clobbering them, so you can add your own
`onFocus`/`onChange` and the internal wiring still runs. It also returns `{ value, isComplete,
isFocused, setValue, clear, focus, inputRef }`. See the [API reference](/components/otp/api) for the full shape.
