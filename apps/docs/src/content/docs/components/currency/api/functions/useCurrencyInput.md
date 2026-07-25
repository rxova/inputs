---
editUrl: false
next: false
prev: false
title: "useCurrencyInput"
---

```ts
function useCurrencyInput(options): UseCurrencyInputResult;
```

Headless currency-input state machine.

In `'live'` mode (the default) the field formats as you type — grouping and
the symbol stay visible — and the caret is kept in place by counting the
significant characters (digits and the decimal separator) to its left,
reformatting, then placing it after the same count. Because it counts *digits*
rather than characters, the group separators that appear and disappear never
move it.

In `'blur'` mode the field shows a plain number while focused and only formats
on blur, so there is no caret to manage at all.

Either way the value is the source of truth and is always a `number` (or
`null`); the displayed string is a view.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `options` | [`UseCurrencyInputOptions`](/components/currency/api/interfaces/usecurrencyinputoptions/) |

## Returns

[`UseCurrencyInputResult`](/components/currency/api/interfaces/usecurrencyinputresult/)
