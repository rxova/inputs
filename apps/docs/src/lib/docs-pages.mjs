// Pure helpers describing the shape of the docs as a set of pages.
//
// Kept apart from docs-md.mjs, which imports `astro:content` and so only exists
// inside an Astro build. Everything here is ordinary JavaScript over plain
// objects, which is what makes it testable — and these are exactly the rules
// worth testing, because a wrong route or a mis-sectioned page produces output
// that still looks complete.

import { splitFenced } from './mdx-to-markdown.mjs'

/**
 * Starlight's loader gives the home page the id `''`: it declares no slug and
 * lives at the collection root. Every route derived from it needs a name.
 */
export const HOME = 'index'

/** The `.md` route for a page id. `/` becomes `/index.md`, not `/.md`. */
export const mdRoute = (id) => `/${id || HOME}.md`

/** The canonical HTML route, which the `.md` twin cites as its source. */
export const htmlRoute = (id) => (id ? `/${id}/` : '/')

/**
 * Which part of the site a page belongs to, as llms.txt sections.
 *
 * `components` is the manifest-derived list from `componentPackages()`, so a
 * fourth component sections itself with no edit here.
 *
 * `api:<slug>` is deliberately distinct from `<slug>`: the generated TypeDoc
 * reference belongs under llms.txt's "Optional" heading — the spec's designated
 * place for "drop this if you are short on context" — not interleaved with prose.
 */
export function sectionOf(id, components) {
  if (id === HOME || id === 'overview') return 'root'
  if (id.startsWith('getting-started/')) return 'getting-started'

  for (const { slug } of components) {
    if (id === `components/${slug}` || id.startsWith(`components/${slug}/`)) {
      return id === `components/${slug}/api` || id.startsWith(`components/${slug}/api/`)
        ? `api:${slug}`
        : slug
    }
  }
  return 'other'
}

/**
 * First sentence of the body, for a page whose frontmatter carries no description.
 *
 * A bare link list in llms.txt is much less useful than one where every entry says
 * what it is, and most pages here do set a description — this is the fallback so
 * the ones that do not still contribute something.
 */
export function firstSentence(body) {
  // Fence CONTENTS, not just the fence markers. Filtering line-by-line on a
  // leading ``` drops the delimiters and leaves the code between them, so a page
  // that opens with an example would be described to an agent as "const a = 1".
  const prose = splitFenced(body)
    .unfenced.split('\n')
    // Fences, headings, JSX, and directive syntax: none of them summarise a page.
    .filter(
      (line) => line.trim() && !/^\s*(?:[`~]{3}|#|<|import\b|export\b|:::|\||-{3,})/.test(line),
    )
    .join(' ')
    // Emphasis comes off BEFORE the match, not after. overview.mdx opens
    // "**The tricky React inputs, done right.**" — with the markers still in, the
    // sentence-ending period is followed by `*` rather than whitespace, so the
    // first sentence does not match and the page silently loses its description.
    .replace(/[*_`[\]]/g, '')

  const match = /^(.{20,200}?[.!?])\s/.exec(`${prose} `)
  return match?.[1]
}

/**
 * The document served at a `.md` route.
 *
 * The synthesized frontmatter is not decoration. Starlight pages carry their title
 * in frontmatter and no H1 in the body, so passing the body through would arrive
 * untitled; `source` is what lets a reader cite the human page it came from.
 */
export function renderMarkdown(page) {
  return [
    '---',
    `title: ${JSON.stringify(page.title)}`,
    ...(page.description ? [`description: ${JSON.stringify(page.description)}`] : []),
    `source: ${page.htmlUrl}`,
    '---',
    '',
    `# ${page.title}`,
    '',
    page.body,
    '',
  ].join('\n')
}
