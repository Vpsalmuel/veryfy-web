import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import EnquiryPage, { type EnquiryConfig } from './EnquiryPage'
import mobileIcon from '../../assets/icons/mobile.svg'
import smsIcon from '../../assets/icons/sms.svg'
import dialpadIcon from '../../assets/icons/dialpad.svg'
import timerIcon from '../../assets/icons/timer-info.svg'
import infoIcon from '../../assets/icons/info-filled.svg'
import arrowPrimary16 from '../../assets/icons/arrow-forward-primary-16.svg'
import verifiedIcon from '../../assets/icons/verified-42.svg'
import storefrontIcon from '../../assets/icons/storefront.svg'
import qrIcon from '../../assets/icons/qr-code-scanner-42.svg'
import reportIcon from '../../assets/icons/report.svg'

/** Navy card listing the no-internet channels (same chips as the footer). */
function ChannelsCard({ title, body }: { title: string; body: string }) {
  const channels = [
    { icon: mobileIcon, label: 'Veryfy app' },
    { icon: smsIcon, label: 'SMS the code to 38800' },
    { icon: dialpadIcon, label: 'USSD *347*88#' },
  ]
  return (
    <div className="flex flex-col gap-4 rounded-lg bg-brand-secondary p-6 text-white">
      <div className="flex flex-col gap-1 leading-[1.4]">
        <h2 className="text-[20px] font-medium">{title}</h2>
        <p className="text-[14px] text-brand-primary-light">{body}</p>
      </div>
      <ul className="flex flex-wrap gap-2">
        {channels.map((c) => (
          <li key={c.label} className="flex items-center gap-2 rounded-full border border-brand-primary-dark px-3 py-2 text-[14px] transition-colors hover:border-brand-primary-light">
            <img alt="" src={c.icon} className="size-4" />
            {c.label}
          </li>
        ))}
      </ul>
    </div>
  )
}

function InfoCard({ icon, title, children }: { icon: string; title: string; children: ReactNode }) {
  return (
    <div className="flex gap-3 rounded-lg border-[0.5px] border-border-default bg-white p-5">
      <img alt="" src={icon} className="size-5 shrink-0 translate-y-0.5" />
      <div className="flex flex-col gap-1 text-[14px] leading-[1.4]">
        <h2 className="text-[16px] font-medium">{title}</h2>
        <div className="text-text-secondary">{children}</div>
      </div>
    </div>
  )
}

