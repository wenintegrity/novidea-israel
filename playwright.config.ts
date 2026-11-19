import { defineConfig, devices } from '@playwright/test';

// E2E, accessibility and responsive checks (AGENTS.md §3.4). Runs against the production build.
export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  reporter: [['list']],
  use: {
    baseURL: 'http://localhost:4321',
    // Scroll animations off by default, so screenshots and axe see the final state.
    // Tests that check animation opt back in with test.use({ reducedMotion: 'no-preference' }).
    reducedMotion: 'reduce',
    // A visitor who already chose "necessary only", so the consent banner doesn't cover the page.
    // tests/e2e/consent.spec.ts starts from an empty state instead.
    storageState: {
      cookies: [],
      origins: [
        {
          origin: 'http://localhost:4321',
          localStorage: [
            {
              name: 'nv-consent',
              value: JSON.stringify({ v: 1, analytics: false, marketing: false, at: '2026-01-01T00:00:00.000Z' }),
            },
          ],
        },
      ],
    },
  },
  webServer: {
    command: 'npm run preview',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
