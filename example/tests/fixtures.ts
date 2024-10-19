import { test as testBase, type Page } from '@playwright/test';
import MCR from 'monocart-coverage-reports';

import coverageOptions from './mcr.config';

export const test = testBase.extend<{ autoTestFixture: string }>({
  autoTestFixture: [
    async ({ context }, use) => {
      const isChromium = test.info().project.name === 'chromium';

      const handlePageEvent = async (page: Page) => {
        await Promise.all([
          page.coverage.startJSCoverage({ resetOnNavigation: false }),
          page.coverage.startCSSCoverage({ resetOnNavigation: false }),
        ]);
      };

      // coverage API is chromium only
      if (isChromium) {
        context.on('page', handlePageEvent);
      }

      await use('autoTestFixture');

      if (isChromium) {
        context.off('page', handlePageEvent);
        const coverageList = await Promise.all(
          context.pages().map(async (page) => {
            const jsCoverage = await page.coverage.stopJSCoverage();
            const cssCoverage = await page.coverage.stopCSSCoverage();
            return [...jsCoverage, ...cssCoverage];
          }),
        );

        const mcr = MCR(coverageOptions);
        await mcr.add(coverageList.flat());
      }
    },
    { scope: 'test', auto: true },
  ],
});
