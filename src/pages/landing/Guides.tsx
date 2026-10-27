import { Link } from 'react-router-dom'
import Button from '../../components/Button'
import SectionHeading from '../../components/SectionHeading'
import Reveal from '../../components/Reveal'
import guideCheck from '../../assets/landing/guide-check.png'
import guideSigns from '../../assets/landing/guide-signs.png'
import guideNafdac from '../../assets/landing/guide-nafdac.png'
import arrowWhite from '../../assets/icons/arrow-forward-white.svg'

const guides = [
  {
    tag: 'Guide',
    title: 'How to check if a product is genuine',
    img: guideCheck,
    imgClass: 'inset-0 size-full object-cover',
    alt: 'Shopper comparing two product boxes',
  },
  {
    tag: 'Tips',
    title: 'Common signs of Counterfeit Products',
    img: guideSigns,
    imgClass: 'left-0 top-[0.05%] h-[87.84%] w-full object-cover',
    alt: 'A real and a fake bottle side by side',
  },
  {
    tag: 'Resource',
    title: 'Understanding product registration in Nigeria.',
    img: guideNafdac,
    imgClass: 'left-0 top-[-2.42%] h-[87.84%] w-full object-cover',
    alt: 'NAFDAC seal',
  },
]

export default function Guides() {
  return (
    <section className="flex flex-col gap-6 py-6">
      <SectionHeading
        overline="Learn and stay informed"
        title="Practical guides for everyday shoppers."
        action={
          <Button variant="ghost" to="/learn" arrow>
            View all resources
          </Button>
        }
      />
      <div className="flex flex-col gap-6 lg:flex-row">
        {guides.map((g, i) => (
          <Reveal key={g.title} delay={i * 120} className="flex flex-1">
          <Link
            to="/learn"
            className="group lift relative flex h-[258px] flex-1 flex-col justify-end overflow-hidden rounded-sm border-[0.5px] border-border-default lg:h-[291px]"
          >
            <img
              alt={g.alt}
              src={g.img}
              className={`absolute max-w-none transition-transform duration-700 ease-out group-hover:scale-105 ${g.imgClass}`}
            />
            <div className="relative flex h-[106px] flex-col justify-center gap-3 rounded-sm bg-surface-raised p-4">
              <span className="flex h-[22px] w-fit min-w-[65px] items-center justify-center rounded-[11px] border-[0.5px] border-brand-primary-light bg-surface-brand-subtle px-4 text-[12px] text-brand-primary">
                {g.tag}
              </span>
              <div className="flex items-center gap-6 lg:gap-[51px]">
                <p className="flex-1 text-[16px] font-medium leading-[1.4] text-text-secondary">{g.title}</p>
                <span className="flex shrink-0 items-center justify-center rounded-md bg-brand-primary p-4 transition-colors group-hover:bg-brand-primary-dark">
                  <img alt="" src={arrowWhite} className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
