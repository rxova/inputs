---
'@rxova/react-password-input': minor
'@rxova/react-inputs': minor
---

Add `@rxova/react-password-input`: a headless password input with a reveal toggle, Caps Lock
warning, requirement checklist and an optional strength meter. The built-in estimator is roughly
1 kB rather than the ~350 kB a wordlist-backed one costs, and `estimate` swaps it out if you want
that trade. Breach checking is a callback (`checkCompromised`) rather than a built-in request, so
the plaintext never leaves the page unless the app sends it.

The meta-package re-exports it, so `@rxova/react-inputs` now includes `PasswordInput`,
`usePasswordInput`, `estimateStrength` and the rule helpers.
