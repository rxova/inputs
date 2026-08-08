---
'@rxova/react-intl-currency-input': major
'@rxova/react-password-input': major
'@rxova/react-phone-input': major
'@rxova/react-date-input': major
'@rxova/react-file-input': major
'@rxova/react-tags-input': major
'@rxova/react-time-input': major
'@rxova/codemod': major
---

Release the whole suite at `1.0.0`.

The version numbers had drifted apart for reasons that were accidents of order rather than
statements about maturity: packages that landed earlier had taken more `minor` bumps than packages
that landed later, so `0.1.0`, `0.2.0`, `0.3.0` and `1.0.0` all shipped side by side while meaning
the same thing. Every input in the suite is built to the same contract, tested to the same bar and
documented the same way, and the version each one happens to carry should not suggest otherwise.

Nothing in this release changes an API. It is a major bump because the number moves past `1.0.0`,
not because anything was removed or renamed, and no migration is required for any package.
