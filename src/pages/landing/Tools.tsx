import Button from '../../components/Button'
import SectionHeading from '../../components/SectionHeading'
import Reveal from '../../components/Reveal'
import toolVerify from '../../assets/landing/tool-verify.png'
import toolAlerts from '../../assets/landing/tool-alerts.png'
import toolReport from '../../assets/landing/tool-report.png'

// Image crops and tints match the Figma cards. Each CTA names where it goes.
const tools = [
  {
    title: 'Verify',
    body: 'Check if a product is genuine, view registration details & see official information',
    img: toolVerify,
    imgClass: 'h-full left-[0.01%] top-0 w-[99.97%]',
    tint: 'bg-tint-green',
    to: '/check',
    cta: 'Check a product',
  },
  {
    title: 'Alerts',
    body: 'Browse the latest counterfeit product alerts, recalls and safety notices.',
    img: toolAlerts,
    imgClass: 'h-[120.85%] left-0 top-[-10.43%] w-full',
    tint: 'bg-tint-blue',
    to: '/alerts',
    cta: 'View alerts',
  },
  {
    title: 'Report',
    body: 'Report suspicious or counterfeit products. Your reports help protect others in the community',
    img: toolReport,
    imgClass: 'h-[112.81%] left-[-7.62%] top-[-5.09%] w-[112.79%]',
    tint: 'bg-tint-yellow',
    to: '/report',
    cta: 'Report a product',
  },
]

export default function Tools() {
  return (
    <section className="flex flex-col gap-6 py-6 lg:pb-[35px]">
      <SectionHeading
        overline="What you can do to verify"
        title="Simple tools for a safer market."
        action={
          <Button variant="ghost" to="/learn" arrow>
            View all resources
          </Button>
        }
      />
      <div className="flex flex-col gap-6 lg:flex-row">
        {tools.map((t, i) => (
          <Reveal key={t.title} delay={i * 120} className="flex flex-1">
          <article className="group lift relative flex flex-1 cursor-pointer flex-col overflow-hidden rounded-lg border-[0.5px] border-border-default">
            <div className="relative h-[259px] overflow-hidden">
              <img
                alt=""
                src={t.img}
                className={`absolute max-w-none transition-transform duration-500 ease-out group-hover:scale-105 ${t.imgClass}`}
              />
            </div>
            {/* 16px side padding; the CTA has no padding of its own so it lines up with the text, and its label sits 16px above the bottom edge */}
            <div className={`flex h-[170px] flex-col justify-end gap-3 px-4 pt-2 ${t.tint}`}>
              <div className="flex flex-col gap-[5px] leading-[1.4]">
                <h3 className="text-[20px] font-medium text-brand-secondary">{t.title}</h3>
                <p className="text-[14px] text-text-secondary">{t.body}</p>
              </div>
              {/* Stretched link: its ::after covers the whole card, so the entire card is clickable */}
              <Button
                variant="ghost"
                to={t.to}
                arrow
                className="w-fit px-0! hover:bg-transparent! group-hover:underline after:absolute after:inset-0 after:content-['']"
              >
                {t.cta}
              </Button>
            </div>
          </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
