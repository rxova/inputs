---
'@rxova/react-time-input': patch
---

Clear a half-typed segment when a controlled value changes so the next keystroke starts from the
time visible on screen. Remove the unused `snapToStep` internal export; typed values remain
unchanged while step options continue to control arrow-key movement.
