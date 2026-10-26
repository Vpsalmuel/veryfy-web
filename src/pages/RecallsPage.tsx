import { useMemo, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import Pagination from '../components/Pagination'
import Reveal from '../components/Reveal'
import { issueLabels, recalls, type IssueType, type Recall } from '../data/recalls'
import searchIcon from '../assets/icons/search.svg'
import infoIcon from '../assets/icons/info.svg'
import chevronDown from '../assets/icons/chevron-down-20.svg'
import dangerousIcon from '../assets/icons/dangerous-filled-white.svg'
import openInNew from '../assets/icons/open-in-new-primary-16.svg'
import arrowPrimary16 from '../assets/icons/arrow-forward-primary-16.svg'
import reportIcon from '../assets/icons/report.svg'
import warningIcon from '../assets/icons/warning.svg'

type Option = { value: string; label: string }

const categoryOptions: Option[] = [
  { value: 'all', label: 'All products' },
  { value: 'Packaged food', label: 'Packaged food' },
  { value: 'Medicines', label: 'Medicines' },
]
const sourceOptions: Option[] = [
  { value: 'all', label: 'All authorities' },
  { value: 'fda', label: 'U.S. FDA' },
]
const publishedOptions: Option[] = [
  { value: 'any', label: 'Any time' },
  { value: '30', label: 'Past 30 days' },
  { value: '365', label: 'Past 12 months' },
  { value: '730', label: 'Past 2 years' },
]
const sortOptions: Option[] = [
  { value: 'newest', label: 'Newest published first' },
  { value: 'oldest', label: 'Oldest published first' },
]

const guidanceSteps = [
  {
    title: 'Match the exact pack',
    body: 'Compare the product name, size, barcode and batch / lot number. A recall may affect only specific dates, lots or regions.',
  },
  {
    title: 'Read the official notice',
    body: 'Confirm the affected identifiers and latest instructions with the named authority. Don’t rely on a product name alone.',
  },
  {
    title: 'Follow the next steps',
    body: 'If your batch matches, stop using the affected product and follow the notice’s return, refund or disposal instructions.',
  },
]

/** Desktop/Select (Small): native select styled as the design field, with an optional label prefix. */
function Select({
  label,
  prefix,
  value,
  options,
  onChange,
  className = '',
}: {
  label: string
  prefix?: string
  value: string
  options: Option[]
  onChange: (v: string) => void
  className?: string
}) {
  return (
    <label className={`relative block ${className}`}>
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-full appearance-none truncate rounded-md border border-border-default bg-white pr-10 pl-3 text-[14px] text-text-secondary hover:border-border-control focus:border-brand-primary focus:outline-none"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {prefix ? `${prefix}: ${o.label}` : o.label}
          </option>
        ))}
      </select>
      <img alt="" src={chevronDown} className="pointer-events-none absolute top-1/2 right-3 size-5 -translate-y-1/2" />
    </label>
  )
}

