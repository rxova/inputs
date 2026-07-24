import { defineConfig } from 'tsdown'

// The transform and its CLI run under the jscodeshift Runner in Node, so build
// CJS — the format jscodeshift loads most reliably across consumer setups.
export default defineConfig({
  entry: ['src/transform.ts', 'src/bin.ts'],
  format: ['cjs'],
  dts: true,
  clean: true,
})
