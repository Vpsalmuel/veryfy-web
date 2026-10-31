import { useEffect, useRef, useState } from 'react'
import Button from './Button'
import appleLogo from '../assets/icons/app-store-apple.svg'
import playLogo from '../assets/icons/google-play-logo.svg'
import arrowBold from '../assets/icons/arrow-forward-white-bold.svg'

/** Paints a store logo in the button's text colour (Brand Primary) by using the SVG as a mask. */
const storeMark = (src: string) => {
  const url = `url("${src}")`
  return { maskImage: url, WebkitMaskImage: url, maskSize: 'contain', maskRepeat: 'no-repeat', maskPosition: 'center' } as const
}

const ANDROID_URL = 'https://expo.dev/accounts/faizal_temitope/projects/verify-mobile/builds/6d395bcf-1c0b-4bbf-967f-a3808c97e4aa'
const IPHONE_URL = 'https://veryfy26.netlify.app'

const storeMarks = (
  <span aria-hidden className="flex items-center gap-2">
    <span style={storeMark(appleLogo)} className="size-[18px] bg-current" />
    <span className="h-4 w-px bg-current opacity-30" />
    <span style={storeMark(playLogo)} className="size-[17px] bg-current" />
  </span>
)

/** Phones go straight to their own app link; anything else (a laptop) picks from a menu. */
function DownloadMenuButton() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const close = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [open])

  const handleClick = () => {
    const ua = navigator.userAgent
    const phoneUrl = /android/i.test(ua) ? ANDROID_URL : /iphone|ipod/i.test(ua) ? IPHONE_URL : null
    if (phoneUrl) window.open(phoneUrl, '_blank', 'noopener')
    else setOpen((o) => !o)
  }

  return (
    <div ref={ref} className="relative">
      <Button variant="secondary" icon={storeMarks} className="w-full gap-[10px]!" aria-haspopup="menu" aria-expanded={open} onClick={handleClick}>
        Download app
      </Button>
      {open && (
        <ul
          role="menu"
          className="absolute left-0 z-20 mt-1 w-full origin-top animate-scale-in overflow-hidden rounded-md border-[0.5px] border-border-default bg-white py-1 shadow-lg"
        >
          {[
            { label: 'Android', href: ANDROID_URL },
            { label: 'iPhone', href: IPHONE_URL },
          ].map((l) => (
            <li key={l.label} role="none">
              <a
                role="menuitem"
                href={l.href}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="block px-4 py-2 text-[14px] text-text-primary transition-colors hover:bg-surface-brand-subtle hover:pl-5"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

/**
 * "Verify a Product" (Primary) + "Download app" (Secondary, App Store and Google Play marks). Used in the landing hero and the app section.
 * With `downloadTo`, Download app is a plain link; without it, it opens the real app links.
 */
export default function VerifyDownloadButtons({ downloadTo, className = '' }: { downloadTo?: string; className?: string }) {
  return (
    <div className={`flex flex-col gap-4 lg:grid lg:grid-cols-[240px_240px] ${className}`}>
      <Button to="/#check" arrow arrowSrc={arrowBold} className="w-full">
        Verify a Product
      </Button>
      {downloadTo ? (
        <Button to={downloadTo} variant="secondary" icon={storeMarks} className="w-full gap-[10px]!">
          Download app
        </Button>
      ) : (
        <DownloadMenuButton />
      )}
    </div>
  )
}
