import { type CoverageReportOptions } from 'monocart-coverage-reports';

/**
 * @see https://github.com/cenfun/monocart-coverage-reports
 */
const coverageOptions: CoverageReportOptions = {
  name: 'React Image Turntable',
  reports: ['console-details', 'v8', 'lcovonly'],

  entryFilter: {
    '**/node_modules/**': false,
    '**/dist/**': true,
  },

  sourceFilter: {
    '**/src/test/**': false,
    '**/src/**': true,
  },

  outputDir: './tests/coverage-reports',
};

export default coverageOptions;
