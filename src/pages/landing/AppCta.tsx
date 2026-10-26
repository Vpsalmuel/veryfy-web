import Button from '../../components/Button'
import StoreBadges from '../../components/StoreBadges'
import appPhones from '../../assets/landing/app-phones.png'

export default function AppCta() {
  return (
    <section id="app" className="mx-auto w-full flex max-w-[1512px] scroll-mt-24 flex-col gap-6 px-4 py-6 lg:min-h-[506px] lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:px-24 lg:py-8">
      <div className="flex flex-col gap-[25px] lg:w-[468px]">
        <div className="flex flex-col gap-[7px] lg:w-[436px]">
          <p className="eyebrow text-brand-primary">Take Veryfy with you</p>
          <h2 className="text-[24px] font-semibold leading-[1.4] lg:text-[32px]">
            Veryfy, get alerts and report anytime, anywhere.
          </h2>
          <p className="font-inter text-[16px] text-text-secondary">
            Use the Veryfy mobile app or web for a faster, more seamless experience.
          </p>
        </div>
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-[22px]">
          <StoreBadges />
          <Button variant="secondary" to="/check" arrow className="h-10!">
            Open Web App
          </Button>
        </div>
      </div>
      <img
        src={appPhones}
        alt="Veryfy app screens: home with recent checks, and a ‘Product is genuine’ result"
        className="aspect-[504/439] w-full max-w-[504px] self-center"
      />
    </section>
  )
}
