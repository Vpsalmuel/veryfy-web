import { useCallback, useEffect, useMemo, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { DRAFT_KEY, ReportContext, emptyDraft, type ReportDraft } from './reportStore'

const steps = [
  { label: 'What happened', path: '/report' },
  { label: 'Review', path: '/report/review' },
  { label: 'Confirmation', path: '/report/confirmation' },
]

function loadDraft(): ReportDraft {
  try {
    const saved = localStorage.getItem(DRAFT_KEY)
    // Photos can't be restored from storage, so drafts keep text fields only
    return saved ? { ...emptyDraft, ...JSON.parse(saved), photos: [] } : emptyDraft
  } catch {
    return emptyDraft
  }
}

/** Shared shell for the 3-step report flow: page intro, step list and the current step's card. */
export default function ReportLayout() {
  const { pathname } = useLocation()
  const [draft, setDraft] = useState<ReportDraft>(loadDraft)
  const [reference, setReference] = useState<string | null>(null)

  const update = useCallback((patch: Partial<ReportDraft>) => setDraft((d) => ({ ...d, ...patch })), [])
  const reset = useCallback(() => {
    setDraft(emptyDraft)
    try {
      localStorage.removeItem(DRAFT_KEY)
    } catch {
      /* storage unavailable */
    }
  }, [])
  const value = useMemo(() => ({ draft, update, reset, reference, setReference }), [draft, update, reset, reference])

  // Free photo previews when leaving the flow
  useEffect(() => () => draft.photos.forEach((p) => URL.revokeObjectURL(p.url)), []) // eslint-disable-line react-hooks/exhaustive-deps

  const current = Math.max(
    0,
    steps.findIndex((s) => s.path === pathname.replace(/\/$/, '')),
  )
  const confirmed = current === 2

  return (
    <ReportContext.Provider value={value}>
      <section className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-4 pt-8 pb-12 lg:gap-[62px] lg:px-24 lg:pt-[101px] lg:pb-16">
        <div className="flex animate-fade-up flex-col gap-3">
          <div className="flex flex-col gap-2">
            <p className="eyebrow text-brand-primary">Consumer reporting</p>
            <h1 className="text-[28px] font-semibold leading-[1.4] text-brand-secondary lg:text-[40px]">
              Something doesn’t look right?
            </h1>
          </div>
          <p className="text-[16px] font-medium leading-[1.4] text-text-secondary lg:text-[18px]">
            {confirmed
              ? 'Thanks for reporting. Keep your reference number to check on your report.'
              : 'Tell us what you noticed about the product.'}
          </p>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-[54px]">
          <nav aria-label="Report steps" className="lg:sticky lg:top-28 lg:w-[240px] lg:shrink-0">
            <ol>
              {steps.map((s, i) => {
                const active = i === current
                return (
                  <li
                    key={s.label}
                    aria-current={active ? 'step' : undefined}
                    className={`flex items-center px-3 py-2 text-[14px] leading-[1.4] transition-all duration-300 ${
                      active
                        ? 'border-l-2 border-brand-primary bg-surface-brand-subtle text-brand-primary'
                        : `border-l border-border-default ${i < current ? 'text-text-primary' : 'text-text-secondary'}`
                    }`}
                  >
                    {s.label}
                  </li>
                )
              })}
            </ol>
          </nav>
          <div key={pathname} className={`min-w-0 flex-1 animate-fade-up ${confirmed ? 'lg:max-w-[720px]' : ''}`}>
            <Outlet />
          </div>
        </div>
      </section>
    </ReportContext.Provider>
  )
}
