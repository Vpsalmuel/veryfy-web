import { useEffect, useRef, useState, type DragEvent, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import Checkbox from '../../components/Checkbox'
import { DRAFT_KEY, formatBytes, issueOptions, useReport, type UploadedPhoto } from './reportStore'
import uploadIcon from '../../assets/icons/upload.svg'
import addIcon from '../../assets/icons/add-primary-16.svg'
import imageIcon from '../../assets/icons/image.svg'
import closeIcon from '../../assets/icons/close.svg'

const MAX_BYTES = 10 * 1024 * 1024
const ACCEPTED = ['image/jpeg', 'image/png', 'application/pdf']

const fieldBase =
  'w-full rounded-md border bg-white px-4 text-[16px] font-medium text-text-primary placeholder:text-text-secondary transition-[border-color,box-shadow] duration-200 hover:border-text-primary focus:border-2 focus:border-brand-primary focus:outline-none'

function Field({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string
  label: string
  hint?: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[16px] font-medium leading-[1.4] text-text-secondary">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-msg`} role="alert" className="animate-fade-in text-[12px] leading-[1.4] text-alert-error">
          {error}
        </p>
      ) : (
        hint && (
          <p id={`${id}-msg`} className="text-[12px] leading-[1.4] text-text-secondary">
            {hint}
          </p>
        )
      )}
    </div>
  )
}

