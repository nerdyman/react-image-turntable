/* eslint no-console: 0, @typescript-eslint/explicit-function-return-type: 0 */
import browserslist from 'browserslist';
import { resolveToEsbuildTarget } from 'esbuild-plugin-browserslist';
import type { Options } from 'tsup';
import { defineConfig } from 'tsup';
import babel from 'esbuild-plugin-babel';

const target = resolveToEsbuildTarget(browserslist()) as Options['target'];

const USE_BABEL = process.env.NODE_ENV === 'test';

if (USE_BABEL) {
  console.info('[tsup.config] Using babel for transpilation.');
}

export default defineConfig((options) => ({
  clean: !options.watch,
  dts: true,
  entry: ['src/index.ts'],
  format: ['esm'],
  minify: !options.watch,
  target,
  sourcemap: true,
  splitting: true,
  esbuildOptions(esbuild) {
    esbuild.banner = {
      js: '"use client"',
    };
  },
  esbuildPlugins: [
    USE_BABEL &&
      babel({
        config: {
          presets: ['@babel/preset-typescript', '@babel/preset-react'],
          plugins: ['istanbul'],
        },
      }),
  ].filter(Boolean),
}));
