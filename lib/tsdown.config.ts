import { defineConfig } from 'tsdown';

const packageJson = await import('./package.json', { with: { type: 'json' } });

export default defineConfig((options) => ({
  clean: !options.watch,
  dts: true,
  entry: ['src/index.ts'],
  platform: 'neutral',
  format: ['esm', 'cjs'],
  target: packageJson.browserslist,
  minify: !options.watch,
  sourcemap: true,
  splitting: true,
  failOnWarn: true,
  fixedExtension: true,
  attw: {
    enabled: true,
    profile: 'node16',
  },
  publint: {
    enabled: true,
    level: 'suggestion',
  },
}));
