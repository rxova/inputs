import type { StorybookConfig } from '@storybook/react-vite'
import remarkGfm from 'remark-gfm'

const config: StorybookConfig = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(ts|tsx)'],
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            // MDX ships without GitHub-flavored markdown: the Introduction's
            // package table renders as literal pipes without this.
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  core: {
    disableTelemetry: true,
  },
  // The suite logo, served for the manager theme's brandImage.
  staticDirs: ['../../../assets'],
  typescript: {
    // The slower, TS-compiler-backed extractor. The default (react-docgen)
    // reads only what Babel can see, which loses the imported `*Props`
    // interfaces these components are typed with; this one resolves them, so
    // the docs prop tables carry every prop with its JSDoc, type and default.
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      // CurrencyInput extends InputHTMLAttributes; without this filter its
      // table would drown the library's own props in hundreds of DOM ones.
      propFilter: (prop) => (prop.parent ? !prop.parent.fileName.includes('node_modules') : true),
    },
  },
}

export default config
