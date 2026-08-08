---
'@rxova/react-password-input': minor
---

Always cap the password field's length. `maxLength` now defaults to 128 rather than being left
unset, because an unbounded field lets a single paste drive unbounded estimator work on every
keystroke and unbounded KDF work at whatever the form posts to. NIST SP 800-63B requires accepting
at least 64 characters and says nothing about accepting unlimited ones, so the default clears that
floor twice over and stays well past the longest passphrase anyone types.

The prop now only moves the cap; it can no longer remove it. A `maxLength` below `minLength` is
still unsatisfiable, but it now falls back to the default instead of dropping the bound, and the
accompanying warning says which value was used rather than claiming the prop was ignored. A
non-finite `maxLength` is rejected for the same reason — `Infinity >= minLength` is true, so it
previously passed the satisfiability check and restored the unbounded field.

Consumers relying on the field accepting arbitrarily long input should pass an explicit
`maxLength`.
