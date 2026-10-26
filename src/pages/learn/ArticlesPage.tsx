import { useState } from 'react'
import Reveal from '../../components/Reveal'
import ArticleCard from './ArticleCard'
import SortMenu from './SortMenu'
import { articles, sortArticles, type SortKey } from '../../data/articles'

/** "Learn Page / All articles": every guide in a 3-column grid with sorting. */
export default function ArticlesPage() {
  const [sort, setSort] = useState<SortKey>('relevant')
  const list = sortArticles(articles, sort)
  return (
    <section className="mx-auto flex w-full max-w-[1512px] flex-col gap-6 px-4 pt-8 pb-16 lg:px-[90px] lg:pt-12">
      <div className="flex animate-fade-up items-end justify-between gap-4">
        <div className="flex flex-col gap-1 leading-[1.4]">
          <h1 className="text-[28px] font-semibold lg:text-[32px]">Articles</h1>
          <p className="text-[16px] font-bold text-greyscale-500 lg:text-[18px]">
            Educational resources made to help you understand product safety better.
          </p>
        </div>
        <SortMenu value={sort} onChange={setSort} />
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((a, i) => (
          <Reveal key={`${sort}-${a.slug}`} delay={(i % 3) * 100}>
            <ArticleCard article={a} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
