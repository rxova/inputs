import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { PasswordInput, commonRules, estimateStrength } from '@rxova/react-password-input'

const meta = {
  title: 'Components/Password input',
  component: PasswordInput,
  args: {
    label: 'Password',
    autoComplete: 'current-password',
    showStrength: false,
    hideRevealToggle: false,
    hideOnBlur: true,
    capsLockWarning: true,
    disabled: false,
    readOnly: false,
    required: false,
    invalid: false,
    minLength: 8,
    onChange: fn(),
    onRevealChange: fn(),
    onValidityChange: fn(),
  },
  argTypes: {
    minScore: { control: 'inline-radio', options: [null, 0, 1, 2, 3, 4] },
    minLength: { control: { type: 'number', min: 1, max: 64, step: 1 } },
    autoComplete: { control: 'inline-radio', options: ['current-password', 'new-password'] },
    value: { control: false },
    // Functions, render props and arrays have no useful control representation.
    estimate: { control: false },
    rules: { control: false },
    strengthLabel: { control: false },
    revealIcon: { control: false },
    revealLabel: { control: false },
    checkCompromised: { control: false },
    blocklist: { control: false },
    userInputs: { control: false },
    style: { control: false },
  },
  decorators: [
    (Story) => (
      <div className="story">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PasswordInput>

export default meta
type Story = StoryObj<typeof meta>

/** Every prop is live in the Controls panel; the spies log to Actions. */
export const Playground: Story = {}

/** The sign-in case: masked, one reveal toggle, nothing else. */
export const SignIn: Story = {
  args: { label: 'Password', name: 'password' },
}

/**
 * The sign-up case. `userInputs` penalises a password containing the address or
 * name the user already typed, and `blocklist` rejects product-specific words —
 * both entirely in the browser.
 */
export const SignUp: Story = {
  args: {
    label: 'Choose a password',
    name: 'new-password',
    autoComplete: 'new-password',
    showStrength: true,
    minScore: 2,
    userInputs: ['ada@example.com', 'Ada Lovelace'],
    blocklist: ['rxova'],
    rules: [
      { id: 'length', label: 'At least 10 characters', test: (p) => Array.from(p).length >= 10 },
      commonRules.digit,
      { ...commonRules.symbol, optional: true },
    ],
  },
}

/**
 * NIST SP 800-63B leads with length and advises against composition rules, so
 * the default is a single length rule. `rules` is the opt-in.
 */
export const RequirementChecklist: Story = {
  args: {
    label: 'Password',
    showRules: true,
    rules: [commonRules.lowercase, commonRules.uppercase, commonRules.digit, commonRules.symbol],
  },
}

/** The meter alone, without a checklist. Buckets, not a percentage. */
export const StrengthMeter: Story = {
  args: { label: 'Password', showStrength: true, defaultValue: 'correct horse' },
}

/**
 * `strengthLabel` replaces the wording under the meter — the estimator's verdict
 * is handed over whole, so the copy can key off `penalties` as well as `score`.
 */
export const CustomStrengthLabel: Story = {
  args: {
    label: 'Password',
    showStrength: true,
    defaultValue: 'aaaaaaaaaa',
    strengthLabel: (strength) => {
      const [worst] = strength.penalties
      const detail = worst
        ? worst.replace(/-/g, ' ')
        : `${String(Math.round(strength.entropy))} bits`
      return `${String(strength.score)}/4 — ${detail}`
    },
  },
}

/**
 * A stand-in for a k-anonymity lookup. The library never makes the request
 * itself: the callback receives the plaintext and an `AbortSignal`, and nothing
 * leaves the page unless the app sends it. Try `hunter2`.
 */
export const BreachCheck: Story = {
  args: {
    label: 'Password checked against a breach list',
    checkCompromisedDelay: 150,
    checkCompromised: (password: string) =>
      Promise.resolve(['hunter2', 'password', 'letmein'].includes(password)),
  },
}

/** Caps Lock is announced in a live region while the field has focus. */
export const CapsLockWarning: Story = {
  args: { label: 'Turn Caps Lock on and focus this field', capsLockWarning: true },
}

/** `revealIcon` and `revealLabel` take the reveal state and draw whatever fits. */
export const CustomRevealButton: Story = {
  args: {
    label: 'Password',
    defaultValue: 'hunter2',
    revealLabel: ({ revealed }) => (revealed ? 'Hide' : 'Show'),
    revealIcon: ({ revealed }) => <span aria-hidden="true">{revealed ? '🙈' : '👁'}</span>,
  },
}

/** Password managers and shoulder-surfers both lose: the toggle can go entirely. */
export const NoRevealToggle: Story = {
  args: { label: 'Password', hideRevealToggle: true, defaultValue: 'hunter2' },
}

/** `invalid` sets `aria-invalid` and `data-invalid`; the ring is a consumer token. */
export const Invalid: Story = {
  render: (args) => (
    <>
      <PasswordInput {...args} defaultValue="short" invalid aria-describedby="pw-invalid-help" />
      <p id="pw-invalid-help" className="error">
        That password is not long enough
      </p>
    </>
  ),
}

/** Disabled: exposed to assistive tech, not editable. */
export const Disabled: Story = {
  args: { label: 'Disabled password', disabled: true, defaultValue: 'hunter2' },
}

/** Read-only: the value is shown and focusable, but not editable. */
export const ReadOnly: Story = {
  args: { label: 'Read-only password', readOnly: true, value: 'hunter2' },
}

/**
 * Confirm-password is a composition, not a prop: the second field is an ordinary
 * instance whose rule compares against the first.
 */
export const ConfirmPassword: Story = {
  render: function ConfirmPassword(args) {
    const [password, setPassword] = useState('')

    return (
      <>
        <PasswordInput
          {...args}
          label="New password"
          autoComplete="new-password"
          showStrength
          value={password}
          onChange={setPassword}
        />
        <PasswordInput
          {...args}
          label="Confirm password"
          autoComplete="new-password"
          showRules
          rules={[
            {
              id: 'match',
              label: 'Matches the password above',
              test: (confirmation) => confirmation.length > 0 && confirmation === password,
            },
          ]}
        />
      </>
    )
  },
}

/**
 * With `name` set the value posts through native form submission — no form
 * library required. Submit to see the `FormData` payload.
 */
export const InAForm: Story = {
  render: function InAForm(args) {
    const [submitted, setSubmitted] = useState<string | null>(null)

    return (
      <form
        className="story"
        onSubmit={(e) => {
          e.preventDefault()
          setSubmitted(JSON.stringify(Object.fromEntries(new FormData(e.currentTarget))))
        }}
      >
        <PasswordInput {...args} name="password" label="Password" />
        <button type="submit">Sign in</button>
        <output>{submitted ?? 'not submitted'}</output>
      </form>
    )
  },
}

/**
 * The estimator is exported on its own, so a score can drive something other
 * than the built-in meter — a submit button, a progress ring, analytics.
 */
export const EstimatorStandalone: Story = {
  render: function EstimatorStandalone() {
    const [password, setPassword] = useState('correct horse battery staple')
    const strength = estimateStrength(password)

    return (
      <>
        <PasswordInput
          label="Password"
          value={password}
          onChange={setPassword}
          hideOnBlur={false}
          defaultRevealed
        />
        <dl>
          <dt>score</dt>
          <dd>{strength.score}/4</dd>
          <dt>entropy</dt>
          <dd>{Math.round(strength.entropy)} bits</dd>
          <dt>effective length</dt>
          <dd>{strength.effectiveLength}</dd>
          <dt>penalties</dt>
          <dd>{strength.penalties.join(', ') || 'none'}</dd>
        </dl>
      </>
    )
  },
}
