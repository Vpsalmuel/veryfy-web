import { Link, useParams } from 'react-router-dom'
import Button from '../components/Button'
import CopyButton from '../components/CopyButton'
import Reveal from '../components/Reveal'
import { issuedAlert, relatedAlert, reports, type Notice, type Step } from '../data/notices'
import chevronRight16 from '../assets/icons/chevron-right-16.svg'
import checkWhite from '../assets/icons/check-white.svg'
import infoIcon from '../assets/icons/info-filled.svg'
import timerIcon from '../assets/icons/timer-info-16.svg'
import dangerousIcon from '../assets/icons/dangerous-filled-white.svg'
import warningIcon from '../assets/icons/warning-filled-warning.svg'
import arrowPrimary16 from '../assets/icons/arrow-forward-primary-16.svg'

function SectionTitle({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return (
    <div className="flex flex-col gap-2 leading-[1.4]">
      {eyebrow && <p className="eyebrow text-text-secondary">{eyebrow}</p>}
      <h2 className="text-[22px] font-medium text-text-primary lg:text-[24px]">{title}</h2>
      {description && <p className="text-[14px] text-text-secondary">{description}</p>}
    </div>
  )
}

function Badge({ variant }: { variant: Notice['variant'] }) {
  const base = 'inline-flex w-fit items-center gap-1 rounded-full px-3 py-2 text-[12px] leading-[1.4]'
  if (variant === 'issued')
    return (
      <span className={`${base} bg-alert-error text-white`}>
        <img alt="" src={dangerousIcon} className="size-4" />
        Counterfeit Alert
      </span>
    )
  if (variant === 'under-review')
    return (
      <span className={`${base} bg-alert-info-bg text-alert-info`}>
        <img alt="" src={timerIcon} className="size-4" />
        Under review
      </span>
    )
  return <span className={`${base} bg-surface-default text-text-secondary`}>Review complete</span>
}

function Summary({ n }: { n: Notice }) {
  return (
    <section className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-16">
      <div className="flex min-w-0 flex-1 flex-col gap-5">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[14px] leading-[1.4]">
          {n.breadcrumb.map((b) => (
            <span key={b.label} className="flex items-center gap-2">
              <Link to={b.to} className="py-1 text-text-secondary hover:text-text-primary hover:underline">
                {b.label}
              </Link>
              <img alt="" src={chevronRight16} className="size-4" />
            </span>
          ))}
          <span aria-current="page" className="py-1 text-text-primary">
            {n.variant === 'issued' ? n.title : n.reference}
          </span>
        </nav>
        <p className="eyebrow text-text-secondary">{n.eyebrow}</p>
        <p className="text-[16px] font-medium leading-[1.4] text-text-secondary lg:text-[18px]">{n.subtitle}</p>
        <Badge variant={n.variant} />
        <h1 className="text-[30px] font-semibold leading-[1.4] lg:text-[40px]">{n.title}</h1>
        <p className="text-[16px] font-medium leading-[1.4] lg:text-[18px]">{n.intro}</p>
        <div className="flex flex-wrap gap-3">
          <Button to={n.primaryAction.to} arrow className="text-[16px] font-medium!">
            {n.primaryAction.label}
          </Button>
          {n.officialNoticeUrl && (
            <a
              href={n.officialNoticeUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-[52px] items-center gap-2 rounded-md px-4 text-[16px] font-medium text-brand-primary hover:bg-brand-primary/5"
            >
              Read the official notice
              <img alt="" src={arrowPrimary16} className="size-5" />
            </a>
          )}
          <Button
            variant="secondary"
            className="text-[16px] font-medium!"
            onClick={() => {
              const data = { title: n.title, url: window.location.href }
              if (navigator.share) navigator.share(data).catch(() => {})
              else navigator.clipboard?.writeText(data.url)
            }}
          >
            Share
          </Button>
        </div>
      </div>

      <aside className="flex w-full flex-col gap-6 lg:w-[480px] lg:shrink-0">
        <div className="relative h-[240px] overflow-hidden rounded-3xl bg-surface-default lg:h-[300px]">
          <img
            src={n.image}
            alt={n.subtitle}
            className="absolute top-[10px] left-1/2 size-[220px] -translate-x-1/2 object-cover lg:size-[280px]"
          />
        </div>
        <dl className="flex flex-col rounded-md bg-surface-default p-4">
          {n.meta.map((m, i) => (
            <div
              key={m.label}
              className={`flex flex-col gap-1 py-3 leading-[1.4] ${i < n.meta.length - 1 ? 'border-b border-border-default' : ''}`}
            >
              <dt className="text-[14px] text-text-secondary">{m.label}</dt>
              <dd className="flex items-center gap-2 text-[16px] font-medium">
                {m.link ? (
                  <a href={m.link} className="text-brand-primary hover:underline">
                    {m.value}
                  </a>
                ) : (
                  m.value
                )}
                {m.copy && <CopyButton value={m.value} />}
              </dd>
            </div>
          ))}
        </dl>
      </aside>
    </section>
  )
}

function Progress({ n }: { n: Notice }) {
  return (
    <section className="flex flex-col gap-6">
      <SectionTitle title={n.progressTitle} />
      <ol className="flex flex-col gap-4 sm:flex-row sm:gap-2">
        {n.progress.map((s, i) => {
          const last = i === n.progress.length - 1
          return (
            <li key={s.title} className="flex gap-3 sm:w-[220px] sm:flex-col sm:gap-2">
              <div className="flex items-center gap-2">
                <span
                  className={`flex size-8 shrink-0 items-center justify-center rounded-full text-[14px] ${
                    s.state === 'upcoming' ? 'border border-border-strong text-text-secondary' : 'bg-brand-primary text-white'
                  }`}
                >
                  {s.state === 'done' ? <img alt="" src={checkWhite} className="size-5" /> : i + 1}
                </span>
                {!last && (
                  <span
                    className={`hidden h-[2px] flex-1 sm:block ${s.state === 'done' ? 'bg-brand-primary' : 'bg-border-default'}`}
                  />
                )}
              </div>
              <div className={`flex flex-col gap-1 leading-[1.4] ${s.state === 'upcoming' ? 'text-text-secondary' : ''}`}>
                <p className="text-[16px] font-medium">{s.title}</p>
                <p className="text-[12px] text-text-secondary">{s.caption}</p>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

function Details({ n }: { n: Notice }) {
  return (
    <section className="flex flex-col gap-6">
      <SectionTitle eyebrow="Sample content" title={n.detailsTitle} />
      <dl>
        {n.details.map((d, i) => (
          <div
            key={d.label}
            className={`flex flex-col gap-1 py-3 leading-[1.4] sm:flex-row sm:items-center sm:gap-4 ${
              i < n.details.length - 1 ? 'border-b border-border-default' : ''
            }`}
          >
            <dt className="text-[14px] text-text-secondary sm:w-[200px] sm:shrink-0">{d.label}</dt>
            <dd className="text-[16px] font-medium">{d.value}</dd>
          </div>
        ))}
      </dl>
      <p className="flex items-start gap-2 rounded-md bg-alert-info-bg p-3 text-[14px] leading-[1.4]">
        <img alt="" src={infoIcon} className="size-5 shrink-0" />
        {n.detailsNote}
      </p>
    </section>
  )
}

function StepItem({ step, index }: { step: Step; index: number }) {
  return (
    <div className="group flex flex-col gap-3">
      <span className="flex size-10 items-center justify-center rounded-full bg-brand-primary text-[16px] font-medium text-white transition-transform duration-300 group-hover:scale-110">
        {index + 1}
      </span>
      <h3 className="text-[20px] font-medium leading-[1.4] lg:text-[24px]">{step.title}</h3>
      <p className="text-[14px] leading-[1.4] text-text-secondary">{step.body}</p>
    </div>
  )
}

// Marker positions from the Figma annotated pack (520×480 frame)
const markers = [
  { left: '20.96%', top: '38.54%' },
  { left: '71.92%', top: '60.83%' },
  { left: '43.08%', top: '86.67%' },
]

function PackNotes({ pack, image }: { pack: NonNullable<Notice['pack']>; image: string }) {
  return (
    <section className="flex flex-col gap-6">
      <SectionTitle title={pack.title} description={pack.description} />
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
        <div className="relative aspect-[520/480] w-full overflow-hidden rounded-3xl bg-surface-default lg:w-[520px] lg:shrink-0">
          <img src={image} alt="" className="absolute top-[4.17%] left-[7.69%] h-[91.67%] w-[84.62%] object-cover" />
          {markers.map((m, i) => (
            <span
              key={i}
              aria-hidden
              style={{ left: m.left, top: m.top }}
              className="absolute flex h-[7.5%] w-[13.85%] animate-ring items-center justify-center rounded-full bg-alert-error-bg [--ring-color:rgba(185,28,28,0.3)] text-[clamp(14px,4vw,21.6px)] text-alert-error"
            >
              {i + 1}
            </span>
          ))}
        </div>
        <ol className="flex flex-1 flex-col gap-2">
          {pack.notes.map((s, i) => (
            <li key={s.title}>
              <StepItem step={s} index={i} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Guidance({ n }: { n: Notice }) {
  return (
    <section className="flex flex-col gap-6">
      <SectionTitle title={n.guidanceTitle} />
      <ol className={`grid gap-6 sm:grid-cols-2 ${n.guidance.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
        {n.guidance.map((s, i) => (
          <li key={s.title}>
            <StepItem step={s} index={i} />
          </li>
        ))}
      </ol>
    </section>
  )
}

function RelatedAlerts() {
  const a = relatedAlert
  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-end justify-between gap-6">
        <h2 className="text-[22px] font-medium leading-[1.4] lg:text-[24px]">Related alerts</h2>
        <Link to="/alerts" className="flex items-center gap-1 text-[14px] text-brand-primary hover:underline">
          See all alerts
          <img alt="" src={arrowPrimary16} className="size-4" />
        </Link>
      </div>
      <article className="lift flex flex-col gap-4 rounded-lg border border-border-default bg-surface-raised p-5 sm:flex-row sm:gap-6">
        <div className="flex min-w-0 flex-1 flex-col gap-2 leading-[1.4]">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1 rounded-full bg-alert-warning-bg px-2 py-1 text-[12px] text-alert-warning">
              <img alt="" src={warningIcon} className="size-4" />
              Counterfeit alert
            </span>
            <span className="text-[12px] text-text-secondary">{a.published}</span>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-[18px] font-medium">{a.product}</h3>
            <p className="text-[14px] text-text-secondary">{a.subtitle}</p>
          </div>
          <p className="flex gap-2 text-[14px]">
            <span className="text-text-secondary">Affected batches</span>
            <span>{a.batches}</span>
          </p>
          <p className="text-[14px]">{a.summary}</p>
        </div>
        <div className="flex flex-col gap-2 sm:items-end">
          <p className="text-[12px] text-text-secondary">{a.issuer}</p>
          <Link to={a.to} className="flex items-center gap-1 text-[14px] text-brand-primary hover:underline">
            View alert
            <img alt="" src={arrowPrimary16} className="size-4" />
          </Link>
        </div>
      </article>
    </section>
  )
}

/** Alert details (official alert) and report status pages share this layout. */
export function NoticeDetail({ notice: n }: { notice: Notice }) {
  return (
    <div className="flex-1 bg-white">
      <div className="mx-auto w-full flex max-w-[1440px] flex-col gap-12 px-4 pt-6 pb-16 lg:gap-[72px] lg:px-20 lg:pt-10 lg:pb-24">
        <div className="animate-fade-up">
          <Summary n={n} />
        </div>
        <Reveal>
          <Progress n={n} />
        </Reveal>
        <Reveal>
          <Details n={n} />
        </Reveal>
        {n.pack && (
          <Reveal>
            <PackNotes pack={n.pack} image={n.image} />
          </Reveal>
        )}
        <Reveal>
          <Guidance n={n} />
        </Reveal>
        <Reveal>
          <RelatedAlerts />
        </Reveal>
      </div>
    </div>
  )
}

export function AlertDetailPage() {
  // Every alert shows the sample official alert until the alerts API is connected
  return <NoticeDetail notice={issuedAlert} />
}

export function ReportStatusPage() {
  const { reference = '' } = useParams()
  const ref = reference.toUpperCase()
  // Newly submitted reports (VR-YYYY-NNNN) show as under review until the API is connected
  const report =
    reports[ref] ??
    (/^VR-\d{4}-\d{4}$/.test(ref)
      ? {
          ...reports['VR-2026-0418'],
          reference: ref,
          meta: reports['VR-2026-0418'].meta.map((m) => (m.copy ? { ...m, value: ref } : m)),
        }
      : undefined)
  if (!report) {
    return (
      <section className="mx-auto w-full flex max-w-[600px] flex-col items-center gap-4 px-4 py-24 text-center">
        <h1 className="text-[32px] font-semibold">Report not found</h1>
        <p className="text-text-secondary">We couldn’t find a report with reference “{reference}”. Check the reference and try again.</p>
        <Button to="/report" arrow>
          Report a product
        </Button>
      </section>
    )
  }
  return <NoticeDetail notice={report} />
}
