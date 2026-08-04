import type { API, ASTPath, FileInfo, JSCodeshift } from 'jscodeshift'

/**
 * jscodeshift transform: migrate `@rxova/react-intl-currency-input` 0.1.x to 0.2.0.
 *
 * Two props swap names at once:
 *   - `onValueChange` → `onChange` (the parsed value handler)
 *   - `onChange` → `onNativeChange` (the forwarded DOM event handler)
 *
 * They are renamed **simultaneously**, computing every new name from the
 * original attribute list before assigning any of them. Doing it as two
 * sequential passes would walk `onValueChange` → `onChange` → `onNativeChange`
 * and silently destroy the value handler.
 *
 * Scope is limited to files that actually import the component or hook from
 * `@rxova/react-intl-currency-input` or from the `@rxova/react-inputs`
 * meta-package (which re-exports it), so the `onChange` on an unrelated
 * `<input>` or `<select>` in the same file is never touched.
 *
 * Not handled, by design: props arriving through a spread (`{...props}`), and
 * handlers assembled in a variable or object outside a JSX attribute or the
 * hook's inline options object. An AST transform can't know what a spread
 * carries, so those files get a `TODO` banner instead of a partial rewrite.
 */

const SOURCES = new Set(['@rxova/react-intl-currency-input', '@rxova/react-inputs'])

/** Applied to `<CurrencyInput>` attributes. Read together, assigned together. */
const ELEMENT_RENAME: Record<string, string> = {
  onValueChange: 'onChange',
  onChange: 'onNativeChange',
}

/**
 * The hook has no native passthrough option, so an existing `onChange` key is
 * already the value handler and must stay put.
 */
const HOOK_RENAME: Record<string, string> = {
  onValueChange: 'onChange',
}

const BANNER =
  ' TODO(@rxova/react-intl-currency-input): props reach <CurrencyInput> through a spread, so the ' +
  '`onValueChange` → `onChange` / `onChange` → `onNativeChange` rename could not be applied ' +
  'automatically. See https://rxova.org/packages/react-inputs/components/currency/migrating/'

/** Rename object keys in one simultaneous pass. Returns true if anything moved. */
function renameKeys(properties: unknown[], map: Record<string, string>): boolean {
  let touched = false
  const next: (string | undefined)[] = properties.map((prop) => {
    const p = prop as {
      type: string
      computed?: boolean
      key?: { type: string; name?: string; value?: string }
    }
    if (p.type !== 'Property' && p.type !== 'ObjectProperty') return undefined
    if (p.computed) return undefined
    const name = p.key?.type === 'Identifier' ? p.key.name : undefined
    return name !== undefined ? map[name] : undefined
  })

  next.forEach((target, i) => {
    if (target === undefined) return
    const key = (properties[i] as { key: { name: string } }).key
    key.name = target
    touched = true
  })

  return touched
}

export default function transform(file: FileInfo, api: API): string | undefined {
  const j: JSCodeshift = api.jscodeshift
  const root = j(file.source)

  // Local names in this file bound to the component and to the hook, aliases
  // followed. Only these are rewritten.
  const componentNames = new Set<string>()
  const hookNames = new Set<string>()

  root
    .find(j.ImportDeclaration)
    .filter((path) => SOURCES.has(String(path.node.source.value)))
    .forEach((path) => {
      for (const spec of path.node.specifiers ?? []) {
        if (spec.type !== 'ImportSpecifier' || spec.imported.type !== 'Identifier') continue
        const imported = spec.imported.name
        const local = typeof spec.local?.name === 'string' ? spec.local.name : imported
        if (imported === 'CurrencyInput') componentNames.add(local)
        if (imported === 'useCurrencyInput') hookNames.add(local)
      }
    })

  if (componentNames.size === 0 && hookNames.size === 0) return undefined

  let changed = false
  let hasSpread = false

  // ---- <CurrencyInput> attributes ------------------------------------------
  for (const name of componentNames) {
    root.findJSXElements(name).forEach((path: ASTPath) => {
      const opening = (path.node as { openingElement: { attributes?: unknown[] } }).openingElement
      const attributes = opening.attributes ?? []

      // Read every target name first, assign second.
      const targets: (string | undefined)[] = attributes.map((attr) => {
        const a = attr as { type: string; name?: { type: string; name: string } }
        if (a.type === 'JSXSpreadAttribute') {
          hasSpread = true
          return undefined
        }
        if (a.type !== 'JSXAttribute' || a.name?.type !== 'JSXIdentifier') return undefined
        return ELEMENT_RENAME[a.name.name]
      })

      targets.forEach((target, i) => {
        if (target === undefined) return
        ;(attributes[i] as { name: { name: string } }).name.name = target
        changed = true
      })
    })
  }

  // ---- useCurrencyInput({ ... }) options ------------------------------------
  for (const name of hookNames) {
    root.find(j.CallExpression, { callee: { type: 'Identifier', name } }).forEach((path) => {
      const [first] = path.node.arguments
      if (first?.type !== 'ObjectExpression') return
      if (renameKeys(first.properties, HOOK_RENAME)) changed = true
    })
  }

  if (hasSpread) {
    const first = root.find(j.Program).get('body', 0)
    if (first.node) {
      first.node.comments = [j.commentLine(BANNER, true, false), ...(first.node.comments ?? [])]
      changed = true
    }
  }

  if (!changed) return undefined

  return root.toSource({ quote: 'single' })
}
