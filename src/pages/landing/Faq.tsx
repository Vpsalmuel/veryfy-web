import { useState } from 'react'
import addIcon from '../../assets/icons/add.svg'

// TODO: answers are placeholder copy — replace with the team's final text.
const faqs = [
  {
    q: 'How does Veryfy work?',
    a: 'Every protected product carries a Hiddenmark label and a unique Uni-Code. Search, scan or text the code and Veryfy checks it against the official product register.',
  },
  {
    q: 'How do i know if a product is genuine?',
    a: 'Check the Hiddenmark label for tampering, then scan the QR code or enter the Uni-Code. A genuine product shows a “Product verified” result with its registration details.',
  },
  {
    q: 'What if a product isn’t found in database?',
    a: 'Don’t use it yet. Double-check the code you entered, and if it still isn’t found, report the product so it can be reviewed.',
  },
  {
    q: 'How can i report a suspected counterfeit product?',
    a: 'Use the Report page to share the product name, where you bought it and a photo. Reports are reviewed and you can follow the status.',
  },
  {
    q: 'Is product verification free?',
    a: 'Yes. Checking a product on the web, in the app, by SMS or by USSD is free for shoppers.',
  },
  {
    q: 'Where does the information on Veryfy come from?',
    a: 'Product and registration details come from official sources such as the National Regulatory Authority and the Ministry of Health.',
  },
]

function Item({ index, q, a }: { index: number; q: string; a: string }) {
  const [open, setOpen] = useState(false)
  const id = `faq-${index}`
  return (
    <div
      className={`rounded-[37px] border p-4 transition-colors duration-300 lg:self-start lg:py-[13px] ${
        open ? 'border-white bg-white/5' : 'border-brand-primary-light hover:border-white hover:bg-white/5'
      }`}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 text-left font-inter text-[16px] leading-[24px] font-semibold text-white"
      >
        <span className="flex gap-2 pl-[6px]">
          <span>{index}.</span>
          <span>{q}</span>
        </span>
        <img
          alt=""
          src={addIcon}
          className={`size-6 shrink-0 transition-transform duration-300 ${open ? 'rotate-45' : ''}`}
        />
      </button>
      {/* Height animates via grid rows 0fr → 1fr */}
      <div
        id={id}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <p className="overflow-hidden px-[6px] text-[14px] leading-[1.4] text-brand-primary-light">
          <span className="block pt-3 pb-1">{a}</span>
        </p>
      </div>
    </div>
  )
}

export default function Faq() {
  return (
    <section id="faq" className="bg-brand-secondary">
      <div className="mx-auto w-full flex max-w-[1512px] flex-col gap-8 px-4 py-8 lg:px-24">
        <div className="flex max-w-[788px] flex-col gap-[13px] leading-[1.4]">
          <p className="eyebrow text-white">FAQ</p>
          <h2 className="text-[24px] font-semibold text-white lg:text-[32px]">Frequently asked questions</h2>
          <p className="text-[16px] font-medium text-brand-primary-light lg:max-w-[620px] lg:text-[18px]">
            Find answers to common questions about Veryfy, product verification and reporting counterfeit products.
          </p>
        </div>
        {/* Desktop: two columns filled top-to-bottom (1–3, 4–6) */}
        <div className="flex flex-col gap-6 lg:grid lg:grid-flow-col lg:grid-cols-2 lg:grid-rows-3 lg:gap-x-[30px]">
          {faqs.map((f, i) => (
            <Item key={f.q} index={i + 1} q={f.q} a={f.a} />
          ))}
        </div>
      </div>
    </section>
  )
}
