import { Link, useParams } from 'react-router-dom'
import Button from '../components/Button'
import CopyButton from '../components/CopyButton'
import Reveal from '../components/Reveal'
import CounterfeitCard, { Meta, StampedImage } from '../components/CounterfeitCard'
import {
  NAFDAC_ALERTS_URL,
  categoryLabel,
  findCounterfeit,
  sortedCounterfeits,
  type BatchRow,
  type Counterfeit,
  type Photo,
} from '../data/counterfeits'
import chevronRight16 from '../assets/icons/chevron-right-16.svg'
import warningIcon from '../assets/icons/warning-filled-error.svg'
import openInNew from '../assets/icons/open-in-new-primary.svg'
import infoIcon from '../assets/icons/info-filled.svg'

function SectionTitle({ title, description }: { title: string; description?: string }) {
  return (
    <div className="flex flex-col gap-2 leading-[1.4]">
      <h2 className="text-[22px] font-medium text-text-primary lg:text-[24px]">{title}</h2>
      {description && <p className="text-[14px] text-text-secondary">{description}</p>}
    </div>
  )
}

/** Full, uncropped notice photo with a NAFDAC credit. */
function NoticePhoto({ photo }: { photo: Photo }) {
  return (
    <figure className="flex flex-col gap-2">
      <div className="flex items-center justify-center overflow-hidden rounded-lg border-[0.5px] border-border-default bg-white p-2">
        <img src={photo.src} alt={photo.caption} loading="lazy" className="max-h-[360px] w-auto max-w-full object-contain" />
      </div>
      <figcaption className="text-[12px] leading-[1.4] text-text-secondary">
        {photo.caption} <span className="text-text-disabled">· Photo: NAFDAC</span>
      </figcaption>
    </figure>
  )
}

