import browserslist from 'browserslist';
import { resolveToEsbuildTarget } from 'esbuild-plugin-browserslist';
import type { Options } from 'tsup';
import { defineConfig } from 'tsup';

const target = resolveToEsbuildTarget(browserslist()) as Options['target'];

const WRITE_METAFILE = process.env.ANALYZE === 'true';

export default defineConfig((options) => ({
  clean: !options.watch,
  dts: true,
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  bundle: true,
  metafile: WRITE_METAFILE,
  minify: !options.watch && !WRITE_METAFILE,
  target,
  sourcemap: true,
  splitting: true,
  outExtension(ctx) {
    return {
      js: ctx.format === 'esm' ? '.mjs' : '.cjs',
    };
  },
  esbuildOptions(esbuild) {
    esbuild.banner = {
      js: '"use client"',
    };
  },
}));
