import { Navigate, useSearchParams } from 'react-router-dom'
import Button from '../../components/Button'
import CopyButton from '../../components/CopyButton'
import { sampleProduct, verify, type VerificationOutcome } from '../../data/verification'
import checkWhite44 from '../../assets/icons/check-white-44.svg'
import errorWhite44 from '../../assets/icons/error-white-44.svg'
import contentCopy24 from '../../assets/icons/content-copy-24.svg'
import qrScanner from '../../assets/icons/qr-code-scanner.svg'
import verified58 from '../../assets/icons/verified-58.svg'
import verifiedFilled from '../../assets/icons/verified-filled.svg'
import checkWhite15 from '../../assets/icons/check-white-15.svg'
import dotGrey from '../../assets/icons/dot-grey.svg'

const flaggedReasons = [
  { body: 'This code has been scanned multiple times from different locations.' },
  { body: 'The code does not match expected manufacturer records.' },
  { body: 'This may indicate a counterfeit or unauthorised product.' },
]

const flaggedActions = [
  { body: 'Do not use this product if you think it may be counterfeit.' },
  { body: 'Check the packaging for tampering or missing security features.' },
  { body: 'Report this product to help us investigate.' },
]

const nextSteps = [
  {
    title: 'Check the code or scan again',
    body: 'Make sure the code is correct (e.g., 0 vs O, 1 vs I), or rescan the QR code in good lighting.',
  },
  { title: 'Check the packaging', body: 'Look for signs of tampering or missing security features.' },
  { title: 'Report this product', body: 'Help us investigate by reporting this product.' },
]

