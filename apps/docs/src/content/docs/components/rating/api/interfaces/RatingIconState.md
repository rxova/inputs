---
editUrl: false
next: false
prev: false
title: "RatingIconState"
---

Per-icon state handed to an `icon` / `emptyIcon` render function.

## Properties

### active

```ts
active: boolean;
```

A hover or keyboard preview currently covers this icon.

***

### empty

```ts
empty: boolean;
```

`fill <= 0`

***

### fill

```ts
fill: number;
```

Fill ratio for this icon, 0..1.

***

### filled

```ts
filled: boolean;
```

`fill >= 1`

***

### index

```ts
index: number;
```

0-based position in the row.

***

### partial

```ts
partial: boolean;
```

`0 < fill < 1`
