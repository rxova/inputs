import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

// The manual-QA aggregator. It imports each package's own demo and aliases the
// libraries (and demo-kit) to source, so it runs — dev, build, typecheck —
// without a prior library build. Each demo is also driven standalone by its own
// package's E2E suite; this app only stitches them together for browsing.
const src = (rel: string) => fileURLToPath(new URL(rel, import.meta.url))

export default defineConfig({
  root: fileURLToPath(new URL('.', import.meta.url)),
  plugins: [react()],
  resolve: {
    // Subpaths first: alias entries are tried in order, and the bare-specifier
    // rule below would otherwise swallow `@rxova/demo-kit/styles.css`.
    alias: [
      {
        find: '@rxova/demo-kit/styles.css',
        replacement: src('../../packages/demo-kit/src/styles.css'),
      },
      // Every workspace package resolves to its source, by convention rather
      // than by enumeration: `@rxova/<name>` lives in `packages/<name>`, so one
      // rule covers the inputs, demo-kit, and every input added later.
      {
        find: /^@rxova\/([^/]+)$/,
        replacement: src('../../packages/$1/src/index.ts'),
      },
    ],
  },
  build: { outDir: 'dist', emptyOutDir: true },
  server: { port: 5173 },
  preview: { port: 4173 },
})
