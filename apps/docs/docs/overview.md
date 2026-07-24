---
title: rxova
slug: /overview
sidebar_label: Overview
sidebar_position: 0
---

# rxova

**The tricky React inputs, done right.** Three headless, accessible, zero-dependency
React input components that each solve a problem the ecosystem keeps getting wrong —
correct localized formatting, exact fractional ratings, and a real one-time-code field.
Same design principles across all three: one real `<input>` where it matters, native
form submission, keyboard and screen-reader support, and a small typed API backed by
tests. No stylesheet to import.

## The suite

### 💱 Currency — [`@rxova/react-intl-currency-input`](https://www.npmjs.com/package/@rxova/react-intl-currency-input)

A React currency `<input>` that's correct in every language — Bulgarian spaces, Japanese
yen, Hindi lakhs, Arabic digits — because it reads every locale fact from
`Intl.NumberFormat` instead of hardcoding "a comma every three digits". No cursor jumps.

- [Getting started](/currency) · [API reference](/components/currency/api)

### ⭐ Rating — [`@rxova/react-rating-input`](https://www.npmjs.com/package/@rxova/react-rating-input)

A rating component with exact partial fills for any icon — SVG, emoji, images, or custom
JSX — that becomes a fully accessible input the moment you add `onChange`. One component,
two modes: a read-only score and an interactive form control.

- [Getting started](/rating) · [API reference](/components/rating/api)

### 🔢 OTP — [`@rxova/react-otp-input`](https://www.npmjs.com/package/@rxova/react-otp-input)

A one-time-code input with one real `<input>` underneath and real slots painted on top —
so paste, SMS autofill, IME, and native form submission come from the platform, and you
can tap any slot to edit it.

- [Getting started](/otp) · [API reference](/components/otp/api)

## Shared conventions

Every component in the suite emits a plain value from `onChange` (a `number`, a `number`,
and a `string` respectively), posts natively under `name`, ships zero runtime
dependencies and no stylesheet, and is documented with a live playground plus an API
reference generated from source with TypeDoc.
