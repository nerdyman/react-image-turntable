/* eslint no-console: 0 */
import { type PlaywrightTestConfig, devices } from '@playwright/test';

const IS_CI = !!process.env.CI;
const PORT = !Number.isNaN(Number(process.env.PORT)) ? Number(process.env.PORT) : 3000;

process.env.PORT = String(PORT);

console.info('[playwright.config]', { IS_CI, PORT });

const config: PlaywrightTestConfig = {
  globalSetup: './tests/global.setup.ts',
  globalTeardown: './tests/global.teardown.ts',
  forbidOnly: IS_CI,
  retries: IS_CI ? 2 : 0,
  testDir: './',
  outputDir: './tests/results',
  reporter: 'list',
  webServer: {
    command: 'pnpm run start',
    reuseExistingServer: !IS_CI,
    url: `http://localhost:${PORT}`,
    env: {
      NODE_ENV: 'test',
    },
  },
  use: {
    trace: 'on-first-retry',
  },
  expect: {
    toMatchSnapshot: { threshold: 0.1 },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ].filter(Boolean) as PlaywrightTestConfig['projects'],
};

export default config;
