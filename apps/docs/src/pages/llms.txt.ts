// https://rxova.org/packages/react-inputs/llms.txt — the agent-facing index.
//
// See src/lib/llms.mjs for the document's shape. This is the adapter: read the
// pages, read the component list the config injected, serve the text.

import type { APIRoute } from 'astro'

import { docsPages } from '../lib/docs-md.mjs'
import { llmsIndex } from '../lib/llms.mjs'

export const prerender = true

export const GET: APIRoute = async () => {
  const pages = await docsPages({
    origin: import.meta.env.SITE,
    base: import.meta.env.BASE_URL,
  })

  return new Response(llmsIndex(pages, __RXOVA_COMPONENTS__), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
