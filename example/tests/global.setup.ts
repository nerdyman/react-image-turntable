import type { FullConfig } from '@playwright/test';
import MCR from 'monocart-coverage-reports';

import coverageOptions from './mcr.config';

const globalSetup = async (config: FullConfig) => {
  const mcr = MCR(coverageOptions);
  mcr.cleanCache();
};

export default globalSetup;
