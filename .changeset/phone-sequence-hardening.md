---
'@rxova/react-phone-input': patch
---

Make Backspace and Delete remove the adjacent digit at formatting boundaries instead of deleting a
separator that the formatter immediately restores.
