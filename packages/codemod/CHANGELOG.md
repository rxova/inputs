# @rxova/codemod

## 0.1.2

### Patch Changes

- [#13](https://github.com/rxova/react-inputs/pull/13) [`efc7bba`](https://github.com/rxova/react-inputs/commit/efc7bba37136fc1ec7e4dd5af0070870bc0d29ba) - Point the `input-otp-to-otp` banner and the README at the OTP migration guide's
  current URL. The old `/migrating/from-input-otp` route no longer exists, so the
  comment the codemod writes into migrated source led to a 404.

## 0.1.1

### Patch Changes

- [`f5dd58c`](https://github.com/rxova/react-inputs/commit/f5dd58c91d6aeef8cb7aa83d51e21a55f91326f9) Point the `input-otp-to-otp` banner at the live migration guide.

  When the transform meets a `render` prop it cannot rewrite, it inserts a comment pointing at the
  migration guide. That URL was `rxova.github.io/react-inputs/migrating/from-input-otp`, which is not
  served — so the codemod was writing a dead link into users' source files. It now points at
  `rxova.org/packages/react-inputs/migrating/from-input-otp`.

  Also adds the badge row and docs links the other packages already had to this package's README.
