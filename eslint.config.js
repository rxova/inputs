import { defineConfig, globalIgnores } from 'eslint/config'
import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import reactHooks from 'eslint-plugin-react-hooks'

export default defineConfig(
  globalIgnores([
    '**/dist/',
    'coverage/',
    '**/node_modules/',
    'apps/docs/', // Docusaurus app: its own toolchain, typecheck and lint concerns
    '**/build/',
    '**/.docusaurus/',
    'test-results/',
    'playwright-report/',
    '.pw-browsers/',
    'pw-browsers/',
    '**/__screenshots__/',
    // Build/tool config lives outside the type-checked program in a monorepo;
    // linting it with projectService would demand a tsconfig per nested config.
    '**/*.config.ts',
    '**/*.config.js',
  ]),
  js.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    extends: [tseslint.configs.strictTypeChecked, tseslint.configs.stylisticTypeChecked],
    languageOptions: {
      parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
      // A zero-dependency library ships no console noise.
      'no-console': 'error',
    },
  },
  {
    files: ['packages/*/src/**/*.{ts,tsx}', 'apps/playground/**/*.{ts,tsx}'],
    plugins: { 'react-hooks': reactHooks },
    rules: reactHooks.configs.recommended.rules,
  },
  {
    // Build/verify tooling is plain ESM JavaScript, outside the TS program.
    // Lives in the private @rxova/utils package (and any top-level scripts/).
    files: ['scripts/**/*.mjs', 'packages/utils/**/*.mjs'],
    languageOptions: { globals: globals.node, sourceType: 'module' },
    rules: { 'no-console': 'off' },
  },
  {
    // The codemod runs under jscodeshift and pokes at untyped AST nodes; the
    // ast-types typings are imprecise, so the type-aware "unnecessary" checks and
    // non-null guards are unreliable here. bin.ts is a CLI, so it needs console.
    files: ['packages/codemod-otp/**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unnecessary-condition': 'off',
      'no-console': 'off',
    },
  },
  {
    files: ['**/__tests__/**', '**/e2e/**', 'apps/playground/**'],
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      // Browser-test idioms: `await locator.focus()` / `el.click()` return void,
      // and harness helpers legitimately assert on values typed loosely.
      '@typescript-eslint/await-thenable': 'off',
      '@typescript-eslint/no-confusing-void-expression': 'off',
      '@typescript-eslint/no-unnecessary-condition': 'off',
      '@typescript-eslint/no-unnecessary-type-assertion': 'off',
      '@typescript-eslint/no-redundant-type-constituents': 'off',
      '@typescript-eslint/require-await': 'off',
      'no-console': 'off',
    },
  },
)
