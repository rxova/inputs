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
    alias: [
      {
        find: '@rxova/react-intl-currency-input',
        replacement: src('../../packages/react-intl-currency-input/src/index.ts'),
      },
      {
        find: '@rxova/react-rating-input',
        replacement: src('../../packages/react-rating-input/src/index.ts'),
      },
      {
        find: '@rxova/react-otp-input',
        replacement: src('../../packages/react-otp-input/src/index.ts'),
      },
      {
        find: '@rxova/demo-kit/styles.css',
        replacement: src('../../packages/demo-kit/src/styles.css'),
      },
      { find: /^@rxova\/demo-kit$/, replacement: src('../../packages/demo-kit/src/index.ts') },
    ],
  },
  build: { outDir: 'dist', emptyOutDir: true },
  server: { port: 5173 },
  preview: { port: 4173 },
})
