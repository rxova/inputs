import { run as jscodeshift } from 'jscodeshift/src/Runner'
import { dirname, resolve } from 'node:path'
import process from 'node:process'

/**
 * `npx @rxova/codemod-otp <path…>` — a thin wrapper over the jscodeshift
 * Runner with the bundled transform and sensible defaults (TSX parser, common
 * extensions). Pass `--dry` to preview without writing.
 */
const args = process.argv.slice(2)
const paths = args.filter((a) => !a.startsWith('-'))

if (paths.length === 0) {
  console.error('Usage: rxova-codemod-otp [--dry] <path…>')
  process.exit(1)
}

// process.argv[1] is this script (dist/bin.cjs); the transform sits beside it.
const transformPath = resolve(dirname(process.argv[1] ?? ''), 'transform.cjs')
const dry = args.includes('--dry')

jscodeshift(transformPath, paths, {
  parser: 'tsx',
  extensions: 'tsx,ts,jsx,js',
  dry,
  print: dry,
  babel: true,
  verbose: 1,
})
  .then((stats) => {
    if (stats.error > 0) process.exitCode = 1
  })
  .catch((error: unknown) => {
    console.error(error)
    process.exitCode = 1
  })
