---
editUrl: false
next: false
prev: false
title: "Rating"
---

```ts
const Rating: ForwardRefExoticComponent<RatingProps & RefAttributes<HTMLSpanElement>>;
```

`forwardRef` rather than reading `props.ref`.

React 19 passes `ref` as an ordinary prop, so `props.ref` works there — but
React 18 strips it before props are built, so the ref would silently never
populate. We declare `react >= 18` as a peer, so the version that needs
forwardRef is the one that decides.

The `@__PURE__` annotation is load-bearing: `forwardRef(...)` is a top-level
call, and without it bundlers must assume side effects and cannot drop this
component from a build that only imports `useRating`. That regressed the
headless entry from 902 B to 2.49 kB before the size budget caught it.