function RecallResult({ r }: { r: Recall }) {
  const category = (
    <>
      <img
        alt=""
        src={r.image}
        style={{ width: r.imageSize.width, height: r.imageSize.height }}
        className="max-w-full shrink-0 object-contain transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3"
      />
      <div className="flex flex-col gap-1 sm:items-center sm:gap-4">
        <p className="text-[14px] leading-[1.4] text-brand-secondary sm:text-center">{r.category}</p>
        <p className="text-[16px] font-medium leading-[1.4] text-text-secondary">{r.size}</p>
        <p className="text-[12px] leading-[1.4] text-text-secondary sm:hidden">Historical · U.S. notice</p>
      </div>
    </>
  )
  return (
    <div className="group flex flex-col gap-4 sm:flex-row sm:items-stretch sm:gap-6">
      <div className="flex items-center gap-4 rounded-md bg-surface-brand-subtle p-4 sm:min-h-[248px] sm:w-[136px] sm:shrink-0 sm:flex-col sm:justify-center">
        {category}
      </div>
      <article className="flex flex-1 flex-col gap-6 rounded-lg border border-border-default bg-surface-raised p-4 transition-[border-color,box-shadow] duration-300 group-hover:border-alert-error/40 group-hover:shadow-[0_12px_28px_-16px_rgba(185,28,28,0.35)] sm:flex-row sm:p-6">
        <div className="flex min-w-0 flex-1 flex-col gap-2 leading-[1.4]">
          <span className="inline-flex w-fit items-center gap-1 rounded-full bg-alert-error px-2 py-1 text-[12px] text-white">
            <img alt="" src={dangerousIcon} className="size-4" />
            Official recall
          </span>
          <div className="flex flex-col gap-1">
            <h3 className="text-[18px] font-medium text-text-primary">{r.product}</h3>
            <p className="text-[14px] text-text-secondary">
              {r.company} · {r.size} · {issueLabels[r.issue]}
            </p>
          </div>
          <p className="text-[14px]">Reason: {r.reason}</p>
          <dl className="flex flex-col gap-1 text-[14px]">
            <div className="flex gap-2">
              <dt className="shrink-0 text-text-secondary">Affected batch</dt>
              <dd>
                {r.affectedBatch.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-text-secondary">FDA published</dt>
              <dd>{r.published}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-text-secondary">Source</dt>
              <dd>{r.source}</dd>
            </div>
          </dl>
        </div>
        <div className="flex flex-col gap-2 sm:items-end">
          <p className="hidden text-[12px] leading-[1.4] text-text-secondary sm:block">Historical · U.S. notice</p>
          <a
            href={r.noticeUrl}
            target="_blank"
            rel="noreferrer"
            className="flex w-fit items-center gap-1 text-[14px] text-brand-primary hover:underline"
          >
            View official FDA notice
            <img alt="" src={openInNew} className="size-4" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
      </article>
    </div>
  )
}

export default function RecallsPage() {
  const [input, setInput] = useState('')
  const [query, setQuery] = useState('')
  const [issue, setIssue] = useState<'all' | IssueType>('all')
  const [category, setCategory] = useState('all')
  const [source, setSource] = useState('all')
  const [published, setPublished] = useState('any')
  const [sort, setSort] = useState('newest')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const resetFilters = () => {
    setIssue('all')
    setCategory('all')
    setSource('all')
    setPublished('any')
    setPage(1)
  }

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    const cutoff = published === 'any' ? 0 : Date.now() - Number(published) * 86_400_000
    return recalls
      .filter(
        (r) =>
          (issue === 'all' || r.issue === issue) &&
          (category === 'all' || r.category === category) &&
          (source === 'all' || r.sourceKind === source) &&
          new Date(r.publishedIso).getTime() >= cutoff &&
          (!q || [r.product, r.company, ...r.affectedBatch].some((v) => v.toLowerCase().includes(q))),
      )
      .sort((a, b) => (sort === 'newest' ? -1 : 1) * a.publishedIso.localeCompare(b.publishedIso))
  }, [query, issue, category, source, published, sort])

  const visible = results.slice((page - 1) * pageSize, page * pageSize)
  const summary = [
    `${results.length} historical result${results.length === 1 ? '' : 's'}`,
    issue === 'all' ? 'All issues' : issueLabels[issue],
    category === 'all' ? 'All products' : category,
  ].join(' · ')

  const onSearch = (e: FormEvent) => {
    e.preventDefault()
    setQuery(input)
    setPage(1)
  }

  const issueChips: { value: 'all' | IssueType; label: string }[] = [
    { value: 'all', label: 'All issues' },
    { value: 'quality-safety', label: issueLabels['quality-safety'] },
    { value: 'authenticity', label: issueLabels.authenticity },
  ]

  return (
    <div className="flex-1 bg-white">
      {/* Search introduction */}
      <section className="mx-auto w-full flex max-w-[1512px] flex-col gap-8 px-4 pt-6 pb-6 lg:px-24 lg:pt-14 lg:pb-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-4 lg:w-[800px]">
            <p className="eyebrow text-text-secondary">Recalls</p>
            <h1 className="text-[32px] font-bold leading-[1.4] lg:text-[64px]">
              <span className="block animate-fade-up">Check for recalls.</span>
              <span className="block animate-fade-up text-brand-primary [animation-delay:120ms]">Know your next step.</span>
            </h1>
            <p className="text-[16px] font-medium leading-[1.4] text-text-secondary lg:max-w-[710px] lg:text-[18px]">
              Find product notices for authenticity, quality and safety issues. Compare your exact product and batch before
              taking action.
            </p>
          </div>
          <aside className="flex animate-fade-up flex-col gap-3 rounded-lg bg-surface-brand-subtle p-6 [animation-delay:240ms] lg:w-[376px] lg:shrink-0">
            <img alt="" src={infoIcon} className="size-6" />
            <p className="text-[20px] font-medium leading-[1.4] text-brand-secondary">The batch makes the difference</p>
            <p className="text-[14px] leading-[1.4] text-text-secondary">
              Have the pack handy. You’ll find the lot or batch number and best-before date on its label, base or seal.
            </p>
          </aside>
        </div>

        <form onSubmit={onSearch} className="flex flex-col gap-3">
          <label htmlFor="recall-search" className="text-[16px] font-medium leading-[1.4] text-brand-secondary">
            Search product recalls
          </label>
          <div className="flex flex-col gap-3 lg:h-16 lg:flex-row lg:items-center lg:gap-3 lg:rounded-xl lg:border lg:border-border-control lg:bg-white lg:pr-2 lg:pl-5 lg:focus-within:border-2 lg:focus-within:border-brand-primary">
            <div className="flex h-16 items-center gap-3 rounded-xl lg:flex-1 border border-border-control bg-white px-4 focus-within:border-2 focus-within:border-brand-primary lg:h-auto lg:rounded-none lg:border-0 lg:px-0 lg:focus-within:border-0">
              <img alt="" src={searchIcon} className="size-6 shrink-0" />
              <input
                id="recall-search"
                type="search"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value)
                  if (!e.target.value) setQuery('')
                }}
                placeholder="Enter a product, brand, batch / lot number or barcode"
                className="min-w-0 flex-1 bg-transparent text-[16px] font-medium text-text-primary placeholder:text-text-secondary focus:outline-none lg:text-[18px]"
              />
            </div>
            <Button type="submit" className="w-full text-[16px] font-medium! lg:w-auto">
              Search recalls
            </Button>
          </div>
          <p className="text-[14px] leading-[1.4] text-text-secondary">Try “Casa Mamita”, “Shore Lunch” or lot “01425”.</p>
        </form>
      </section>

      {/* Directory filters */}
      <section aria-label="Filters" className="bg-surface-brand-subtle">
        <div className="mx-auto w-full flex max-w-[1512px] flex-col gap-5 px-4 py-6 lg:px-24">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-4">
            <p className="text-[16px] font-medium leading-[1.4] text-brand-secondary lg:w-[92px]">Issue type</p>
            <div className="flex flex-wrap gap-2 lg:gap-4">
              {issueChips.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  aria-pressed={issue === c.value}
                  onClick={() => {
                    setIssue(c.value)
                    setPage(1)
                  }}
                  className={`h-11 rounded-full border px-3 text-[14px] transition-[background-color,border-color,color,transform] duration-200 active:scale-95 ${
                    issue === c.value
                      ? 'border-brand-secondary bg-brand-secondary text-white'
                      : 'border-border-default bg-surface-raised text-text-primary hover:border-border-control'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-4">
            <p className="text-[16px] font-medium leading-[1.4] text-brand-secondary lg:w-[92px]">Refine by</p>
            <Select
              label="Category"
              prefix="Category"
              value={category}
              options={categoryOptions}
              onChange={(v) => {
                setCategory(v)
                setPage(1)
              }}
              className="lg:w-[252px]"
            />
            <Select
              label="Source"
              prefix="Source"
              value={source}
              options={sourceOptions}
              onChange={(v) => {
                setSource(v)
                setPage(1)
              }}
              className="lg:w-[252px]"
            />
            <Select
              label="Published"
              prefix="Published"
              value={published}
              options={publishedOptions}
              onChange={(v) => {
                setPublished(v)
                setPage(1)
              }}
              className="lg:w-[252px]"
            />
            <button type="button" onClick={resetFilters} className="w-fit text-[14px] text-brand-primary hover:underline">
              Reset filters
            </button>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="mx-auto w-full flex max-w-[1512px] flex-col gap-6 px-4 pt-8 pb-8 lg:px-24 lg:pt-12 lg:pb-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2 leading-[1.4]">
            <h2 className="text-[24px] font-semibold lg:text-[32px]">Recall notices</h2>
            <p aria-live="polite" className="text-[14px] text-text-secondary">
              {summary}
            </p>
          </div>
          <Select label="Sort order" value={sort} options={sortOptions} onChange={setSort} className="sm:w-[204px]" />
        </div>

        <p className="flex items-center gap-3 rounded-sm bg-surface-brand-subtle p-4 text-[14px] leading-[1.4] text-brand-secondary">
          <img alt="" src={infoIcon} className="size-6 shrink-0" />
          Historical FDA examples • U.S. notices, not a live feed or Nigerian regulatory data. These are quality/safety
          recalls, not counterfeit findings. Current status is in each official notice.
        </p>

        {visible.length > 0 ? (
          <ul className="flex flex-col gap-5">
            {visible.map((r, i) => (
              <Reveal as="li" key={`${issue}-${query}-${r.id}`} delay={i * 100}>
                <RecallResult r={r} />
              </Reveal>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center gap-3 rounded-lg border border-border-default px-6 py-12 text-center">
            <p className="text-[18px] font-medium">No recall notices match your search.</p>
            <p className="max-w-[520px] text-[14px] text-text-secondary">
              No result does not mean a product is genuine or safe. Try a different name, brand or batch number.
            </p>
            <button type="button" onClick={resetFilters} className="text-[14px] text-brand-primary hover:underline">
              Reset filters
            </button>
          </div>
        )}

        {results.length > pageSize ? (
          <Pagination
            page={page}
            pageSize={pageSize}
            total={results.length}
            onPageChange={setPage}
            onPageSizeChange={(s) => {
              setPageSize(s)
              setPage(1)
            }}
          />
        ) : (
          results.length > 0 && (
            <p className="text-center text-[14px] text-text-secondary">
              Showing all {results.length} historical example{results.length === 1 ? '' : 's'}
            </p>
          )
        )}
      </section>

      {/* Batch guidance and reporting */}
      <section className="mx-auto w-full flex max-w-[1512px] flex-col gap-12 px-4 pt-4 pb-16 lg:px-24">
        <div className="flex flex-col gap-7 rounded-lg bg-surface-brand-subtle p-5 lg:p-8">
          <h2 className="text-[24px] font-semibold leading-[1.4] text-brand-secondary lg:text-[32px]">Found a possible match?</h2>
          <ol className="flex flex-col gap-6 leading-[1.4] lg:flex-row lg:gap-8">
            {guidanceSteps.map((s, i) => (
              <li key={s.title} className="flex flex-1 flex-col gap-3">
                <p className="eyebrow text-brand-primary">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="text-[20px] font-medium text-brand-secondary">{s.title}</h3>
                <p className="text-[14px] text-text-secondary">{s.body}</p>
              </li>
            ))}
          </ol>
          <p className="flex items-start gap-3 border-t border-brand-primary-light pt-5 text-[14px] leading-[1.4] text-brand-secondary">
            <img alt="" src={warningIcon} className="size-6 shrink-0" />
            No result does not mean a product is genuine or safe. This directory is not exhaustive. Check with the
            manufacturer or relevant authority if you’re unsure; seek medical advice if you feel unwell.
          </p>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-8">
          <div className="w-fit rounded-lg bg-surface-brand-subtle p-5">
            <img alt="" src={reportIcon} className="size-9" />
          </div>
          <div className="flex flex-1 flex-col gap-2 leading-[1.4]">
            <h2 className="text-[22px] font-medium text-brand-secondary lg:text-[24px]">
              Suspect a counterfeit, even without a recall?
            </h2>
            <p className="text-[16px] font-medium text-text-secondary">
              Keep the packaging, receipt and photos. Send your concern for review.
            </p>
            <Link to="/" className="flex w-fit items-center gap-1 text-[14px] text-brand-primary hover:underline">
              Or verify a product with Veryfy
              <img alt="" src={arrowPrimary16} className="size-4" />
            </Link>
          </div>
          <Button to="/report" arrow className="w-full text-[16px] font-medium! lg:w-auto">
            Report a suspicious product
          </Button>
        </div>
      </section>
    </div>
  )
}
