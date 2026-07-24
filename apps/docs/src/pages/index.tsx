import type { ReactNode } from 'react'
import Layout from '@theme/Layout'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import styles from './index.module.css'

interface ComponentCard {
  slug: string
  name: string
  blurb: string
  pkg: string
}

const COMPONENTS: ComponentCard[] = [
  {
    slug: '/currency',
    name: 'Currency',
    blurb:
      'Locale-aware money entry with correct grouping, symbols and no cursor bugs — in every Intl locale.',
    pkg: '@rxova/react-intl-currency-input',
  },
  {
    slug: '/rating',
    name: 'Rating',
    blurb:
      'Any icon, any precision, fully accessible. A real radiogroup when interactive, an image when read-only.',
    pkg: '@rxova/react-rating-input',
  },
  {
    slug: '/otp',
    name: 'OTP',
    blurb:
      'One-time-code entry with spatial slots, paste handling and WebOTP autofill — a single accessible input.',
    pkg: '@rxova/react-otp-input',
  },
]

const HIGHLIGHTS = [
  ['Headless', 'No stylesheet to import. Style with CSS custom properties and data-* hooks.'],
  ['Zero dependencies', 'react is the only peer. Nothing else ships to your bundle.'],
  ['Accessible', 'Real platform semantics — keyboard, focus and form behaviour from the browser.'],
]

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext()

  return (
    <Layout title="rxova" description={siteConfig.tagline}>
      <header className={styles.hero}>
        <h1 className={styles.heroTitle}>rxova</h1>
        <p className={styles.heroTagline}>{siteConfig.tagline}</p>
        <div className={styles.heroButtons}>
          <Link className="button button--primary button--lg" to="/getting-started/installation">
            Get started
          </Link>
          <Link className="button button--secondary button--lg" to="/overview">
            Why these three
          </Link>
        </div>
      </header>

      <main className="container margin-vert--xl">
        <div className={styles.cardGrid}>
          {COMPONENTS.map((c) => (
            <Link key={c.slug} to={c.slug} className={styles.card}>
              <h2 className={styles.cardName}>{c.name}</h2>
              <p className={styles.cardBlurb}>{c.blurb}</p>
              <code className={styles.cardPkg}>{c.pkg}</code>
            </Link>
          ))}
        </div>

        <div className={styles.highlights}>
          {HIGHLIGHTS.map(([title, body]) => (
            <div key={title} className={styles.highlight}>
              <h3 className={styles.highlightTitle}>{title}</h3>
              <p className={styles.highlightBody}>{body}</p>
            </div>
          ))}
        </div>
      </main>
    </Layout>
  )
}
