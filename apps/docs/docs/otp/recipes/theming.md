---
sidebar_position: 6
sidebar_label: Theming
---

# Theming

Everything visual is a `--otp-*` token or a `data-*` hook — there is no stylesheet and no theme to
override. See [Styling](../guides/styling.md) for the full token and hook list. A few common recipes:

## Underline slots (no boxes)

```css
[data-otp-root] {
  --otp-border: none;
  --otp-radius: 0;
}
[data-otp-slot] {
  border-bottom: 2px solid var(--ifm-color-emphasis-400);
}
[data-otp-slot][data-active] {
  border-bottom-color: #5a45d6;
}
```

## Filled slots

```css
[data-otp-root] {
  --otp-bg: #f4f4f5;
  --otp-border: 1px solid transparent;
}
[data-otp-slot][data-filled] {
  --otp-bg: #ede9fe;
}
```

## Error state

```css
[data-otp-root][data-invalid] [data-otp-slot] {
  border-color: #c0392b;
  --otp-caret-color: #c0392b;
}
```

Because the tokens cascade, you can scope a theme to a subtree or flip it per `data-theme` without
touching the component.
