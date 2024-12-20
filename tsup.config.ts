import glob from 'fast-glob';
import { defineConfig } from 'tsup';

export default defineConfig(async (_) => {
  return [
    {
      platform: 'node',
      format: 'cjs',
      clean: true,
      sourcemap: true,
      entry: await glob('./src/**/*.ts', {
        ignore: ['./src/components/**/*.ts', './src/pages/**/*.ts'],
      }),
      outDir: 'build',
    },
  ];
});
