import VerifyDownloadButtons from '../../components/VerifyDownloadButtons'
import appPreview from '../../assets/landing/app-preview.png'

export default function AppCta() {
  return (
    <section id="app" className="mx-auto w-full flex max-w-[1512px] scroll-mt-24 flex-col gap-6 px-4 py-6 lg:min-h-[506px] lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:px-24 lg:py-8">
      <div className="flex flex-col gap-[25px] lg:w-[468px]">
        <div className="flex flex-col gap-[7px] lg:w-[436px]">
          <p className="eyebrow text-brand-primary">Take Veryfy with you</p>
          <h2 className="text-[24px] font-semibold leading-[1.4] lg:text-[32px]">
            Veryfy, get alerts and report anytime, anywhere.
          </h2>
          <p className="font-inter text-[16px] leading-[1.21] text-text-secondary">
            Use the Veryfy mobile app or web for a faster, more <br className="hidden lg:block" />
            seamless experience.
          </p>
        </div>
        <VerifyDownloadButtons />
      </div>
      <img
        src={appPreview}
        alt="Veryfy app screens: home with recent checks, and a ‘The Uni-Code matched’ verified result"
        className="aspect-[591/394] w-full max-w-[591px] self-center rounded-lg object-cover"
      />
    </section>
  )
}
