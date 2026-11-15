import { defineConfig, devices } from '@playwright/test';

/**
 * Accessibility tests in a real browser. Run `npm run e2e` (builds the sites first).
 *
 * - a11y-fixture: the table with only the library's default stylesheet
 * - docs: the documentation site, in light and dark mode
 */
export default defineConfig({
  testDir: 'e2e',
  fullyParallel: true,
  forbidOnly: !!process.env['CI'],
  retries: process.env['CI'] ? 1 : 0,
  reporter: process.env['CI'] ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: {
    trace: 'retain-on-failure'
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } }
  ],
  webServer: [
    { command: 'node scripts/serve-static.mjs dist/a11y-fixture/browser 4301', url: 'http://localhost:4301', reuseExistingServer: !process.env['CI'] },
    { command: 'node scripts/serve-static.mjs dist/docs/browser 4302', url: 'http://localhost:4302', reuseExistingServer: !process.env['CI'] }
  ]
});
