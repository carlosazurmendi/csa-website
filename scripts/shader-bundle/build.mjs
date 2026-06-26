// Bundle React 18 + @paper-design/shaders-react into a single self-contained ESM
// file served from our own origin. Run from this directory after `npm install`.
import { build } from 'esbuild'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const outfile = resolve(here, '../../public/csa/vendor/paper-shaders.bundle.js')

await build({
  entryPoints: [resolve(here, 'entry.mjs')],
  outfile,
  bundle: true,
  format: 'esm',
  minify: true,
  platform: 'browser',
  target: ['es2020'],
  legalComments: 'none',
  // React/Paper ship dev/prod branches gated on this; force the prod path.
  define: { 'process.env.NODE_ENV': '"production"' },
})

console.log('wrote', outfile)
