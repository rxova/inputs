import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import react from '@astrojs/react'
import starlightTypeDoc, { typeDocSidebarGroup } from 'starlight-typedoc'
import starlightLinksValidator from 'starlight-links-validator'
import { sharedStarlightConfig } from '@rxova/brand'
import remarkLiveCode from './src/plugins/remark-live-code.mjs'

/**
 * Defaults keep the standalone build working; the rxova.org aggregator sets
 * DOCS_URL / DOCS_BASE_URL to mount these docs under /packages/react-inputs/.
 */
const site = process.env.DOCS_URL ?? 'https://rxova.org'
const base = process.env.DOCS_BASE_URL ?? '/'

/**
 * One TypeDoc instance per component, matching the Docusaurus setup. A single
 * instance with three entry points would flip TypeDoc into multi-module mode
 * and rewrite every API URL.
 */
const typeDocDefaults = {
  typeDoc: {
    useCodeBlocks: true,
    disableSources: true,
    parametersFormat: 'table',
    enumMembersFormat: 'table',
  },
}

const component = (name, pkg) =>
  starlightTypeDoc({
    ...typeDocDefaults,
    entryPoints: [`../../packages/${pkg}/src/index.ts`],
    tsconfig: `../../packages/${pkg}/tsconfig.json`,
    output: `components/${name}/api`,
    sidebar: { label: 'Props & API', collapsed: true },
  })

export default defineConfig({
  site,
  base,

  markdown: {
    // Turns ```tsx live fences into the react-live island. Docusaurus had
    // theme-live-codeblock; Starlight has no equivalent, and for a component
    // library the editable examples are the product.
    remarkPlugins: [remarkLiveCode],
  },

  integrations: [
    react(),
    starlight({
      ...sharedStarlightConfig({
        project: 'react-inputs',
        customCss: ['./src/styles/live.css'],
        sidebar: [
          // COMPONENTS first: the component list is the product. Everything
          // else is reference material and sits below it.
          {
            label: 'Components',
            items: [
              { label: 'All components', link: '/components/' },
              { label: 'Currency', items: [{ autogenerate: { directory: 'components/currency' } }] },
              { label: 'Rating', items: [{ autogenerate: { directory: 'components/rating' } }] },
              { label: 'OTP', items: [{ autogenerate: { directory: 'components/otp' } }] },
            ],
          },
          {
            label: 'Getting started',
            items: [{ autogenerate: { directory: 'getting-started' } }],
          },
          { label: 'Guides', items: [{ autogenerate: { directory: 'guides' } }] },
          { label: 'Migrating', items: [{ autogenerate: { directory: 'migrating' } }] },
          typeDocSidebarGroup,
        ],
      }),
      plugins: [
        component('currency', 'react-intl-currency-input'),
        component('rating', 'react-rating-input'),
        component('otp', 'react-otp-input'),
        starlightLinksValidator({ errorOnRelativeLinks: false }),
      ],
    }),
  ],
})
