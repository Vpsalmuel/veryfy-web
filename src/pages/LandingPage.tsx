import Hero from './landing/Hero'
import CheckProduct from './landing/CheckProduct'
import TwoLayers from './landing/TwoLayers'
import Tools from './landing/Tools'
import Guides from './landing/Guides'
import Faq from './landing/Faq'
import AppCta from './landing/AppCta'
import Reveal from '../components/Reveal'

export default function LandingPage() {
  return (
    <>
      <Hero />
      <div className="mx-auto w-full flex max-w-[1512px] flex-col gap-14 px-4 pb-6 lg:gap-24 lg:px-24">
        <Reveal>
          <CheckProduct />
        </Reveal>
        <Reveal>
          <TwoLayers />
        </Reveal>
        <Reveal>
          <Tools />
        </Reveal>
        <Reveal>
          <Guides />
        </Reveal>
      </div>
      <Faq />
      <Reveal>
        <AppCta />
      </Reveal>
    </>
  )
}
