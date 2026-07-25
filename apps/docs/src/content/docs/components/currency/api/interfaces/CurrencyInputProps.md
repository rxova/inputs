---
editUrl: false
next: false
prev: false
title: "CurrencyInputProps"
---

Props for [CurrencyInput](/components/currency/api/variables/currencyinput/).

## Extends

- [`CurrencyInputBaseOptions`](/components/currency/api/interfaces/currencyinputbaseoptions/).`Omit`\<`InputHTMLAttributes`\<`HTMLInputElement`\>, `"value"` \| `"defaultValue"` \| `"onChange"` \| `"step"`\>

## Properties

### about?

```ts
optional about?: string;
```

#### Inherited from

```ts
Omit.about
```

***

### accept?

```ts
optional accept?: string;
```

#### Inherited from

```ts
Omit.accept
```

***

### accessKey?

```ts
optional accessKey?: string;
```

#### Inherited from

```ts
Omit.accessKey
```

***

### allowNegative?

```ts
optional allowNegative?: boolean;
```

Allow negative amounts (refunds, adjustments).

#### Default

```ts
false
```

#### Inherited from

[`CurrencyInputBaseOptions`](/components/currency/api/interfaces/currencyinputbaseoptions/).[`allowNegative`](/components/currency/api/interfaces/currencyinputbaseoptions/#allownegative)

***

### alt?

```ts
optional alt?: string;
```

#### Inherited from

```ts
Omit.alt
```

***

### aria-activedescendant?

```ts
optional aria-activedescendant?: string;
```

Identifies the currently active element when DOM focus is on a composite widget, textbox, group, or application.

#### Inherited from

```ts
Omit.aria-activedescendant
```

***

### aria-atomic?

```ts
optional aria-atomic?: Booleanish;
```

Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute.

#### Inherited from

```ts
Omit.aria-atomic
```

***

### aria-autocomplete?

```ts
optional aria-autocomplete?: "list" | "none" | "inline" | "both";
```

Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be
presented if they are made.

#### Inherited from

```ts
Omit.aria-autocomplete
```

***

### aria-braillelabel?

```ts
optional aria-braillelabel?: string;
```

Defines a string value that labels the current element, which is intended to be converted into Braille.

#### See

aria-label.

#### Inherited from

```ts
Omit.aria-braillelabel
```

***

### aria-brailleroledescription?

```ts
optional aria-brailleroledescription?: string;
```

Defines a human-readable, author-localized abbreviated description for the role of an element, which is intended to be converted into Braille.

#### See

aria-roledescription.

#### Inherited from

```ts
Omit.aria-brailleroledescription
```

***

### aria-busy?

```ts
optional aria-busy?: Booleanish;
```

#### Inherited from

```ts
Omit.aria-busy
```

***

### aria-checked?

```ts
optional aria-checked?: boolean | "false" | "true" | "mixed";
```

Indicates the current "checked" state of checkboxes, radio buttons, and other widgets.

#### See

 - aria-pressed
 - aria-selected.

#### Inherited from

```ts
Omit.aria-checked
```

***

### aria-colcount?

```ts
optional aria-colcount?: number;
```

Defines the total number of columns in a table, grid, or treegrid.

#### See

aria-colindex.

#### Inherited from

```ts
Omit.aria-colcount
```

***

### aria-colindex?

```ts
optional aria-colindex?: number;
```

Defines an element's column index or position with respect to the total number of columns within a table, grid, or treegrid.

#### See

 - aria-colcount
 - aria-colspan.

#### Inherited from

```ts
Omit.aria-colindex
```

***

### aria-colindextext?

```ts
optional aria-colindextext?: string;
```

Defines a human readable text alternative of aria-colindex.

#### See

aria-rowindextext.

#### Inherited from

```ts
Omit.aria-colindextext
```

***

### aria-colspan?

```ts
optional aria-colspan?: number;
```

Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid.

#### See

 - aria-colindex
 - aria-rowspan.

#### Inherited from

```ts
Omit.aria-colspan
```

***

### aria-controls?

```ts
optional aria-controls?: string;
```

Identifies the element (or elements) whose contents or presence are controlled by the current element.

#### See

aria-owns.

#### Inherited from

```ts
Omit.aria-controls
```

***

### aria-current?

```ts
optional aria-current?: boolean | "step" | "date" | "time" | "false" | "true" | "page" | "location";
```

Indicates the element that represents the current item within a container or set of related elements.

#### Inherited from

```ts
Omit.aria-current
```

***

### aria-describedby?

```ts
optional aria-describedby?: string;
```

Identifies the element (or elements) that describes the object.

#### See

aria-labelledby

#### Inherited from

```ts
Omit.aria-describedby
```

***

### aria-description?

```ts
optional aria-description?: string;
```

Defines a string value that describes or annotates the current element.

#### See

related aria-describedby.

#### Inherited from

```ts
Omit.aria-description
```

***

### aria-details?

```ts
optional aria-details?: string;
```

Identifies the element that provides a detailed, extended description for the object.

#### See

aria-describedby.

#### Inherited from

```ts
Omit.aria-details
```

***

### aria-disabled?

```ts
optional aria-disabled?: Booleanish;
```

Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.

#### See

 - aria-hidden
 - aria-readonly.

#### Inherited from

```ts
Omit.aria-disabled
```

***

### ~~aria-dropeffect?~~

```ts
optional aria-dropeffect?: "link" | "none" | "copy" | "execute" | "move" | "popup";
```

Indicates what functions can be performed when a dragged object is released on the drop target.

:::caution[Deprecated]
in ARIA 1.1
:::

#### Inherited from

```ts
Omit.aria-dropeffect
```

***

### aria-errormessage?

```ts
optional aria-errormessage?: string;
```

Identifies the element that provides an error message for the object.

#### See

 - aria-invalid
 - aria-describedby.

#### Inherited from

```ts
Omit.aria-errormessage
```

***

### aria-expanded?

```ts
optional aria-expanded?: Booleanish;
```

Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed.

#### Inherited from

```ts
Omit.aria-expanded
```

***

### aria-flowto?

```ts
optional aria-flowto?: string;
```

Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion,
allows assistive technology to override the general default of reading in document source order.

#### Inherited from

```ts
Omit.aria-flowto
```

***

### ~~aria-grabbed?~~

```ts
optional aria-grabbed?: Booleanish;
```

Indicates an element's "grabbed" state in a drag-and-drop operation.

:::caution[Deprecated]
in ARIA 1.1
:::

#### Inherited from

```ts
Omit.aria-grabbed
```

***

### aria-haspopup?

```ts
optional aria-haspopup?: 
  | boolean
  | "false"
  | "true"
  | "dialog"
  | "grid"
  | "listbox"
  | "menu"
  | "tree";
```

Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element.

#### Inherited from

```ts
Omit.aria-haspopup
```

***

### aria-hidden?

```ts
optional aria-hidden?: Booleanish;
```

Indicates whether the element is exposed to an accessibility API.

#### See

aria-disabled.

#### Inherited from

```ts
Omit.aria-hidden
```

***

### aria-invalid?

```ts
optional aria-invalid?: boolean | "false" | "true" | "grammar" | "spelling";
```

Indicates the entered value does not conform to the format expected by the application.

#### See

aria-errormessage.

#### Inherited from

```ts
Omit.aria-invalid
```

***

### aria-keyshortcuts?

```ts
optional aria-keyshortcuts?: string;
```

Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element.

#### Inherited from

```ts
Omit.aria-keyshortcuts
```

***

### aria-label?

```ts
optional aria-label?: string;
```

Defines a string value that labels the current element.

#### See

aria-labelledby.

#### Inherited from

```ts
Omit.aria-label
```

***

### aria-labelledby?

```ts
optional aria-labelledby?: string;
```

Identifies the element (or elements) that labels the current element.

#### See

aria-describedby.

#### Inherited from

```ts
Omit.aria-labelledby
```

***

### aria-level?

```ts
optional aria-level?: number;
```

Defines the hierarchical level of an element within a structure.

#### Inherited from

```ts
Omit.aria-level
```

***

### aria-live?

```ts
optional aria-live?: "off" | "assertive" | "polite";
```

Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region.

#### Inherited from

```ts
Omit.aria-live
```

***

### aria-modal?

```ts
optional aria-modal?: Booleanish;
```

Indicates whether an element is modal when displayed.

#### Inherited from

```ts
Omit.aria-modal
```

***

### aria-multiline?

```ts
optional aria-multiline?: Booleanish;
```

Indicates whether a text box accepts multiple lines of input or only a single line.

#### Inherited from

```ts
Omit.aria-multiline
```

***

### aria-multiselectable?

```ts
optional aria-multiselectable?: Booleanish;
```

Indicates that the user may select more than one item from the current selectable descendants.

#### Inherited from

```ts
Omit.aria-multiselectable
```

***

### aria-orientation?

```ts
optional aria-orientation?: "horizontal" | "vertical";
```

Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous.

#### Inherited from

```ts
Omit.aria-orientation
```

***

### aria-owns?

```ts
optional aria-owns?: string;
```

Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child relationship
between DOM elements where the DOM hierarchy cannot be used to represent the relationship.

#### See

aria-controls.

#### Inherited from

```ts
Omit.aria-owns
```

***

### aria-placeholder?

```ts
optional aria-placeholder?: string;
```

Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value.
A hint could be a sample value or a brief description of the expected format.

#### Inherited from

```ts
Omit.aria-placeholder
```

***

### aria-posinset?

```ts
optional aria-posinset?: number;
```

Defines an element's number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.

#### See

aria-setsize.

#### Inherited from

```ts
Omit.aria-posinset
```

***

### aria-pressed?

```ts
optional aria-pressed?: boolean | "false" | "true" | "mixed";
```

Indicates the current "pressed" state of toggle buttons.

#### See

 - aria-checked
 - aria-selected.

#### Inherited from

```ts
Omit.aria-pressed
```

***

### aria-readonly?

```ts
optional aria-readonly?: Booleanish;
```

Indicates that the element is not editable, but is otherwise operable.

#### See

aria-disabled.

#### Inherited from

```ts
Omit.aria-readonly
```

***

### aria-relevant?

```ts
optional aria-relevant?: 
  | "text"
  | "additions"
  | "additions removals"
  | "additions text"
  | "all"
  | "removals"
  | "removals additions"
  | "removals text"
  | "text additions"
  | "text removals";
```

Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified.

#### See

aria-atomic.

#### Inherited from

```ts
Omit.aria-relevant
```

***

### aria-required?

```ts
optional aria-required?: Booleanish;
```

Indicates that user input is required on the element before a form may be submitted.

#### Inherited from

```ts
Omit.aria-required
```

***

### aria-roledescription?

```ts
optional aria-roledescription?: string;
```

Defines a human-readable, author-localized description for the role of an element.

#### Inherited from

```ts
Omit.aria-roledescription
```

***

### aria-rowcount?

```ts
optional aria-rowcount?: number;
```

Defines the total number of rows in a table, grid, or treegrid.

#### See

aria-rowindex.

#### Inherited from

```ts
Omit.aria-rowcount
```

***

### aria-rowindex?

```ts
optional aria-rowindex?: number;
```

Defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid.

#### See

 - aria-rowcount
 - aria-rowspan.

#### Inherited from

```ts
Omit.aria-rowindex
```

***

### aria-rowindextext?

```ts
optional aria-rowindextext?: string;
```

Defines a human readable text alternative of aria-rowindex.

#### See

aria-colindextext.

#### Inherited from

```ts
Omit.aria-rowindextext
```

***

### aria-rowspan?

```ts
optional aria-rowspan?: number;
```

Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid.

#### See

 - aria-rowindex
 - aria-colspan.

#### Inherited from

```ts
Omit.aria-rowspan
```

***

### aria-selected?

```ts
optional aria-selected?: Booleanish;
```

Indicates the current "selected" state of various widgets.

#### See

 - aria-checked
 - aria-pressed.

#### Inherited from

```ts
Omit.aria-selected
```

***

### aria-setsize?

```ts
optional aria-setsize?: number;
```

Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.

#### See

aria-posinset.

#### Inherited from

```ts
Omit.aria-setsize
```

***

### aria-sort?

```ts
optional aria-sort?: "none" | "ascending" | "descending" | "other";
```

Indicates if items in a table or grid are sorted in ascending or descending order.

#### Inherited from

```ts
Omit.aria-sort
```

***

### aria-valuemax?

```ts
optional aria-valuemax?: number;
```

Defines the maximum allowed value for a range widget.

#### Inherited from

```ts
Omit.aria-valuemax
```

***

### aria-valuemin?

```ts
optional aria-valuemin?: number;
```

Defines the minimum allowed value for a range widget.

#### Inherited from

```ts
Omit.aria-valuemin
```

***

### aria-valuenow?

```ts
optional aria-valuenow?: number;
```

Defines the current value for a range widget.

#### See

aria-valuetext.

#### Inherited from

```ts
Omit.aria-valuenow
```

***

### aria-valuetext?

```ts
optional aria-valuetext?: string;
```

Defines the human readable text alternative of aria-valuenow for a range widget.

#### Inherited from

```ts
Omit.aria-valuetext
```

***

### autoCapitalize?

```ts
optional autoCapitalize?: 
  | "off"
  | string & object
  | "none"
  | "on"
  | "sentences"
  | "words"
  | "characters";
```

#### Inherited from

```ts
Omit.autoCapitalize
```

***

### autoComplete?

```ts
optional autoComplete?: HTMLInputAutoCompleteAttribute;
```

#### Inherited from

```ts
Omit.autoComplete
```

***

### autoCorrect?

```ts
optional autoCorrect?: string;
```

#### Inherited from

```ts
Omit.autoCorrect
```

***

### autoFocus?

```ts
optional autoFocus?: boolean;
```

#### Inherited from

```ts
Omit.autoFocus
```

***

### autoSave?

```ts
optional autoSave?: string;
```

#### Inherited from

```ts
Omit.autoSave
```

***

### capture?

```ts
optional capture?: boolean | "user" | "environment";
```

#### Inherited from

```ts
Omit.capture
```

***

### checked?

```ts
optional checked?: boolean;
```

#### Inherited from

```ts
Omit.checked
```

***

### children?

```ts
optional children?: ReactNode;
```

#### Inherited from

```ts
Omit.children
```

***

### className?

```ts
optional className?: string;
```

#### Overrides

```ts
Omit.className
```

***

### color?

```ts
optional color?: string;
```

#### Inherited from

```ts
Omit.color
```

***

### content?

```ts
optional content?: string;
```

#### Inherited from

```ts
Omit.content
```

***

### contentEditable?

```ts
optional contentEditable?: Booleanish | "inherit" | "plaintext-only";
```

#### Inherited from

```ts
Omit.contentEditable
```

***

### contextMenu?

```ts
optional contextMenu?: string;
```

#### Inherited from

```ts
Omit.contextMenu
```

***

### country?

```ts
optional country?: string;
```

Convenience: combined into `${language}-${country}` when `locale` is absent.

#### Inherited from

[`CurrencyInputBaseOptions`](/components/currency/api/interfaces/currencyinputbaseoptions/).[`country`](/components/currency/api/interfaces/currencyinputbaseoptions/#country)

***

### currency

```ts
currency: string;
```

ISO-4217 currency code, e.g. `'EUR'`, `'BGN'`, `'JPY'`. Required.

#### Inherited from

[`CurrencyInputBaseOptions`](/components/currency/api/interfaces/currencyinputbaseoptions/).[`currency`](/components/currency/api/interfaces/currencyinputbaseoptions/#currency)

***

### currencyDisplay?

```ts
optional currencyDisplay?: CurrencyDisplay;
```

How the currency is displayed.

#### Default

```ts
'symbol'
```

#### Inherited from

[`CurrencyInputBaseOptions`](/components/currency/api/interfaces/currencyinputbaseoptions/).[`currencyDisplay`](/components/currency/api/interfaces/currencyinputbaseoptions/#currencydisplay)

***

### dangerouslySetInnerHTML?

```ts
optional dangerouslySetInnerHTML?: object;
```

#### \_\_html

```ts
__html: string | TrustedHTML;
```

#### Inherited from

```ts
Omit.dangerouslySetInnerHTML
```

***

### datatype?

```ts
optional datatype?: string;
```

#### Inherited from

```ts
Omit.datatype
```

***

### defaultChecked?

```ts
optional defaultChecked?: boolean;
```

#### Inherited from

```ts
Omit.defaultChecked
```

***

### defaultValue?

```ts
optional defaultValue?: number | null;
```

Uncontrolled initial amount.

***

### dir?

```ts
optional dir?: string;
```

#### Inherited from

```ts
Omit.dir
```

***

### disabled?

```ts
optional disabled?: boolean;
```

#### Inherited from

```ts
Omit.disabled
```

***

### draggable?

```ts
optional draggable?: Booleanish;
```

#### Inherited from

```ts
Omit.draggable
```

***

### enterKeyHint?

```ts
optional enterKeyHint?: "search" | "enter" | "done" | "go" | "next" | "previous" | "send";
```

#### Inherited from

```ts
Omit.enterKeyHint
```

***

### exportparts?

```ts
optional exportparts?: string;
```

#### See

[https://developer.mozilla.org/en-US/docs/Web/HTML/Global\_attributes/exportparts](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/exportparts)

#### Inherited from

```ts
Omit.exportparts
```

***

### form?

```ts
optional form?: string;
```

#### Inherited from

```ts
Omit.form
```

***

### formAction?

```ts
optional formAction?: string | ((formData) => void | Promise<void>);
```

#### Inherited from

```ts
Omit.formAction
```

***

### formatMode?

```ts
optional formatMode?: FormatMode;
```

When the field formats. `'live'` (default) formats as you type with a
stable caret; `'blur'` shows a plain number while focused.

#### Default

```ts
'live'
```

#### Inherited from

[`CurrencyInputBaseOptions`](/components/currency/api/interfaces/currencyinputbaseoptions/).[`formatMode`](/components/currency/api/interfaces/currencyinputbaseoptions/#formatmode)

***

### formEncType?

```ts
optional formEncType?: string;
```

#### Inherited from

```ts
Omit.formEncType
```

***

### formMethod?

```ts
optional formMethod?: string;
```

#### Inherited from

```ts
Omit.formMethod
```

***

### formNoValidate?

```ts
optional formNoValidate?: boolean;
```

#### Inherited from

```ts
Omit.formNoValidate
```

***

### formTarget?

```ts
optional formTarget?: string;
```

#### Inherited from

```ts
Omit.formTarget
```

***

### height?

```ts
optional height?: string | number;
```

#### Inherited from

```ts
Omit.height
```

***

### hidden?

```ts
optional hidden?: boolean;
```

#### Inherited from

```ts
Omit.hidden
```

***

### id?

```ts
optional id?: string;
```

#### Inherited from

```ts
Omit.id
```

***

### inert?

```ts
optional inert?: boolean;
```

#### See

[https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/inert](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/inert)

#### Inherited from

```ts
Omit.inert
```

***

### inlist?

```ts
optional inlist?: any;
```

#### Inherited from

```ts
Omit.inlist
```

***

### inputMode?

```ts
optional inputMode?: 
  | "text"
  | "decimal"
  | "search"
  | "email"
  | "tel"
  | "url"
  | "none"
  | "numeric";
```

Hints at the type of data that might be entered by the user while editing the element or its contents

#### See

[https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute](https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute)

#### Inherited from

```ts
Omit.inputMode
```

***

### invalid?

```ts
optional invalid?: boolean;
```

Marks the field invalid: sets `aria-invalid` and `data-invalid`.

***

### is?

```ts
optional is?: string;
```

Specify that a standard HTML element should behave like a defined custom built-in element

#### See

[https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is](https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is)

#### Inherited from

```ts
Omit.is
```

***

### itemID?

```ts
optional itemID?: string;
```

#### Inherited from

```ts
Omit.itemID
```

***

### itemProp?

```ts
optional itemProp?: string;
```

#### Inherited from

```ts
Omit.itemProp
```

***

### itemRef?

```ts
optional itemRef?: string;
```

#### Inherited from

```ts
Omit.itemRef
```

***

### itemScope?

```ts
optional itemScope?: boolean;
```

#### Inherited from

```ts
Omit.itemScope
```

***

### itemType?

```ts
optional itemType?: string;
```

#### Inherited from

```ts
Omit.itemType
```

***

### lang?

```ts
optional lang?: string;
```

#### Inherited from

```ts
Omit.lang
```

***

### language?

```ts
optional language?: string;
```

Convenience: combined into `${language}-${country}` when `locale` is absent.

#### Inherited from

[`CurrencyInputBaseOptions`](/components/currency/api/interfaces/currencyinputbaseoptions/).[`language`](/components/currency/api/interfaces/currencyinputbaseoptions/#language)

***

### list?

```ts
optional list?: string;
```

#### Inherited from

```ts
Omit.list
```

***

### locale?

```ts
optional locale?: string;
```

BCP-47 locale, e.g. `'bg-BG'`. Takes precedence over `language`/`country`.
When all three are omitted the runtime default locale is used.

#### Inherited from

[`CurrencyInputBaseOptions`](/components/currency/api/interfaces/currencyinputbaseoptions/).[`locale`](/components/currency/api/interfaces/currencyinputbaseoptions/#locale)

***

### max?

```ts
optional max?: string | number;
```

#### Inherited from

```ts
Omit.max
```

***

### maximumFractionDigits?

```ts
optional maximumFractionDigits?: number;
```

Cap on fraction digits. Defaults to the currency's own default
(JPY → 0, EUR → 2, KWD → 3).

#### Inherited from

[`CurrencyInputBaseOptions`](/components/currency/api/interfaces/currencyinputbaseoptions/).[`maximumFractionDigits`](/components/currency/api/interfaces/currencyinputbaseoptions/#maximumfractiondigits)

***

### maxLength?

```ts
optional maxLength?: number;
```

#### Inherited from

```ts
Omit.maxLength
```

***

### min?

```ts
optional min?: string | number;
```

#### Inherited from

```ts
Omit.min
```

***

### minimumFractionDigits?

```ts
optional minimumFractionDigits?: number;
```

Floor on fraction digits in the formatted value.

#### Default

```ts
0
```

#### Inherited from

[`CurrencyInputBaseOptions`](/components/currency/api/interfaces/currencyinputbaseoptions/).[`minimumFractionDigits`](/components/currency/api/interfaces/currencyinputbaseoptions/#minimumfractiondigits)

***

### minLength?

```ts
optional minLength?: number;
```

#### Inherited from

```ts
Omit.minLength
```

***

### multiple?

```ts
optional multiple?: boolean;
```

#### Inherited from

```ts
Omit.multiple
```

***

### name?

```ts
optional name?: string;
```

#### Inherited from

```ts
Omit.name
```

***

### nonce?

```ts
optional nonce?: string;
```

#### Inherited from

```ts
Omit.nonce
```

***

### numberingSystem?

```ts
optional numberingSystem?: string;
```

Override the numbering system, e.g. `'latn'` to force ASCII digits.

#### Inherited from

[`CurrencyInputBaseOptions`](/components/currency/api/interfaces/currencyinputbaseoptions/).[`numberingSystem`](/components/currency/api/interfaces/currencyinputbaseoptions/#numberingsystem)

***

### onAbort?

```ts
optional onAbort?: ReactEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onAbort
```

***

### onAbortCapture?

```ts
optional onAbortCapture?: ReactEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onAbortCapture
```

***

### onAnimationEnd?

```ts
optional onAnimationEnd?: AnimationEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onAnimationEnd
```

***

### onAnimationEndCapture?

```ts
optional onAnimationEndCapture?: AnimationEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onAnimationEndCapture
```

***

### onAnimationIteration?

```ts
optional onAnimationIteration?: AnimationEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onAnimationIteration
```

***

### onAnimationIterationCapture?

```ts
optional onAnimationIterationCapture?: AnimationEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onAnimationIterationCapture
```

***

### onAnimationStart?

```ts
optional onAnimationStart?: AnimationEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onAnimationStart
```

***

### onAnimationStartCapture?

```ts
optional onAnimationStartCapture?: AnimationEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onAnimationStartCapture
```

***

### onAuxClick?

```ts
optional onAuxClick?: MouseEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onAuxClick
```

***

### onAuxClickCapture?

```ts
optional onAuxClickCapture?: MouseEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onAuxClickCapture
```

***

### onBeforeInput?

```ts
optional onBeforeInput?: InputEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onBeforeInput
```

***

### onBeforeInputCapture?

```ts
optional onBeforeInputCapture?: InputEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onBeforeInputCapture
```

***

### onBeforeToggle?

```ts
optional onBeforeToggle?: ToggleEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onBeforeToggle
```

***

### onBlur?

```ts
optional onBlur?: FocusEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onBlur
```

***

### onBlurCapture?

```ts
optional onBlurCapture?: FocusEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onBlurCapture
```

***

### onCanPlay?

```ts
optional onCanPlay?: ReactEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onCanPlay
```

***

### onCanPlayCapture?

```ts
optional onCanPlayCapture?: ReactEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onCanPlayCapture
```

***

### onCanPlayThrough?

```ts
optional onCanPlayThrough?: ReactEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onCanPlayThrough
```

***

### onCanPlayThroughCapture?

```ts
optional onCanPlayThroughCapture?: ReactEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onCanPlayThroughCapture
```

***

### onChange?

```ts
optional onChange?: ChangeEventHandler<HTMLInputElement>;
```

Forwarded native change handler; runs after the internal one.

***

### onChangeCapture?

```ts
optional onChangeCapture?: ChangeEventHandler<HTMLInputElement, Element>;
```

#### Inherited from

```ts
Omit.onChangeCapture
```

***

### onClick?

```ts
optional onClick?: MouseEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onClick
```

***

### onClickCapture?

```ts
optional onClickCapture?: MouseEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onClickCapture
```

***

### onCompositionEnd?

```ts
optional onCompositionEnd?: CompositionEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onCompositionEnd
```

***

### onCompositionEndCapture?

```ts
optional onCompositionEndCapture?: CompositionEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onCompositionEndCapture
```

***

### onCompositionStart?

```ts
optional onCompositionStart?: CompositionEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onCompositionStart
```

***

### onCompositionStartCapture?

```ts
optional onCompositionStartCapture?: CompositionEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onCompositionStartCapture
```

***

### onCompositionUpdate?

```ts
optional onCompositionUpdate?: CompositionEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onCompositionUpdate
```

***

### onCompositionUpdateCapture?

```ts
optional onCompositionUpdateCapture?: CompositionEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onCompositionUpdateCapture
```

***

### onContextMenu?

```ts
optional onContextMenu?: MouseEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onContextMenu
```

***

### onContextMenuCapture?

```ts
optional onContextMenuCapture?: MouseEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onContextMenuCapture
```

***

### onCopy?

```ts
optional onCopy?: ClipboardEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onCopy
```

***

### onCopyCapture?

```ts
optional onCopyCapture?: ClipboardEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onCopyCapture
```

***

### onCut?

```ts
optional onCut?: ClipboardEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onCut
```

***

### onCutCapture?

```ts
optional onCutCapture?: ClipboardEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onCutCapture
```

***

### onDoubleClick?

```ts
optional onDoubleClick?: MouseEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onDoubleClick
```

***

### onDoubleClickCapture?

```ts
optional onDoubleClickCapture?: MouseEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onDoubleClickCapture
```

***

### onDrag?

```ts
optional onDrag?: DragEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onDrag
```

***

### onDragCapture?

```ts
optional onDragCapture?: DragEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onDragCapture
```

***

### onDragEnd?

```ts
optional onDragEnd?: DragEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onDragEnd
```

***

### onDragEndCapture?

```ts
optional onDragEndCapture?: DragEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onDragEndCapture
```

***

### onDragEnter?

```ts
optional onDragEnter?: DragEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onDragEnter
```

***

### onDragEnterCapture?

```ts
optional onDragEnterCapture?: DragEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onDragEnterCapture
```

***

### onDragExit?

```ts
optional onDragExit?: DragEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onDragExit
```

***

### onDragExitCapture?

```ts
optional onDragExitCapture?: DragEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onDragExitCapture
```

***

### onDragLeave?

```ts
optional onDragLeave?: DragEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onDragLeave
```

***

### onDragLeaveCapture?

```ts
optional onDragLeaveCapture?: DragEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onDragLeaveCapture
```

***

### onDragOver?

```ts
optional onDragOver?: DragEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onDragOver
```

***

### onDragOverCapture?

```ts
optional onDragOverCapture?: DragEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onDragOverCapture
```

***

### onDragStart?

```ts
optional onDragStart?: DragEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onDragStart
```

***

### onDragStartCapture?

```ts
optional onDragStartCapture?: DragEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onDragStartCapture
```

***

### onDrop?

```ts
optional onDrop?: DragEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onDrop
```

***

### onDropCapture?

```ts
optional onDropCapture?: DragEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onDropCapture
```

***

### onDurationChange?

```ts
optional onDurationChange?: ReactEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onDurationChange
```

***

### onDurationChangeCapture?

```ts
optional onDurationChangeCapture?: ReactEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onDurationChangeCapture
```

***

### onEmptied?

```ts
optional onEmptied?: ReactEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onEmptied
```

***

### onEmptiedCapture?

```ts
optional onEmptiedCapture?: ReactEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onEmptiedCapture
```

***

### onEncrypted?

```ts
optional onEncrypted?: ReactEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onEncrypted
```

***

### onEncryptedCapture?

```ts
optional onEncryptedCapture?: ReactEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onEncryptedCapture
```

***

### onEnded?

```ts
optional onEnded?: ReactEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onEnded
```

***

### onEndedCapture?

```ts
optional onEndedCapture?: ReactEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onEndedCapture
```

***

### onError?

```ts
optional onError?: ReactEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onError
```

***

### onErrorCapture?

```ts
optional onErrorCapture?: ReactEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onErrorCapture
```

***

### onFocus?

```ts
optional onFocus?: FocusEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onFocus
```

***

### onFocusCapture?

```ts
optional onFocusCapture?: FocusEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onFocusCapture
```

***

### onGotPointerCapture?

```ts
optional onGotPointerCapture?: PointerEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onGotPointerCapture
```

***

### onGotPointerCaptureCapture?

```ts
optional onGotPointerCaptureCapture?: PointerEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onGotPointerCaptureCapture
```

***

### onInput?

```ts
optional onInput?: InputEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onInput
```

***

### onInputCapture?

```ts
optional onInputCapture?: InputEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onInputCapture
```

***

### onInvalid?

```ts
optional onInvalid?: ReactEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onInvalid
```

***

### onInvalidCapture?

```ts
optional onInvalidCapture?: ReactEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onInvalidCapture
```

***

### onKeyDown?

```ts
optional onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onKeyDown
```

***

### onKeyDownCapture?

```ts
optional onKeyDownCapture?: KeyboardEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onKeyDownCapture
```

***

### ~~onKeyPress?~~

```ts
optional onKeyPress?: KeyboardEventHandler<HTMLInputElement>;
```

:::caution[Deprecated]
Use `onKeyUp` or `onKeyDown` instead
:::

#### Inherited from

```ts
Omit.onKeyPress
```

***

### ~~onKeyPressCapture?~~

```ts
optional onKeyPressCapture?: KeyboardEventHandler<HTMLInputElement>;
```

:::caution[Deprecated]
Use `onKeyUpCapture` or `onKeyDownCapture` instead
:::

#### Inherited from

```ts
Omit.onKeyPressCapture
```

***

### onKeyUp?

```ts
optional onKeyUp?: KeyboardEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onKeyUp
```

***

### onKeyUpCapture?

```ts
optional onKeyUpCapture?: KeyboardEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onKeyUpCapture
```

***

### onLoad?

```ts
optional onLoad?: ReactEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onLoad
```

***

### onLoadCapture?

```ts
optional onLoadCapture?: ReactEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onLoadCapture
```

***

### onLoadedData?

```ts
optional onLoadedData?: ReactEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onLoadedData
```

***

### onLoadedDataCapture?

```ts
optional onLoadedDataCapture?: ReactEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onLoadedDataCapture
```

***

### onLoadedMetadata?

```ts
optional onLoadedMetadata?: ReactEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onLoadedMetadata
```

***

### onLoadedMetadataCapture?

```ts
optional onLoadedMetadataCapture?: ReactEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onLoadedMetadataCapture
```

***

### onLoadStart?

```ts
optional onLoadStart?: ReactEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onLoadStart
```

***

### onLoadStartCapture?

```ts
optional onLoadStartCapture?: ReactEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onLoadStartCapture
```

***

### onLostPointerCapture?

```ts
optional onLostPointerCapture?: PointerEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onLostPointerCapture
```

***

### onLostPointerCaptureCapture?

```ts
optional onLostPointerCaptureCapture?: PointerEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onLostPointerCaptureCapture
```

***

### onMouseDown?

```ts
optional onMouseDown?: MouseEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onMouseDown
```

***

### onMouseDownCapture?

```ts
optional onMouseDownCapture?: MouseEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onMouseDownCapture
```

***

### onMouseEnter?

```ts
optional onMouseEnter?: MouseEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onMouseEnter
```

***

### onMouseLeave?

```ts
optional onMouseLeave?: MouseEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onMouseLeave
```

***

### onMouseMove?

```ts
optional onMouseMove?: MouseEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onMouseMove
```

***

### onMouseMoveCapture?

```ts
optional onMouseMoveCapture?: MouseEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onMouseMoveCapture
```

***

### onMouseOut?

```ts
optional onMouseOut?: MouseEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onMouseOut
```

***

### onMouseOutCapture?

```ts
optional onMouseOutCapture?: MouseEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onMouseOutCapture
```

***

### onMouseOver?

```ts
optional onMouseOver?: MouseEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onMouseOver
```

***

### onMouseOverCapture?

```ts
optional onMouseOverCapture?: MouseEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onMouseOverCapture
```

***

### onMouseUp?

```ts
optional onMouseUp?: MouseEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onMouseUp
```

***

### onMouseUpCapture?

```ts
optional onMouseUpCapture?: MouseEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onMouseUpCapture
```

***

### onPaste?

```ts
optional onPaste?: ClipboardEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onPaste
```

***

### onPasteCapture?

```ts
optional onPasteCapture?: ClipboardEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onPasteCapture
```

***

### onPause?

```ts
optional onPause?: ReactEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onPause
```

***

### onPauseCapture?

```ts
optional onPauseCapture?: ReactEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onPauseCapture
```

***

### onPlay?

```ts
optional onPlay?: ReactEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onPlay
```

***

### onPlayCapture?

```ts
optional onPlayCapture?: ReactEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onPlayCapture
```

***

### onPlaying?

```ts
optional onPlaying?: ReactEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onPlaying
```

***

### onPlayingCapture?

```ts
optional onPlayingCapture?: ReactEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onPlayingCapture
```

***

### onPointerCancel?

```ts
optional onPointerCancel?: PointerEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onPointerCancel
```

***

### onPointerCancelCapture?

```ts
optional onPointerCancelCapture?: PointerEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onPointerCancelCapture
```

***

### onPointerDown?

```ts
optional onPointerDown?: PointerEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onPointerDown
```

***

### onPointerDownCapture?

```ts
optional onPointerDownCapture?: PointerEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onPointerDownCapture
```

***

### onPointerEnter?

```ts
optional onPointerEnter?: PointerEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onPointerEnter
```

***

### onPointerLeave?

```ts
optional onPointerLeave?: PointerEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onPointerLeave
```

***

### onPointerMove?

```ts
optional onPointerMove?: PointerEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onPointerMove
```

***

### onPointerMoveCapture?

```ts
optional onPointerMoveCapture?: PointerEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onPointerMoveCapture
```

***

### onPointerOut?

```ts
optional onPointerOut?: PointerEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onPointerOut
```

***

### onPointerOutCapture?

```ts
optional onPointerOutCapture?: PointerEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onPointerOutCapture
```

***

### onPointerOver?

```ts
optional onPointerOver?: PointerEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onPointerOver
```

***

### onPointerOverCapture?

```ts
optional onPointerOverCapture?: PointerEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onPointerOverCapture
```

***

### onPointerUp?

```ts
optional onPointerUp?: PointerEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onPointerUp
```

***

### onPointerUpCapture?

```ts
optional onPointerUpCapture?: PointerEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onPointerUpCapture
```

***

### onProgress?

```ts
optional onProgress?: ReactEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onProgress
```

***

### onProgressCapture?

```ts
optional onProgressCapture?: ReactEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onProgressCapture
```

***

### onRateChange?

```ts
optional onRateChange?: ReactEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onRateChange
```

***

### onRateChangeCapture?

```ts
optional onRateChangeCapture?: ReactEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onRateChangeCapture
```

***

### onReset?

```ts
optional onReset?: ReactEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onReset
```

***

### onResetCapture?

```ts
optional onResetCapture?: ReactEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onResetCapture
```

***

### onScroll?

```ts
optional onScroll?: UIEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onScroll
```

***

### onScrollCapture?

```ts
optional onScrollCapture?: UIEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onScrollCapture
```

***

### onScrollEnd?

```ts
optional onScrollEnd?: UIEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onScrollEnd
```

***

### onScrollEndCapture?

```ts
optional onScrollEndCapture?: UIEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onScrollEndCapture
```

***

### onSeeked?

```ts
optional onSeeked?: ReactEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onSeeked
```

***

### onSeekedCapture?

```ts
optional onSeekedCapture?: ReactEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onSeekedCapture
```

***

### onSeeking?

```ts
optional onSeeking?: ReactEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onSeeking
```

***

### onSeekingCapture?

```ts
optional onSeekingCapture?: ReactEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onSeekingCapture
```

***

### onSelect?

```ts
optional onSelect?: ReactEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onSelect
```

***

### onSelectCapture?

```ts
optional onSelectCapture?: ReactEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onSelectCapture
```

***

### onStalled?

```ts
optional onStalled?: ReactEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onStalled
```

***

### onStalledCapture?

```ts
optional onStalledCapture?: ReactEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onStalledCapture
```

***

### onSubmit?

```ts
optional onSubmit?: SubmitEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onSubmit
```

***

### onSubmitCapture?

```ts
optional onSubmitCapture?: SubmitEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onSubmitCapture
```

***

### onSuspend?

```ts
optional onSuspend?: ReactEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onSuspend
```

***

### onSuspendCapture?

```ts
optional onSuspendCapture?: ReactEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onSuspendCapture
```

***

### onTimeUpdate?

```ts
optional onTimeUpdate?: ReactEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onTimeUpdate
```

***

### onTimeUpdateCapture?

```ts
optional onTimeUpdateCapture?: ReactEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onTimeUpdateCapture
```

***

### onToggle?

```ts
optional onToggle?: ToggleEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onToggle
```

***

### onTouchCancel?

```ts
optional onTouchCancel?: TouchEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onTouchCancel
```

***

### onTouchCancelCapture?

```ts
optional onTouchCancelCapture?: TouchEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onTouchCancelCapture
```

***

### onTouchEnd?

```ts
optional onTouchEnd?: TouchEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onTouchEnd
```

***

### onTouchEndCapture?

```ts
optional onTouchEndCapture?: TouchEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onTouchEndCapture
```

***

### onTouchMove?

```ts
optional onTouchMove?: TouchEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onTouchMove
```

***

### onTouchMoveCapture?

```ts
optional onTouchMoveCapture?: TouchEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onTouchMoveCapture
```

***

### onTouchStart?

```ts
optional onTouchStart?: TouchEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onTouchStart
```

***

### onTouchStartCapture?

```ts
optional onTouchStartCapture?: TouchEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onTouchStartCapture
```

***

### onTransitionCancel?

```ts
optional onTransitionCancel?: TransitionEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onTransitionCancel
```

***

### onTransitionCancelCapture?

```ts
optional onTransitionCancelCapture?: TransitionEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onTransitionCancelCapture
```

***

### onTransitionEnd?

```ts
optional onTransitionEnd?: TransitionEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onTransitionEnd
```

***

### onTransitionEndCapture?

```ts
optional onTransitionEndCapture?: TransitionEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onTransitionEndCapture
```

***

### onTransitionRun?

```ts
optional onTransitionRun?: TransitionEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onTransitionRun
```

***

### onTransitionRunCapture?

```ts
optional onTransitionRunCapture?: TransitionEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onTransitionRunCapture
```

***

### onTransitionStart?

```ts
optional onTransitionStart?: TransitionEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onTransitionStart
```

***

### onTransitionStartCapture?

```ts
optional onTransitionStartCapture?: TransitionEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onTransitionStartCapture
```

***

### onValueChange?

```ts
optional onValueChange?: (value, meta) => void;
```

Fires on every accepted keystroke with the parsed number (or `null`).

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `number` \| `null` |
| `meta` | [`CurrencyInputChange`](/components/currency/api/interfaces/currencyinputchange/) |

#### Returns

`void`

***

### onVolumeChange?

```ts
optional onVolumeChange?: ReactEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onVolumeChange
```

***

### onVolumeChangeCapture?

```ts
optional onVolumeChangeCapture?: ReactEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onVolumeChangeCapture
```

***

### onWaiting?

```ts
optional onWaiting?: ReactEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onWaiting
```

***

### onWaitingCapture?

```ts
optional onWaitingCapture?: ReactEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onWaitingCapture
```

***

### onWheel?

```ts
optional onWheel?: WheelEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onWheel
```

***

### onWheelCapture?

```ts
optional onWheelCapture?: WheelEventHandler<HTMLInputElement>;
```

#### Inherited from

```ts
Omit.onWheelCapture
```

***

### part?

```ts
optional part?: string;
```

#### See

[https://developer.mozilla.org/en-US/docs/Web/HTML/Global\_attributes/part](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/part)

#### Inherited from

```ts
Omit.part
```

***

### pattern?

```ts
optional pattern?: string;
```

#### Inherited from

```ts
Omit.pattern
```

***

### placeholder?

```ts
optional placeholder?: string;
```

#### Inherited from

```ts
Omit.placeholder
```

***

### popover?

```ts
optional popover?: "" | "auto" | "manual" | "hint";
```

#### Inherited from

```ts
Omit.popover
```

***

### popoverTarget?

```ts
optional popoverTarget?: string;
```

#### Inherited from

```ts
Omit.popoverTarget
```

***

### popoverTargetAction?

```ts
optional popoverTargetAction?: "toggle" | "show" | "hide";
```

#### Inherited from

```ts
Omit.popoverTargetAction
```

***

### prefix?

```ts
optional prefix?: string;
```

#### Inherited from

```ts
Omit.prefix
```

***

### property?

```ts
optional property?: string;
```

#### Inherited from

```ts
Omit.property
```

***

### radioGroup?

```ts
optional radioGroup?: string;
```

#### Inherited from

```ts
Omit.radioGroup
```

***

### readOnly?

```ts
optional readOnly?: boolean;
```

#### Inherited from

```ts
Omit.readOnly
```

***

### rel?

```ts
optional rel?: string;
```

#### Inherited from

```ts
Omit.rel
```

***

### required?

```ts
optional required?: boolean;
```

#### Inherited from

```ts
Omit.required
```

***

### resource?

```ts
optional resource?: string;
```

#### Inherited from

```ts
Omit.resource
```

***

### results?

```ts
optional results?: number;
```

#### Inherited from

```ts
Omit.results
```

***

### rev?

```ts
optional rev?: string;
```

#### Inherited from

```ts
Omit.rev
```

***

### role?

```ts
optional role?: AriaRole;
```

#### Inherited from

```ts
Omit.role
```

***

### security?

```ts
optional security?: string;
```

#### Inherited from

```ts
Omit.security
```

***

### size?

```ts
optional size?: number;
```

#### Inherited from

```ts
Omit.size
```

***

### slot?

```ts
optional slot?: string;
```

#### Inherited from

```ts
Omit.slot
```

***

### spellCheck?

```ts
optional spellCheck?: Booleanish;
```

#### Inherited from

```ts
Omit.spellCheck
```

***

### src?

```ts
optional src?: string;
```

#### Inherited from

```ts
Omit.src
```

***

### step?

```ts
optional step?: number;
```

Amount added/subtracted by ArrowUp/ArrowDown. Omit to leave arrow keys
untouched. The result is rounded to the currency's fraction precision.

#### Inherited from

[`CurrencyInputBaseOptions`](/components/currency/api/interfaces/currencyinputbaseoptions/).[`step`](/components/currency/api/interfaces/currencyinputbaseoptions/#step)

***

### style?

```ts
optional style?: CSSProperties;
```

#### Overrides

```ts
Omit.style
```

***

### suppressContentEditableWarning?

```ts
optional suppressContentEditableWarning?: boolean;
```

#### Inherited from

```ts
Omit.suppressContentEditableWarning
```

***

### suppressHydrationWarning?

```ts
optional suppressHydrationWarning?: boolean;
```

#### Inherited from

```ts
Omit.suppressHydrationWarning
```

***

### tabIndex?

```ts
optional tabIndex?: number;
```

#### Inherited from

```ts
Omit.tabIndex
```

***

### title?

```ts
optional title?: string;
```

#### Inherited from

```ts
Omit.title
```

***

### transformRawValue?

```ts
optional transformRawValue?: (raw) => string;
```

Transform browser input before locale-aware sanitization.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `raw` | `string` |

#### Returns

`string`

#### Inherited from

[`CurrencyInputBaseOptions`](/components/currency/api/interfaces/currencyinputbaseoptions/).[`transformRawValue`](/components/currency/api/interfaces/currencyinputbaseoptions/#transformrawvalue)

***

### translate?

```ts
optional translate?: "yes" | "no";
```

#### Inherited from

```ts
Omit.translate
```

***

### type?

```ts
optional type?: HTMLInputTypeAttribute;
```

#### Inherited from

```ts
Omit.type
```

***

### typeof?

```ts
optional typeof?: string;
```

#### Inherited from

```ts
Omit.typeof
```

***

### unselectable?

```ts
optional unselectable?: "off" | "on";
```

#### Inherited from

```ts
Omit.unselectable
```

***

### value?

```ts
optional value?: number | null;
```

Controlled amount. `null`/`undefined` render an empty field.

***

### vocab?

```ts
optional vocab?: string;
```

#### Inherited from

```ts
Omit.vocab
```

***

### width?

```ts
optional width?: string | number;
```

#### Inherited from

```ts
Omit.width
```
