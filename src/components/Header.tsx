import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Logo from './Logo'
import Button from './Button'
import LanguageSelector from './LanguageSelector'
import menuIcon from '../assets/icons/menu.svg'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Alerts', to: '/alerts', dot: true },
  { label: 'Recalls', to: '/recalls' },
  { label: 'Report', to: '/report' },
  { label: 'Learn', to: '/learn' },
]

/** Small red dot that flags new counterfeit alerts on the Alerts nav item. */
function NotificationDot({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-block size-1.5 rounded-full bg-alert-error ${className}`}>
      <span className="sr-only">New alerts</span>
    </span>
  )
}

/** Web/Header (desktop, 80px) and Mobile/Header (64px + menu drawer). */
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setMenuOpen(false), [pathname])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-30 border-b-[0.5px] bg-white/95 backdrop-blur transition-[border-color,box-shadow] duration-300 ${
        scrolled || menuOpen
          ? 'border-border-default shadow-[0_6px_20px_-14px_rgba(1,11,79,0.35)]'
          : 'border-transparent'
      }`}
    >
      <div className="mx-auto w-full flex h-16 max-w-[1512px] items-center justify-between px-4 lg:h-20 lg:px-24">
        <Link to="/" aria-label="Veryfy home">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden items-start gap-3 lg:flex">
          {navItems.map((item) => (
            // `end` only on Home, so sub-pages (e.g. /learn/…, /alerts/…) keep their section active
            <NavLink key={item.to} to={item.to} end={item.to === '/'} className="flex flex-col items-center">
              {({ isActive }) => {
                const active = isActive || (item.to === '/' && pathname.startsWith('/check'))
                return (
                  <>
                    <span
                      className={`relative px-2 py-3 text-[14px] leading-[1.4] ${active ? 'text-text-primary' : 'text-text-secondary'}`}
                    >
                      {item.label}
                      {item.dot && <NotificationDot className="absolute top-[11px] right-[1px]" />}
                    </span>
                    {/* Underline only marks the active page; it grows in when the page changes */}
                    <span
                      className={`h-[2px] w-full origin-center bg-brand-primary transition-transform duration-300 ease-out ${
                        active ? 'scale-x-100' : 'scale-x-0'
                      }`}
                    />
                  </>
                )
              }}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1 lg:gap-4">
          <LanguageSelector />
          <div className="hidden lg:block">
            <Button to="/#check" className="font-normal!">
              Verify a product
            </Button>
          </div>
          <button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            className="relative flex size-11 items-center justify-center rounded-md transition-colors active:bg-surface-default lg:hidden"
          >
            <img
              alt=""
              src={menuIcon}
              className={`size-6 transition-all duration-300 ${menuOpen ? 'rotate-90 scale-50 opacity-0' : ''}`}
            />
            {/* Close (×) drawn with two bars that cross-fade in */}
            <span aria-hidden className={`absolute size-6 transition-all duration-300 ${menuOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`}>
              <span className="absolute top-1/2 left-[3px] h-[2px] w-[18px] -translate-y-1/2 rotate-45 rounded-full bg-[#0a0a0a]" />
              <span className="absolute top-1/2 left-[3px] h-[2px] w-[18px] -translate-y-1/2 -rotate-45 rounded-full bg-[#0a0a0a]" />
            </span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav aria-label="Mobile" className="flex flex-col gap-1 px-4 pb-4 lg:hidden">
          {navItems.map((item, i) => (
            <NavLink
              key={item.to}
              to={item.to}
              end
              style={{ animationDelay: `${i * 40}ms` }}
              className={({ isActive }) =>
                `flex animate-fade-up items-center gap-2 rounded-md px-3 py-3 text-[16px] transition-colors active:bg-surface-default ${
                  isActive ? 'bg-surface-brand-subtle font-medium text-brand-primary' : 'text-text-primary'
                }`
              }
            >
              {item.label}
              {item.dot && <NotificationDot />}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  )
}
