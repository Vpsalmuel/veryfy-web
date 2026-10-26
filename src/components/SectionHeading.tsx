import type { ReactNode } from 'react'

type SectionHeadingProps = {
  overline: string
  title: string
  description?: ReactNode
  /** Right-aligned action on desktop; stacks under the text on mobile */
  action?: ReactNode
  className?: string
}

export default function SectionHeading({ overline, title, description, action, className = '' }: SectionHeadingProps) {
  return (
    <div className={`flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between ${className}`}>
      <div className="flex flex-col gap-3">
        <p className="eyebrow text-brand-primary-dark">{overline}</p>
        <h2 className="text-[22px] font-semibold leading-[1.4] lg:text-[32px]">{title}</h2>
        {description && (
          <p className="lg:max-w-[640px] text-[16px] font-bold leading-[1.4] text-text-disabled lg:text-[18px]">{description}</p>
        )}
      </div>
      {action && <div className="-ml-4 lg:ml-0">{action}</div>}
    </div>
  )
}
