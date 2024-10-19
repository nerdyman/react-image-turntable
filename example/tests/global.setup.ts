import MCR from 'monocart-coverage-reports';
import coverageOptions from './mcr.config';
import { type FullConfig } from '@playwright/test';

const globalSetup = async (config: FullConfig) => {
  const mcr = MCR(coverageOptions);
  mcr.cleanCache();
};

export default globalSetup;
