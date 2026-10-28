import Button from './Button'
import stamp from '../assets/alerts/counterfeit-stamp.png'
import dotIcon from '../assets/icons/dot.svg'
import { categoryLabel, type Counterfeit } from '../data/counterfeits'

/** Product photo with the COUNTERFEIT stamp centred on it; a plain tile when the NAFDAC notice has no photo. */
export function StampedImage({ item, className = '', stampWidth = '60%' }: { item: Counterfeit; className?: string; stampWidth?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-lg bg-surface-default ${className}`}>
      {item.cover ? (
        <img
          src={item.cover.src}
          alt={item.cover.caption}
          style={{ objectPosition: item.cover.focus ?? '50% 50%' }}
          className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <p className="absolute inset-x-0 bottom-3 px-3 text-center text-[11px] leading-[1.4] text-text-secondary">
          No photo in the NAFDAC notice
        </p>
      )}
      <img
        alt=""
        aria-hidden
        src={stamp}
        style={{ width: stampWidth }}
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 [filter:drop-shadow(0_0_1px_rgba(0,0,0,0.1))_drop-shadow(0_0_3px_rgba(0,0,0,0.2))]"
      />
    </div>
  )
}

export function Meta({ items, className }: { items: string[]; className: string }) {
  return (
    <p className={`flex flex-wrap items-center gap-[6px] leading-[1.4] ${className}`}>
      {items.map((item, i) => (
        <span key={item} className="flex items-center gap-[6px]">
          {i > 0 && <img alt="" src={dotIcon} className="size-[3px]" />}
          {item}
        </span>
      ))}
    </p>
  )
}

/** Alerts list card (Figma "Frame 2147226760"): stamped photo, product, brand · category, alert title, date · NAFDAC. */
export default function CounterfeitCard({ item }: { item: Counterfeit }) {
  return (
    <article className="group lift flex h-full flex-col gap-4 rounded-lg bg-white px-4 py-5 sm:flex-row sm:items-end sm:gap-8 sm:px-6">
      <StampedImage item={item} className="mx-auto size-[180px] shrink-0 sm:mx-0 sm:size-[226px]" />
      <div className="flex flex-1 flex-col gap-4 self-stretch">
        <div className="flex flex-col gap-[17px]">
          <div>
            <h3 className="text-[18px] font-medium leading-[1.4] text-black">{item.product}</h3>
            <Meta items={[item.brand, categoryLabel[item.category]]} className="text-[12px] text-text-secondary" />
          </div>
          <p className="line-clamp-3 text-[14px] leading-[1.4] text-text-secondary">{item.title}</p>
          <Meta items={[item.confirmedOn, 'NAFDAC']} className="text-[10px] text-text-disabled" />
        </div>
        <Button variant="ghost" to={`/alerts/${item.id}`} arrow className="w-fit px-0! font-normal!">
          View details
        </Button>
      </div>
    </article>
  )
}
