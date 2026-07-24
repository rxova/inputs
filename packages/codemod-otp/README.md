# @rxova/codemod-otp

A [jscodeshift](https://github.com/facebook/jscodeshift) codemod that migrates
[`input-otp`](https://github.com/guilhermerodz/input-otp) usage to
[`@rxova/react-otp-input`](https://www.npmjs.com/package/@rxova/react-otp-input).

```bash
# preview the changes without writing
npx @rxova/codemod-otp --dry ./src

# apply them
npx @rxova/codemod-otp ./src
```

It parses `.ts` / `.tsx` / `.js` / `.jsx`.

## What it does

| Before (`input-otp`)                                              | After (`@rxova/react-otp-input`)                    |
| ----------------------------------------------------------------- | -------------------------------------------- |
| `import { OTPInput } from 'input-otp'`                            | `import { OtpInput } from '@rxova/react-otp-input'` |
| `OTPInputProps`                                                   | `OtpInputProps`                              |
| `SlotProps`                                                       | `OtpSlotState`                               |
| `<OTPInput maxLength={6}>`                                        | `<OtpInput length={6}>`                      |
| `containerClassName`                                              | `className`                                  |
| `pushPasswordManagerStrategy`, `textAlign`, `noScriptCSSFallback` | _removed_ (no width hack, so unneeded)       |
| `slot.placeholderChar`                                            | `slot.placeholder`                           |

- **Aliases are preserved.** `import { OTPInput as OTP }` keeps `OTP` at the call site; only the
  imported name and module change.
- **Unmapped imports stay put.** Anything without a direct equivalent (e.g. `REGEXP_ONLY_DIGITS`) is
  left importing from `input-otp` with a `TODO` comment, so the file still resolves.
- **`value`, `onChange`, `pattern`** and other compatible props are left untouched.

## What it doesn't do

The **`render` prop is preserved, not rewritten.** `@rxova/react-otp-input` supports the same render-prop
tier and the per-slot shape is compatible (`char` / `isActive` / `hasFakeCaret` carry over), so your
render function keeps working. Converting an arbitrary render function into the compound
`<OtpGroup>` / `<OtpSlot>` API can't be done reliably by an AST transform, so it stays a manual step —
when a `render` prop is present the codemod adds a one-line banner pointing at the
[migration guide](https://rxova.github.io/inputs/otp/migration/from-input-otp).

Always review the diff (`--dry` first) and re-run your formatter afterwards.

## Programmatic use

The transform is also exported for use with `jscodeshift -t`:

```bash
npx jscodeshift -t node_modules/@rxova/codemod-otp/dist/transform.cjs --parser tsx ./src
```

## License

MIT
