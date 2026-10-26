import warningIcon from '../assets/icons/warning-filled-error.svg'
import timerIcon from '../assets/icons/timer-info.svg'
import checkIcon from '../assets/icons/check-circle-success.svg'

export type Status = 'counterfeit' | 'under-review' | 'reviewed'

// Tone, icon and label are fixed per status (design system: Status Badge)
const config: Record<Status, { label: string; icon: string; className: string }> = {
  counterfeit: { label: 'Counterfeit Alert', icon: warningIcon, className: 'bg-[rgba(185,28,28,0.1)] text-alert-error' },
  'under-review': { label: 'Under review', icon: timerIcon, className: 'bg-alert-info-bg text-alert-info' },
  reviewed: { label: 'Reviewed', icon: checkIcon, className: 'bg-alert-success-bg text-alert-success' },
}

export default function StatusBadge({ status }: { status: Status }) {
  const c = config[status]
  return (
    <span className={`inline-flex w-fit items-center gap-1 rounded-full px-2 py-1 text-[11px] leading-[1.4] ${c.className}`}>
      <img alt="" src={c.icon} className="size-[15px]" />
      {c.label}
    </span>
  )
}
