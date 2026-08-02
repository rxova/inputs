import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

// Loaded by Storybook's Vite builder (it picks up the project vite.config
// automatically). Same convention as the playground: every workspace package is
// aliased to its *source*, so the workshop runs — dev and build — without a
// prior library build, and prop tables are extracted from the annotated source
// rather than from bundled output.
const src = (rel: string) => fileURLToPath(new URL(rel, import.meta.url))

export default defineConfig({
  plugins: [react()],
  resolve: {
    // One rule covers every input and any added later: `@rxova/<name>` lives in
    // `packages/<name>`. No subpath entries are needed here — the stories ship
    // their own stylesheet instead of demo-kit's page chrome.
    alias: [
      {
        find: /^@rxova\/([^/]+)$/,
        replacement: src('../../packages/$1/src/index.ts'),
      },
    ],
  },
})
