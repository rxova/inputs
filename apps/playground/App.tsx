import { useState } from 'react'
import { CurrencyDemos } from '../../packages/react-intl-currency-input/demo/Demos'
import { RatingDemos } from '../../packages/react-rating-input/demo/Demos'
import { OtpDemos } from '../../packages/react-otp-input/demo/Demos'

/**
 * The manual-QA aggregator: it imports each package's own demo (the same one
 * that package's E2E suite drives standalone) and stitches them behind a tiny
 * path router. `vite preview` serves index.html for every path, so reading
 * `window.location.pathname` is enough to pick a page.
 */

function Landing() {
  return (
    <main>
      <h1>rxova inputs — playground</h1>
      <ul>
        <li>
          <a href="/currency">Currency input</a>
        </li>
        <li>
          <a href="/rating">Rating input</a>
        </li>
        <li>
          <a href="/otp">OTP input</a>
        </li>
      </ul>
    </main>
  )
}

function CurrencyRoute() {
  return (
    <>
      <header>
        <h1>Currency input</h1>
        <a href="https://github.com/rxova/react-intl-currency-input">GitHub</a>
      </header>
      <CurrencyDemos />
    </>
  )
}

function RatingRoute() {
  const [rtl, setRtl] = useState(false)

  return (
    <>
      <header>
        <h1>Rating input</h1>
        <label>
          <input
            type="checkbox"
            data-testid="rtl-toggle"
            checked={rtl}
            onChange={(e) => {
              setRtl(e.target.checked)
              document.documentElement.dir = e.target.checked ? 'rtl' : 'ltr'
            }}
          />
          Right-to-left
        </label>
      </header>
      <RatingDemos dir={rtl ? 'rtl' : 'ltr'} />
    </>
  )
}

function OtpRoute() {
  const [rtl, setRtl] = useState(false)

  return (
    <>
      <header>
        <h1>OTP input</h1>
        <label>
          <input
            type="checkbox"
            data-testid="rtl-toggle"
            checked={rtl}
            onChange={(e) => {
              setRtl(e.target.checked)
              document.documentElement.dir = e.target.checked ? 'rtl' : 'ltr'
            }}
          />
          Right-to-left
        </label>
      </header>
      <OtpDemos dir={rtl ? 'rtl' : 'ltr'} />
    </>
  )
}

export function App() {
  const path = window.location.pathname

  if (path === '/currency') return <CurrencyRoute />
  if (path === '/rating') return <RatingRoute />
  if (path === '/otp') return <OtpRoute />
  return <Landing />
}
