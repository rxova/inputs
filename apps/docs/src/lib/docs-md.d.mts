// Hand-written types for docs-md.mjs. See docs-pages.d.mts for why these are
// authored rather than inferred.

import type { DocsPage } from './docs-pages.d.mts'

export declare function docsPages(options: { origin: string; base?: string }): Promise<DocsPage[]>
