import { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useReport } from './reportStore'
import checkCircle64 from '../../assets/icons/check-circle-success-64.svg'
import copyPrimary from '../../assets/icons/copy-primary-20.svg'
import checkWhite from '../../assets/icons/check-white.svg'
import arrowPrimary16 from '../../assets/icons/arrow-forward-primary-16.svg'

export default function ConfirmationStep() {
  const { reference, reset } = useReport()
  const [copied, setCopied] = useState(false)
  const [submittedAt] = useState(() => new Date())

  // Clear the draft once the report is in
  useEffect(() => {
    if (reference) reset()
  }, [reference, reset])

  useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 1800)
    return () => clearTimeout(t)
  }, [copied])

  if (!reference) return <Navigate to="/report" replace />

  const time = submittedAt.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
  const steps = [
    { title: 'Report received', caption: `Today, ${time}`, done: true },
    { title: 'Review', caption: 'Usually within 5 working days', done: false },
    { title: 'Outcome', caption: 'We’ll tell you by SMS or email', done: false },
  ]

  return (
    <div className="flex flex-col items-center gap-6 rounded-lg border border-border-default bg-surface-raised p-5 sm:p-8">
      <div className="flex size-[120px] animate-pop items-center justify-center rounded-full bg-alert-success-bg">
        <img alt="" src={checkCircle64} className="size-16 animate-pop [animation-delay:200ms]" />
      </div>
      <div className="flex w-full flex-col gap-2 leading-[1.4]">
        <h2 className="text-[24px] font-medium" tabIndex={-1}>
          Report submitted
        </h2>
        <p className="text-[14px] text-text-secondary">
          Thank you. A reviewer will look at your report and we’ll let you know what happens next.
        </p>
      </div>

      <div className="flex w-full animate-fade-up items-center gap-4 rounded-md bg-surface-default py-4 pr-4 pl-5 [animation-delay:250ms]">
        <div className="flex min-w-0 flex-1 flex-col gap-1 leading-[1.4]">
          <p className="text-[12px] text-text-secondary">Your reference number</p>
          <p className="text-[22px] font-medium tracking-wide sm:text-[24px]">{reference}</p>
        </div>
        <button
          type="button"
          onClick={() => navigator.clipboard?.writeText(reference).then(() => setCopied(true))}
          aria-label={copied ? 'Reference copied' : 'Copy reference number'}
          className={`flex h-[52px] shrink-0 items-center justify-center gap-[10px] rounded-md border px-4 text-[16px] font-medium transition-all duration-200 active:scale-95 ${
            copied
              ? 'border-alert-success bg-alert-success text-white'
              : 'border-brand-primary text-brand-primary hover:bg-brand-primary/5'
          }`}
        >
          <img alt="" src={copied ? checkWhite : copyPrimary} className="size-5" />
          <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

      <div className="flex w-full flex-col gap-2">
        <h3 className="text-[20px] font-medium leading-[1.4]">What happens next</h3>
        <ol>
          {steps.map((s, i) => {
            const last = i === steps.length - 1
            return (
              <li key={s.title} className="flex animate-fade-up gap-3" style={{ animationDelay: `${400 + i * 120}ms` }}>
                <div className="flex flex-col items-center gap-1 self-stretch">
                  <span
                    className={`flex size-8 shrink-0 items-center justify-center rounded-full text-[14px] ${
                      s.done ? 'bg-brand-primary' : 'border border-border-strong text-text-secondary'
                    }`}
                  >
                    {s.done ? <img alt="" src={checkWhite} className="size-5" /> : i + 1}
                  </span>
                  {!last && <span className={`w-[2px] flex-1 ${s.done ? 'bg-brand-primary' : 'bg-border-default'}`} />}
                </div>
                <div className={`flex flex-col gap-1 pt-1 pb-6 leading-[1.4] ${s.done ? '' : 'text-text-secondary'}`}>
                  <p className="text-[16px] font-medium">{s.title}</p>
                  <p className="text-[12px] text-text-secondary">{s.caption}</p>
                </div>
              </li>
            )
          })}
        </ol>
      </div>

      <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
        {[
          { label: 'Track this report', to: `/reports/${reference}` },
          { label: 'Back to home', to: '/' },
          { label: 'Read reporting guidance', to: '/learn' },
        ].map((l) => (
          <Link key={l.label} to={l.to} className="group flex items-center gap-1 text-[14px] text-brand-primary hover:underline">
            {l.label}
            <img alt="" src={arrowPrimary16} className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        ))}
      </div>
    </div>
  )
}