/** Uploaded file row (Desktop/Uploaded File): thumbnail, name, size, remove. */
export function PhotoRow({ photo, onRemove }: { photo: UploadedPhoto; onRemove?: () => void }) {
  const isImage = photo.type.startsWith('image/')
  return (
    <div className="flex w-full animate-scale-in items-center gap-3 rounded-md border border-border-default bg-white p-4 sm:max-w-[480px]">
      <span className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-sm bg-surface-default">
        {isImage ? (
          <img src={photo.url} alt="" className="size-full object-cover" />
        ) : (
          <img src={imageIcon} alt="" className="size-6" />
        )}
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-1 leading-[1.4]">
        <p className="truncate text-[16px] font-medium">{photo.name}</p>
        <p className="text-[12px] text-text-secondary">{formatBytes(photo.size)} · Uploaded</p>
      </div>
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${photo.name}`}
          className="flex size-8 items-center justify-center rounded-full transition-all hover:bg-surface-default active:scale-90"
        >
          <img alt="" src={closeIcon} className="size-6" />
        </button>
      )}
    </div>
  )
}

export default function ReportFormStep() {
  const { draft, update } = useReport()
  const navigate = useNavigate()
  const fileInput = useRef<HTMLInputElement>(null)
  const [errors, setErrors] = useState<{ productName?: string; issues?: string; files?: string }>({})
  const [dragging, setDragging] = useState(false)
  const [showMore, setShowMore] = useState(Boolean(draft.batchNumber || draft.purchaseDate))
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (!saved) return
    const t = setTimeout(() => setSaved(false), 2200)
    return () => clearTimeout(t)
  }, [saved])

  // Jump to a section when arriving from a review "Edit" link (e.g. /report#issues)
  useEffect(() => {
    const id = window.location.hash.slice(1)
    if (id) document.getElementById(id)?.focus()
  }, [])

  const addFiles = (list: FileList | null) => {
    if (!list) return
    const accepted: UploadedPhoto[] = []
    const rejected: string[] = []
    Array.from(list).forEach((f) => {
      if (!ACCEPTED.includes(f.type) || f.size > MAX_BYTES) rejected.push(f.name)
      else accepted.push({ id: crypto.randomUUID(), name: f.name, size: f.size, type: f.type, url: URL.createObjectURL(f) })
    })
    update({ photos: [...draft.photos, ...accepted] })
    setErrors((e) => ({
      ...e,
      files: rejected.length ? `${rejected.join(', ')} couldn’t be added. Use JPG, PNG or PDF up to 10 MB.` : undefined,
    }))
  }

  const removePhoto = (id: string) => {
    const photo = draft.photos.find((p) => p.id === id)
    if (photo) URL.revokeObjectURL(photo.url)
    update({ photos: draft.photos.filter((p) => p.id !== id) })
  }

  const onDrop = (e: DragEvent) => {
    e.preventDefault()
    setDragging(false)
    addFiles(e.dataTransfer.files)
  }

  const toggleIssue = (issue: string, checked: boolean) => {
    update({ issues: checked ? [...draft.issues, issue] : draft.issues.filter((i) => i !== issue) })
    if (checked) setErrors((e) => ({ ...e, issues: undefined }))
  }

  const saveDraft = () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { photos, ...rest } = draft
      localStorage.setItem(DRAFT_KEY, JSON.stringify(rest))
      setSaved(true)
    } catch {
      /* storage unavailable */
    }
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const next = {
      productName: draft.productName.trim() ? undefined : 'Enter the product name as it appears on the pack.',
      issues: draft.issues.length ? undefined : 'Tick at least one thing that looks wrong.',
    }
    setErrors((prev) => ({ ...prev, ...next }))
    if (next.productName) return document.getElementById('productName')?.focus()
    if (next.issues) return document.getElementById('issues')?.focus()
    navigate('/report/review')
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="flex flex-col gap-6 rounded-lg border border-border-default bg-white p-4"
    >
      <div className="flex flex-col gap-2 leading-[1.4]">
        <p className="text-[18px] font-medium text-brand-primary">STEP 01</p>
        <h2 className="text-[28px] font-semibold lg:text-[32px]">Tell us what happened</h2>
        <p className="text-[16px] font-medium text-text-disabled">Only the product name and what’s wrong are required.</p>
      </div>

      <div className="flex flex-col gap-5">
        <Field
          id="productName"
          label="Product name"
          hint="As printed on the pack, e.g. VitaCore Paracetamol 500mg"
          error={errors.productName}
        >
          <input
            id="productName"
            value={draft.productName}
            onChange={(e) => {
              update({ productName: e.target.value })
              if (e.target.value.trim()) setErrors((er) => ({ ...er, productName: undefined }))
            }}
            placeholder="Enter the name on the pack"
            aria-invalid={Boolean(errors.productName)}
            aria-describedby="productName-msg"
            autoComplete="off"
            className={`h-[54px] ${fieldBase} ${errors.productName ? 'border-alert-error' : 'border-border-control'}`}
          />
        </Field>

        <fieldset
          id="issues"
          tabIndex={-1}
          aria-describedby="issues-msg"
          className={`flex flex-col gap-2 rounded-md focus:outline-none ${errors.issues ? 'animate-shake' : ''}`}
          onAnimationEnd={(e) => e.currentTarget.classList.remove('animate-shake')}
        >
          <legend className="mb-2 text-[16px] font-medium leading-[1.4] text-text-secondary">What’s wrong?</legend>
          <p id="issues-msg" className={`text-[12px] leading-[1.4] ${errors.issues ? 'text-alert-error' : 'text-text-secondary'}`}>
            {errors.issues ?? 'Tick everything that applies.'}
          </p>
          <div className="grid gap-3 pt-1 sm:grid-flow-col sm:grid-rows-4 sm:gap-x-6">
            {issueOptions.map((issue, i) => (
              <Checkbox
                key={issue}
                id={`issue-${i}`}
                checked={draft.issues.includes(issue)}
                onChange={(c) => toggleIssue(issue, c)}
                invalid={Boolean(errors.issues)}
              >
                {issue}
              </Checkbox>
            ))}
          </div>
        </fieldset>

        <Field id="details" label="Tell us more (optional)">
          <textarea
            id="details"
            value={draft.details}
            onChange={(e) => update({ details: e.target.value })}
            placeholder="Anything else you noticed"
            rows={4}
            maxLength={1000}
            className={`h-[120px] resize-y py-4 ${fieldBase} border-border-control`}
          />
        </Field>

        <Field id="whereBought" label="Where did you buy it? (optional)">
          <input
            id="whereBought"
            value={draft.whereBought}
            onChange={(e) => update({ whereBought: e.target.value })}
            placeholder="Shop name and area, e.g. Davio’s Pharmacy, Yaba"
            className={`h-[54px] ${fieldBase} border-border-control`}
          />
        </Field>

        <div id="photos" tabIndex={-1} className="flex flex-col gap-2 focus:outline-none">
          <p className="text-[16px] font-medium leading-[1.4] text-text-secondary">Photo of the pack (optional)</p>
          <div
            onDragOver={(e) => {
              e.preventDefault()
              setDragging(true)
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            onClick={() => fileInput.current?.click()}
            className={`group flex cursor-pointer flex-col items-center gap-3 rounded-md border border-dashed p-8 text-center transition-all duration-200 ${
              dragging
                ? 'scale-[1.01] border-brand-primary bg-brand-primary/5'
                : 'border-border-control bg-surface-default hover:border-brand-primary hover:bg-brand-primary/[0.03]'
            }`}
          >
            <span
              className={`flex size-12 items-center justify-center rounded-full bg-white transition-transform duration-300 ${
                dragging ? '-translate-y-1 scale-110' : 'group-hover:-translate-y-1'
              }`}
            >
              <img alt="" src={uploadIcon} className="size-6" />
            </span>
            <p className="text-[16px] font-medium leading-[1.4]">
              {dragging ? (
                'Drop to add'
              ) : (
                <>
                  Drag files here or{' '}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      fileInput.current?.click()
                    }}
                    className="text-brand-primary hover:underline"
                  >
                    browse
                  </button>
                </>
              )}
            </p>
            <p className="text-[12px] leading-[1.4] text-text-secondary">JPG, PNG or PDF · up to 10 MB each</p>
            <input
              ref={fileInput}
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              multiple
              hidden
              onChange={(e) => {
                addFiles(e.target.files)
                e.target.value = ''
              }}
            />
          </div>
          {errors.files && (
            <p role="alert" className="animate-fade-in text-[12px] text-alert-error">
              {errors.files}
            </p>
          )}
          {draft.photos.length > 0 && (
            <div className="flex flex-col gap-2 pt-1">
              {draft.photos.map((p) => (
                <PhotoRow key={p.id} photo={p} onRemove={() => removePhoto(p.id)} />
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <button
            type="button"
            aria-expanded={showMore}
            onClick={() => setShowMore((s) => !s)}
            className="group flex w-fit items-center gap-1 text-[14px] text-brand-primary hover:underline"
          >
            Add batch number and purchase date (optional)
            <img
              alt=""
              src={addIcon}
              className={`size-4 transition-transform duration-300 ${showMore ? 'rotate-45' : 'group-hover:rotate-90'}`}
            />
          </button>
          <div
            className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
              showMore ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
            }`}
          >
            <div className="overflow-hidden">
              <div id="batch" className="grid gap-5 p-[2px] sm:grid-cols-2">
                <Field id="batchNumber" label="Batch number">
                  <input
                    id="batchNumber"
                    value={draft.batchNumber}
                    onChange={(e) => update({ batchNumber: e.target.value.toUpperCase() })}
                    placeholder="e.g. PE-2409-331"
                    tabIndex={showMore ? 0 : -1}
                    className={`h-[54px] ${fieldBase} border-border-control`}
                  />
                </Field>
                <Field id="purchaseDate" label="Purchase date">
                  <input
                    id="purchaseDate"
                    type="date"
                    value={draft.purchaseDate}
                    max={new Date().toISOString().slice(0, 10)}
                    onChange={(e) => update({ purchaseDate: e.target.value })}
                    tabIndex={showMore ? 0 : -1}
                    className={`h-[54px] ${fieldBase} border-border-control`}
                  />
                </Field>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
        <span
          role="status"
          className={`text-[14px] text-alert-success transition-all duration-300 sm:mr-auto ${
            saved ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'
          }`}
        >
          {saved ? 'Draft saved on this device' : ''}
        </span>
        <Button type="submit" arrow className="w-full text-[16px] font-medium! sm:order-none sm:w-auto">
          Next
        </Button>
        <Button
          variant="secondary"
          onClick={saveDraft}
          className="w-full text-[16px] font-medium! sm:w-auto"
        >
          Save draft
        </Button>
      </div>
    </form>
  )
}
