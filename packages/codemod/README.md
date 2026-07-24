# @rxova/codemod

[jscodeshift](https://github.com/facebook/jscodeshift) codemods for migrating onto the
[rxova](https://github.com/rxova/inputs) input suite. One CLI, one transform per migration.

```bash
# list available transforms
npx @rxova/codemod --help

# preview a transform without writing
npx @rxova/codemod input-otp-to-otp --dry ./src

# apply it
npx @rxova/codemod input-otp-to-otp ./src
```

It parses `.ts` / `.tsx` / `.js` / `.jsx`.

## Transforms

### `input-otp-to-otp`

Migrates [`input-otp`](https://github.com/guilhermerodz/input-otp) usage to
[`@rxova/react-otp-input`](https://www.npmjs.com/package/@rxova/react-otp-input).

| Before (`input-otp`)                                              | After (`@rxova/react-otp-input`)                    |
| ----------------------------------------------------------------- | --------------------------------------------------- |
| `import { OTPInput } from 'input-otp'`                            | `import { OtpInput } from '@rxova/react-otp-input'` |
| `OTPInputProps`                                                   | `OtpInputProps`                                     |
| `SlotProps`                                                       | `OtpSlotState`                                      |
| `<OTPInput maxLength={6}>`                                        | `<OtpInput length={6}>`                             |
| `containerClassName`                                              | `className`                                         |
| `pushPasswordManagerStrategy`, `textAlign`, `noScriptCSSFallback` | _removed_ (no width hack, so unneeded)              |
| `slot.placeholderChar`                                            | `slot.placeholder`                                  |

- **Aliases are preserved.** `import { OTPInput as OTP }` keeps `OTP` at the call site; only the
  imported name and module change.
- **Unmapped imports stay put.** Anything without a direct equivalent (e.g. `REGEXP_ONLY_DIGITS`) is
  left importing from `input-otp` with a `TODO` comment, so the file still resolves.
- **`value`, `onChange`, `pattern`** and other compatible props are left untouched.
- The **`render` prop is preserved, not rewritten.** `@rxova/react-otp-input` supports the same
  render-prop tier and the per-slot shape is compatible, so your render function keeps working.
  Converting it into the compound `<OtpGroup>` / `<OtpSlot>` API can't be done reliably by an AST
  transform, so it stays a manual step — the codemod adds a one-line banner pointing at the
  [migration guide](https://rxova.github.io/inputs/otp/migration/from-input-otp).

Always review the diff (`--dry` first) and re-run your formatter afterwards.

## Programmatic use

Each transform is exported for use directly with `jscodeshift -t`:

```bash
npx jscodeshift -t node_modules/@rxova/codemod/dist/transforms/input-otp-to-otp.cjs --parser tsx ./src
```

## Adding a transform

Drop a jscodeshift transform in `src/transforms/<name>.ts` and list it in `src/registry.ts`.
The CLI and the build pick it up automatically.

## License

MIT
