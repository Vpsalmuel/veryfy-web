import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import qrCode from '../../assets/landing/qr-code.svg'
import cameraIcon from '../../assets/icons/camera.svg'

// Figma handoff shows two search modes (Serial number active by default)
const modes = [
  { id: 'serial', label: 'Serial number', placeholder: 'Enter the serial number printed on the pack' },
  { id: 'code', label: 'Barcode', placeholder: 'Enter the barcode number or Uni-Code' },
] as const

type Mode = (typeof modes)[number]['id']

export default function CheckProduct() {
  const [mode, setMode] = useState<Mode>('serial')
  const [query, setQuery] = useState('')
  const [error, setError] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()
  const activeIndex = modes.findIndex((m) => m.id === mode)
  const active = modes[activeIndex]

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!query.trim()) {
      setError(true)
      return
    }
    setSubmitting(true)
    // Brief pressed/loading beat before handing off to the checking screen
    setTimeout(() => navigate(`/check?mode=${mode}&q=${encodeURIComponent(query.trim())}`), 250)
  }

  return (
    <section
      id="check"
      className="scroll-mt-24 flex flex-col gap-4 rounded-xl border-[0.5px] border-border-default bg-white p-4 lg:flex-row lg:items-stretch lg:gap-16 lg:px-5 lg:py-8"
    >
      <div className="flex flex-1 flex-col justify-center gap-6 lg:gap-8 lg:px-2">
        <div className="flex flex-col gap-4">
          <h2 className="text-[24px] font-semibold leading-[1.4] lg:text-[32px]">Check a Product</h2>
          <p className="text-[16px] font-bold leading-[1.4] text-text-disabled lg:text-[18px]">
            Search by product name, serial number, barcode or QR code to see if its genuine and view official information
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Search by"
          className="relative flex w-full gap-1 rounded-full bg-surface-default p-1 lg:w-[621px]"
        >
          {/* Sliding white pill behind the selected tab */}
          <span
            aria-hidden
            className="absolute top-1 bottom-1 left-1 w-[calc((100%-12px)/2)] rounded-full bg-white shadow-[0_0_5.8px_rgba(76,146,253,0.3)] transition-transform duration-300 ease-[var(--ease-out-soft)]"
            style={{ transform: `translateX(calc(${activeIndex} * (100% + 4px)))` }}
          />
          {modes.map((m) => (
            <button
              key={m.id}
              type="button"
              role="tab"
              aria-selected={m.id === mode}
              onClick={() => setMode(m.id)}
              className={`relative z-10 flex-1 rounded-full px-2 py-3 text-[12px] font-medium whitespace-nowrap transition-colors duration-300 lg:px-4 lg:text-[16px] ${
                m.id === mode ? 'text-black' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        <form
          onSubmit={onSubmit}
          noValidate
          onAnimationEnd={() => setError(false)}
          className={`flex flex-col gap-4 transition-[border-color,box-shadow] duration-200 lg:flex-row lg:items-center lg:gap-2 lg:rounded-lg lg:border-[0.5px] lg:bg-surface-brand-subtle lg:px-4 lg:py-3 lg:focus-within:border-brand-primary lg:focus-within:shadow-[0_0_0_3px_rgba(61,82,213,0.15)] ${
            error ? 'animate-shake lg:border-alert-error' : 'lg:border-border-default'
          }`}
        >
          <label className="sr-only" htmlFor="product-search">
            {active.label}
          </label>
          <input
            id="product-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={active.placeholder}
            aria-invalid={error}
            aria-describedby="product-search-hint"
            className="min-h-[52px] flex-1 rounded-lg border-[0.5px] border-border-default bg-surface-brand-subtle px-4 py-3 text-[14px] font-bold text-text-primary placeholder:text-[12px] placeholder:text-text-disabled focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary lg:min-h-0 lg:rounded-none lg:border-0 lg:bg-transparent lg:px-0 lg:py-0 lg:focus-visible:ring-0"
          />
          <Button type="submit" className="w-full lg:w-auto" disabled={submitting}>
            {submitting && (
              <span aria-hidden className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            )}
            {submitting ? 'Checking…' : 'Check product'}
          </Button>
        </form>
        <p
          id="product-search-hint"
          role="alert"
          className={`-mt-4 text-[13px] text-alert-error transition-opacity duration-200 lg:-mt-5 ${error ? 'opacity-100' : 'h-0 opacity-0'}`}
        >
          {error ? `Enter a ${active.label.toLowerCase()} to check.` : ''}
        </p>
      </div>

      <div className="flex flex-col items-center justify-center gap-4 rounded-md bg-surface-brand-subtle px-6 py-4 lg:w-[301px]">
        {/* QR with a looping scan line */}
        <div className="group relative size-[172px] overflow-hidden">
          <img alt="" src={qrCode} className="size-full" />
          <span
            aria-hidden
            className="absolute inset-x-2 top-0 h-[3px] rounded-full bg-brand-primary/70 shadow-[0_0_12px_2px_rgba(61,82,213,0.5)] animate-[scan_2.4s_ease-in-out_infinite]"
          />
        </div>
        <div className="flex flex-col gap-2 text-center font-bold leading-[1.4]">
          <p className="text-[20px] text-text-primary">
            Scan with your camera <span className="block text-[14px] text-text-disabled">(Mobile only)</span>
          </p>
          <p className="text-[18px] text-text-secondary">Quickly check a product using its barcode or QR code</p>
        </div>
        <Button variant="secondary" to="/scan" icon={<img alt="" src={cameraIcon} className="size-5" />}>
          Open Camera
        </Button>
      </div>
    </section>
  )
}
