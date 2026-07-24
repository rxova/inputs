import { run as jscodeshift } from 'jscodeshift/src/Runner'
import { dirname, resolve } from 'node:path'
import process from 'node:process'
import { TRANSFORMS } from './registry'

/**
 * `npx @rxova/codemod <transform> [--dry] <path…>` — a dispatcher over the
 * jscodeshift Runner. It resolves the named transform to the file built beside
 * this script (dist/transforms/<name>.cjs) and runs it with sensible defaults
 * (TSX parser, common extensions). `--dry` previews without writing.
 */

function usage(): void {
  console.error('Usage: rxova-codemod <transform> [--dry] <path…>\n')
  console.error('Transforms:')
  const width = Math.max(...TRANSFORMS.map((t) => t.name.length))
  for (const t of TRANSFORMS) {
    console.error(`  ${t.name.padEnd(width)}  ${t.description}`)
  }
}

const args = process.argv.slice(2)
const positionals = args.filter((a) => !a.startsWith('-'))
const [name, ...paths] = positionals

if (!name || args.includes('--help') || args.includes('-h')) {
  usage()
  process.exit(name ? 0 : 1)
}

const entry = TRANSFORMS.find((t) => t.name === name)
if (!entry) {
  console.error(`Unknown transform: ${name}\n`)
  usage()
  process.exit(1)
}

if (paths.length === 0) {
  console.error(`No paths given for "${name}".\n`)
  usage()
  process.exit(1)
}

// process.argv[1] is this script (dist/bin.cjs); transforms sit in dist/transforms/.
const transformPath = resolve(dirname(process.argv[1] ?? ''), 'transforms', `${name}.cjs`)
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
