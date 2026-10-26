import panadolExtra from '../assets/alerts/panadol-extra.png'

/** issued = official counterfeit alert; under-review / review-complete = shopper report status. */
export type NoticeVariant = 'issued' | 'under-review' | 'review-complete'

export type Step = { title: string; body: string }

export type Notice = {
  variant: NoticeVariant
  reference: string
  breadcrumb: { label: string; to: string }[]
  eyebrow: string
  subtitle: string
  title: string
  intro: string
  primaryAction: { label: string; to: string }
  officialNoticeUrl?: string
  image: string
  meta: { label: string; value: string; link?: string; copy?: boolean }[]
  progressTitle: string
  progress: { title: string; caption: string; state: 'done' | 'current' | 'upcoming' }[]
  detailsTitle: string
  details: { label: string; value: string }[]
  detailsNote: string
  pack?: { title: string; description: string; notes: Step[] }
  guidanceTitle: string
  guidance: Step[]
}

const reportedDetails = (concern: string, source: string) => [
  { label: 'Concern', value: concern },
  { label: 'Batch numbers reported', value: 'PE-2409-331, PE-2409-337' },
  { label: 'Where it was seen', value: 'Lagos, Kano and Onitsha: open markets and roadside sellers' },
  { label: 'First reported', value: '12 Oct 2026' },
  { label: 'Reports received', value: '37 reports from shoppers and retailers' },
  { label: 'Source', value: source },
]

const checkWithVeryfy: Step = {
  title: 'Check it with Veryfy',
  body: 'Tilt the HiddenMark label, then scan the Uni-Code or text it to 38800.',
}
const feelUnwell: Step = {
  title: 'Feel unwell? Get medical advice',
  body: 'If you have taken it and feel unwell, see a doctor or pharmacist and take the pack with you.',
}

// Placeholder data matching the designs, until the alerts/reports API is ready.
export const issuedAlert: Notice = {
  variant: 'issued',
  reference: 'VA-2026-0142',
  breadcrumb: [
    { label: 'Home', to: '/' },
    { label: 'Alerts', to: '/alerts' },
  ],
  eyebrow: 'Official alert',
  subtitle: 'Panadol · Pharmaceuticals',
  title: 'Panadol Extra 500mg',
  intro:
    'Shoppers and retailers have reported packs with misspelled labels and batch numbers that could not be matched to registered records.',
  primaryAction: { label: 'Report a similar product', to: '/report' },
  officialNoticeUrl: '#', // TODO: link to the authority's notice
  image: panadolExtra,
  meta: [
    { label: 'Published', value: '20 Oct 2026' },
    { label: 'Last updated', value: '20 Oct 2026' },
    { label: 'Source', value: 'National Regulatory Authority', link: '#' },
    { label: 'Notice type', value: 'Counterfeit alert' },
    { label: 'Reference', value: 'VA-2026-0142', copy: true },
  ],
  progressTitle: 'Alert progress',
  progress: [
    { title: 'Reported', caption: '12 Oct 2026', state: 'done' },
    { title: 'Under review', caption: '14 Oct 2026', state: 'done' },
    { title: 'Counterfeit alert issued', caption: '20 Oct 2026', state: 'current' },
  ],
  detailsTitle: "What's been reported",
  details: reportedDetails(
    'Misspelled text on the pack and batch numbers that could not be matched to registered records.',
    'National Regulatory Authority',
  ),
  detailsNote:
    'This alert is based on reports and checks so far. It does not mean every pack of Panadol Extra 500mg is fake, and no alert does not mean a product is safe. Veryfy does not certify authenticity or replace official regulatory decisions.',
  pack: {
    title: 'Where to look on the pack',
    description: 'Discrepancies documented in the official notice.',
    notes: [
      { title: 'Logo and colours', body: 'Reported packs have a duller red and a blurred edge around the Panadol logo.' },
      { title: 'Small print', body: 'Look for spelling mistakes in the text under “Extra”.' },
      {
        title: 'Batch number and expiry (end flap)',
        body: 'Reported packs carry batch numbers PE-2409-331 or PE-2409-337. Check the code with Veryfy before you buy.',
      },
    ],
  },
  guidanceTitle: 'If you have this product',
  guidance: [
    {
      title: 'Follow the official notice',
      body: 'The National Regulatory Authority’s notice says not to use or sell packs with the batch numbers above. Keep the pack and receipt.',
    },
    checkWithVeryfy,
    { title: 'Report it', body: 'Tell Veryfy where you bought it. Photos of the pack help the review.' },
    feelUnwell,
  ],
}

const reportBase = {
  breadcrumb: [
    { label: 'Home', to: '/' },
    { label: 'Reports', to: '/report' },
  ],
  subtitle: 'Panadol Extra 500mg · Pharmaceuticals',
  image: panadolExtra,
}

