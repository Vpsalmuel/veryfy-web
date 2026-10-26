import chevronLeft from '../assets/icons/chevron-left.svg'
import chevronRight from '../assets/icons/chevron-right.svg'
import chevronDown from '../assets/icons/chevron-down-20.svg'

type PaginationProps = {
  page: number
  pageSize: number
  total: number
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
  pageSizes?: number[]
}

/** First, last, and the current page's neighbours, with "…" for gaps. */
function pageList(page: number, pages: number): (number | '…')[] {
  const set = new Set([1, pages, page - 1, page, page + 1].filter((p) => p >= 1 && p <= pages))
  if (page <= 2) [2, 3].forEach((p) => p <= pages && set.add(p))
  const sorted = [...set].sort((a, b) => a - b)
  const out: (number | '…')[] = []
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) out.push('…')
    out.push(p)
  })
  return out
}

/** Desktop/Pagination: summary, page items, rows-per-page select. */
export default function Pagination({ page, pageSize, total, onPageChange, onPageSizeChange, pageSizes = [10, 20, 50] }: PaginationProps) {
  const pages = Math.max(1, Math.ceil(total / pageSize))
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1
  const to = Math.min(page * pageSize, total)

  return (
    <nav aria-label="Pagination" className="flex flex-wrap items-center gap-4 text-[14px] leading-[1.4]">
      <p className="text-text-secondary">
        Showing {from}–{to} of {total}
      </p>
      <div className="flex items-center gap-1">
        <button
          type="button"
          aria-label="Previous page"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="flex size-9 items-center justify-center rounded-md enabled:hover:bg-surface-default disabled:opacity-60"
        >
          <img alt="" src={chevronLeft} className="size-5" />
        </button>
        {pageList(page, pages).map((p, i) =>
          p === '…' ? (
            <span key={`gap-${i}`} className="flex size-9 items-center justify-center text-text-primary">
              …
            </span>
          ) : (
            <button
              key={p}
              type="button"
              aria-current={p === page ? 'page' : undefined}
              onClick={() => onPageChange(p)}
              className={`flex size-9 items-center justify-center rounded-sm transition-[background-color,transform] duration-200 active:scale-90 ${
                p === page ? 'bg-brand-primary text-white' : 'text-text-primary hover:bg-surface-default'
              }`}
            >
              {p}
            </button>
          ),
        )}
        <button
          type="button"
          aria-label="Next page"
          disabled={page === pages}
          onClick={() => onPageChange(page + 1)}
          className="flex size-9 items-center justify-center rounded-md enabled:hover:bg-surface-default disabled:opacity-40"
        >
          <img alt="" src={chevronRight} className="size-5" />
        </button>
      </div>
      <label className="flex items-center gap-2 text-text-secondary">
        Rows per page
        <span className="relative w-[88px]">
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="h-10 w-full appearance-none rounded-md border border-border-control bg-white pr-8 pl-3 text-text-primary"
          >
            {pageSizes.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <img alt="" src={chevronDown} className="pointer-events-none absolute top-1/2 right-3 size-5 -translate-y-1/2" />
        </span>
      </label>
    </nav>
  )
}
