import { useState, type FormEvent, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/Button'
import Checkbox from '../../components/Checkbox'
import Reveal from '../../components/Reveal'
import checkCircle64 from '../../assets/icons/check-circle-success-64.svg'
import chevronDown from '../../assets/icons/chevron-down-20.svg'

export type FieldDef =
  | {
      kind: 'text' | 'email' | 'tel' | 'date'
      name: string
      label: string
      placeholder?: string
      hint?: string
      required?: boolean
      half?: boolean
      autoComplete?: string
    }
  | { kind: 'textarea'; name: string; label: string; placeholder?: string; hint?: string; required?: boolean }
  | { kind: 'select'; name: string; label: string; options: string[]; required?: boolean; half?: boolean }
  | { kind: 'checkboxes'; name: string; label: string; hint?: string; options: string[]; required?: boolean }

export type EnquiryConfig = {
  eyebrow: string
  title: string
  highlight: string
  intro: string
  formTitle: string
  formIntro: string
  fields: FieldDef[]
  submitLabel: string
  /** Reference prefix shown on success, e.g. "SUP" → SUP-48213 */
  refPrefix: string
  success: { title: string; body: string }
  aside: ReactNode
  /** Optional extra section under the form/aside row */
  below?: ReactNode
}

type Values = Record<string, string | string[]>

const fieldBase =
  'w-full rounded-md border bg-white px-4 text-[16px] font-medium text-text-primary placeholder:text-text-secondary transition-[border-color,box-shadow] duration-200 hover:border-text-primary focus:border-2 focus:border-brand-primary focus:outline-none'

const emailOk = (v: string) => /^\S+@\S+\.\S+$/.test(v.trim())
const phoneOk = (v: string) => /^[+\d][\d\s-]{7,}$/.test(v.trim())

function validate(fields: FieldDef[], values: Values) {
  const errors: Record<string, string> = {}
  for (const f of fields) {
    const v = values[f.name]
    if (f.kind === 'checkboxes') {
      if (f.required && (!v || (v as string[]).length === 0)) errors[f.name] = 'Choose at least one option.'
      continue
    }
    const s = ((v as string) ?? '').trim()
    if (f.required && !s) {
      errors[f.name] =
        f.kind === 'select'
          ? 'Choose one option.'
          : f.kind === 'textarea'
            ? 'Tell us a bit more so we can help.'
            : `Enter ${f.label.toLowerCase()}.`
      continue
    }
    if (s && f.kind === 'email' && !emailOk(s)) errors[f.name] = 'Enter an email address like name@email.com.'
    if (s && f.kind === 'tel' && !phoneOk(s)) errors[f.name] = 'Enter a phone number like 0803 000 0000.'
    if (f.kind === 'textarea' && f.required && s && s.length < 10) errors[f.name] = 'Tell us a little more (at least 10 characters).'
  }
  return errors
}

function FieldShell({
  id,
  label,
  hint,
  error,
  children,
  className = '',
}: {
  id: string
  label: string
  hint?: string
  error?: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={id} className="text-[16px] font-medium leading-[1.4] text-text-secondary">
        {label}
      </label>
      {children}
      {(error || hint) && (
        <p
          id={`${id}-msg`}
          role={error ? 'alert' : undefined}
          className={`text-[12px] leading-[1.4] ${error ? 'animate-fade-in text-alert-error' : 'text-text-secondary'}`}
        >
          {error ?? hint}
        </p>
      )}
    </div>
  )
}

function EnquiryForm({ config }: { config: EnquiryConfig }) {
  const [values, setValues] = useState<Values>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [consent, setConsent] = useState(false)
  const [consentError, setConsentError] = useState(false)
  const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [reference, setReference] = useState('')

  const set = (name: string, value: string | string[]) => {
    setValues((v) => ({ ...v, [name]: value }))
    if (errors[name]) setErrors(({ [name]: _removed, ...rest }) => rest) // eslint-disable-line @typescript-eslint/no-unused-vars
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const next = validate(config.fields, values)
    setErrors(next)
    setConsentError(!consent)
    const first = config.fields.find((f) => next[f.name])
    if (first) return document.getElementById(`f-${first.name}`)?.focus()
    if (!consent) return
    setState('sending')
    // Simulated send until the enquiries API exists
    setTimeout(() => {
      setReference(`${config.refPrefix}-${Math.floor(10000 + Math.random() * 90000)}`)
      setState('sent')
    }, 1100)
  }

  if (state === 'sent') {
    return (
      <div className="flex animate-scale-in flex-col items-center gap-5 rounded-lg border border-border-default bg-white p-6 text-center sm:p-10" role="status">
        <div className="flex size-[120px] animate-pop items-center justify-center rounded-full bg-alert-success-bg">
          <img alt="" src={checkCircle64} className="size-16 animate-pop [animation-delay:200ms]" />
        </div>
        <div className="flex flex-col gap-2 leading-[1.4]">
          <h2 className="text-[24px] font-medium">{config.success.title}</h2>
          <p className="mx-auto max-w-[460px] text-[14px] text-text-secondary">{config.success.body}</p>
        </div>
        <div className="flex flex-col gap-1 rounded-md bg-surface-default px-6 py-3 leading-[1.4]">
          <p className="text-[12px] text-text-secondary">Your reference</p>
          <p className="text-[20px] font-medium tracking-wide">{reference}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <Button
            variant="secondary"
            onClick={() => {
              setValues({})
              setConsent(false)
              setState('idle')
            }}
            className="text-[16px] font-medium!"
          >
            Send another message
          </Button>
          <Button to="/" arrow className="text-[16px] font-medium!">
            Back to home
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6 rounded-lg border border-border-default bg-white p-4 sm:p-6">
      <div className="flex flex-col gap-2 leading-[1.4]">
        <h2 className="text-[24px] font-semibold lg:text-[28px]">{config.formTitle}</h2>
        <p className="text-[16px] font-medium text-text-disabled">{config.formIntro}</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {config.fields.map((f) => {
          const id = `f-${f.name}`
          const error = errors[f.name]
          const describedBy = error || ('hint' in f && f.hint) ? `${id}-msg` : undefined
          const border = error ? 'border-alert-error' : 'border-border-control'
          const label = f.required ? f.label : `${f.label} (optional)`

          if (f.kind === 'checkboxes') {
            const selected = (values[f.name] as string[]) ?? []
            return (
              <fieldset
                key={f.name}
                id={id}
                tabIndex={-1}
                aria-describedby={describedBy}
                className={`flex flex-col gap-2 focus:outline-none sm:col-span-2 ${error ? 'animate-shake' : ''}`}
              >
                <legend className="mb-2 text-[16px] font-medium leading-[1.4] text-text-secondary">{label}</legend>
                {(error || f.hint) && (
                  <p id={`${id}-msg`} className={`text-[12px] ${error ? 'text-alert-error' : 'text-text-secondary'}`}>
                    {error ?? f.hint}
                  </p>
                )}
                <div className="grid gap-3 pt-1 sm:grid-cols-2">
                  {f.options.map((o, i) => (
                    <Checkbox
                      key={o}
                      id={`${id}-${i}`}
                      checked={selected.includes(o)}
                      invalid={Boolean(error)}
                      onChange={(c) => set(f.name, c ? [...selected, o] : selected.filter((x) => x !== o))}
                    >
                      {o}
                    </Checkbox>
                  ))}
                </div>
              </fieldset>
            )
          }

          if (f.kind === 'select') {
            return (
              <FieldShell key={f.name} id={id} label={label} error={error} className={f.half ? '' : 'sm:col-span-2'}>
                <span className="relative">
                  <select
                    id={id}
                    value={(values[f.name] as string) ?? ''}
                    onChange={(e) => set(f.name, e.target.value)}
                    aria-invalid={Boolean(error)}
                    aria-describedby={describedBy}
                    className={`h-[54px] appearance-none pr-12 ${fieldBase} ${border} ${values[f.name] ? '' : 'text-text-secondary'}`}
                  >
                    <option value="" disabled>
                      Choose one
                    </option>
                    {f.options.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                  <img alt="" src={chevronDown} className="pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2" />
                </span>
              </FieldShell>
            )
          }

          if (f.kind === 'textarea') {
            const value = (values[f.name] as string) ?? ''
            return (
              <FieldShell key={f.name} id={id} label={label} hint={f.hint} error={error} className="sm:col-span-2">
                <div className="relative">
                  <textarea
                    id={id}
                    value={value}
                    onChange={(e) => set(f.name, e.target.value)}
                    placeholder={f.placeholder}
                    rows={5}
                    maxLength={2000}
                    aria-invalid={Boolean(error)}
                    aria-describedby={describedBy}
                    className={`min-h-[140px] resize-y py-4 pb-8 ${fieldBase} ${border}`}
                  />
                  <span className="pointer-events-none absolute right-4 bottom-3 text-[12px] text-text-secondary tabular-nums">
                    {value.length}/2000
                  </span>
                </div>
              </FieldShell>
            )
          }

          return (
            <FieldShell key={f.name} id={id} label={label} hint={f.hint} error={error} className={f.half ? '' : 'sm:col-span-2'}>
              <input
                id={id}
                type={f.kind}
                value={(values[f.name] as string) ?? ''}
                onChange={(e) => set(f.name, e.target.value)}
                placeholder={f.placeholder}
                autoComplete={f.autoComplete}
                min={f.kind === 'date' ? new Date().toISOString().slice(0, 10) : undefined}
                aria-invalid={Boolean(error)}
                aria-describedby={describedBy}
                className={`h-[54px] ${fieldBase} ${border}`}
              />
            </FieldShell>
          )
        })}
      </div>

      <div className={`flex flex-col gap-1 ${consentError ? 'animate-shake' : ''}`} onAnimationEnd={(e) => e.currentTarget.classList.remove('animate-shake')}>
        <Checkbox
          id="f-consent"
          checked={consent}
          invalid={consentError}
          onChange={(c) => {
            setConsent(c)
            if (c) setConsentError(false)
          }}
        >
          I agree that Veryfy may use these details to respond to me, as described in the{' '}
          <Link to="/privacy" className="text-brand-primary hover:underline" onClick={(e) => e.stopPropagation()}>
            Privacy notice
          </Link>
          .
        </Checkbox>
        {consentError && (
          <p role="alert" className="animate-fade-in pl-9 text-[12px] text-alert-error">
            Please agree before sending.
          </p>
        )}
      </div>

      <div className="flex justify-end">
        <Button type="submit" arrow={state !== 'sending'} disabled={state === 'sending'} className="w-full text-[16px] font-medium! sm:w-auto">
          {state === 'sending' && <span aria-hidden className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />}
          {state === 'sending' ? 'Sending…' : config.submitLabel}
        </Button>
      </div>
    </form>
  )
}

/** Shared layout for Contact support, Partner with us and Media enquiries. */
export default function EnquiryPage({ config }: { config: EnquiryConfig }) {
  return (
    <>
      <section className="bg-white">
        <div className="mx-auto flex w-full max-w-[1512px] flex-col gap-4 px-4 py-10 lg:px-24 lg:py-16">
          <p className="eyebrow animate-fade-up text-brand-primary">{config.eyebrow}</p>
          <h1 className="max-w-[820px] animate-fade-up text-[36px] font-bold leading-[1.2] tracking-[-0.72px] [animation-delay:80ms] lg:text-[56px] lg:tracking-[-1.12px]">
            {config.title} <span className="text-brand-primary">{config.highlight}</span>
          </h1>
          <p className="max-w-[640px] animate-fade-up text-[16px] font-bold leading-[1.4] text-greyscale-500 [animation-delay:160ms] lg:text-[20px]">
            {config.intro}
          </p>
        </div>
      </section>

      <div className="mx-auto flex w-full max-w-[1512px] flex-col gap-14 px-4 py-10 lg:gap-20 lg:px-24 lg:py-16">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
          <div className="min-w-0 flex-1 animate-fade-up [animation-delay:200ms]">
            <EnquiryForm config={config} />
          </div>
          <aside className="flex animate-fade-up flex-col gap-6 [animation-delay:300ms] lg:sticky lg:top-28 lg:w-[400px] lg:shrink-0">
            {config.aside}
          </aside>
        </div>
        {config.below && <Reveal>{config.below}</Reveal>}
      </div>
    </>
  )
}
