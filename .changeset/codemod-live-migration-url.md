---
'@rxova/codemod': patch
---

Point the `input-otp-to-otp` banner at the live migration guide.

When the transform meets a `render` prop it cannot rewrite, it inserts a comment pointing at the
migration guide. That URL was `rxova.github.io/react-inputs/migrating/from-input-otp`, which is not
served — so the codemod was writing a dead link into users' source files. It now points at
`rxova.org/packages/react-inputs/migrating/from-input-otp`.

Also adds the badge row and docs links the other packages already had to this package's README.
