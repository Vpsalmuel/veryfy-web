import Button from '../components/Button'

/** Placeholder for pages that haven't been built from Figma yet. */
export default function ComingSoon() {
  return (
    <section className="mx-auto w-full flex max-w-[600px] flex-col items-center gap-4 px-4 py-24 text-center">
      <p className="eyebrow text-brand-primary-dark">Coming soon</p>
      <h1 className="text-[32px] font-semibold">This page is on its way.</h1>
      <p className="text-[16px] text-text-secondary">We’re building it from the designs next.</p>
      <Button to="/" arrow>
        Back to home
      </Button>
    </section>
  )
}
