---
editUrl: false
next: false
prev: false
title: "currencyForCountry"
---

```ts
function currencyForCountry(country): string | undefined;
```

Look up a likely currency for a country code. Best-effort — see the module
doc. Returns `undefined` when the country is unknown.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `country` | `string` | ISO-3166-1 alpha-2 code, case-insensitive (e.g. `'BG'`). |

## Returns

`string` \| `undefined`
