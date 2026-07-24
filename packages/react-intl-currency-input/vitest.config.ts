import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { playwright } from '@vitest/browser-playwright'

export default defineConfig({
  plugins: [react()],
  test: {
    projects: [
      {
        // Pure logic. No DOM needed, so no browser cost — this is the project
        // the pre-push hook runs.
        extends: true,
        test: {
          name: 'unit',
          environment: 'node',
          include: ['src/**/__tests__/**/*.test.ts', 'src/**/__tests__/**/*.test.tsx'],
          // Browser specs are the other project's job.
          exclude: ['src/**/__tests__/**/*.browser.test.tsx'],
        },
      },
      {
        // Caret position, focus/blur formatting and paste are real DOM
        // behaviours. jsdom's input selection model is a fiction and its Intl
        // is the Node ICU build, so an interaction assertion there would be
        // testing a stub, not a browser.
        extends: true,
        test: {
          name: 'browser',
          include: ['src/**/__tests__/**/*.browser.test.tsx'],
          browser: {
            enabled: true,
            provider: playwright(),
            headless: true,
            instances: [{ browser: 'chromium' }],
          },
        },
      },
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'text-summary', 'html', 'json-summary', 'lcov'],
      include: ['src/**/*.{ts,tsx}'],
      // index.ts is a re-export barrel and types.ts is types only; neither has
      // executable lines worth a threshold.
      exclude: ['src/**/__tests__/**', 'src/index.ts', 'src/types.ts'],
      thresholds: {
        // perFile, so one thinly covered module cannot hide behind a
        // well-covered one in the aggregate.
        perFile: true,
        statements: 95,
        branches: 95,
        functions: 95,
        lines: 95,
      },
    },
  },
})
