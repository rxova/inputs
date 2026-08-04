<p align="center">
  <img src="./assets/logo.svg" width="112" alt="@rxova/codemod logo" />
</p>

<h1 align="center">@rxova/codemod</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/@rxova/codemod"><img src="https://img.shields.io/npm/v/@rxova/codemod?color=cb3837&logo=npm&logoColor=white" alt="npm version" /></a>
  <a href="https://github.com/rxova/react-inputs/actions/workflows/ci.yml"><img src="https://github.com/rxova/react-inputs/actions/workflows/ci.yml/badge.svg?branch=main" alt="CI status" /></a>
  <img src="https://img.shields.io/badge/TypeScript-strict-3178c6?logo=typescript&logoColor=white" alt="TypeScript strict mode" />
  <img src="https://img.shields.io/badge/Node-%E2%89%A520.19-5fa04e?logo=node.js&logoColor=white" alt="Node 20.19 or newer" />
  <a href="https://github.com/rxova/react-inputs/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue" alt="MIT license" /></a>
</p>

<p align="center">
  <a href="https://rxova.org/packages/react-inputs/"><strong>Documentation</strong></a> ·
  <a href="https://rxova.org/packages/react-inputs/components/otp/migrating/">Migration guides</a>
</p>

[jscodeshift](https://github.com/facebook/jscodeshift) codemods for migrating onto the
[rxova](https://github.com/rxova/react-inputs) input suite. One CLI, one transform per migration.

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
  [migration guide](https://rxova.org/packages/react-inputs/components/otp/migrating/).

### `currency-onvaluechange-to-onchange`

Migrates [`@rxova/react-intl-currency-input`](https://www.npmjs.com/package/@rxova/react-intl-currency-input)
0.1.x to 0.2.0, where the value handler took over the `onChange` name.

| Before (0.1.x)                             | After (0.2.0)                                  |
| ------------------------------------------ | ---------------------------------------------- |
| `<CurrencyInput onValueChange={setPrice}>` | `<CurrencyInput onChange={setPrice}>`          |
| `<CurrencyInput onChange={handleEvent}>`   | `<CurrencyInput onNativeChange={handleEvent}>` |
| `useCurrencyInput({ onValueChange })`      | `useCurrencyInput({ onChange })`               |

- **Both props are renamed simultaneously**, computed from the original attribute list before
  anything is assigned. A sequential rename would walk `onValueChange` → `onChange` →
  `onNativeChange` and lose the value handler.
- **Scoped to real imports.** Only files importing `CurrencyInput` / `useCurrencyInput` from
  `@rxova/react-intl-currency-input` or the `@rxova/react-inputs` meta-package are touched, so an
  `onChange` on a plain `<input>` or `<select>` in the same file is left alone. Aliases are followed.
- **The hook keeps any existing `onChange`.** It has no native passthrough option, so that key is
  already the value handler.
- **Spread props are flagged, not guessed.** `<CurrencyInput {...props} />` gets a `TODO` banner
  pointing at the [migration guide](https://rxova.org/packages/react-inputs/components/currency/migrating/),
  because an AST transform can't know what the spread carries. Handlers held in a variable or an
  object outside a JSX attribute or the hook's inline options are likewise left for you.

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

[MIT](https://github.com/rxova/react-inputs/blob/main/LICENSE) © rxova
