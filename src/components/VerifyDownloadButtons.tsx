import Button from './Button'
import appleLogo from '../assets/icons/app-store-apple.svg'
import playLogo from '../assets/icons/google-play-logo.svg'
import arrowBold from '../assets/icons/arrow-forward-white-bold.svg'

/** Paints a store logo in the button's text colour (Brand Primary) by using the SVG as a mask. */
const storeMark = (src: string) => {
  const url = `url("${src}")`
  return { maskImage: url, WebkitMaskImage: url, maskSize: 'contain', maskRepeat: 'no-repeat', maskPosition: 'center' } as const
}

/** "Verify a Product" (Primary) + "Download app" (Secondary, App Store and Google Play marks). Used in the landing hero and the app section. */
export default function VerifyDownloadButtons({ downloadTo, className = '' }: { downloadTo: string; className?: string }) {
  return (
    <div className={`flex flex-col gap-4 lg:grid lg:grid-cols-[240px_240px] ${className}`}>
      <Button to="/#check" arrow arrowSrc={arrowBold} className="w-full">
        Verify a Product
      </Button>
      <Button
        to={downloadTo}
        variant="secondary"
        icon={
          <span aria-hidden className="flex items-center gap-2">
            <span style={storeMark(appleLogo)} className="size-[18px] bg-current" />
            <span className="h-4 w-px bg-current opacity-30" />
            <span style={storeMark(playLogo)} className="size-[17px] bg-current" />
          </span>
        }
        className="w-full gap-[10px]!"
      >
        Download app
      </Button>
    </div>
  )
}
