import { useEffect, useRef, useState } from 'react'
import chevronDown from '../assets/icons/chevron-down.svg'

const languages = [
  { code: 'EN', label: 'English' },
  { code: 'FR', label: 'Français' },
  { code: 'HA', label: 'Hausa' },
  { code: 'YO', label: 'Yorùbá' },
  { code: 'IG', label: 'Igbo' },
]

/** Web/Language Selector: shows the language code, opens a menu of supported languages. */
export default function LanguageSelector() {
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState('EN')
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const close = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [open])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1 rounded-sm p-3 text-[14px] text-text-primary transition-colors hover:bg-surface-default"
      >
        {current}
        <img alt="" src={chevronDown} className={`size-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-20 mt-1 w-40 origin-top-right animate-scale-in overflow-hidden rounded-md border-[0.5px] border-border-default bg-white py-1 shadow-lg"
        >
          {languages.map((l) => (
            <li key={l.code}>
              <button
                type="button"
                role="option"
                aria-selected={l.code === current}
                onClick={() => {
                  setCurrent(l.code)
                  setOpen(false)
                }}
                className={`w-full px-4 py-2 text-left text-[14px] transition-colors hover:bg-surface-brand-subtle hover:pl-5 ${
                  l.code === current ? 'font-medium text-brand-primary' : 'text-text-primary'
                }`}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
