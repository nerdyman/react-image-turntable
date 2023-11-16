/* eslint no-console: 0 */
import { devices } from '@playwright/test';
import type { PlaywrightTestConfig } from '@playwright/test';

const IS_CI = !!process.env.CI;
const PORT = !isNaN(Number(process.env.PORT)) ? Number(process.env.PORT) : 3000;

process.env.PORT = String(PORT);

console.info('[playwright.config]', { IS_CI, PORT });

const config: PlaywrightTestConfig = {
  forbidOnly: IS_CI,
  retries: IS_CI ? 2 : 0,
  testDir: './test',
  outputDir: './test/results',
  reporter: 'list',
  webServer: {
    command: 'pnpm run build && pnpm --filter "react-image-turntable-example" run start',
    reuseExistingServer: !IS_CI,
    url: `http://localhost:${PORT}`,
    env: {
      NODE_ENV: 'test',
      USE_BABEL_PLUGIN_ISTANBUL: '1',
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
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
};

export default config;
