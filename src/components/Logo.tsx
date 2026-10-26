import headerV from '../assets/brand/logo-header-v.svg'
import headerSlash from '../assets/brand/logo-header-slash.svg'
import headerMask from '../assets/brand/logo-header-mask.svg'
import headerWord from '../assets/brand/logo-header-word.svg'
import footerV from '../assets/brand/logo-footer-v.svg'
import footerSlash from '../assets/brand/logo-footer-slash.svg'
import footerMask from '../assets/brand/logo-footer-mask.svg'
import footerWord from '../assets/brand/logo-footer-word.svg'

const variants = {
  brand: { v: headerV, slash: headerSlash, mask: headerMask, word: headerWord },
  inverse: { v: footerV, slash: footerSlash, mask: footerMask, word: footerWord },
}

type LogoProps = {
  /** brand = blue (header), inverse = green mark + white wordmark (footer) */
  variant?: keyof typeof variants
  className?: string
}

/** Veryfy wordmark, laid out exactly as the Figma Logo component. Aspect ratio ~3.7:1. */
export default function Logo({ variant = 'brand', className = 'h-[31px] w-[114px]' }: LogoProps) {
  const a = variants[variant]
  return (
    <div className={`relative shrink-0 overflow-hidden ${className}`} role="img" aria-label="Veryfy">
      <div className="absolute inset-[24.26%_91.71%_26.12%_0]">
        <img alt="" src={a.v} className="absolute inset-0 block size-full" />
      </div>
      <div className="absolute inset-[0_78.54%_13.3%_5.89%]">
        <img alt="" src={a.slash} className="absolute inset-0 block size-full" />
      </div>
      <div
        className="absolute inset-[25.22%_0.03%_0.43%_27.3%]"
        style={{ maskImage: `url("${a.mask}")`, maskSize: '100% 100%', maskRepeat: 'no-repeat' }}
      >
        <img alt="" src={a.word} className="absolute inset-0 block size-full" />
      </div>
    </div>
  )
}
