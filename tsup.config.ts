/* eslint no-console: 0 */
import { defineConfig } from 'tsup';
import babel from 'esbuild-plugin-babel';

const USE_BABEL = process.env.NODE_ENV === 'test';

if (USE_BABEL) {
  console.info('[tsup.config] Using babel for transpilation.');
}

export default defineConfig((options) => ({
  clean: true,
  dts: true,
  entry: ['src/index.ts'],
  esbuildPlugins: [
    process.env.NODE_ENV === 'test' &&
      babel({
        config: {
          presets: ['@babel/preset-typescript', '@babel/preset-react'],
          plugins: ['istanbul'],
        },
      }),
  ].filter(Boolean),
  format: ['esm'],
  minify: !options.watch,
  target: 'es2021',
  sourcemap: true,
  splitting: false,
}));
