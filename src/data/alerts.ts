import type { Status } from '../components/StatusBadge'
import panadolExtra from '../assets/alerts/panadol-extra.png'
import paracetamol from '../assets/alerts/paracetamol.png'

export type Alert = {
  id: string
  status: Status
  product: string
  brand: string
  category: string
  summary: string
  date: string
  issuer: string
  image: string
}

export const featuredAlert = {
  id: 'paracetamol-500mg',
  status: 'counterfeit' as Status,
  product: 'Paracetamol 500mg',
  brand: 'Paracetamol',
  category: 'Pharmaceuticals',
  summary: 'Reported concerns involving product labelling and batch numbers',
  date: '06 Dec 2026',
  issuer: 'National Regulatory Authority',
  image: paracetamol,
  // TODO: link to the real announcement
  announcementUrl: '#',
}

// Placeholder data matching the design, until the alerts API is ready.
const statuses: Status[] = ['counterfeit', 'under-review', 'reviewed', 'reviewed', 'counterfeit', 'counterfeit', 'counterfeit', 'counterfeit', 'counterfeit', 'counterfeit']

export const alerts: Alert[] = Array.from({ length: 240 }, (_, i) => ({
  id: `alert-${i + 1}`,
  status: statuses[i % statuses.length],
  product: 'Panadol Extra 500mg',
  brand: 'Panadol',
  category: 'Pharmaceuticals',
  summary: 'Reported concerns involving product labelling and batch numbers',
  date: '20 Oct 2026',
  issuer: 'National Regulatory Authority',
  image: panadolExtra,
}))
