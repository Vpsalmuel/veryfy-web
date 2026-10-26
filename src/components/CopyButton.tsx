import { useEffect, useState } from 'react'
import copyIcon from '../assets/icons/copy.svg'

type CopyButtonProps = {
  value: string
  icon?: string
  /** Icon size in px */
  size?: number
}

/** Copies a value and confirms with a small "Copied" bubble. */
export default function CopyButton({ value, icon = copyIcon, size = 20 }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 1600)
    return () => clearTimeout(t)
  }, [copied])

  return (
    <span className="relative inline-flex">
      <button
        type="button"
        aria-label={`Copy ${value}`}
        onClick={() => navigator.clipboard?.writeText(value).then(() => setCopied(true))}
        className="flex size-8 items-center justify-center rounded-md transition-transform hover:bg-black/5 active:scale-90"
      >
        <img alt="" src={icon} style={{ width: size, height: size }} />
      </button>
      <span
        role="status"
        aria-live="polite"
        className={`pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 rounded-sm bg-brand-secondary px-2 py-1 text-[12px] whitespace-nowrap text-white transition-all duration-200 ${
          copied ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'
        }`}
      >
        {copied ? 'Copied!' : ''}
      </span>
    </span>
  )
}
