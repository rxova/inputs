---
'@rxova/react-intl-currency-input': patch
---

Live mode no longer lets an invalid keystroke disturb the field. An insertion that cannot contribute to the amount — a letter, a group separator, a second decimal separator — is rejected in `beforeinput`, so the value and the caret stay exactly where they were (a mid-string `,` used to reinterpret `1.234,56 €` as `12,34 €` and throw the caret to the end). Controlled hosts that echo `onValueChange` asynchronously (async stores, Storybook args) no longer clobber the field with stale text between the keystroke and the echo, which used to drop digits while typing and send the caret to the end.
