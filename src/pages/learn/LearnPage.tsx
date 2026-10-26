import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/Button'
import Reveal from '../../components/Reveal'
import ArticleCard from './ArticleCard'
import SortMenu from './SortMenu'
import { articles, categories, sortArticles, type Category, type SortKey } from '../../data/articles'
import featured from '../../assets/learn/featured.png'
import searchIcon from '../../assets/icons/search.svg'
import packageIcon from '../../assets/icons/package.svg'
import qrIcon from '../../assets/icons/qr-code-scanner-42.svg'
import storefrontIcon from '../../assets/icons/storefront.svg'
import verifiedIcon from '../../assets/icons/verified-42.svg'
import visitSite from '../../assets/icons/visit-site.svg'
import arrowDark from '../../assets/icons/arrow-forward-primary-dark.svg'
import nafdac from '../../assets/learn/src-nafdac.png'
import ndlea from '../../assets/learn/src-ndlea.png'
import interpol from '../../assets/learn/src-interpol.png'
import fccpc from '../../assets/learn/src-fccpc.png'

const tips = [
  { icon: packageIcon, title: 'Check the packaging', body: 'Look for poor print quality, spelling errors or unusual labels.' },
  { icon: qrIcon, title: 'Verify before you buy', body: 'Use Veryfy to scan HiddenMark or enter a Uni-Code.' },
  { icon: storefrontIcon, title: 'Be careful of low prices', body: 'Prices that seem too good to be true can be a red flag.' },
  { icon: verifiedIcon, title: 'Buy from trusted sellers', body: 'Purchase from authorised retailers and official stores where possible.' },
]

// TODO: confirm the official URLs and descriptions with the team (INTERPOL copy repeats NAFDAC's in the design)
const sources = [
  { logo: nafdac, name: 'NAFDAC', body: 'Nigerian regulatory information on product registration and safety.', href: 'https://www.nafdac.gov.ng' },
  { logo: ndlea, name: 'NDLEA', body: 'Nigerian regulatory information on drug law enforcement', href: 'https://ndlea.gov.ng' },
  { logo: interpol, name: 'INTERPOL', body: 'Nigerian regulatory information on product registration and safety.', href: 'https://www.interpol.int' },
  { logo: fccpc, name: 'FCCPC', body: 'Guidance on consumer rights and product safety in Nigeria.', href: 'https://fccpc.gov.ng' },
]

