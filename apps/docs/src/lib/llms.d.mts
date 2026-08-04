// Hand-written types for llms.mjs. See docs-pages.d.mts for why these are
// authored rather than inferred.

import type { ComponentRef, DocsPage } from './docs-pages.d.mts'

export interface PageGroup {
  heading: string
  pages: DocsPage[]
}

export declare function groupPages(
  pages: DocsPage[],
  components: ComponentRef[],
): { groups: PageGroup[]; optional: DocsPage[] }

export declare function llmsIndex(pages: DocsPage[], components: ComponentRef[]): string
export declare function llmsFull(pages: DocsPage[], components: ComponentRef[]): string
