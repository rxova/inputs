/**
 * The single source of truth for which transforms `@rxova/codemod` ships.
 *
 * Each `name` must match a file at `src/transforms/<name>.ts` (built to
 * `dist/transforms/<name>.cjs`); the dispatcher in `bin.ts` resolves it by that
 * convention and jscodeshift loads the built file. Add a migration by dropping a
 * transform in `src/transforms/` and listing it here.
 */
export interface CodemodEntry {
  /** CLI name and the transform filename (without extension). */
  name: string
  /** One-liner shown by `--help`. */
  description: string
}

export const TRANSFORMS: CodemodEntry[] = [
  {
    name: 'input-otp-to-otp',
    description: 'Migrate `input-otp` imports and usage to @rxova/react-otp-input.',
  },
  {
    name: 'currency-onvaluechange-to-onchange',
    description:
      'Migrate @rxova/react-intl-currency-input 0.1.x → 0.2.0: `onValueChange` → `onChange`, native `onChange` → `onNativeChange`.',
  },
]
