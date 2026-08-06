---
'@rxova/react-file-input': minor
---

Track drag depth only on `dragenter` so repeated browser `dragover` events cannot leave the drop
zone highlighted, leave empty drops to the browser, and discard stale focus moves when a controlled
parent refuses a removal.