export default function LearnPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<'all' | Category>('all')
  const [sort, setSort] = useState<SortKey>('relevant')

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    const list = articles.filter(
      (a) => (category === 'all' || a.category === category) && (!q || `${a.title} ${a.summary}`.toLowerCase().includes(q)),
    )
    return sortArticles(list, sort)
  }, [query, category, sort])

  return (
    <>
      {/* Intro + search */}
      <section className="bg-white">
        <div className="mx-auto flex w-full max-w-[1512px] flex-col gap-6 px-4 py-8 lg:min-h-[527px] lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:px-24">
          <div className="flex flex-col gap-4 lg:max-w-[590px]">
            <p className="eyebrow animate-fade-up text-text-secondary">Learn</p>
            <h1 className="text-[40px] font-bold leading-[1.2] tracking-[-0.8px] lg:text-[64px] lg:tracking-[-1.28px]">
              <span className="block animate-fade-up [animation-delay:80ms]">Know more.</span>
              <span className="block animate-fade-up text-brand-primary [animation-delay:160ms]">Shop smarter.</span>
            </h1>
            <p className="animate-fade-up text-[16px] font-bold leading-[1.4] text-greyscale-500 [animation-delay:240ms] lg:text-[20px]">
              Practical guides, trusted sources and tips to help you identify genuine products, understand product
              authentication and make safer purchasing decisions.
            </p>
          </div>
          <label className="flex h-14 w-full animate-fade-up items-center gap-3 rounded-2xl border border-border-default bg-white pr-2 pl-5 drop-shadow-[0_0_2.9px_rgba(66,156,253,0.3)] transition-shadow [animation-delay:320ms] focus-within:border-2 focus-within:border-brand-primary lg:h-[73px] lg:w-[720px] lg:shrink-0">
            <img alt="" src={searchIcon} className="size-6" />
            <span className="sr-only">Search guides</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && document.getElementById('all-articles')?.scrollIntoView({ behavior: 'smooth' })}
              placeholder="Search guides, tips, or sources......"
              className="min-w-0 flex-1 bg-transparent text-[16px] font-medium text-text-primary placeholder:text-text-secondary focus:outline-none lg:text-[18px]"
            />
          </label>
        </div>
      </section>

      {/* Category filters */}
      <div className="mx-auto w-full max-w-[1512px] py-4 lg:px-24 lg:py-4">
        <div role="tablist" aria-label="Filter by category" className="flex gap-4 overflow-x-auto px-4 [scrollbar-width:none] lg:px-0">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={category === c.id}
              onClick={() => setCategory(c.id)}
              className={`h-[53px] shrink-0 rounded-full border px-4 text-[16px] font-medium whitespace-nowrap transition-[background-color,border-color,color,transform] duration-200 active:scale-95 lg:flex-1 ${
                category === c.id
                  ? 'border-brand-secondary bg-brand-secondary text-white'
                  : 'border-border-default bg-surface-raised text-text-primary hover:border-brand-primary-light'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-[1512px] flex-col gap-14 px-4 pt-6 pb-16 lg:gap-24 lg:px-24">
        {/* Featured guide */}
        <Reveal>
          <article className="group flex flex-col gap-6 overflow-hidden rounded-lg bg-surface-brand-subtle lg:h-[413px] lg:flex-row lg:items-center lg:gap-12 lg:pr-6">
            <div className="aspect-[673/413] w-full overflow-hidden rounded-3xl lg:h-full lg:w-[673px] lg:shrink-0">
              <img src={featured} alt="Holographic security label on a skincare box" className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="flex flex-col gap-4 px-4 pb-6 lg:max-w-[590px] lg:px-0 lg:pb-0">
              <p className="eyebrow text-brand-primary-dark">Featured guide</p>
              <h2 className="text-[28px] font-semibold leading-[1.4] text-brand-secondary lg:text-[40px]">How to spot counterfeit products</h2>
              <p className="text-[16px] font-bold leading-[1.4] text-greyscale-500 lg:text-[20px]">
                Learn the common warning signs, from packaging and labels to pricing and seller behaviour.
              </p>
              <Button to="/learn/common-counterfeit-tricks" arrow className="w-fit font-normal!">
                Read guide
              </Button>
            </div>
          </article>
        </Reveal>

        {/* Articles */}
        <section id="all-articles" className="flex scroll-mt-24 flex-col gap-6">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-[24px] font-semibold leading-[1.4] lg:text-[32px]">
              <Link to="/learn/articles" className="hover:underline">
                All articles
              </Link>
            </h2>
            <SortMenu value={sort} onChange={setSort} />
          </div>
          {results.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((a, i) => (
                <Reveal key={`${category}-${query}-${a.slug}`} delay={(i % 3) * 100}>
                  <ArticleCard article={a} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="flex animate-fade-in flex-col items-center gap-3 rounded-lg border border-border-default bg-white px-6 py-12 text-center">
              <p className="text-[18px] font-medium">No guides match “{query}”.</p>
              <button
                type="button"
                onClick={() => {
                  setQuery('')
                  setCategory('all')
                }}
                className="text-[14px] text-brand-primary hover:underline"
              >
                Clear search and filters
              </button>
            </div>
          )}
        </section>

        {/* Quick tips */}
        <Reveal as="section" className="flex flex-col gap-6">
          <h2 className="text-[24px] font-semibold leading-[1.4] lg:text-[32px]">Quick tips</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {tips.map((t) => (
              <div key={t.title} className="group lift flex gap-4 rounded-md border-[0.5px] border-border-default bg-surface-raised px-6 py-4">
                <span className="flex size-[50px] shrink-0 items-center justify-center rounded-sm bg-brand-primary-light/66 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                  <img alt="" src={t.icon} className="size-[42px]" />
                </span>
                <div className="flex flex-col gap-1 leading-[1.4]">
                  <h3 className="text-[18px] font-medium text-black">{t.title}</h3>
                  <p className="text-[14px] text-text-secondary">{t.body}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Trusted sources */}
        <Reveal as="section" className="flex flex-col gap-6">
          <h2 className="text-[24px] font-semibold leading-[1.4] lg:text-[32px]">Trusted sources</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {sources.map((s) => (
              <div key={s.name} className="lift flex gap-4 rounded-md border-[0.5px] border-border-default bg-surface-raised px-6 py-4">
                <img src={s.logo} alt={`${s.name} logo`} className="size-[50px] shrink-0 rounded-sm object-contain" />
                <div className="flex flex-1 flex-col gap-1 leading-[1.4]">
                  <h3 className="text-[18px] font-medium text-black">{s.name}</h3>
                  <p className="flex-1 text-[14px] text-text-secondary">{s.body}</p>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex h-9 w-fit items-center gap-[10px] text-[14px] font-bold text-brand-primary hover:underline"
                  >
                    Visit site
                    <img alt="" src={visitSite} className="size-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* App banner */}
        <Reveal>
          <div className="flex flex-col gap-6 rounded-lg bg-[linear-gradient(90deg,#010b4f_25%,#005248_60%,#035250_79%,#3d52d5_100%)] bg-[length:200%_100%] px-6 py-8 transition-[background-position] duration-700 hover:bg-[position:100%_0] sm:flex-row sm:items-center sm:px-8">
            <div className="flex flex-1 flex-col gap-2 leading-[1.4]">
              <p className="eyebrow text-brand-accent">Get the Veryfy app</p>
              <p className="text-[24px] font-semibold text-white lg:text-[32px]">Verify products anytime, anywhere.</p>
            </div>
            <Link
              to="/#app"
              className="group flex h-[52px] w-fit items-center gap-2 rounded-md bg-white px-4 text-[14px] text-brand-primary-dark transition-transform active:scale-95"
            >
              Get the app
              <img alt="" src={arrowDark} className="size-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </div>
    </>
  )
}
