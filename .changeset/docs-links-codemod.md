---
'@rxova/codemod': patch
---

Point the `input-otp-to-otp` banner and the README at the OTP migration guide's
current URL. The old `/migrating/from-input-otp` route no longer exists, so the
comment the codemod writes into migrated source led to a 404.
