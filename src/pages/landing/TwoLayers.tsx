import { useEffect, useRef } from 'react'
import Button from '../../components/Button'
import SectionHeading from '../../components/SectionHeading'
import qrBox from '../../assets/landing/qr-box.png'
import qrBoxVideo from '../../assets/landing/qr-box.mp4'
import tiltLabel from '../../assets/landing/tilt-label.png'
import tiltLabelVideo from '../../assets/landing/tilt-label.mp4'

function Layer({ tag, line1, body }: { tag: string; line1: string; body: string }) {
  return (
    <div className="flex flex-col gap-[29px]">
      <span className="flex h-[37px] w-[133px] items-center justify-center rounded-full border-[0.5px] border-brand-accent bg-brand-accent/60 text-[12px] font-bold tracking-[0.96px] text-text-primary uppercase">
        {tag}
      </span>
      <div className="flex flex-col gap-[17px] leading-[1.4]">
        <p className="text-[20px] font-medium">
          <span className="block text-text-primary">{line1}</span>
          <span className="block text-brand-primary">Reveal the truth.</span>
        </p>
        <p className="text-[14px] text-text-secondary">{body}</p>
      </div>
    </div>
  )
}

/** Silent looping video that only plays while on screen; the still image is the poster and the reduced-motion fallback. */
function LoopVideo({ src, poster, label }: { src: string; poster: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0.25 },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={label}
      className="aspect-[396/223] w-full max-w-[396px] rounded-lg object-cover"
    />
  )
}

function Illustration({ src, alt, video }: { src: string; alt: string; video?: string }) {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-6">
      {video ? (
        <LoopVideo src={video} poster={src} label={alt} />
      ) : (
        <img src={src} alt={alt} className="aspect-[396/223] w-full max-w-[396px] rounded-lg" />
      )}
    </div>
  )
}

export default function TwoLayers() {
  return (
    <section className="flex flex-col items-center gap-9">
      <SectionHeading
        className="w-full lg:px-6 lg:py-4"
        overline="Our authentication model"
        title="Two layers. Stronger protection."
        description="Every Veryfy product has a Hiddenmark label and unique Uni-Code. Both work together to help you check if a product is real."
        action={
          <Button variant="ghost" to="/learn" arrow>
            Learn more about the technology
          </Button>
        }
      />

      {/* Desktop: two equal rows per column so the horizontal divider lines up and runs unbroken across both columns */}
      <div className="-mx-4 flex w-[calc(100%+2rem)] flex-col bg-white lg:mx-0 lg:min-h-[582px] lg:w-full lg:max-w-[1216px] lg:flex-row lg:bg-transparent">
        <div className="flex flex-col border-border-default lg:grid lg:w-1/2 lg:grid-rows-2 lg:border-r-[0.5px]">
          <div className="border-b-[0.5px] border-border-default px-5 py-6 lg:flex-1">
            <Layer
              tag="HiddenMark"
              line1="Reveal the mark."
              body="Tilt the security label to reveal the hidden logo and code. Check for signs of tampering"
            />
          </div>
          <Illustration
            src={qrBox}
            video={qrBoxVideo}
            alt="A smartphone scanning the QR code on top of a product box"
          />
        </div>
        {/* Mobile shows the Uni-Code text before its illustration */}
        <div className="flex flex-col-reverse border-t-[8px] border-surface-brand-subtle lg:grid lg:w-1/2 lg:grid-rows-2 lg:border-t-0">
          <div className="border-b-[0.5px] border-border-default lg:flex lg:pl-6">
            <Illustration
              src={tiltLabel}
              video={tiltLabelVideo}
              alt="Tilting the holographic security seal on a box reveals the Veryfy logo"
            />
          </div>
          <div className="border-b-[0.5px] border-border-default px-5 py-6 lg:border-b-0 lg:pl-11">
            <Layer tag="Unicode" line1="Reveal the code." body="Scan the QR code or enter the Uni-Code to verify the product." />
          </div>
        </div>
      </div>
    </section>
  )
}
