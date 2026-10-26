import { useEffect, useRef, useState } from 'react'
import { sortOptions, type SortKey } from '../../data/articles'
import chevronDown from '../../assets/icons/chevron-down-primary.svg'

/** "Most relevant ⌄" text button that opens a small sort menu. */
export default function SortMenu({ value, onChange }: { value: SortKey; onChange: (v: SortKey) => void }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const close = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false)
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [open])

  const current = sortOptions.find((o) => o.id === value)!
  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex h-[52px] items-center gap-[10px] rounded-md px-4 text-[14px] font-bold text-brand-primary transition-colors hover:bg-brand-primary/5"
      >
        {current.label}
        <img alt="" src={chevronDown} className={`size-5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <ul role="listbox" className="absolute right-0 z-20 mt-1 w-48 origin-top-right animate-scale-in rounded-md border-[0.5px] border-border-default bg-white py-1 shadow-lg">
          {sortOptions.map((o) => (
            <li key={o.id}>
              <button
                type="button"
                role="option"
                aria-selected={o.id === value}
                onClick={() => {
                  onChange(o.id)
                  setOpen(false)
                }}
                className={`w-full px-4 py-2 text-left text-[14px] transition-colors hover:bg-surface-brand-subtle ${
                  o.id === value ? 'font-medium text-brand-primary' : 'text-text-primary'
                }`}
              >
                {o.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
