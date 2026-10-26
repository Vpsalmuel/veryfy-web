import googleBadge from '../assets/icons/google-play-badge.svg'
import googleText from '../assets/icons/google-play-text.svg'
import googleLogo from '../assets/icons/google-play-logo.svg'
import appleBadge from '../assets/icons/app-store-badge.svg'
import appleLogo from '../assets/icons/app-store-apple.svg'
import appleText from '../assets/icons/app-store-text.svg'

// TODO: replace with the real store listing URLs once the apps are published
const GOOGLE_PLAY_URL = '#'
const APP_STORE_URL = '#'

/** _App badges: Google Play + App Store, 135×40 each, composed as in Figma. */
export default function StoreBadges() {
  return (
    <div className="flex items-center gap-3">
      <a href={GOOGLE_PLAY_URL} aria-label="Get it on Google Play" className="relative h-10 w-[135px] shrink-0 overflow-hidden">
        <img alt="" src={googleBadge} className="absolute inset-0 block size-full" />
        <div className="absolute inset-[17.16%_6.8%_14.81%_30.4%]">
          <img alt="" src={googleText} className="block size-full" />
        </div>
        <div className="absolute inset-[17.83%_75.51%_17.82%_7.38%]">
          <img alt="" src={googleLogo} className="absolute inset-0 block size-full" />
        </div>
      </a>
      <a href={APP_STORE_URL} aria-label="Download on the App Store" className="relative h-10 w-[135px] shrink-0 overflow-hidden">
        <img alt="" src={appleBadge} className="absolute inset-0 block size-full" />
        <div className="absolute inset-[21.8%_73.54%_23.76%_13.33%]">
          <img alt="" src={appleLogo} className="absolute inset-0 block size-full" />
        </div>
        <div className="absolute inset-[21.09%_12.95%_16.27%_31.45%]">
          <img alt="" src={appleText} className="absolute inset-0 block size-full" />
        </div>
      </a>
    </div>
  )
}
