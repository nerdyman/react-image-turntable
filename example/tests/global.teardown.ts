import MCR from 'monocart-coverage-reports';
import coverageOptions from './mcr.config';
import { type FullConfig } from '@playwright/test';

const globalTeardown = async (config: FullConfig) => {
  const mcr = MCR(coverageOptions);
  await mcr.generate();
};

export default globalTeardown;
