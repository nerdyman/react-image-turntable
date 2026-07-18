import browserslistToEsbuild from 'browserslist-to-esbuild';
import { defineConfig } from 'tsdown';

const { default: packageJson } = await import('./package.json', { with: { type: 'json' } });

export default defineConfig((options) => ({
  clean: !options.watch,
  dts: true,
  entry: ['src/index.ts'],
  platform: 'neutral',
  format: ['esm'],
  target: browserslistToEsbuild(packageJson.browserslist),
  minify: !options.watch,
  sourcemap: true,
  splitting: true,
  failOnWarn: true,
  fixedExtension: true,
  attw: {
    enabled: true,
    profile: 'esm-only',
  },
  publint: {
    enabled: true,
    level: 'suggestion',
  },
}));
