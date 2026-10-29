import VerifyDownloadButtons from '../../components/VerifyDownloadButtons'
import hero from '../../assets/landing/hero.png'
import verifiedIcon from '../../assets/icons/verified.svg'
import flagIcon from '../../assets/icons/flag.svg'
import menuBookIcon from '../../assets/icons/menu-book.svg'

const highlights = [
  { icon: verifiedIcon, lines: ['Trusted', 'Information'] },
  { icon: flagIcon, lines: ['Community', 'Reports'] },
  { icon: menuBookIcon, lines: ['Practical', 'Guides'] },
]

export default function Hero() {
  return (
    <section className="mx-auto w-full max-w-[1512px] px-4 pt-6 pb-6 lg:py-8 lg:pl-24 lg:pr-0">
      {/* Mobile: text → image → highlights → buttons. Desktop: text column + image on the right. */}
      <div className="flex flex-col gap-6 lg:grid lg:min-h-[700px] lg:grid-cols-[1fr_587px] lg:grid-rows-[1fr_auto_auto_1fr] lg:gap-x-4 lg:gap-y-0">
        <div className="flex flex-col gap-4 lg:col-start-1 lg:row-start-2">
          <span className="w-fit animate-fade-up rounded-2xl bg-brand-primary-light/30 shadow-[inset_0_0_0_0.5px_var(--color-brand-primary-dark)] px-6 py-3 text-[10px] font-bold text-brand-secondary">
            REAL PRODUCTS, SAFER PEOPLE.
          </span>
          <div className="flex flex-col gap-5">
            <h1 className="text-[40px] font-bold leading-[1.2] tracking-[-0.8px] lg:text-[64px] lg:tracking-normal">
              <span className="block animate-fade-up [animation-delay:80ms]">Know what’s real.</span>
              <span className="block animate-fade-up text-brand-primary [animation-delay:180ms]">Shop with confidence.</span>
            </h1>
            <p className="animate-fade-up text-[16px] font-bold leading-[1.4] text-greyscale-500 [animation-delay:280ms] lg:max-w-[540px] lg:text-[20px]">
              Veryfy products, discover counterfeit alerts, and help protects others from fake goods
            </p>
          </div>
        </div>

        <div className="relative aspect-[587/521] w-full animate-[fade-in_0.8s_ease-out_200ms_both] overflow-hidden rounded-sm lg:col-start-2 lg:row-span-4 lg:row-start-1 lg:h-[521px] lg:w-[587px] lg:self-center">
          <img
            src={hero}
            alt="Hand holding a phone scanning the QR code on a Veryfy-protected product box"
            className="absolute inset-0 size-full animate-[drift_8s_ease-in-out_infinite] object-cover"
          />
        </div>

        {/* Buttons + highlights share the highlight row's width on desktop */}
        <div className="contents lg:col-start-1 lg:row-start-3 lg:mt-12 lg:flex lg:w-fit lg:flex-col lg:gap-[34px]">
          {/* "Download app" goes to the "Take Veryfy with you" section */}
          <VerifyDownloadButtons downloadTo="/#app" className="order-last animate-fade-up [animation-delay:380ms] lg:order-none" />
          <ul className="flex items-center justify-between py-[14px] lg:justify-start lg:gap-[59px]">
            {highlights.map((h, i) => (
              <li
                key={h.lines[0]}
                className="group flex animate-fade-up items-center gap-2 lg:gap-3"
                style={{ animationDelay: `${480 + i * 90}ms` }}
              >
                <img alt="" src={h.icon} className="size-[26px] transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 lg:size-[39px]" />
                <span className="text-[12px] font-bold leading-[1.4] text-text-secondary lg:text-[14px]">
                  {h.lines[0]}
                  <br />
                  {h.lines[1]}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
