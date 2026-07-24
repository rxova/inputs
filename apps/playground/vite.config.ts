import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

// A private workspace app. It aliases each library to source so it runs — dev,
// `vite build` for the E2E preview, and typecheck — without a prior library
// build. The `@rxova/*` workspace dependencies make pnpm link the packages;
// these aliases (and the matching tsconfig paths) point resolution at the
// source rather than the unbuilt `dist`.
export default defineConfig({
  root: fileURLToPath(new URL('.', import.meta.url)),
  plugins: [react()],
  resolve: {
    alias: {
      '@rxova/react-intl-currency-input': fileURLToPath(
        new URL('../../packages/react-intl-currency-input/src/index.ts', import.meta.url),
      ),
      '@rxova/react-rating-input': fileURLToPath(
        new URL('../../packages/react-rating-input/src/index.ts', import.meta.url),
      ),
      '@rxova/react-otp-input': fileURLToPath(
        new URL('../../packages/react-otp-input/src/index.ts', import.meta.url),
      ),
    },
  },
  build: { outDir: 'dist', emptyOutDir: true },
  server: { port: 5173 },
  preview: { port: 4173 },
})
