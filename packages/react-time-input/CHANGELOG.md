# @rxova/react-time-input

## 0.1.0

### Minor Changes

- [#60](https://github.com/rxova/react-inputs/pull/60) [`4b038de`](https://github.com/rxova/react-inputs/commit/4b038ded8581e07bdbbb1c4eac116c95c08cfa49) - New package: a segmented, keyboard-first time field with no clock popup and no date library.

  12- or 24-hour, segment order, separators and the AM/PM words all come from `Intl`, so every locale
  is correct and the package still has zero runtime dependencies — 3.7 kB brotli, against 9.8 kB and
  seven dependencies for the nearest rival.

  The value is an `HH:mm[:ss]` string end to end, always 24-hour whatever the field displays, and no
  `Date` is ever constructed: a time of day is not an instant. Midnight is 12 AM and hour 0, noon is
  12 PM and hour 12, and the test suite sweeps all 24 hours rather than sampling, because that fold is
  wrong in exactly two of them.

  Full keyboard entry with auto-advance, arrow stepping, Home/End, Backspace and `a`/`p`; spinbutton
  semantics per segment with the day period announced as its localised word; optional seconds and
  minute/second steps that must divide 60; inclusive `min`/`max` that mark rather than discard an
  out-of-range time; and `onWarn` reporting rejected props, stripped entirely from production builds.

- [#60](https://github.com/rxova/react-inputs/pull/60) [`4b038de`](https://github.com/rxova/react-inputs/commit/4b038ded8581e07bdbbb1c4eac116c95c08cfa49) - Add `dir`.

  Segment order is decided by `Intl` from the `locale`, and writing direction is a separate question.
  Nothing else in the field changes, which the test pins by asserting the segment order is untouched.

### Patch Changes

- [#60](https://github.com/rxova/react-inputs/pull/60) [`4b038de`](https://github.com/rxova/react-inputs/commit/4b038ded8581e07bdbbb1c4eac116c95c08cfa49) - Clear a half-typed segment when a controlled value changes so the next keystroke starts from the
  time visible on screen. Remove the unused `snapToStep` internal export; typed values remain
  unchanged while step options continue to control arrow-key movement.