function LinksCard({ title, links }: { title: string; links: { label: string; to: string }[] }) {
  return (
    <div className="flex flex-col gap-2 rounded-lg bg-surface-brand-subtle p-5">
      <h2 className="text-[16px] font-medium">{title}</h2>
      <ul className="flex flex-col">
        {links.map((l) => (
          <li key={l.label}>
            <Link to={l.to} className="group flex items-center justify-between rounded-sm py-2 text-[14px] text-brand-primary hover:underline">
              {l.label}
              <img alt="" src={arrowPrimary16} className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function FeatureGrid({ title, items }: { title: string; items: { icon: string; title: string; body: string }[] }) {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-[24px] font-semibold leading-[1.4] lg:text-[32px]">{title}</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {items.map((t) => (
          <div key={t.title} className="group lift flex flex-col gap-3 rounded-md border-[0.5px] border-border-default bg-surface-raised p-5">
            <span className="flex size-[50px] items-center justify-center rounded-sm bg-brand-primary-light/66 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
              <img alt="" src={t.icon} className="size-[42px]" />
            </span>
            <h3 className="text-[18px] font-medium leading-[1.4]">{t.title}</h3>
            <p className="text-[14px] leading-[1.4] text-text-secondary">{t.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function Steps({ title, steps }: { title: string; steps: { title: string; body: string }[] }) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border-[0.5px] border-border-default bg-white p-5">
      <h2 className="text-[16px] font-medium">{title}</h2>
      <ol>
        {steps.map((s, i) => (
          <li key={s.title} className="flex gap-3">
            <div className="flex flex-col items-center gap-1 self-stretch">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-primary-light/60 text-[13px] font-medium text-brand-primary-dark">
                {i + 1}
              </span>
              {i < steps.length - 1 && <span className="w-[2px] flex-1 bg-border-default" />}
            </div>
            <div className="flex flex-col gap-1 pb-4 leading-[1.4]">
              <p className="text-[14px] font-medium">{s.title}</p>
              <p className="text-[12px] text-text-secondary">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

// TODO: response times and team details are placeholders — confirm with the team.
const contactConfig: EnquiryConfig = {
  eyebrow: 'Contact support',
  title: 'How can we',
  highlight: 'help you?',
  intro: 'Questions about a product check, a report you sent or using Veryfy? Send us a message and our support team will get back to you.',
  formTitle: 'Send us a message',
  formIntro: 'Fields marked optional can be left blank.',
  refPrefix: 'SUP',
  submitLabel: 'Send message',
  success: {
    title: 'Message sent',
    body: 'Thanks for getting in touch. Our support team will reply to the email or phone number you gave us.',
  },
  fields: [
    {
      kind: 'select',
      name: 'topic',
      label: 'What do you need help with?',
      required: true,
      options: [
        'A product check result',
        'A report I submitted',
        'Using the Veryfy app, SMS or USSD',
        'Privacy or my data',
        'Something else',
      ],
    },
    { kind: 'text', name: 'name', label: 'Your name', required: true, half: true, autoComplete: 'name', placeholder: 'e.g. Ada Okafor' },
    { kind: 'email', name: 'email', label: 'Email address', required: true, half: true, autoComplete: 'email', placeholder: 'name@email.com' },
    { kind: 'tel', name: 'phone', label: 'Phone number', half: true, autoComplete: 'tel', placeholder: '0803 000 0000' },
    { kind: 'text', name: 'reference', label: 'Reference number', half: true, placeholder: 'e.g. VR-2026-0418', hint: 'From a report or a product check, if you have one.' },
    { kind: 'textarea', name: 'message', label: 'Your message', required: true, placeholder: 'Tell us what happened and how we can help' },
  ],
  aside: (
    <>
      <InfoCard icon={timerIcon} title="When we reply">
        We usually reply within 1–2 working days, Monday to Friday.
      </InfoCard>
      <ChannelsCard title="Check a product without internet" body="You don’t need to contact us to verify a product. Use any of these:" />
      <LinksCard
        title="You might find an answer here"
        links={[
          { label: 'Frequently asked questions', to: '/#faq' },
          { label: 'Track a report', to: '/reports/VR-2026-0418' },
          { label: 'How verification works', to: '/learn' },
        ]}
      />
      <InfoCard icon={infoIcon} title="Think a product made someone ill?">
        Stop using it and see a doctor or pharmacist straight away. Then{' '}
        <Link to="/report" className="text-brand-primary hover:underline">
          report the product
        </Link>
        .
      </InfoCard>
    </>
  ),
}

const partnerConfig: EnquiryConfig = {
  eyebrow: 'Partner with us',
  title: 'Protect your products and',
  highlight: 'your customers.',
  intro: 'We work with manufacturers, retailers, regulators and community organisations to keep counterfeit products off the market.',
  formTitle: 'Tell us about your organisation',
  formIntro: 'Our partnerships team will review your details and get in touch.',
  refPrefix: 'PRT',
  submitLabel: 'Send enquiry',
  success: {
    title: 'Enquiry received',
    body: 'Thank you for your interest in partnering with Veryfy. Our partnerships team will review your details and contact you.',
  },
  fields: [
    { kind: 'text', name: 'organisation', label: 'Organisation name', required: true, autoComplete: 'organization', placeholder: 'e.g. Lumea Cosmetics' },
    { kind: 'text', name: 'name', label: 'Your name', required: true, half: true, autoComplete: 'name' },
    { kind: 'text', name: 'role', label: 'Job title', half: true, autoComplete: 'organization-title', placeholder: 'e.g. Brand protection manager' },
    { kind: 'email', name: 'email', label: 'Work email', required: true, half: true, autoComplete: 'email', placeholder: 'name@company.com' },
    { kind: 'tel', name: 'phone', label: 'Phone number', half: true, autoComplete: 'tel' },
    {
      kind: 'checkboxes',
      name: 'type',
      label: 'Which best describes you?',
      hint: 'Tick everything that applies.',
      required: true,
      options: [
        'Manufacturer or brand owner',
        'Distributor or importer',
        'Retailer or pharmacy',
        'Regulator or government agency',
        'NGO or community organisation',
        'Technology or packaging partner',
      ],
    },
    {
      kind: 'select',
      name: 'size',
      label: 'Products or SKUs you’d like to protect',
      half: true,
      options: ['Fewer than 10', '10–50', '51–200', 'More than 200', 'Not sure yet'],
    },
    {
      kind: 'select',
      name: 'timeline',
      label: 'When would you like to start?',
      half: true,
      options: ['As soon as possible', 'In the next 3 months', 'In 3–6 months', 'Just exploring'],
    },
    { kind: 'textarea', name: 'message', label: 'How would you like to work with us?', required: true, placeholder: 'Tell us about your products, markets and goals' },
  ],
  aside: (
    <>
      <Steps
        title="What happens next"
        steps={[
          { title: 'We review your enquiry', body: 'Our partnerships team looks at your products and goals.' },
          { title: 'Intro call', body: 'We talk through HiddenMark labels, Uni-Codes and how verification works for your customers.' },
          { title: 'Pilot and rollout', body: 'Start with a few products, then scale across your range.' },
        ]}
      />
      <InfoCard icon={infoIcon} title="Reporting a counterfeit of your product?">
        Use the{' '}
        <Link to="/report" className="text-brand-primary hover:underline">
          report form
        </Link>{' '}
        so it reaches our review team straight away.
      </InfoCard>
    </>
  ),
  below: (
    <FeatureGrid
      title="Why partner with Veryfy"
      items={[
        { icon: verifiedIcon, title: 'Two-layer protection', body: 'HiddenMark labels and unique Uni-Codes make every pack checkable.' },
        { icon: qrIcon, title: 'Verify anywhere', body: 'Customers check by app, web, SMS or USSD — no smartphone needed.' },
        { icon: reportIcon, title: 'Early warnings', body: 'Shopper reports and unusual scan activity flag possible fakes sooner.' },
        { icon: storefrontIcon, title: 'Trusted retail', body: 'Help pharmacies and shops show they sell genuine products.' },
      ]}
    />
  ),
}

const mediaConfig: EnquiryConfig = {
  eyebrow: 'Media enquiries',
  title: 'Press and',
  highlight: 'media.',
  intro: 'Journalists and producers can reach our communications team here for interviews, comment and information about Veryfy.',
  formTitle: 'Send a media enquiry',
  formIntro: 'Include your deadline so we can prioritise your request.',
  refPrefix: 'MED',
  submitLabel: 'Send enquiry',
  success: {
    title: 'Enquiry sent',
    body: 'Thanks — our communications team has your request and will respond before your deadline wherever possible.',
  },
  fields: [
    { kind: 'text', name: 'name', label: 'Your name', required: true, half: true, autoComplete: 'name' },
    { kind: 'text', name: 'outlet', label: 'Media outlet', required: true, half: true, placeholder: 'e.g. Daily Times, BBC Pidgin' },
    { kind: 'email', name: 'email', label: 'Email address', required: true, half: true, autoComplete: 'email' },
    { kind: 'tel', name: 'phone', label: 'Phone number', half: true, autoComplete: 'tel' },
    {
      kind: 'select',
      name: 'type',
      label: 'Type of request',
      required: true,
      half: true,
      options: ['Interview request', 'Comment or statement', 'Data or statistics', 'Images or logos', 'Event or speaking', 'Other'],
    },
    { kind: 'date', name: 'deadline', label: 'Your deadline', half: true },
    { kind: 'textarea', name: 'message', label: 'Your request', required: true, placeholder: 'What’s your story about, and what do you need from us?' },
  ],
  aside: (
    <>
      <InfoCard icon={timerIcon} title="Response times">
        We aim to reply to media enquiries within one working day. Tell us if your deadline is sooner.
      </InfoCard>
      <div className="flex flex-col gap-3 rounded-lg bg-surface-brand-subtle p-5">
        <h2 className="text-[16px] font-medium">About Veryfy</h2>
        <p className="text-[14px] leading-[1.4] text-text-secondary">
          Veryfy helps people check medicines and packaged food before they buy, use or sell them, using HiddenMark
          labels and unique Uni-Codes that can be verified by app, web, SMS (38800) or USSD (*347*88#).
        </p>
      </div>
      <LinksCard
        title="Useful for your story"
        links={[
          { label: 'Latest product alerts', to: '/alerts' },
          { label: 'Recall notices', to: '/recalls' },
          { label: 'Guides and explainers', to: '/learn' },
        ]}
      />
      <InfoCard icon={infoIcon} title="Not a journalist?">
        For help with a product or report,{' '}
        <Link to="/contact" className="text-brand-primary hover:underline">
          contact support
        </Link>
        .
      </InfoCard>
    </>
  ),
}

export const ContactPage = () => <EnquiryPage key="contact" config={contactConfig} />
export const PartnerPage = () => <EnquiryPage key="partner" config={partnerConfig} />
export const MediaPage = () => <EnquiryPage key="media" config={mediaConfig} />
