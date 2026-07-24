import type { Config } from '@docusaurus/types'
import type * as Preset from '@docusaurus/preset-classic'
import { themes as prismThemes } from 'prism-react-renderer'

/** TypeDoc regenerates the API pages from each package's source on every build,
 *  so the reference can never drift from the code. A dedicated tsconfig per
 *  package keeps the library's test/build-only global types out of the program.
 *  Registered once per component with a distinct `id`/`out` so the three API
 *  trees live side by side. */
const typedocDefaults = {
  readme: 'none',
  indexFormat: 'table',
  parametersFormat: 'table',
  // Interface properties render as headings (not a table): TypeDoc's inherited
  // cross-references link to `#property-<name>`, and only heading anchors are
  // recognized by Docusaurus's anchor checker (raw HTML `id=` from tables is
  // not). 'list' makes those anchors real and resolvable.
  interfacePropertiesFormat: 'list',
  enumMembersFormat: 'table',
  useCodeBlocks: true,
  disableSources: true,
  hidePageHeader: true,
  hideBreadcrumbs: true,
  cleanOutputDir: true,
} as const

const config: Config = {
  title: 'rxova',
  tagline: 'The tricky React inputs, done right.',
  favicon: 'img/logo.png',

  // Defaults keep the standalone build working; the rxova.org aggregator sets
  // DOCS_URL / DOCS_BASE_URL to mount these docs under /packages/inputs/.
  url: process.env.DOCS_URL ?? 'https://rxova.github.io',
  baseUrl: process.env.DOCS_BASE_URL ?? '/inputs/',
  organizationName: 'rxova',
  projectName: 'inputs',
  trailingSlash: false,

  onBrokenLinks: 'warn',
  markdown: { hooks: { onBrokenMarkdownLinks: 'warn' } },

  // Live, editable examples. Every component's exports are injected into the
  // live scope by src/theme/ReactLiveScope, so ```tsx live blocks render for real.
  themes: ['@docusaurus/theme-live-codeblock'],

  i18n: { defaultLocale: 'en', locales: ['en'] },

  plugins: [
    [
      'docusaurus-plugin-typedoc',
      {
        ...typedocDefaults,
        id: 'api-currency',
        entryPoints: ['../../packages/react-intl-currency-input/src/index.ts'],
        tsconfig: '../../packages/react-intl-currency-input/tsconfig.typedoc.json',
        out: 'docs/components/currency/api',
      },
    ],
    [
      'docusaurus-plugin-typedoc',
      {
        ...typedocDefaults,
        id: 'api-rating',
        entryPoints: ['../../packages/react-rating-input/src/index.ts'],
        tsconfig: '../../packages/react-rating-input/tsconfig.typedoc.json',
        out: 'docs/components/rating/api',
      },
    ],
    [
      'docusaurus-plugin-typedoc',
      {
        ...typedocDefaults,
        id: 'api-otp',
        entryPoints: ['../../packages/react-otp-input/src/index.ts'],
        tsconfig: '../../packages/react-otp-input/tsconfig.typedoc.json',
        out: 'docs/components/otp/api',
      },
    ],
  ],

  presets: [
    [
      'classic',
      {
        // The debug plugin (dev-only inspector, @theme/Debug*) is what intermittently
        // fails the production build under concurrent `turbo run build` — its theme
        // modules land in the generated registry but aren't resolvable in a prod
        // build. We never need it, so disable it outright.
        debug: false,
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/rxova/inputs/tree/main/apps/docs/',
        },
        blog: false,
        theme: { customCss: './src/css/custom.css' },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'rxova',
      // Lean top bar — the persistent left sidebar carries the component list.
      items: [
        {
          type: 'doc',
          docId: 'getting-started/installation',
          label: 'Get started',
          position: 'left',
        },
        { type: 'doc', docId: 'guides/accessibility', label: 'Guides', position: 'left' },
        {
          href: 'https://www.npmjs.com/package/@rxova/react-inputs',
          position: 'right',
          label: 'npm',
        },
        {
          href: 'https://github.com/rxova/inputs',
          position: 'right',
          label: 'GitHub',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright:
        'MIT-licensed. Built with Docusaurus. API reference generated from source with TypeDoc.',
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
}

export default config
