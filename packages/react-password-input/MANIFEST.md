# Manifest — `@rxova/react-password-input`

Why this package exists, what it has to beat, and what "superior" means concretely.

Download figures are npm weekly downloads, and package metadata is from the npm registry, both
sampled 2026-07-29.

**Bundle sizes are measured, not quoted.** Every figure below is the package bundled with esbuild,
minified, with `react`/`react-dom` external, then brotli-compressed at quality 11 — the same
method this package's own size budget uses. Registry `unpackedSize` is _not_ comparable to a
bundle size (it includes source maps, several module formats and the TypeScript sources), so it is
not used for comparisons here.

## The incumbents

There is no dominant React password _input_. The category has split into two halves that never
merged, and almost every app ends up hand-rolling the glue between them.

### Half one: strength meters

| Package                                  |    Weekly | Runtime deps   | Bundled (brotli) | Notes                                                                          |
| ---------------------------------------- | --------: | -------------- | ---------------: | ------------------------------------------------------------------------------ |
| `react-password-strength-bar`            |    66,143 | `zxcvbn@4.4.2` |       **350 kB** | Bar only — "the input tag is not included"                                     |
| `react-password-strength`                |     7,325 | `zxcvbn`       |                — | Input + bar; README advises code-splitting because of zxcvbn's size            |
| `@enzoic/enzoic-react-password-strength` |       low | network SDK    |                — | Adds a hosted breach API; free to 100k requests/month, then degrades to zxcvbn |
| `zxcvbn` (the engine itself)             | 1,390,277 | —              |       **349 kB** | The estimator everything above wraps                                           |
| `@zxcvbn-ts/core` (the TS rewrite)       | 1,082,608 | —              |                — | Modular, but language packs are still hundreds of kB                           |

### Half two: everything else, hand-rolled

There is no meaningful npm package for "password input with a reveal toggle". It is one of the
most-written snippets in React tutorials — DigitalOcean, Upmostly, and a long tail of CodePens all
teach the same twelve lines. That is the real incumbent: **copy-pasted code with no tests.**

### What the incumbents are missing

1. **The meter costs more than the app.** `react-password-strength-bar` pulls in `zxcvbn@4.4.2`,
   pinned exactly. Bundled and brotli-compressed that is **350 kB** — the estimator is essentially
   all of it. For a signup form that is a wildly disproportionate trade:
   the meter is a nudge, and the defences that actually matter (a length floor, a breach check,
   server-side rate limiting) live elsewhere. Everyone knows this — hence the "you should
   code-split this" note in the README, which pushes the problem to the consumer.
2. **No reveal toggle worth shipping.** The copy-paste version flips `type` between `password` and
   `text` and stops there. It typically: submits the form (a `<button>` inside a form defaults to
   `type="submit"`), loses focus to the button, **loses the caret**, has no `aria-pressed`, and
   never re-masks on blur.
3. **The caret bug is universal.** Every engine collapses an input's selection during the
   `mousedown` that precedes the toggle click. "Reveal to check the last character I typed" then
   drops the caret to position 0 and the next keystroke lands in the wrong place. We found no
   package that handles this.
4. **No Caps Lock warning.** The single highest-value affordance in a masked field — the user
   cannot see what they typed — and it is absent from every package surveyed.
5. **Composition rules by default.** The upper/lower/digit/symbol checklist is the default mental
   model, despite NIST SP 800-63B explicitly advising against it since 2017 because it drives users
   to `Password1!`.
6. **No breach-corpus story that respects privacy.** Enzoic's package solves it by sending the
   password to a vendor. Everyone else ignores it.
7. **No diagnostics hook.** Misconfiguration (a `maxLength` below `minLength`, `autocomplete="off"`
   silently breaking password managers) fails invisibly.

## What "superior" means here

| Claim                                       | How this package delivers it                                                                                                         | Verified by                                         |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------- |
| Does the important things the incumbents do | Strength meter, reveal toggle, requirement checklist, controlled/uncontrolled value, form integration                                | `password.browser.test.tsx`, `e2e/password.spec.ts` |
| Lightweight, no dependencies                | 4.7 kB brotli whole component, 1.2 kB for the estimator alone, zero runtime deps                                                     | `.size-limit.json`, enforced in CI                  |
| E2E across 3 browsers                       | 19 specs × Chromium, Firefox, WebKit = 57 runs                                                                                       | `playwright.config.ts`                              |
| 95% coverage                                | 99.4% statements / 98.5% branches, threshold enforced **per file**                                                                   | `vitest.config.ts`                                  |
| Accessibility                               | axe WCAG 2.1 A/AA on the component and on the whole page; toggle semantics, target size, colour-independence, live-region discipline | `a11y.browser.test.tsx`, `e2e/a11y.spec.ts`         |
| `onWarn` for a logger                       | 6 codes, stripped from production builds                                                                                             | `dev.browser.test.tsx`, `e2e/password.spec.ts`      |

### The size argument, concretely

|                      | This package | `react-password-strength-bar` |
| -------------------- | -----------: | ----------------------------: |
| Runtime dependencies |            0 |          1 (`zxcvbn`, pinned) |
| Estimator, brotli    |   **1.2 kB** |                        350 kB |
| Whole input, brotli  |   **4.7 kB** |       n/a — no input included |

That is roughly a **300×** reduction on the estimator, and the trade is stated honestly rather than
hidden: see "What it models, and what it does not" in the README. `estimate` restores zxcvbn for
anyone who wants it, as a deliberate choice rather than a default tax.

### Things we do that nobody else does

- **Caret survives the reveal.** Captured on the toggle's `mousedown` and re-applied on the next
  frame, because React re-syncs the controlled input after the click and clobbers the first
  restore. Verified in all three engines.
- **Caps Lock read off `getModifierState`**, so a lock turned on while typing the _username_ is
  still caught. Tracking keystrokes — the obvious implementation — misses exactly that case.
- **Breach checks with no library-issued network call.** Debounced, abortable, and a failed lookup
  reports _unknown_ rather than _safe_. An adversarial test asserts `fetch` is never called.
- **NIST-aligned defaults**: one length rule, no `maxLength`, `autocomplete` warnings.
- **Contained consumer code.** A throwing `estimate` or rule `test` degrades one widget instead of
  unmounting the login form.

## Scope

Deliberately **out** of scope:

- **Shipping a wordlist.** That is zxcvbn's job and it is good at it. `estimate` is the seam.
- **Making the network request.** Handing a library your users' plaintext passwords and trusting
  its egress is not a trade this package will make on your behalf.
- **A confirm-password field.** Two inputs and an equality check; it belongs in the app, not in a
  component whose semantics would then have to cover both.
- **Generating passwords.** `autocomplete="new-password"` already asks the browser and the user's
  password manager to do it, better than we could.
