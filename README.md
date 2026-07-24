<p align="center">
  <a href="https://rxova.org/packages/react-inputs/">
    <img src="apps/docs/static/img/logo.png" width="112" alt="rxova" />
  </a>
</p>

<h1 align="center">rxova</h1>

<p align="center"><strong>The tricky React inputs, done right.</strong></p>

<p align="center">
  Headless, accessible, zero-dependency React input components — currency, rating,<br />
  and one-time-code — that each solve a problem the ecosystem keeps getting wrong.
</p>

<p align="center">
  <a href="https://github.com/rxova/react-inputs/actions/workflows/ci.yml"><img src="https://github.com/rxova/react-inputs/actions/workflows/ci.yml/badge.svg?branch=main" alt="CI status" /></a>
  <a href="https://www.npmjs.com/package/@rxova/react-inputs"><img src="https://img.shields.io/npm/v/@rxova/react-inputs?color=cb3837&logo=npm&logoColor=white" alt="npm version" /></a>
  <img src="https://img.shields.io/badge/TypeScript-strict-3178c6?logo=typescript&logoColor=white" alt="TypeScript strict mode" />
  <img src="https://img.shields.io/badge/dependencies-0-44cc11" alt="Zero runtime dependencies" />
  <img src="https://img.shields.io/badge/React-%E2%89%A518-61dafb?logo=react&logoColor=white" alt="React 18 or newer" />
  <a href="https://github.com/rxova/react-inputs/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue" alt="MIT license" /></a>
</p>

<p align="center">
  <a href="https://rxova.org/packages/react-inputs/"><strong>Documentation</strong></a> ·
  <a href="https://rxova.org/packages/react-inputs/getting-started/installation">Installation</a> ·
  <a href="https://rxova.org/packages/react-inputs/getting-started/quick-start">Quick start</a> ·
  <a href="https://rxova.org/packages/react-inputs/overview">Why these three</a> ·
  <a href="CONTRIBUTING.md">Contributing</a>
</p>

---

Most input libraries ship a hundred components and get the hard ones wrong. rxova ships three and
gets them right: a currency field that reads every locale fact from `Intl` instead of hardcoding
"a comma every three digits", a rating that fills icons to exact fractions, and a one-time-code
field built on one real `<input>` so paste, SMS autofill and IME come from the platform.

The same principles hold across all three — a real `<input>` where it matters, native form
submission, keyboard and screen-reader behaviour inherited from platform semantics rather than
hand-rolled JavaScript, a small typed API, and **no stylesheet to import**.

## The suite

