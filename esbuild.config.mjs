import process from 'node:process'

import esbuild from 'esbuild'
import cleanPlugin from 'esbuild-plugin-clean'
import minimist from 'minimist'

const { watch } = minimist(process.argv.slice(2))

/** @type {import('esbuild').BuildOptions} */
const config = {
  bundle: true,
  packages: 'external',
  plugins: [
    cleanPlugin({
      patterns: ['./dist'],
    }),
  ],
  entryPoints: {
    index: './src/main.ts',
  },
  format: 'esm',
  outdir: './dist',
}

if (watch) {
  const ctx = await esbuild.context(config)
  await ctx.watch()

  // eslint-disable-next-line no-console
  console.log('Watching for changes...')
} else {
  await esbuild.build(config)
}
