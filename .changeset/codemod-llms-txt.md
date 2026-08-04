---
'@rxova/codemod': patch
---

Ship an `llms.txt` in the package. An agent asked to migrate off another OTP library should find the executable path rather than rewrite call sites by hand — and should know that unmapped imports are left in place with a `TODO`, so a green build does not mean the migration finished.
