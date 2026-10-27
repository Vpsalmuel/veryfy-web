import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import Pagination from '../components/Pagination'
import Reveal from '../components/Reveal'
import StatusBadge, { type Status } from '../components/StatusBadge'
import { alerts, featuredAlert, type Alert } from '../data/alerts'
import searchIcon from '../assets/icons/search.svg'
import dotIcon from '../assets/icons/dot.svg'
import openInNew from '../assets/icons/open-in-new-primary.svg'

const filters: { id: string; label: string; statuses?: Status[] }[] = [
  { id: 'all', label: 'All' },
  { id: 'review', label: 'Under review', statuses: ['under-review'] },
  { id: 'active', label: 'Active alerts', statuses: ['counterfeit'] },
  { id: 'closed', label: 'Closed', statuses: ['reviewed'] },
]

function Meta({ items, className }: { items: string[]; className: string }) {
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

function FeaturedAlert() {
  const a = featuredAlert
  return (
    <article className="group flex animate-fade-up flex-col-reverse items-center gap-4 overflow-hidden rounded-lg transition-shadow duration-300 [animation-delay:200ms] hover:shadow-[0_16px_40px_-20px_rgba(1,11,79,0.35)] border-[0.5px] border-border-strong bg-white p-4 sm:flex-row sm:gap-0 lg:h-[296px] lg:w-[584px] lg:shrink-0">
      <div className="flex flex-1 flex-col gap-4 sm:p-6 lg:w-[356px] lg:flex-none">
        <StatusBadge status={a.status} size="small" />
        <div className="flex flex-col gap-1 leading-[1.4]">
          <h2 className="text-[18px] font-medium text-text-primary">{a.product}</h2>
          <p className="text-[12px] text-text-secondary">
            {a.brand} · {a.category}
          </p>
        </div>
        <p className="text-[14px] leading-[1.4] text-text-secondary">{a.summary}</p>
        <p className="flex flex-wrap gap-x-2 text-[12px] leading-[1.4] lg:flex-nowrap lg:whitespace-nowrap">
          <span className="text-text-secondary">Issued {a.date}</span>
          <span className="text-text-primary">{a.issuer}</span>
        </p>
        <a href={a.announcementUrl} target="_blank" rel="noreferrer" className="flex w-fit items-center gap-1 text-[14px] text-brand-primary hover:underline">
          Read the official announcement
          <img alt="" src={openInNew} className="size-4" />
        </a>
      </div>
      <img
        src={a.image}
        alt={a.product}
        className="size-[196px] shrink-0 rounded-lg border-[0.5px] border-border-default object-cover transition-transform duration-500 group-hover:scale-[1.03] group-hover:-rotate-1"
      />
    </article>
  )
}

function AlertCard({ alert: a }: { alert: Alert }) {
  return (
    <article className="group lift flex h-full flex-col gap-4 rounded-lg bg-white px-4 py-5 sm:flex-row sm:items-end sm:gap-8 sm:px-6">
      <div className="relative mx-auto size-[180px] shrink-0 overflow-hidden rounded-lg border-[0.5px] border-border-default bg-white sm:mx-0 sm:size-[226px]">
        <img
          src={a.image}
          alt={a.product}
          className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-[17px] self-stretch">
        <StatusBadge status={a.status} />
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-[17px]">
            <div>
              <h3 className="text-[18px] font-medium leading-[1.4] text-black">{a.product}</h3>
              <Meta items={[a.brand, a.category]} className="text-[12px] text-text-secondary" />
            </div>
            <p className="text-[14px] leading-[1.4] text-text-secondary">{a.summary}</p>
            <Meta items={[a.date, a.issuer]} className="text-[10px] text-text-disabled" />
          </div>
          <Button variant="ghost" to={`/alerts/${a.id}`} arrow className="w-fit font-normal!">
            View details
          </Button>
        </div>
      </div>
    </article>
  )
}

export default function AlertsPage() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const results = useMemo(() => {
    const f = filters.find((x) => x.id === filter)
    const q = query.trim().toLowerCase()
    return alerts.filter(
      (a) =>
        (!f?.statuses || f.statuses.includes(a.status)) &&
        (!q || [a.product, a.brand, a.category].some((v) => v.toLowerCase().includes(q))),
    )
  }, [query, filter])

  const visible = results.slice((page - 1) * pageSize, page * pageSize)

  return (
    <>
      <section className="bg-white">
        <div className="mx-auto w-full flex max-w-[1440px] flex-col gap-8 px-4 py-10 lg:min-h-[527px] lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:px-24 lg:py-8">
          <div className="flex flex-1 flex-col gap-4 lg:max-w-[590px]">
            <p className="eyebrow text-text-secondary">Product alerts</p>
            <div className="flex flex-col gap-5">
              <h1 className="animate-fade-up text-[40px] font-bold leading-[1.2] text-brand-secondary [animation-delay:80ms] lg:text-[64px]">
                Counterfeit product alerts and safety notice
              </h1>
              <p className="text-[16px] font-medium leading-[1.4] text-greyscale-500 lg:text-[20px]">
                Get the latest warnings about counterfeit products, safety issues and recalls. Search, filter and stay
                informed so you can make safer purchasing decisions.
              </p>
            </div>
          </div>
          <FeaturedAlert />
        </div>
      </section>

      <div className="mx-auto w-full flex max-w-[1440px] flex-col gap-8 px-4 pt-7 pb-16 lg:gap-12 lg:px-24">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-6">
          <label className="flex h-14 items-center gap-3 rounded-2xl border border-border-default bg-white pr-2 pl-5 drop-shadow-[0_0_2.9px_rgba(66,156,253,0.3)] focus-within:border-2 focus-within:border-brand-primary lg:h-[73px] lg:w-[508px] lg:shrink-0">
            <img alt="" src={searchIcon} className="size-6" />
            <span className="sr-only">Search alerts</span>
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setPage(1)
              }}
              placeholder="Search recent alerts...."
              className="min-w-0 flex-1 bg-transparent text-[16px] font-medium text-text-primary placeholder:text-text-secondary focus:outline-none lg:text-[18px]"
            />
          </label>
          <div role="tablist" aria-label="Filter alerts" className="-mx-4 flex gap-4 overflow-x-auto px-4 [scrollbar-width:none] lg:mx-0 lg:flex-1 lg:px-0">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={f.id === filter}
                onClick={() => {
                  setFilter(f.id)
                  setPage(1)
                }}
                className={`shrink-0 rounded-full px-4 py-3 text-[16px] font-medium whitespace-nowrap transition-[background-color,color,transform] duration-200 active:scale-95 lg:max-w-[170px] lg:flex-1 ${
                  f.id === filter ? 'bg-brand-primary text-white' : 'bg-white text-brand-primary hover:bg-brand-primary/10'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <section className="flex flex-col gap-7">
          <div className="flex items-end justify-between">
            <h2 className="text-[24px] font-medium text-brand-secondary lg:text-[32px]">Most Recent</h2>
            <Link to="/alerts" className="flex h-[52px] items-center px-4 text-[16px] font-medium text-brand-primary hover:underline">
              See More
            </Link>
          </div>
          {visible.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:gap-x-[25px] lg:gap-y-[46px]">
              {visible.map((a, i) => (
                <Reveal key={`${filter}-${query}-${page}-${a.id}`} delay={(i % 2) * 100}>
                  <AlertCard alert={a} />
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="rounded-lg bg-white px-6 py-12 text-center text-[16px] text-text-secondary">
              No alerts match your search.
            </p>
          )}
          <div className="mt-2">
            <Pagination
              page={page}
              pageSize={pageSize}
              total={results.length}
              onPageChange={(p) => {
                setPage(p)
                window.scrollTo({ top: 0 })
              }}
              onPageSizeChange={(s) => {
                setPageSize(s)
                setPage(1)
              }}
            />
          </div>
        </section>
      </div>
    </>
  )
}
