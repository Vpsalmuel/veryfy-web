import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Button from '../../components/Button'
import Reveal from '../../components/Reveal'
import ArticleCard from './ArticleCard'
import { articles, categories } from '../../data/articles'
import timerIcon from '../../assets/icons/timer.svg'
import dot6 from '../../assets/icons/dot-6.svg'
import bookmarkIcon from '../../assets/icons/bookmark.svg'
import shareIcon from '../../assets/icons/share.svg'
import verifiedBrand from '../../assets/icons/verified-filled-brand.svg'
import arrowPrimary from '../../assets/icons/arrow-forward-primary.svg'

const SAVED_KEY = 'veryfy:saved-articles'

function useSaved(slug: string) {
  const [saved, setSaved] = useState(() => {
    try {
      return (JSON.parse(localStorage.getItem(SAVED_KEY) ?? '[]') as string[]).includes(slug)
    } catch {
      return false
    }
  })
  const toggle = () => {
    setSaved((s) => {
      try {
        const list = new Set(JSON.parse(localStorage.getItem(SAVED_KEY) ?? '[]') as string[])
        if (s) list.delete(slug)
        else list.add(slug)
        localStorage.setItem(SAVED_KEY, JSON.stringify([...list]))
      } catch {
        /* storage unavailable */
      }
      return !s
    })
  }
  return [saved, toggle] as const
}

// Re-mount per article so bookmark/toast state never leaks between guides
export default function ArticleDetailPage() {
  const { slug = '' } = useParams()
  return <ArticleDetail key={slug} slug={slug} />
}

