import { useEffect, useState } from 'react'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { checkingSteps } from '../../data/verification'
import spinner from '../../assets/verify/spinner.svg'
import checkWhite from '../../assets/icons/check-white.svg'
import lockIcon from '../../assets/icons/lock.svg'

const STEP_MS = 900

/** Animated "Checking your product…" screen; steps advance, then it hands off to the result. */
export default function CheckingPage() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const query = params.get('q') ?? ''
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (!query) return
    if (active < checkingSteps.length) {
      const t = setTimeout(() => setActive((a) => a + 1), STEP_MS)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => navigate(`/check/result?${params.toString()}`, { replace: true }), 400)
    return () => clearTimeout(t)
  }, [active, query, navigate, params])

  if (!query) return <Navigate to="/#check" replace />

  const progress = Math.round((active / checkingSteps.length) * 100)

  return (
    <section className="mx-auto w-full flex w-full max-w-[1090px] flex-1 flex-col items-center gap-12 px-4 pt-12 pb-16 lg:gap-[69px] lg:pt-12">
      <div className="flex w-full flex-col items-center gap-9">
        <div className="flex flex-col items-center">
          <div className="relative size-[200px] lg:h-[313px] lg:w-[312px]">
            <img alt="" src={spinner} className="size-full animate-spin-slow" />
            <span className="absolute inset-0 flex items-center justify-center text-[28px] font-medium text-brand-primary tabular-nums lg:text-[36px]">
              {progress}%
            </span>
          </div>
          <div className="flex max-w-[648px] flex-col items-center gap-[9px] text-center font-medium leading-[1.4]">
            <h1 className="text-[22px] text-black lg:text-[24px]" aria-live="polite">
              Checking your product…
            </h1>
            <p className="max-w-[422px] text-[16px] text-text-secondary lg:text-[18px]">
              Please wait while we verify the information using our authentication system.
            </p>
          </div>
        </div>

        <ol className="flex w-full flex-col gap-4 sm:flex-row sm:gap-2" aria-label="Verification progress">
          {checkingSteps.map((s, i) => {
            const state = i < active ? 'done' : i === active ? 'current' : 'upcoming'
            const last = i === checkingSteps.length - 1
            return (
              <li key={s.title} className="flex flex-1 gap-3 sm:flex-col sm:gap-2" aria-current={state === 'current' ? 'step' : undefined}>
                <div className="flex items-center gap-2">
                  <span
                    className={`flex size-8 shrink-0 items-center justify-center rounded-full text-[14px] transition-all duration-500 ${
                      state === 'upcoming'
                        ? 'border border-border-strong text-text-secondary'
                        : 'bg-brand-primary text-white'
                    } ${state === 'current' ? 'animate-ring [--ring-color:rgba(61,82,213,0.4)]' : ''}`}
                  >
                    {state === 'done' ? <img alt="" src={checkWhite} className="size-5 animate-pop" /> : i + 1}
                  </span>
                  {!last && (
                    <span className="relative hidden h-[2px] flex-1 overflow-hidden bg-border-default sm:block">
                      <span
                        className={`absolute inset-y-0 left-0 bg-brand-primary transition-[width] ease-out ${state === 'done' ? 'w-full' : 'w-0'}`}
                        style={{ transitionDuration: `${STEP_MS}ms` }}
                      />
                    </span>
                  )}
                </div>
                <div className={`flex flex-col gap-1 leading-[1.4] ${state === 'upcoming' ? 'text-text-secondary' : ''}`}>
                  <p className="text-[16px] font-medium">{s.title}</p>
                  <p className="text-[12px] text-text-secondary">
                    {state === 'done' ? s.done : state === 'current' ? 'In progress' : 'Not started'}
                  </p>
                </div>
              </li>
            )
          })}
        </ol>
      </div>

      <p className="flex items-center gap-[14px] rounded-2xl bg-brand-primary-light/48 px-6 py-3 text-[14px] leading-[1.4]">
        <img alt="" src={lockIcon} className="size-6 shrink-0" />
        Your information is secure and only used for verification
      </p>
    </section>
  )
}
