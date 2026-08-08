---
'@rxova/react-file-input': patch
---

Stop leaking a preview object URL on every StrictMode mount under React 18.

The URLs were minted while deriving the rendered list. React 18's StrictMode mounts by rendering
twice and keeping the second pass's hooks, so the first pass minted into a `Map` that was then
discarded with nothing left holding it — one unrevocable URL per previewable file, every mount, each
one pinning the whole file in memory for the lifetime of the document. React 19 did not show it, and
the component's own StrictMode spec caught it.

Minting and revoking now happen in an effect, which only runs for a render that committed, so each
URL pairs with exactly one revocation by construction. Server rendering falls out of the same
change: effects do not run there, so no URL is minted in markup that has no unmount to revoke it.

A file's URL is still stable across re-renders and is still revoked the moment the file leaves the
list. The one visible difference is that a preview now appears on the commit after the file is
added rather than in the same one, which is a frame earlier than the image could have decoded
anyway.
