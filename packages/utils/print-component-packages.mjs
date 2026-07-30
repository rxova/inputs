/**
 * Prints the discovered component packages as GitHub Actions job outputs.
 *
 *   node packages/utils/print-component-packages.mjs >> "$GITHUB_OUTPUT"
 *
 * Two shapes of the same list, because the consumers need different ones:
 * `dirs` is JSON for `fromJSON(...)` in a matrix, `dirs_list` is
 * space-separated for a shell `for` loop.
 *
 * A script rather than `node -e` in the workflow: quoting JavaScript inside YAML
 * inside a shell step is three levels of escaping, and none of it can be run
 * locally to check.
 */
import process from 'node:process'

import { componentPackages } from './component-packages.mjs'

const dirs = componentPackages().map((pkg) => pkg.dir)

process.stdout.write(`dirs=${JSON.stringify(dirs)}\n`)
process.stdout.write(`dirs_list=${dirs.join(' ')}\n`)