function ProductSummary() {
  const p = sampleProduct
  return (
    <div className="flex flex-col gap-7 animate-fade-up [animation-delay:150ms] md:flex-row md:items-center lg:w-[760px] lg:shrink-0">
      <div className="group aspect-[423/311] w-full overflow-hidden rounded-lg md:w-[423px] md:shrink-0">
        <img
          src={p.image}
          alt="Product registration certificate with Lumea products"
          className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col gap-[31px] md:w-[312px]">
        <div className="flex flex-col gap-[17px]">
          <div className="flex flex-col gap-[7px] font-medium leading-[1.4]">
            <h2 className="text-[24px] text-black">{p.name}</h2>
            <p className="text-[16px] text-text-secondary">{p.description}</p>
          </div>
          <div className="flex gap-[11px]">
            {p.tags.map((t) => (
              <span
                key={t}
                className="rounded-md border-[0.5px] border-border-default bg-surface-default px-3 py-1 text-[12px] text-text-secondary"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <dl className="flex flex-col gap-[13px] leading-[1.4]">
          <div className="flex items-center gap-6">
            <dt className="w-[112px] shrink-0 text-[14px] text-text-secondary">Serial number</dt>
            <dd className="flex items-center gap-1 text-[16px] font-medium">
              {p.serial}
              <CopyButton value={p.serial} icon={contentCopy24} size={24} />
            </dd>
          </div>
          <div className="flex items-center gap-6">
            <dt className="w-[112px] shrink-0 text-[14px] text-text-secondary">Batch number</dt>
            <dd className="text-[16px] font-medium">{p.batch}</dd>
          </div>
          <div className="flex items-center gap-6">
            <dt className="w-[112px] shrink-0 text-[14px] text-text-secondary">Manufacturer</dt>
            <dd className="text-[16px] font-medium">{p.manufacturer}</dd>
          </div>
          <div className="flex items-center gap-6">
            <dt className="w-[112px] shrink-0 text-[14px] text-text-secondary">Verified on</dt>
            <dd className="flex items-center gap-1 text-[14px] text-[#989891]">
              {p.verifiedDate}
              <img alt="" src={dotGrey} className="size-[3px]" />
              {p.verifiedTime}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}

const heroes: Record<
  VerificationOutcome,
  { tint: string; ring: string; solid: string; titleColor: string; icon: string; title: string; body: string }
> = {
  verified: {
    tint: 'bg-success-tint',
    ring: 'bg-success-ring',
    solid: 'bg-alert-success [--ring-color:rgba(66,226,127,0.45)]',
    titleColor: 'text-alert-success',
    icon: checkWhite44,
    title: 'Product Verified',
    body: 'The products has passed the available authentication checks and matches official manufacturer records',
  },
  unable: {
    tint: 'bg-warning-tint',
    ring: 'bg-warning-ring',
    solid: 'bg-warning-solid [--ring-color:rgba(245,107,22,0.4)]',
    titleColor: 'text-alert-warning',
    icon: errorWhite44,
    title: 'Unable to verify this product',
    body: "We couldn't confirm this product using the information provided. This could be due to an unstable internet connection, an invalid code, an unregistered product or a potentially counterfeit item.",
  },
  flagged: {
    tint: 'bg-alert-error/10',
    ring: 'bg-[#ffa5a5]',
    solid: 'bg-alert-error [--ring-color:rgba(185,28,28,0.4)]',
    titleColor: 'text-[#a81919]',
    icon: errorWhite44,
    title: 'Suspicious activity detected',
    body: "This code has triggered a security warning. We've detected unusual activity associated with this product. Proceed with caution.",
  },
}

function Hero({ outcome }: { outcome: VerificationOutcome }) {
  const h = heroes[outcome]
  return (
    <div className={`flex w-full flex-col items-center gap-5 rounded-lg px-6 py-7 text-center animate-fade-in ${h.tint}`}>
      <div className={`flex size-[100px] items-center justify-center rounded-full p-3 animate-pop ${h.ring}`}>
        <div className={`flex size-[60px] items-center justify-center rounded-full animate-ring ${h.solid}`}>
          <img
            alt=""
            src={h.icon}
            className={`size-11 ${
              // Flagged: pop in, then a short warning shake
              outcome === 'flagged'
                ? 'animate-[pop_0.6s_var(--ease-spring)_200ms_both,shake_0.4s_ease-in-out_900ms_2]'
                : 'animate-pop [animation-delay:200ms]'
            }`}
          />
        </div>
      </div>
      <div className="flex flex-col items-center gap-[9px] font-medium leading-[1.4] animate-fade-up [animation-delay:250ms]">
        <h1 className={`text-[22px] lg:text-[24px] ${h.titleColor}`}>{h.title}</h1>
        <p className="max-w-[898px] text-[16px] text-text-secondary lg:text-[18px]">{h.body}</p>
      </div>
    </div>
  )
}

function AuthChecks() {
  const checks = [
    { name: 'UniCode', icon: qrScanner },
    { name: 'HiddenMark', icon: verified58 },
  ]
  return (
    <div className="flex flex-1 flex-col justify-center gap-6">
      <div className="flex flex-col gap-4 rounded-lg border-[0.5px] border-border-default bg-white p-4">
        <p className="text-[14px] text-black">Authentication Checks</p>
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-6">
          {checks.map((c, i) => (
            <div
              key={c.name}
              className="flex flex-1 items-center gap-4 rounded-md px-3 py-4 transition-colors hover:bg-surface-brand-subtle animate-fade-up"
              style={{ animationDelay: `${400 + i * 150}ms` }}
            >
              <span className="flex size-[66px] shrink-0 items-center rounded-sm bg-brand-primary-light/66 p-1">
                <img alt="" src={c.icon} className="size-[58px]" />
              </span>
              <div className="flex flex-col gap-2">
                <p className="text-[18px] font-medium text-black">{c.name}</p>
                <p className="flex items-center gap-[15px] text-[14px] text-black">
                  <span
                    className="flex size-8 items-center justify-center rounded-full bg-success-check animate-pop"
                    style={{ animationDelay: `${700 + i * 150}ms` }}
                  >
                    <img alt="" src={checkWhite15} className="size-[15px]" />
                  </span>
                  Valid
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-[18px] rounded-md bg-success-tint px-5 py-6 animate-fade-up [animation-delay:900ms]">
        <span className="flex shrink-0 rounded-full bg-white p-2">
          <img alt="" src={verifiedFilled} className="size-8" />
        </span>
        <div className="flex flex-col gap-[6px] leading-[1.4]">
          <p className="text-[14px] text-black">This is a genuine product</p>
          <p className="text-[12px] text-text-secondary">
            You can shop with confidence. The product was verified using Veryfy’s unicode and hiddenmark system
          </p>
        </div>
      </div>
    </div>
  )
}

function NumberedList({
  title,
  items,
  className = '',
  delay = 300,
  inCard = false,
}: {
  title: string
  items: { title?: string; body: string }[]
  className?: string
  delay?: number
  /** Inside a bordered card: numbers line up with the heading and the last row has no divider */
  inCard?: boolean
}) {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <h2 className="text-[18px] font-medium leading-[1.4]">{title}</h2>
      <ol>
        {items.map((s, i) => (
          <li
            key={s.body}
            className={`flex gap-4 border-b-[0.5px] border-border-default py-3 transition-colors animate-fade-up ${
              inCard ? 'items-center last:border-b-0 last:pb-0' : 'px-4 hover:bg-surface-brand-subtle'
            }`}
            style={{ animationDelay: `${delay + i * 100}ms` }}
          >
            <span className="flex h-[38px] w-10 shrink-0 items-center justify-center rounded-full bg-brand-primary-light/60 text-[16px] font-medium text-brand-primary-dark">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="flex flex-col gap-[7px] text-[16px] font-medium leading-[1.4]">
              {s.title && <p>{s.title}</p>}
              <p className="text-text-secondary">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default function VerifyResultPage() {
  const [params] = useSearchParams()
  const query = params.get('q') ?? ''
  if (!query) return <Navigate to="/#check" replace />
  const outcome = verify(query)
  const ok = outcome === 'verified'

  return (
    <section
      className={`mx-auto flex w-full max-w-[1512px] flex-1 flex-col items-center px-4 pt-6 pb-12 lg:px-24 lg:pt-12 ${
        ok ? 'gap-12 lg:gap-[74px]' : 'gap-12'
      }`}
    >
      <Hero outcome={outcome} />
      <div className="flex w-full flex-col gap-8 lg:flex-row lg:items-start lg:gap-6">
        {/* Product details only for verified products (not for unable or flagged results) */}
        {outcome === 'verified' && <ProductSummary />}
        {outcome === 'verified' && <AuthChecks />}
        {outcome === 'unable' && (
          // Same bordered card as the flagged result, left-aligned with the banner
          <div className="flex w-full flex-col rounded-lg border-[0.5px] border-border-default bg-white p-4 lg:p-6">
            <NumberedList title="What you can do" items={nextSteps} inCard />
          </div>
        )}
        {outcome === 'flagged' && (
          // One bordered card, left-aligned with the banner, holding both lists side by side
          <div className="flex w-full flex-col gap-8 rounded-lg border-[0.5px] border-border-default bg-white p-4 sm:flex-row sm:gap-6 lg:gap-12 lg:p-6">
            <NumberedList title="Why we flagged this product" items={flaggedReasons} className="flex-1" inCard />
            <NumberedList title="What you can do" items={flaggedActions} className="flex-1" delay={500} inCard />
          </div>
        )}
      </div>
      <div className="flex w-full flex-col gap-4 animate-fade-up [animation-delay:600ms] sm:w-auto sm:flex-row sm:gap-[23px]">
        {ok ? (
          <Button variant="secondary" to={`/products/${sampleProduct.serial}`} className="font-normal! sm:w-[315px]">
            View product details
          </Button>
        ) : (
          <Button
            to="/report"
            variant="secondary"
            className="border-alert-warning! font-normal! text-alert-warning! hover:bg-alert-warning/5! sm:w-[315px]"
          >
            Report product
          </Button>
        )}
        <Button to="/#check" className="font-normal! sm:w-[315px]">
          {ok ? 'Check another product' : 'Try again'}
        </Button>
      </div>
    </section>
  )
}
