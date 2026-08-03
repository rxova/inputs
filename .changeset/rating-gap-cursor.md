---
'@rxova/react-rating-input': patch
---

The pointer no longer flickers back to the default cursor in the gaps between icons: the interactive root now carries the same cursor as the per-step labels (`pointer`, or `not-allowed` when disabled). Read-only ratings are unchanged.
