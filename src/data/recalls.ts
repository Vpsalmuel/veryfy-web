import churroBites from '../assets/recalls/churro-bites.svg'
import shoreLunch from '../assets/recalls/shore-lunch.svg'
import pearlMilling from '../assets/recalls/pearl-milling.svg'

export type IssueType = 'quality-safety' | 'authenticity'

export type Recall = {
  id: string
  product: string
  company: string
  size: string
  issue: IssueType
  category: string
  reason: string
  affectedBatch: string[]
  published: string
  /** ISO date for sorting / filtering */
  publishedIso: string
  source: string
  sourceKind: 'fda'
  noticeUrl: string
  image: string
  imageSize: { width: number; height: number }
}

export const issueLabels: Record<IssueType, string> = {
  'quality-safety': 'Quality & safety',
  authenticity: 'Authenticity / counterfeit',
}

// Historical FDA examples from the design, until a live recalls feed is connected.
export const recalls: Recall[] = [
  {
    id: 'casa-mamita-churro-bites',
    product: 'Casa Mamita Churro Bites Filled with Chocolate Hazelnut Cream',
    company: 'Camerican International',
    size: '7.05 oz',
    issue: 'quality-safety',
    category: 'Packaged food',
    reason: 'Undeclared milk. Return the affected product to the place of purchase for a refund.',
    affectedBatch: ['Lot 01425 · Best by JUL/14/2025'],
    published: '3 June 2025',
    publishedIso: '2025-06-03',
    source: 'U.S. Food & Drug Administration',
    sourceKind: 'fda',
    noticeUrl:
      'https://www.fda.gov/safety/recalls-market-withdrawals-safety-alerts/camerican-international-inc-issues-allergy-alert-undeclared-milk-aldi-brand-casa-mamita-churro-bites',
    image: churroBites,
    imageSize: { width: 104, height: 73 },
  },
  {
    id: 'shore-lunch-breader',
    product: 'Shore Lunch Oven Style Breader & Batter Mix',
    company: 'Homegrown Family Foods',
    size: '6 oz',
    issue: 'quality-safety',
    category: 'Packaged food',
    reason: 'Undeclared milk. If you have a milk allergy or sensitivity, return the affected product for a refund.',
    affectedBatch: ['9 affected lots — see official notice', 'Best by Apr 23, 2025–Feb 25, 2026'],
    published: '29 May 2025',
    publishedIso: '2025-05-29',
    source: 'U.S. Food & Drug Administration',
    sourceKind: 'fda',
    noticeUrl:
      'https://www.fda.gov/safety/recalls-market-withdrawals-safety-alerts/homegrown-family-foods-issues-allergy-alert-undeclared-milk-shore-lunch-oven-style-breader-batter',
    image: shoreLunch,
    imageSize: { width: 80, height: 109 },
  },
  {
    id: 'pearl-milling-pancake-mix',
    product: 'Pearl Milling Company Original Pancake & Waffle Mix',
    company: 'Quaker Oats',
    size: '32 oz',
    issue: 'quality-safety',
    category: 'Packaged food',
    reason: 'Undeclared milk. Limited recall in 11 U.S. states; not all products are affected. Check the official notice.',
    affectedBatch: ['BBD SEP 13 25 P · UPC 30000 65040'],
    published: '15 January 2025',
    publishedIso: '2025-01-15',
    source: 'U.S. Food & Drug Administration',
    sourceKind: 'fda',
    noticeUrl:
      'https://www.fda.gov/safety/recalls-market-withdrawals-safety-alerts/quaker-issues-limited-recall-undeclared-milk-pearl-milling-company-original-pancake-waffle-mix',
    image: pearlMilling,
    imageSize: { width: 82, height: 112 },
  },
]
