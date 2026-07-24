# rxova

A suite of headless, accessible React input components, unified into one Turborepo monorepo.

## Packages

| Package                                                                  | What it is                                    | Migrated from               |
| ------------------------------------------------------------------------ | --------------------------------------------- | --------------------------- |
| [`@rxova/react-intl-currency-input`](packages/react-intl-currency-input) | Locale-aware currency input (Intl formatting) | `react-intl-currency-input` |
| [`@rxova/react-rating-input`](packages/react-rating-input)               | Rating input (stars / any icon)               | `react-feedback-stars`      |
| [`@rxova/react-otp-input`](packages/react-otp-input)                     | OTP / one-time-code input                     | `react-otp-slots`           |
| [`@rxova/react-inputs`](packages/react-inputs)                           | Meta-package — re-exports the whole suite     | —                           |

```ts
// Targeted install
import { CurrencyInput } from '@rxova/react-intl-currency-input'

// Or the whole suite from one package
import { CurrencyInput, Rating, OtpInput } from '@rxova/react-inputs'
```

## Apps

- [`apps/playground`](apps/playground) — shared playground for all three components
- [`apps/docs`](apps/docs) — shared Docusaurus docs site for the suite

## Tooling

- **Turborepo** — task pipeline + caching (`turbo.json`)
- **pnpm** workspaces (`pnpm-workspace.yaml`, security-hardened overrides + release-age quarantine)
- **tsdown** — dual ESM/CJS builds per package
- **Changesets** — versioning & publishing (`@changesets/changelog-github`)
- **Vitest** (unit + browser), **Playwright** e2e + `@axe-core` a11y, **size-limit** budgets, **publint** / **attw** export checks
- **ESLint** flat config (type-checked), **Prettier**, **commitlint** + **husky** + **lint-staged**

## Commands

```bash
pnpm install
pnpm build            # turbo run build (cached)
pnpm test             # turbo run test
pnpm typecheck        # turbo run typecheck
pnpm lint
pnpm dev              # shared playground
pnpm run docs         # shared docs site (pnpm run: `docs` can shadow a pnpm builtin)
pnpm exec changeset   # stage a release
```

## Status

Scaffold stage. Package `src/` folders contain placeholders; real component source is migrated in per package. The three source repos are frozen during this migration.
