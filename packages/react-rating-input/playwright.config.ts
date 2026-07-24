import { defineConfig, devices } from '@playwright/test'

/**
 * E2E runs against the *built* shared playground (@rxova/playground), served on
 * this package's own preview port at its component route. `turbo run e2e` builds
 * the playground once (dependsOn) before these previews start, so the specs
 * exercise the same bundling a consumer's app would.
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : [['list']],
  use: {
    baseURL: 'http://localhost:4174',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
  webServer: {
    command: 'pnpm --filter @rxova/playground preview --port 4174 --strictPort',
    url: 'http://localhost:4174/rating',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
})