| Package                                                                                                                                                                                                                                       | What it does                                                                    | Brotli    |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | --------- |
| [**`@rxova/react-intl-currency-input`**](packages/react-intl-currency-input)<br />[![npm](https://img.shields.io/npm/v/@rxova/react-intl-currency-input?color=cb3837&label=)](https://www.npmjs.com/package/@rxova/react-intl-currency-input) | Locale-aware money entry with correct grouping, symbols and no cursor bugs      | ≤ 3.25 kB |
| [**`@rxova/react-rating-input`**](packages/react-rating-input)<br />[![npm](https://img.shields.io/npm/v/@rxova/react-rating-input?color=cb3837&label=)](https://www.npmjs.com/package/@rxova/react-rating-input)                             | Any icon, any precision. A real `radiogroup` interactive, an image read-only    | ≤ 3 kB    |
| [**`@rxova/react-otp-input`**](packages/react-otp-input)<br />[![npm](https://img.shields.io/npm/v/@rxova/react-otp-input?color=cb3837&label=)](https://www.npmjs.com/package/@rxova/react-otp-input)                                         | One-time-code entry with spatial slots, paste handling and WebOTP autofill      | ≤ 4.5 kB  |
| [**`@rxova/react-inputs`**](packages/react-inputs)<br />[![npm](https://img.shields.io/npm/v/@rxova/react-inputs?color=cb3837&label=)](https://www.npmjs.com/package/@rxova/react-inputs)                                                     | Meta-package — the whole suite from one install, tree-shaken to what you import | ≤ 10 kB   |
| [**`@rxova/codemod`**](packages/codemod)<br />[![npm](https://img.shields.io/npm/v/@rxova/codemod?color=cb3837&label=)](https://www.npmjs.com/package/@rxova/codemod)                                                                         | `jscodeshift` transforms that migrate you off other libraries                   | —         |

## Installation

Install the whole suite from one package:

```bash
npm install @rxova/react-inputs
```

Or add only the components you use:

```bash
npm install @rxova/react-otp-input
```

The two are equivalent — the meta-package re-exports each component, and `sideEffects: false`
means your bundler drops whatever you don't import.

```ts
import { CurrencyInput, Rating, OtpInput } from '@rxova/react-inputs'
// or
import { OtpInput } from '@rxova/react-otp-input'
```

**Requires** React 18 or 19 — the only peer dependency (currency also peers `react-dom`). Dual
ESM/CJS builds with types for both, published with npm provenance.

## Quick start

Every rxova input is a controlled component: give it a value and a change handler and it behaves
like any other form field.

```tsx
import { useState } from 'react'
import { CurrencyInput, Rating, OtpInput } from '@rxova/react-inputs'

function Checkout() {
  const [price, setPrice] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [code, setCode] = useState('')

  return (
    <>
      <CurrencyInput locale="en-US" currency="USD" value={price} onValueChange={setPrice} />
      <Rating value={score} onChange={setScore} precision={0.5} label="Rate your meal" />
      <OtpInput length={6} value={code} onChange={setCode} label="One-time code" />
    </>
  )
}
```

Each component emits a plain value — a `number`, a `number`, and a `string` — not a synthetic
event. Pass `name` instead and the value posts natively from a plain `<form>`.

## Why rxova

- **Headless.** No stylesheet to import. Only layout-critical CSS is inlined; everything visual is
  a CSS custom property or a `data-*` hook, and those selectors are covered by semver.
- **Accessible by construction.** Native radios in a `radiogroup`, one real `<input>` behind the
  OTP slots, `role="img"` when read-only. Keyboard navigation, focus-visible, RTL and
  `prefers-reduced-motion` come from the platform, and every build is checked with
  `@axe-core/playwright`.
- **Zero runtime dependencies.** `react` is the only peer. Nothing else reaches your bundle, and
  each package carries a `size-limit` budget enforced on every pull request.
- **Correct on the seams.** Bulgarian's "space only above 9999", Hindi lakh grouping, Arabic native
  digits, formatted paste, Chrome auto-translate, IME, RTL, SSR/RSC.
- **Typed, tested, documented.** TypeScript strict, 95% per-file coverage thresholds, unit plus
  real-browser plus Playwright e2e suites, and an API reference generated from source by TypeDoc so
  it cannot drift from the code.

## Documentation

Full guides, live editable examples and the generated API reference:
**[rxova.org/packages/react-inputs](https://rxova.org/packages/react-inputs/)**

| Component | Guide                                                               | API reference                                                          |
| --------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Currency  | [Getting started](https://rxova.org/packages/react-inputs/currency) | [API](https://rxova.org/packages/react-inputs/components/currency/api) |
| Rating    | [Getting started](https://rxova.org/packages/react-inputs/rating)   | [API](https://rxova.org/packages/react-inputs/components/rating/api)   |
| OTP       | [Getting started](https://rxova.org/packages/react-inputs/otp)      | [API](https://rxova.org/packages/react-inputs/components/otp/api)      |

Cross-cutting guides:
[Accessibility](https://rxova.org/packages/react-inputs/guides/accessibility) ·
[Styling](https://rxova.org/packages/react-inputs/guides/styling) ·
[Form libraries](https://rxova.org/packages/react-inputs/guides/form-libraries)

## Migrating

Coming from another library? There are guides for
[`input-otp`](https://rxova.org/packages/react-inputs/migrating/from-input-otp),
[`react-otp-input`](https://rxova.org/packages/react-inputs/migrating/from-react-otp-input),
[`react-currency-input-field`](https://rxova.org/packages/react-inputs/migrating/from-react-currency-input-field),
[`react-rating`](https://rxova.org/packages/react-inputs/migrating/from-react-rating),
[`react-stars`](https://rxova.org/packages/react-inputs/migrating/from-react-stars) and
[plain radio buttons](https://rxova.org/packages/react-inputs/migrating/from-radio-buttons).

Part of it is automated. Preview a transform before it writes anything:

```bash
npx @rxova/codemod input-otp-to-otp --dry ./src
```

## Contributing

```bash
pnpm install
pnpm dev              # shared playground for all three components
pnpm run docs         # docs site (use `pnpm run`: `docs` can shadow a pnpm builtin)
pnpm build            # turbo run build, cached
pnpm test             # unit + real-browser suites
pnpm typecheck
pnpm lint
pnpm exec changeset   # stage a release
```

Read [CONTRIBUTING.md](CONTRIBUTING.md) for the workflow, commit conventions and the release gate,
and [RELEASING.md](RELEASING.md) for how versions are cut.

<details>
<summary><b>Repository layout &amp; tooling</b></summary>

```
packages/
  react-intl-currency-input   currency input
  react-rating-input          rating input
  react-otp-input             OTP input
  react-inputs                meta-package, re-exports the suite
  codemod                     jscodeshift migration transforms
  demo-kit                    shared demo primitives (private, dev-only)
  utils                       release gate + repo checks (private)
apps/
  playground                  shared Vite playground
  docs                        Docusaurus site, published as part of rxova.org
```

- **Turborepo** — task pipeline and caching (`turbo.json`)
- **pnpm** workspaces — security-hardened overrides plus release-age quarantine
- **tsdown** — dual ESM/CJS builds per package
- **Changesets** — versioning and publishing with npm provenance
- **Vitest** (unit + browser), **Playwright** e2e, **`@axe-core/playwright`** a11y,
  **size-limit** budgets, **publint** / **attw** export checks
- **ESLint** flat config (type-checked), **Prettier**, **commitlint** + **husky** + **lint-staged**
- `pnpm verify` runs the full release gate. `pnpm check:docs` type-checks every snippet in this
  README and in each package README, so the examples above cannot rot.

</details>

## Community

- [Discussions](https://github.com/rxova/react-inputs/discussions) — questions, ideas, show and tell
- [Report a bug](https://github.com/rxova/react-inputs/issues/new?template=bug_report.yml) — please
  say which package it concerns and include a minimal reproduction
- [Security policy](SECURITY.md) · [Code of conduct](CODE_OF_CONDUCT.md) · [Support](SUPPORT.md)

## License

[MIT](LICENSE) © rxova
