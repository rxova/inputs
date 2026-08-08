---
'@rxova/react-phone-input': minor
---

Always cap the phone field's length. `maxLength` is new, defaults to `32`, and only moves the cap —
it cannot remove it. An unbounded field lets a single paste drive unbounded work on every keystroke:
the contents are re-parsed against the calling-code table, re-grouped and re-formatted, and the
caret position re-derived, none of which is bounded by the number itself.

`32` is derived rather than picked. E.164 caps a number at 15 digits including the calling code, so
the longest text this field can produce is 21 characters — the `+`, the code, and the digits with
their grouping separators — and the adversarial suite now asserts that against the country table
rather than trusting the figure. `32` leaves half again as much room for the brackets, dashes and
spaces people paste (`+44 (0)20 7123 4567` is 20 characters), so no number written the way people
write phone numbers is truncated.

A `maxLength` below `21` cannot hold a number the component itself formats, and a non-finite one
bounds nothing at all; both fall back to the default and report the new `max-length-too-small`
warning code. The cap is enforced on the rendered `<input>`, in `usePhoneInput` before parsing (the
attribute does not cover a programmatic paste or a headless renderer), and again after formatting,
since grouping inserts separators that push text already at the cap past it. `usePhoneInput` now
returns the coerced `maxLength` so a custom renderer can apply it too.
