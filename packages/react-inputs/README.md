# @rxova/react-inputs

The complete [rxova](https://github.com/rxova/react-inputs) suite of headless, accessible React input components, from a single install.

```bash
npm i @rxova/react-inputs
```

```ts
import { CurrencyInput, Rating, OtpInput } from '@rxova/react-inputs'
```

This is a meta-package that re-exports the individual components. Prefer installing only what you need if you want the smallest dependency surface:

| Component                            | Standalone package                                                 |
| ------------------------------------ | ------------------------------------------------------------------ |
| `CurrencyInput`                      | [`@rxova/react-intl-currency-input`](../react-intl-currency-input) |
| `Rating`                             | [`@rxova/react-rating-input`](../react-rating-input)               |
| `OtpInput`, `OtpGroup`, `OtpSlot`, … | [`@rxova/react-otp-input`](../react-otp-input)                     |

See the [monorepo README](../../README.md) for the full suite.
