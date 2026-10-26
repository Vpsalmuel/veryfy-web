import { Link } from 'react-router-dom'
import { categoryTag, type Article } from '../../data/articles'
import arrowPrimary from '../../assets/icons/arrow-forward-primary.svg'

/** Article card: image on top, white panel with tag, title, summary, read time and arrow. */
export default function ArticleCard({ article: a }: { article: Article }) {
  return (
    <Link
      to={`/learn/${a.slug}`}
      className="group lift relative flex h-[429px] flex-col justify-end overflow-hidden rounded-sm border-[0.5px] border-border-default bg-white"
    >
      <img
        src={a.image}
        alt=""
        className="absolute inset-x-0 top-0 h-[210px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="relative flex h-[231px] flex-col justify-center gap-[11px] rounded-sm bg-surface-raised p-4">
        <span className="flex h-[22px] w-fit items-center rounded-[11px] border-[0.5px] border-brand-primary-light bg-surface-brand-subtle px-4 text-[12px] text-brand-primary">
          {categoryTag(a.category)}
        </span>
        <div className="flex items-end gap-6">
          <div className="flex flex-1 flex-col gap-3 leading-[1.4]">
            <h3 className="text-[20px] font-medium text-brand-secondary">{a.title}</h3>
            <p className="text-[16px] font-medium text-text-secondary">{a.summary}</p>
            <p className="text-[14px] text-text-disabled">{a.minutes} min read</p>
          </div>
          <span className="flex shrink-0 items-center justify-center rounded-md p-4 transition-colors group-hover:bg-brand-primary/10">
            <img alt="" src={arrowPrimary} className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  )
}
