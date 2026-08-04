# @rxova/react-otp-input

## 0.1.7

### Patch Changes

- [#53](https://github.com/rxova/react-inputs/pull/53) [`8ee31e1`](https://github.com/rxova/react-inputs/commit/8ee31e1ce842c93c0e171a1926822695122a4fda) - Ship an `llms.txt` in the package. Coding agents read `node_modules` after an install, so this puts the install line, a working example, the full prop table, the CSS custom properties and the `data-*` hooks where they will actually be found — along with the three mistakes this component attracts, chief among them rendering one `<input>` per slot, which is the pattern it exists to avoid.

## 0.1.6

### Patch Changes

- [#42](https://github.com/rxova/react-inputs/pull/42) [`8eb69b6`](https://github.com/rxova/react-inputs/commit/8eb69b6d122a6ae72699a16165c598789bb24625) - Clicks now land the caret in the slot that was actually pressed, everywhere in the slot. The browser's own click-to-caret mapping broke down at the edges: a press on a slot's top or bottom border fell outside the invisible text's line box and mapped to the first slot, a full field scrolls by the trailing letter-spacing and shifted edge clicks into the next slot, and a separator pushed the second group off the uniform glyph pitch. The caret is now placed geometrically from the pressed point against the rendered slot rects, settling a frame after the click so Chrome's late selection collapse (which fires no `select` event) can't undo it.

## 0.1.5

### Patch Changes

- [#40](https://github.com/rxova/react-inputs/pull/40) [`1b1872e`](https://github.com/rxova/react-inputs/commit/1b1872e55bb7ccc262fddbf9c93830d56bf557e2) - Typing over a full code now works: a collapsed caret inside a complete value expands into a one-character selection over its slot (arrow keys walk it, pointer presses land it), so the next key replaces that character instead of being swallowed by `maxLength`. Keyboard focus now also parks the caret deterministically — on the first empty slot, or over the last character when the code is full — instead of wherever the browser drops it, and a disallowed key can no longer delete the character it was typed over.

## 0.1.4

### Patch Changes

- [#36](https://github.com/rxova/react-inputs/pull/36) [`7fc0751`](https://github.com/rxova/react-inputs/commit/7fc07514431fb245ac2468c4cd683fd2293d7478) - Focusing the field with a pointer press no longer flashes a stale slot active before the pressed one: the focus state now commits after the browser has placed the caret, in a single render.

## 0.1.3

### Patch Changes

- [#15](https://github.com/rxova/react-inputs/pull/15) [`7fc9910`](https://github.com/rxova/react-inputs/commit/7fc9910538a95983882f95324d7aaa2fdb75a7d9) - Declare the package in its own manifest (`rxova.slug`, `label`, `title`) so
  the docs sidebar, the CI matrices and the playground discover it instead of
  repeating it in a list each. No runtime change.

## 0.1.2

### Patch Changes

- [#13](https://github.com/rxova/react-inputs/pull/13) [`efc7bba`](https://github.com/rxova/react-inputs/commit/efc7bba37136fc1ec7e4dd5af0070870bc0d29ba) - Point the README and `homepage` at the routes the docs site actually serves.
  The Docusaurus-era `/packages/react-inputs/otp` landing route and the shared
  `/guides/*` pages were removed when the docs were restructured per component,
  so every documentation link on the npm page 404'd.

## 0.1.1

### Patch Changes

- [`f5dd58c`](https://github.com/rxova/react-inputs/commit/f5dd58c91d6aeef8cb7aa83d51e21a55f91326f9) - Correct the published README and package metadata after the move into the rxova monorepo.

  The README shown on npm is served from the published tarball, so these fixes required a release:

  - **Install commands and imports named the pre-migration packages.** The READMEs told users to
    install `react-feedback-stars`, `react-otp-slots` and `react-intl-currency-input`, and imported
    from those specifiers, none of which are the published names. They now use the `@rxova/*` names.
  - **Documentation links were dead.** Every `rxova.github.io/react-*` link, plus the `/recipes/*` and
    `/playground` routes, returned 404. They now point at the live docs on
    `rxova.org/packages/react-inputs`.
  - **CI badges pointed at the pre-migration repositories**, so they showed either a 404 image or the
    status of an archived repo. They now report this repository's CI.
  - **`homepage` in each manifest pointed at `rxova.github.io/react-inputs/…`**, which is not served —
    this is the "Homepage" link on the npm page. It now points at the live docs.
  - Added npm version badges, and documented each package's place in the suite.

  No runtime code changed in these packages; `dist` output is identical.
