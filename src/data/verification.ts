import productRegistration from '../assets/verify/product-registration.png'

export type VerificationOutcome = 'verified' | 'unable' | 'flagged'

export const sampleProduct = {
  name: 'Lumea',
  description: 'Brightening facial cleanser',
  tags: ['Skin care', '100ml'],
  serial: 'LM48291X7',
  batch: 'BG2024A',
  manufacturer: 'Lumea Cosmetics',
  verifiedDate: '20/10/26',
  verifiedTime: '14:32',
  image: productRegistration,
}

export const checkingSteps = [
  { title: 'Reading code', done: 'Completed' },
  { title: 'Checking manufacturer records', done: 'Completed' },
  { title: 'Verifying security features', done: 'Completed' },
  { title: 'Finalizing results', done: 'Completed' },
]

// Demo lookup until the verification API exists: known codes verify, the reported
// batch numbers (and "FLAG") are flagged as suspicious, anything else can't be verified.
const knownCodes = ['LM48291X7', 'BG2024A', 'LUMEA']
const flaggedCodes = ['PE-2409-331', 'PE-2409-337', 'FLAG']

export function verify(query: string): VerificationOutcome {
  const q = query.trim().toUpperCase()
  if (flaggedCodes.some((code) => q.includes(code))) return 'flagged'
  return knownCodes.some((code) => q.includes(code)) ? 'verified' : 'unable'
}
