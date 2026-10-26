import { createContext, useContext } from 'react'

export const issueOptions = [
  'Packaging or print looks different',
  'Spelling mistakes on the label',
  'Batch number missing or looks wrong',
  'Seal broken or missing',
  'Price was much lower than usual',
  'Code didn’t verify on Veryfy',
  'It made me or someone unwell',
  'Something else',
]

export type UploadedPhoto = { id: string; name: string; size: number; url: string; type: string }

export type ReportDraft = {
  productName: string
  issues: string[]
  details: string
  whereBought: string
  batchNumber: string
  purchaseDate: string
  photos: UploadedPhoto[]
  contact: string
  consent: boolean
}

export const emptyDraft: ReportDraft = {
  productName: '',
  issues: [],
  details: '',
  whereBought: '',
  batchNumber: '',
  purchaseDate: '',
  photos: [],
  contact: '',
  consent: false,
}

type ReportContextValue = {
  draft: ReportDraft
  update: (patch: Partial<ReportDraft>) => void
  reset: () => void
  /** Reference issued on submit; used by the confirmation step */
  reference: string | null
  setReference: (ref: string) => void
}

export const ReportContext = createContext<ReportContextValue | null>(null)

export function useReport() {
  const ctx = useContext(ReportContext)
  if (!ctx) throw new Error('useReport must be used inside the report flow')
  return ctx
}

export const DRAFT_KEY = 'veryfy:report-draft'

export function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function formatDate(iso: string) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}