function Header({ c }: { c: Counterfeit }) {
  return (
    <section className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-16">
      <div className="flex min-w-0 flex-1 flex-col gap-5">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[14px] leading-[1.4]">
          {[
            { label: 'Home', to: '/' },
            { label: 'Alerts', to: '/alerts' },
          ].map((b) => (
            <span key={b.label} className="flex items-center gap-2">
              <Link to={b.to} className="py-1 text-text-secondary hover:text-text-primary hover:underline">
                {b.label}
              </Link>
              <img alt="" src={chevronRight16} className="size-4" />
            </span>
          ))}
          <span aria-current="page" className="py-1 text-text-primary">
            {c.product}
          </span>
        </nav>
        <p className="flex w-fit items-center gap-1 rounded-full bg-[rgba(185,28,28,0.1)] px-3 py-1 text-[12px] font-medium leading-[1.4] text-alert-error">
          <img alt="" src={warningIcon} className="size-4" />
          Confirmed counterfeit
        </p>
        <h1 className="text-[30px] font-semibold leading-[1.3] lg:text-[40px]">{c.product}</h1>
        <Meta items={[c.brand, categoryLabel[c.category]]} className="text-[16px] font-medium text-text-secondary lg:text-[18px]" />

        {/* The one fact the page leads with: when NAFDAC confirmed it */}
        <dl className="flex flex-col gap-3 rounded-lg border-[0.5px] border-border-default bg-white p-4 sm:flex-row sm:gap-8">
          <div className="flex flex-col gap-1 leading-[1.4]">
            <dt className="text-[12px] text-text-secondary">Confirmed counterfeit on</dt>
            <dd className="text-[18px] font-medium text-text-primary">{c.confirmedOn}</dd>
          </div>
          <div className="flex flex-col gap-1 leading-[1.4]">
            <dt className="text-[12px] text-text-secondary">Confirmed by</dt>
            <dd className="text-[18px] font-medium text-text-primary">NAFDAC</dd>
          </div>
          <div className="flex flex-col gap-1 leading-[1.4]">
            <dt className="text-[12px] text-text-secondary">Public Alert No.</dt>
            <dd className="flex items-center gap-2 text-[18px] font-medium text-text-primary">
              {c.alertNo}
              <CopyButton value={c.alertNo} />
            </dd>
          </div>
        </dl>

        <p className="text-[16px] leading-[1.5] text-text-primary">{c.background[0]}</p>

        <div className="flex flex-wrap gap-3">
          <a
            href={c.noticeUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-[52px] items-center gap-2 rounded-md bg-brand-primary px-4 text-[16px] font-medium text-white hover:bg-brand-primary-dark"
          >
            Read the NAFDAC notice
            <img alt="" src={openInNew} className="size-5 brightness-0 invert" />
          </a>
          <Button to="/report" variant="secondary" className="text-[16px] font-medium!">
            Report a similar product
          </Button>
          <Button
            variant="ghost"
            className="text-[16px] font-medium!"
            onClick={() => {
              const data = { title: `Counterfeit ${c.product}`, url: window.location.href }
              if (navigator.share) navigator.share(data).catch(() => {})
              else navigator.clipboard?.writeText(data.url)
            }}
          >
            Share
          </Button>
        </div>
      </div>

      <aside className="flex w-full flex-col gap-2 lg:w-[420px] lg:shrink-0">
        <StampedImage item={c} stampWidth="62%" className="aspect-square w-full" />
        <p className="text-[12px] leading-[1.4] text-text-secondary">
          {c.cover ? (
            <>
              {c.cover.caption} <span className="text-text-disabled">· Photo: NAFDAC</span>
            </>
          ) : (
            'The NAFDAC notice for this product does not include a photo.'
          )}
        </p>
      </aside>
    </section>
  )
}

function BatchTable({ rows }: { rows: BatchRow[] }) {
  const cols: { key: keyof BatchRow; label: string }[] = [
    { key: 'product', label: 'Product' },
    { key: 'batch', label: 'Batch number' },
    { key: 'mfg', label: 'Manufacturing date' },
    { key: 'exp', label: 'Expiry date' },
    { key: 'manufacturer', label: 'Stated manufacturer' },
    { key: 'agent', label: 'Agent' },
    { key: 'regNo', label: 'NAFDAC Reg. No.' },
  ]
  const used = cols.filter((col) => rows.some((r) => r[col.key]))
  return (
    <div className="flex flex-col gap-3">
      {rows.map((r, i) => (
        <dl key={`${r.batch}-${i}`} className="grid gap-x-6 rounded-lg border-[0.5px] border-border-default bg-white p-4 sm:grid-cols-2 lg:grid-cols-3">
          {used.map((col) =>
            r[col.key] ? (
              <div key={col.key} className="flex flex-col gap-1 py-2 leading-[1.4]">
                <dt className="text-[12px] text-text-secondary">{col.label}</dt>
                <dd className={`text-[16px] font-medium ${col.key === 'batch' ? 'flex items-center gap-2' : ''}`}>
                  {r[col.key]}
                  {col.key === 'batch' && <CopyButton value={r.batch} />}
                </dd>
              </div>
            ) : null,
          )}
        </dl>
      ))}
    </div>
  )
}

function Comparisons({ c }: { c: Counterfeit }) {
  if (!c.comparison) return null
  return (
    <div className="flex flex-col gap-6">
      {c.comparison.map((row) => (
        <div key={row.aspect} className="flex flex-col gap-3 rounded-lg border-[0.5px] border-border-default bg-white p-4 lg:p-6">
          <h3 className="text-[18px] font-medium leading-[1.4]">{row.aspect}</h3>
          <div className="grid gap-6 md:grid-cols-2">
            {(
              [
                ['Genuine', row.genuine, row.genuinePhotos, 'text-alert-success bg-alert-success-bg'],
                ['Counterfeit', row.fake, row.fakePhotos, 'text-alert-error bg-alert-error-bg'],
              ] as const
            ).map(([label, text, photos, tone]) => (
              <div key={label} className="flex flex-col gap-3">
                <span className={`w-fit rounded-full px-3 py-1 text-[12px] font-medium ${tone}`}>{label}</span>
                <p className="text-[14px] leading-[1.4]">{text}</p>
                {photos?.map((p) => <NoticePhoto key={p.caption + p.src} photo={p} />)}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function CounterfeitDetailPage() {
  const { id = '' } = useParams()
  const c = findCounterfeit(id)

  if (!c) {
    return (
      <section className="mx-auto w-full flex max-w-[600px] flex-col items-center gap-4 px-4 py-24 text-center">
        <h1 className="text-[32px] font-semibold">Alert not found</h1>
        <p className="text-text-secondary">We couldn’t find this alert. It may have been moved or the link may be wrong.</p>
        <Button to="/alerts" arrow>
          See all alerts
        </Button>
      </section>
    )
  }

  const more = sortedCounterfeits.filter((x) => x.id !== c.id).slice(0, 2)

  return (
    <div className="flex-1 bg-white">
      <div className="mx-auto w-full flex max-w-[1440px] flex-col gap-12 px-4 pt-6 pb-16 lg:gap-[72px] lg:px-20 lg:pt-10 lg:pb-24">
        <div className="animate-fade-up">
          <Header c={c} />
        </div>

        <Reveal>
          <section className="flex flex-col gap-6">
            <SectionTitle title="Counterfeit product details" description={`From NAFDAC Public Alert No. ${c.alertNo}.`} />
            <BatchTable rows={c.batches} />
            {c.batchNotes?.map((n) => (
              <p key={n} className="text-[14px] leading-[1.4] text-text-secondary">
                {n}
              </p>
            ))}
          </section>
        </Reveal>

        {(c.findings || c.comparison) && (
          <Reveal>
            <section className="flex flex-col gap-6">
              <SectionTitle title="How to spot it" description={c.findings?.intro} />
              {c.findings && (
                <ol className="flex flex-col gap-3">
                  {c.findings.items.map((f, i) => (
                    <li key={f} className="flex gap-4 rounded-lg border-[0.5px] border-border-default bg-white p-4">
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-alert-error-bg text-[14px] font-medium text-alert-error">
                        {i + 1}
                      </span>
                      <p className="self-center text-[16px] leading-[1.5]">{f}</p>
                    </li>
                  ))}
                </ol>
              )}
              <Comparisons c={c} />
            </section>
          </Reveal>
        )}

        {c.photos.length > 0 && (
          <Reveal>
            <section className="flex flex-col gap-6">
              <SectionTitle title="Photos from the NAFDAC notice" />
              <div className="grid gap-6 md:grid-cols-2">
                {c.photos.map((p) => (
                  <NoticePhoto key={p.caption + p.src} photo={p} />
                ))}
              </div>
            </section>
          </Reveal>
        )}

        <Reveal>
          <section className="flex flex-col gap-6 lg:flex-row lg:gap-12">
            <div className="flex flex-1 flex-col gap-4">
              <SectionTitle title="Why it’s dangerous" />
              <p className="rounded-lg bg-alert-error-bg p-4 text-[16px] leading-[1.5] text-text-primary">{c.risk}</p>
            </div>
            {c.about && (
              <div className="flex flex-1 flex-col gap-4">
                <SectionTitle title="About this product" />
                <p className="text-[16px] leading-[1.5] text-text-secondary">{c.about}</p>
              </div>
            )}
          </section>
        </Reveal>

        {c.background.length > 1 && (
          <Reveal>
            <section className="flex flex-col gap-4">
              <SectionTitle title="How it was found" />
              {c.background.slice(1).map((p) => (
                <p key={p} className="text-[16px] leading-[1.5] text-text-secondary">
                  {p}
                </p>
              ))}
            </section>
          </Reveal>
        )}

        <Reveal>
          <section className="flex flex-col gap-6">
            <SectionTitle title="What to do" description="NAFDAC’s advice from the notice." />
            <ul className="flex flex-col gap-3">
              {c.advice.map((a) => (
                <li key={a} className="rounded-lg border-[0.5px] border-border-default bg-white p-4 text-[16px] leading-[1.5]">
                  {a}
                </li>
              ))}
            </ul>
          </section>
        </Reveal>

        <Reveal>
          <p className="flex items-start gap-2 rounded-md bg-alert-info-bg p-4 text-[14px] leading-[1.5]">
            <img alt="" src={infoIcon} className="size-5 shrink-0" />
            <span>
              Source: information and photos on this page are from{' '}
              <a href={c.noticeUrl} target="_blank" rel="noreferrer" className="text-brand-primary underline">
                NAFDAC Public Alert No. {c.alertNo}
              </a>
              , published {c.confirmedOn} by the National Agency for Food and Drug Administration and Control (NAFDAC). See all{' '}
              <a href={NAFDAC_ALERTS_URL} target="_blank" rel="noreferrer" className="text-brand-primary underline">
                NAFDAC Recalls and Safety Alerts
              </a>
              . Veryfy shows publicly published notices and does not certify authenticity or replace official regulatory
              decisions.
            </span>
          </p>
        </Reveal>

        {more.length > 0 && (
          <Reveal>
            <section className="flex flex-col gap-6">
              <div className="flex items-end justify-between gap-6">
                <h2 className="text-[22px] font-medium leading-[1.4] lg:text-[24px]">More counterfeit alerts</h2>
                <Link to="/alerts" className="text-[14px] text-brand-primary hover:underline">
                  See all alerts
                </Link>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {more.map((m) => (
                  <CounterfeitCard key={m.id} item={m} />
                ))}
              </div>
            </section>
          </Reveal>
        )}
      </div>
    </div>
  )
}