function ArticleDetail({ slug }: { slug: string }) {
  const article = articles.find((a) => a.slug === slug)
  const [saved, toggleSaved] = useSaved(slug)
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 1800)
    return () => clearTimeout(t)
  }, [toast])

  if (!article) {
    return (
      <section className="mx-auto flex max-w-[600px] flex-col items-center gap-4 px-4 py-24 text-center">
        <h1 className="text-[32px] font-semibold">Guide not found</h1>
        <p className="text-text-secondary">This guide may have moved. Browse all guides instead.</p>
        <Button to="/learn" arrow>
          Go to Learn
        </Button>
      </section>
    )
  }

  const category = categories.find((c) => c.id === article.category)!
  const body = article.body
  const more = articles.filter((a) => a.slug !== article.slug).slice(0, 3)

  const share = () => {
    const data = { title: article.title, url: window.location.href }
    if (navigator.share) navigator.share(data).catch(() => {})
    else navigator.clipboard?.writeText(data.url).then(() => setToast('Link copied'))
  }

  return (
    <article className="mx-auto flex w-full max-w-[1512px] flex-col gap-6 px-4 pt-8 pb-16 lg:px-24 lg:pt-[52px]">
      <nav aria-label="Breadcrumb" className="flex animate-fade-in items-center gap-1 text-[14px] leading-[1.4]">
        <Link to="/learn" className="text-text-secondary hover:text-text-primary hover:underline">
          Learn
        </Link>
        <span className="text-text-secondary">/</span>
        <span aria-current="page" className="text-brand-primary">
          {category.label}
        </span>
      </nav>

      <div className="flex flex-col gap-[45px] border-b-[0.5px] border-border-strong pb-8">
        <div className="flex flex-col gap-6">
          <div className="flex animate-fade-up items-start gap-6">
            <div className="flex flex-1 flex-col gap-2 leading-[1.4]">
              <h1 className="max-w-[424px] text-[28px] font-semibold lg:text-[32px]">{article.title}</h1>
              <p className="text-[16px] text-text-secondary lg:text-[18px]">{body?.subtitle ?? article.summary}</p>
              <p className="flex items-center gap-2 text-[14px] text-text-secondary">
                <img alt="" src={timerIcon} className="size-6" />
                {article.minutes} min read
                {body && (
                  <>
                    <img alt="" src={dot6} className="size-[6px]" />
                    {body.kind}
                  </>
                )}
              </p>
            </div>
            <div className="relative flex gap-2">
              <button
                type="button"
                onClick={() => {
                  toggleSaved()
                  setToast(saved ? 'Removed from saved' : 'Saved for later')
                }}
                aria-pressed={saved}
                aria-label={saved ? 'Remove bookmark' : 'Bookmark this guide'}
                className={`flex rounded-full border p-1 transition-all duration-200 active:scale-90 ${
                  saved ? 'border-brand-primary bg-brand-primary-light' : 'border-border-strong bg-surface-brand-subtle hover:border-brand-primary'
                }`}
              >
                <img alt="" src={bookmarkIcon} className={`size-[22px] transition-transform ${saved ? 'scale-110' : ''}`} />
              </button>
              <button
                type="button"
                onClick={share}
                aria-label="Share this guide"
                className="flex rounded-full border border-border-strong bg-surface-brand-subtle p-1 transition-all duration-200 hover:border-brand-primary active:scale-90"
              >
                <img alt="" src={shareIcon} className="size-[22px]" />
              </button>
              <span
                role="status"
                className={`pointer-events-none absolute top-full right-0 mt-2 rounded-sm bg-brand-secondary px-2 py-1 text-[12px] whitespace-nowrap text-white transition-all duration-200 ${
                  toast ? 'translate-y-0 opacity-100' : '-translate-y-1 opacity-0'
                }`}
              >
                {toast ?? ''}
              </span>
            </div>
          </div>
          <div className="aspect-[1320/450] w-full animate-fade-in overflow-hidden rounded-3xl [animation-delay:150ms] max-lg:aspect-[4/3]">
            <img src={body?.hero ?? article.image} alt="" className="size-full animate-[drift_10s_ease-in-out_infinite] object-cover" />
          </div>
        </div>

        {body ? (
          <Reveal className="flex flex-col gap-[31px]">
            <div className="flex max-w-[760px] flex-col gap-[7px] font-medium leading-[1.4]">
              <h2 className="text-[22px] text-black lg:text-[24px]">{body.intro.title}</h2>
              <p className="text-[16px] text-text-secondary">{body.intro.text}</p>
            </div>
            <ol>
              {body.points.map((p, i) => (
                <li
                  key={p.title}
                  className="flex gap-4 border-b-[0.5px] border-border-default px-4 py-6 transition-colors last:border-b-0 hover:bg-surface-brand-subtle"
                >
                  <span className="flex h-[38px] w-10 shrink-0 items-center justify-center rounded-full bg-brand-primary-light/60 text-[16px] font-medium text-brand-primary-dark">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex flex-col gap-[7px] font-medium leading-[1.4]">
                    <h3 className="text-[18px] text-black">{p.title}</h3>
                    <p className="text-[16px] text-text-secondary">{p.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        ) : (
          <p className="rounded-md bg-surface-brand-subtle p-6 text-[16px] text-text-secondary">
            The full version of this guide is coming soon.
          </p>
        )}

        <Reveal>
          <div className="flex flex-col gap-4 rounded-lg bg-brand-primary-light/40 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <span className="flex size-[62px] shrink-0 items-center justify-center rounded-sm bg-white">
                <img alt="" src={verifiedBrand} className="size-[34px]" />
              </span>
              <div className="flex max-w-[522px] flex-col font-medium leading-[1.4]">
                <p className="text-[20px]">Verify before you trust</p>
                <p className="text-[16px] text-text-disabled">
                  Use Veryfy to check a product with its HiddenMark and Uni-Code authentication features.
                </p>
              </div>
            </div>
            <Button to="/#check" className="font-normal! sm:shrink-0">
              Verify a product
            </Button>
          </div>
        </Reveal>
      </div>

      <Reveal as="section" className="flex flex-col gap-6 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-[24px] font-semibold leading-[1.4] lg:text-[32px]">Explore more guides</h2>
          <Link to="/learn/articles" className="group flex items-center gap-2 text-[14px] font-bold text-brand-primary hover:underline">
            View all guides
            <img alt="" src={arrowPrimary} className="size-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {more.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </Reveal>
    </article>
  )
}