export const reports: Record<string, Notice> = {
  'VR-2026-0418': {
    ...reportBase,
    variant: 'under-review',
    reference: 'VR-2026-0418',
    eyebrow: 'Report under review',
    title: 'Reported packaging and batch-number concerns',
    intro:
      'Shoppers and retailers have reported discrepancies in the product packaging and batch numbers. The report is being reviewed and has not yet resulted in an official counterfeit alert.',
    primaryAction: { label: 'Report a similar product', to: '/report' },
    meta: [
      { label: 'First reported', value: '12 Oct 2026' },
      { label: 'Last updated', value: '14 Oct 2026' },
      { label: 'Source', value: 'Reports from shoppers and retailers', link: '#' },
      { label: 'Status', value: 'Report under review' },
      { label: 'Reference', value: 'VR-2026-0418', copy: true },
    ],
    progressTitle: 'Report progress',
    progress: [
      { title: 'Reported', caption: 'Report received', state: 'done' },
      { title: 'Under review', caption: 'Checks are ongoing', state: 'current' },
      { title: 'Outcome pending', caption: 'No final decision yet', state: 'upcoming' },
    ],
    detailsTitle: "What's been reported",
    details: reportedDetails(
      'Reported: misspelled text on the pack and batch numbers that reporters did not recognise.',
      'Reports from shoppers and retailers',
    ),
    detailsNote: 'This report has not been confirmed. It is not an official counterfeit alert.',
    pack: {
      title: 'What people reported on the pack',
      description: 'These are observations from reports. They have not been confirmed.',
      notes: [
        { title: 'Logo and colours', body: 'Reporters say the red looks duller and the edge of the Panadol logo is blurred.' },
        { title: 'Small print', body: 'Reporters say there are spelling mistakes in the text under “Extra”.' },
        {
          title: 'Batch number and expiry (end flap)',
          body: 'Reporters say these packs carry batch numbers PE-2409-331 or PE-2409-337. Check the code with Veryfy before you buy.',
        },
      ],
    },
    guidanceTitle: 'If you have this product',
    guidance: [
      checkWithVeryfy,
      { title: 'Keep the pack and receipt', body: 'Hold on to them until the review is finished.' },
      { title: 'Report what you see', body: 'Tell Veryfy where you bought it. Photos of the pack help the review.' },
      feelUnwell,
    ],
  },
  // The design reuses VR-2026-0418 for this state; a separate sample reference keeps both reachable.
  'VR-2026-0392': {
    ...reportBase,
    variant: 'review-complete',
    reference: 'VR-2026-0392',
    eyebrow: 'Review complete',
    title: 'Review completed — no alert issued',
    intro: 'The review is complete, but no official counterfeit alert was issued based on the findings.',
    primaryAction: { label: 'Report something new', to: '/report' },
    meta: [
      { label: 'Review completed', value: '22 Oct 2026' },
      { label: 'Last updated', value: '22 Oct 2026' },
      { label: 'Reviewed by', value: 'National Regulatory Authority', link: '#' },
      { label: 'Decision', value: 'No counterfeit alert issued' },
      { label: 'Reference', value: 'VR-2026-0392', copy: true },
    ],
    progressTitle: 'Report progress',
    progress: [
      { title: 'Reported', caption: '12 Oct 2026', state: 'done' },
      { title: 'Under review', caption: '14 Oct 2026', state: 'done' },
      { title: 'Review completed', caption: 'No alert issued', state: 'current' },
    ],
    detailsTitle: 'What was reported',
    details: reportedDetails(
      'Reported: misspelled text on the pack and batch numbers that reporters did not recognise.',
      'Reports from shoppers and retailers',
    ),
    detailsNote: 'No alert was issued. This does not mean every individual pack is guaranteed authentic or safe.',
    guidanceTitle: 'What this means',
    guidance: [
      { title: 'Not a guarantee', body: 'No alert was issued, but this does not mean every pack is authentic or safe.' },
      { title: 'Keep checking packs', body: 'Tilt the HiddenMark label, then scan the Uni-Code or text it to 38800.' },
      { title: 'Report anything new', body: 'If you notice a new problem with a pack, report it to Veryfy.' },
    ],
  },
}

export const relatedAlert = {
  published: 'Published 3 Sep 2026',
  product: 'Panadol Extra 500mg',
  subtitle: 'Panadol · Pharmaceuticals',
  batches: 'PE-2407-112',
  summary: 'Packs with a broken seal and faded print reported in Abuja. Separate from this alert.',
  issuer: 'National Regulatory Authority',
  to: '/alerts/alert-1',
}
