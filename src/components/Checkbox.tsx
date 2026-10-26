import type { ReactNode } from 'react'
import checkWhite from '../assets/icons/check-white.svg'

type CheckboxProps = {
  checked: boolean
  onChange: (checked: boolean) => void
  children?: ReactNode
  invalid?: boolean
  id?: string
}

/** Desktop/Checkbox: 20px box in a 28px hit area; the tick pops in when checked. */
export default function Checkbox({ checked, onChange, children, invalid, id }: CheckboxProps) {
  return (
    <label htmlFor={id} className="group flex cursor-pointer items-start gap-2">
      <span className="relative flex size-7 shrink-0 items-center justify-center rounded-sm transition-colors group-hover:bg-brand-primary/8">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={invalid || undefined}
          className="peer absolute inset-0 cursor-pointer opacity-0"
        />
        <span
          aria-hidden
          className={`flex size-5 items-center justify-center rounded-[4px] border transition-all duration-200 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-primary peer-active:scale-90 ${
            checked
              ? 'border-brand-primary bg-brand-primary'
              : invalid
                ? 'border-alert-error bg-white'
                : 'border-border-control bg-white'
          }`}
        >
          <img
            alt=""
            src={checkWhite}
            className={`size-4 transition-all duration-200 ${checked ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}
          />
        </span>
      </span>
      {children && <span className="pt-1 text-[14px] leading-[1.4] text-text-primary">{children}</span>}
    </label>
  )
}
