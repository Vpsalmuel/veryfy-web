import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import Checkbox from '../../components/Checkbox'
import { PhotoRow } from './ReportFormStep'
import { formatDate, useReport } from './reportStore'

function Group({ title, editTo, rows }: { title: string; editTo: string; rows: [string, string][] }) {
  const visible = rows.filter(([, v]) => v)
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between pb-1">
        <h3 className="text-[16px] font-medium leading-[1.4] text-text-secondary">{title}</h3>
        <Link to={editTo} className="text-[16px] font-medium text-brand-primary hover:underline">
          Edit<span className="sr-only"> {title.toLowerCase()}</span>
        </Link>
      </div>
      <dl>
        {visible.map(([label, value], i) => (
          <div
            key={label}
            className={`flex flex-col gap-1 py-3 leading-[1.4] sm:flex-row sm:items-center sm:gap-4 ${
              i < visible.length - 1 ? 'border-b border-border-default' : ''
            }`}
          >
            <dt className="text-[14px] text-text-secondary sm:w-[200px] sm:shrink-0">{label}</dt>
            <dd className="text-[16px] font-medium break-words">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export default function ReviewStep() {
  const { draft, update, setReference } = useReport()
  const navigate = useNavigate()
  const [consentError, setConsentError] = useState(false)
  const [contactError, setContactError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  // Someone landing here directly (or after a refresh with no draft) starts at step 1
  if (!draft.productName || draft.issues.length === 0) return <Navigate to="/report" replace />

  const validContact = (v: string) =>
    !v.trim() || /^\S+@\S+\.\S+$/.test(v.trim()) || /^[+\d][\d\s-]{7,}$/.test(v.trim())

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const contactOk = validContact(draft.contact)
    setContactError(contactOk ? null : 'Enter a phone number like 0803 000 0000 or an email address.')
    setConsentError(!draft.consent)
    if (!contactOk || !draft.consent) return
    setSubmitting(true)
    // Simulated submit until the reports API exists
    setTimeout(() => {
      setReference(`VR-2026-${String(Math.floor(1000 + Math.random() * 9000))}`)
      navigate('/report/confirmation')
    }, 1200)
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6 rounded-lg border border-border-default bg-white p-4">
      <div className="flex flex-col gap-2 leading-[1.4]">
        <p className="text-[18px] font-medium text-brand-primary">STEP 02</p>
        <h2 className="text-[28px] font-semibold lg:text-[32px]">Check your report</h2>
        <p className="text-[16px] font-medium text-text-disabled">
          Make sure this is right, then send it. You can change anything before you submit.
        </p>
      </div>

      <div className="flex flex-col gap-5">
        <Group
          title="The product"
          editTo="/report#productName"
          rows={[
            ['Product name', draft.productName],
            ['Batch number', draft.batchNumber],
            ['Purchase date', formatDate(draft.purchaseDate)],
          ]}
        />
        <Group
          title="What’s wrong"
          editTo="/report#issues"
          rows={[
            ['What you ticked', draft.issues.join(' · ')],
            ['Tell us more', draft.details],
            ['Where you bought it', draft.whereBought],
          ]}
        />
        {draft.photos.length > 0 && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between pb-1">
              <h3 className="text-[16px] font-medium leading-[1.4] text-text-secondary">Photo</h3>
              <Link to="/report#photos" className="text-[16px] font-medium text-brand-primary hover:underline">
                Edit<span className="sr-only"> photos</span>
              </Link>
            </div>
            {draft.photos.map((p) => (
              <PhotoRow key={p.id} photo={p} onRemove={() => update({ photos: draft.photos.filter((x) => x.id !== p.id) })} />
            ))}
          </div>
        )}

        <div className="flex flex-col gap-2">
          <label htmlFor="contact" className="text-[16px] font-medium leading-[1.4] text-text-secondary">
            Phone number or email for updates (optional)
          </label>
          <input
            id="contact"
            value={draft.contact}
            onChange={(e) => {
              update({ contact: e.target.value })
              if (contactError && validContact(e.target.value)) setContactError(null)
            }}
            placeholder="e.g. 0803 000 0000 or name@email.com"
            inputMode="email"
            autoComplete="email"
            aria-invalid={Boolean(contactError)}
            aria-describedby="contact-msg"
            className={`h-[54px] w-full rounded-md border bg-white px-4 text-[16px] font-medium placeholder:text-text-secondary transition-[border-color] duration-200 hover:border-text-primary focus:border-2 focus:border-brand-primary focus:outline-none ${
              contactError ? 'border-alert-error' : 'border-border-control'
            }`}
          />
          <p id="contact-msg" role={contactError ? 'alert' : undefined} className={`text-[12px] leading-[1.4] ${contactError ? 'text-alert-error' : 'text-text-secondary'}`}>
            {contactError ?? 'We’ll only use it to tell you what happens with this report.'}
          </p>
        </div>

        <div className={`flex flex-col gap-1 ${consentError ? 'animate-shake' : ''}`} onAnimationEnd={(e) => e.currentTarget.classList.remove('animate-shake')}>
          <Checkbox
            id="consent"
            checked={draft.consent}
            onChange={(c) => {
              update({ consent: c })
              if (c) setConsentError(false)
            }}
            invalid={consentError}
          >
            I agree that Veryfy may process the details in this report as described in the{' '}
            <Link to="/privacy" className="text-brand-primary hover:underline" onClick={(e) => e.stopPropagation()}>
              Privacy notice
            </Link>
            .
          </Checkbox>
          {consentError && (
            <p role="alert" className="animate-fade-in pl-9 text-[12px] text-alert-error">
              Please agree before sending your report.
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <Button to="/report" variant="secondary" className="w-full text-[16px] font-medium! sm:w-auto">
          Back to edit
        </Button>
        <Button type="submit" arrow={!submitting} disabled={submitting} className="w-full text-[16px] font-medium! sm:order-last sm:w-auto">
          {submitting && <span aria-hidden className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />}
          {submitting ? 'Submitting…' : 'Submit report'}
        </Button>
      </div>
    </form>
  )
}
