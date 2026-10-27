import type { ComponentProps, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import arrowWhite from '../assets/icons/arrow-forward-white.svg'
import arrowPrimary from '../assets/icons/arrow-forward-primary.svg'

type Variant = 'primary' | 'secondary' | 'ghost'

const base =
  'group inline-flex h-[52px] shrink-0 items-center justify-center gap-2 rounded-md px-4 text-[14px] font-bold leading-[1.4] whitespace-nowrap transition-[background-color,color,box-shadow,transform] duration-200 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary disabled:pointer-events-none disabled:opacity-60'

const styles: Record<Variant, string> = {
  primary:
    'bg-brand-primary text-white shadow-[0_4px_14px_-6px_rgba(61,82,213,0.6)] hover:bg-brand-primary-dark hover:shadow-[0_8px_20px_-8px_rgba(61,82,213,0.7)]',
  secondary: 'border border-brand-primary text-brand-primary hover:bg-brand-primary/5',
  ghost: 'text-brand-primary hover:bg-brand-primary/5',
}

type ButtonProps = {
  variant?: Variant
  /** Show the trailing arrow_forward icon */
  arrow?: boolean
  /** Swap the trailing arrow image (e.g. a heavier weight) */
  arrowSrc?: string
  icon?: ReactNode
  to?: string
  className?: string
  children?: ReactNode
} & Omit<ComponentProps<'button'>, 'className' | 'children'>

/** Design-system Buttons (Primary / Secondary / Ghost). Renders a Link when `to` is set. */
export default function Button({ variant = 'primary', arrow, arrowSrc, icon, to, className = '', children, ...rest }: ButtonProps) {
  const cls = `${base} ${styles[variant]} ${className}`
  const content = (
    <>
      {icon}
      {children}
      {arrow && (
        <img
          alt=""
          src={arrowSrc ?? (variant === 'primary' ? arrowWhite : arrowPrimary)}
          className="size-5 transition-transform duration-200 group-hover:translate-x-1"
        />
      )}
    </>
  )
  if (to) {
    return (
      <Link to={to} className={cls}>
        {content}
      </Link>
    )
  }
  return (
    <button type="button" className={cls} {...rest}>
      {content}
    </button>
  )
}
