import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
  clean: true,
  dts: true,
  entry: ['src/index.ts'],
  format: ['esm'],
  minify: !options.watch,
  target: 'es2021',
  sourcemap: true,
  splitting: false,
}));
