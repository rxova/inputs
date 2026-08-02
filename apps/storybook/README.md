# @rxova/storybook

The component workshop: Storybook stories for every rxova input.

```sh
pnpm storybook        # dev server on :6006
pnpm storybook:build  # static build into apps/storybook/dist
```

## How it's wired

- **Source-aliased.** Like the playground, `vite.config.ts` aliases `@rxova/<name>` to
  `packages/<name>/src/index.ts`, so the workshop runs without a prior library build and
  hot-reloads library source edits.
- **Docgen from source.** `react-docgen-typescript` reads the annotated `*Props`
  interfaces, so the autodocs prop tables carry every prop's JSDoc, type and default.
  Adding/documenting a prop in a package updates its table here with no extra work.
- **Consumer-side styling only.** The components are headless; `.storybook/preview.css`
  plays the role of a host app's stylesheet using the same tokens as demo-kit, minus the
  demo pages' chrome.
- **RTL is global.** The Direction toolbar item wraps every story in `dir="rtl"`, matching
  the playground's page-level toggle.

## Adding stories for a new input

1. Add the package under `packages/<name>` as usual — the alias rule and tsconfig `paths`
   already cover it.
2. Create `stories/<Component>.stories.tsx` with a `Playground` story (args-driven, spies
   via `fn()`) plus one story per behaviour worth showing off.
3. Keep interaction rings/sizing in `preview.css` via the package's documented tokens.
