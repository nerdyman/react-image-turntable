import { fileURLToPath } from 'node:url';

import react from '@vitejs/plugin-react';
import { playwright } from '@vitest/browser-playwright';
import { coverageConfigDefaults, defineConfig } from 'vitest/config';

import { getElementCenter, mouseDown, mouseMove, mouseUp } from './tests/browser-commands';

export default defineConfig({
  clearScreen: false,
  plugins: [react()],
  resolve: {
    // Resolve to the library's TS source instead of the published `dist` build so it's
    // transformed (and instrumented for coverage) the same way as the rest of the app.
    alias: {
      'react-image-turntable': fileURLToPath(new URL('../lib/src', import.meta.url)),
    },
  },
  // Ensure lib is included in coverage instrumentation.
  optimizeDeps: { exclude: ['react-image-turntable'] },
  test: {
    include: ['tests/**/*.spec.tsx'],
    setupFiles: ['./tests/vitest.browser.setup.ts'],
    // We use istanbul because v8 only works with Chromium, and coverage can't be isolated per project or instance.
    // https://vitest.dev/guide/coverage#istanbul
    coverage: {
      provider: 'istanbul',
      allowExternal: true,
      include: [/*'src/demos/**',*/ `${fileURLToPath(new URL('../lib/src', import.meta.url))}/**`],
      exclude: [...coverageConfigDefaults.exclude, '**/lib/src/index.ts', '**/lib/src/types.ts'],
      reporter: [
        'text',
        'html',
        'clover',
        'json',
        // Emit `SF:` paths relative to the repo root (rather than `example/`, the cwd
        // when this runs) so they line up with `sonar.sources` in CI.
        ['lcov', { projectRoot: fileURLToPath(new URL('..', import.meta.url)) }],
        ['text-summary', { file: 'coverage-summary.txt' }],
      ],
    },
    browser: {
      enabled: true,
      provider: playwright(),
      // https://vitest.dev/api/browser/commands
      commands: { getElementCenter, mouseDown, mouseMove, mouseUp },
      // https://vitest.dev/config/browser/playwright
      instances: [{ browser: 'chromium' }, { browser: 'firefox' }, { browser: 'webkit' }],
    },
  },
});
