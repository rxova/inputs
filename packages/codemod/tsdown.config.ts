import { defineConfig } from 'tsdown'

// The transforms and their CLI run under the jscodeshift Runner in Node, so
// build CJS — the format jscodeshift loads most reliably across consumer setups.
// Each transform is its own entry (globbed, so a new file in src/transforms/ is
// picked up automatically) and emits to dist/transforms/<name>.cjs, which the
// dispatcher in bin.ts resolves by name.
export default defineConfig({
  entry: ['src/bin.ts', 'src/transforms/*.ts'],
  format: ['cjs'],
  dts: true,
  clean: true,
})
