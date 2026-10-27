import { Link } from 'react-router-dom'
import Logo from './Logo'
import mobileIcon from '../assets/icons/mobile.svg'
import smsIcon from '../assets/icons/sms.svg'
import dialpadIcon from '../assets/icons/dialpad.svg'
import openInNew from '../assets/icons/open-in-new.svg'

const columns = [
  {
    title: 'Platform',
    links: [
      { label: 'How verification works', to: '/learn' },
      { label: 'Verify a product', to: '/' },
      { label: 'Alerts', to: '/alerts' },
      { label: 'Recalls', to: '/recalls' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Education centre', to: '/learn' },
      { label: 'FAQ', to: '/#faq' },
      { label: 'Report a product', to: '/report' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', to: '/privacy' },
      { label: 'Terms', to: '/terms' },
      { label: 'Accessibility', to: '/accessibility' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: 'Contact support', to: '/contact' },
      { label: 'Partner with us', to: '/partner' },
      { label: 'Media enquiries', to: '/media' },
    ],
  },
]

const channels = [
  { icon: mobileIcon, label: 'Veryfy app' },
  { icon: smsIcon, label: 'SMS the code to 38800' },
  { icon: dialpadIcon, label: 'USSD *347*88#' },
]

// TODO: confirm the official URLs with the team
const sources = [
  { label: 'National Regulatory Authority', href: '#' },
  { label: 'Ministry of Health', href: '#' },
]

/** Web/Footer and Mobile/Footer on Brand/Secondary. */
export default function Footer() {
  return (
    <footer className="bg-brand-secondary text-white">
      <div className="mx-auto w-full flex max-w-[1200px] flex-col gap-8 px-4 py-8 lg:box-content lg:px-0 lg:py-16">
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="flex flex-col gap-3 lg:w-[320px]">
            <p className="text-[20px] font-medium">VERYFY</p>
            <p className="text-[14px]">Check medicines and packaged food before you buy, use or sell them.</p>
          </div>
          <div className="grid grid-cols-2 gap-8 lg:flex lg:flex-1">
            {columns.map((col) => (
              <div key={col.title} className="flex flex-col gap-3 lg:flex-1">
                {/* Labels step back in Brand/Primary Light so the links read first */}
                <p className="eyebrow text-brand-primary-light">{col.title}</p>
                {col.links.map((l) => (
                  <Link key={l.label} to={l.to} className="text-[14px] hover:underline">
                    {l.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        <hr className="border-0 h-px bg-brand-primary-dark" />

        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-6">
          <p className="text-[16px] font-medium">Verify anywhere</p>
          <div className="flex flex-wrap gap-2 lg:gap-6">
            {channels.map((c) => (
              <span
                key={c.label}
                className="flex items-center gap-2 rounded-full border border-brand-primary-dark px-3 py-2 text-[14px]"
              >
                <img alt="" src={c.icon} className="size-4" />
                {c.label}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 text-[14px] lg:flex-row lg:items-center lg:gap-4">
          <p>Official sources:</p>
          {sources.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline">
              {s.label}
              <img alt="" src={openInNew} className="size-4" />
            </a>
          ))}
        </div>

        <hr className="border-0 h-px bg-brand-primary-dark" />

        <Logo variant="inverse" className="aspect-[1200/344] w-full" />

        <div className="flex flex-col text-[12px] lg:flex-row lg:justify-between lg:gap-8">
          <p>Veryfy does not certify authenticity or replace official regulatory decisions.</p>
          <p>© 2026 Veryfy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
