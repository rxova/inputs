---
editUrl: false
next: false
prev: false
title: "UseWebOTPOptions"
---

## Properties

### enabled?

```ts
optional enabled?: boolean;
```

When false (the default path for an unset prop), the hook is inert.

***

### onReceive

```ts
onReceive: (code) => void;
```

Called with the received code, already the raw digits from the SMS.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `code` | `string` |

#### Returns

`void`

***

### signal?

```ts
optional signal?: AbortSignal;
```

Optional external signal; the request also aborts on unmount.
