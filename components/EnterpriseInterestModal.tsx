'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { trackEvent as trackAnalytics } from '@/lib/analytics'
import { trackEvent } from '@/lib/plausible'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.multicorn.ai'

const FORM_STATES = {
  idle: 'idle',
  submitting: 'submitting',
  success: 'success',
  error: 'error',
} as const

type FormState = (typeof FORM_STATES)[keyof typeof FORM_STATES]

const TEAM_SIZES = ['1-10', '11-50', '51-200', '200+'] as const

interface EnterpriseInterestModalProps {
  readonly open: boolean
  readonly onClose: () => void
  readonly source?: string
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function EnterpriseInterestModal({
  open,
  onClose,
  source = 'shield-pricing',
}: EnterpriseInterestModalProps) {
  const titleId = useId()
  const descId = useId()
  const emailId = useId()
  const emailErrorId = useId()
  const nameId = useId()
  const companyId = useId()
  const teamSizeId = useId()
  const messageId = useId()
  const submitErrorId = useId()
  const websiteId = useId()

  const [formState, setFormState] = useState<FormState>(FORM_STATES.idle)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [teamSize, setTeamSize] = useState('')
  const [message, setMessage] = useState('')
  const [website, setWebsite] = useState('')
  const [validationError, setValidationError] = useState('')
  const [submitError, setSubmitError] = useState('')

  const emailRef = useRef<HTMLInputElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const previouslyFocused = document.activeElement as HTMLElement | null
    emailRef.current?.focus()

    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
      }
    }

    document.addEventListener('keydown', handleKey)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = previousOverflow
      previouslyFocused?.focus?.()
    }
  }, [open, onClose])

  useEffect(() => {
    if (!open) {
      setFormState(FORM_STATES.idle)
      setEmail('')
      setName('')
      setCompany('')
      setTeamSize('')
      setMessage('')
      setWebsite('')
      setValidationError('')
      setSubmitError('')
    }
  }, [open])

  if (!open) return null

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!email.trim()) {
      setValidationError('Please enter your work email.')
      emailRef.current?.focus()
      return
    }
    if (!isValidEmail(email)) {
      setValidationError('Please enter a valid email address.')
      emailRef.current?.focus()
      return
    }

    setFormState(FORM_STATES.submitting)
    setValidationError('')
    setSubmitError('')

    try {
      const response = await fetch(`${API_URL}/api/v1/enterprise-interest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          name: name.trim() || undefined,
          company: company.trim() || undefined,
          team_size: teamSize || undefined,
          message: message.trim() || undefined,
          source,
          website: website.trim() || undefined,
        }),
      })

      if (response.status === 429) {
        setFormState(FORM_STATES.error)
        setSubmitError('Too many requests. Please try again in a moment.')
        return
      }

      if (!response.ok) {
        setFormState(FORM_STATES.error)
        setSubmitError('Something went wrong. Please try again.')
        return
      }

      setFormState(FORM_STATES.success)
      trackEvent('enterprise_interest_submit', { source })
      trackAnalytics('enterprise_interest_submit', { source })
    } catch {
      setFormState(FORM_STATES.error)
      setSubmitError('Something went wrong. Please try again.')
    }
  }

  const isSubmitting = formState === FORM_STATES.submitting
  const isSuccess = formState === FORM_STATES.success

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descId}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-black/60"
        tabIndex={-1}
      />

      <div className="relative z-10 w-full max-w-lg rounded-card border border-border bg-surface p-6 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id={titleId} className="text-xl font-semibold text-text-primary">
              Talk to us about Enterprise
            </h2>
            <p id={descId} className="mt-1 text-sm text-text-secondary">
              Tell us a bit about your team and we&apos;ll be in touch within 1-2 business days.
            </p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-mr-2 -mt-2 rounded-lg p-2 text-text-tertiary hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
            </svg>
          </button>
        </div>

        {isSuccess ? (
          <div role="status" className="mt-6 rounded-lg border border-green/20 bg-green/5 p-4">
            <p className="font-medium text-text-primary">Thanks - we&apos;ll be in touch.</p>
            <p className="mt-1 text-sm text-text-secondary">
              Someone from our team will reach out within 1-2 business days.
            </p>
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="min-h-[44px] rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
            <div
              className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
              aria-hidden="true"
            >
              <label htmlFor={websiteId}>Website (leave blank)</label>
              <input
                id={websiteId}
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(event) => setWebsite(event.target.value)}
              />
            </div>

            <div>
              <label htmlFor={emailId} className="mb-1 block text-sm font-medium text-text-primary">
                Work email <span className="text-red">*</span>
              </label>
              <input
                ref={emailRef}
                id={emailId}
                type="email"
                autoComplete="email"
                required
                maxLength={320}
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value)
                  if (validationError) setValidationError('')
                }}
                aria-invalid={validationError ? 'true' : undefined}
                aria-describedby={validationError ? emailErrorId : undefined}
                className={`min-h-[44px] w-full rounded-lg border bg-surface px-4 py-3 text-text-primary focus:outline-none focus:ring-2 ${
                  validationError
                    ? 'border-red focus:border-red focus:ring-red/20'
                    : 'border-border focus:border-primary focus:ring-primary/20'
                }`}
              />
              {validationError && (
                <p id={emailErrorId} role="alert" className="mt-1.5 text-sm text-red">
                  {validationError}
                </p>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor={nameId}
                  className="mb-1 block text-sm font-medium text-text-primary"
                >
                  Your name
                </label>
                <input
                  id={nameId}
                  type="text"
                  autoComplete="name"
                  maxLength={200}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="min-h-[44px] w-full rounded-lg border border-border bg-surface px-4 py-3 text-text-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label
                  htmlFor={companyId}
                  className="mb-1 block text-sm font-medium text-text-primary"
                >
                  Company
                </label>
                <input
                  id={companyId}
                  type="text"
                  autoComplete="organization"
                  maxLength={200}
                  value={company}
                  onChange={(event) => setCompany(event.target.value)}
                  className="min-h-[44px] w-full rounded-lg border border-border bg-surface px-4 py-3 text-text-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor={teamSizeId}
                className="mb-1 block text-sm font-medium text-text-primary"
              >
                Team size
              </label>
              <select
                id={teamSizeId}
                value={teamSize}
                onChange={(event) => setTeamSize(event.target.value)}
                className="min-h-[44px] w-full rounded-lg border border-border bg-surface px-4 py-3 text-text-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="">Prefer not to say</option>
                {TEAM_SIZES.map((bucket) => (
                  <option key={bucket} value={bucket}>
                    {bucket}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="mb-1 flex items-baseline justify-between gap-2">
                <label htmlFor={messageId} className="block text-sm font-medium text-text-primary">
                  What are you trying to solve?
                </label>
                <span
                  className={`text-xs ${
                    message.length >= 2000
                      ? 'text-red'
                      : message.length >= 1800
                        ? 'text-amber'
                        : 'text-text-tertiary'
                  }`}
                  aria-live="polite"
                >
                  {message.length} / 2000
                </span>
              </div>
              <textarea
                id={messageId}
                rows={3}
                maxLength={2000}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-text-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {submitError && (
              <p id={submitErrorId} role="alert" className="text-sm text-red">
                {submitError}
              </p>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="min-h-[44px] rounded-lg border border-border px-4 py-3 text-sm font-semibold text-text-primary hover:bg-surface-secondary focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                aria-describedby={submitError ? submitErrorId : undefined}
                className="min-h-[44px] rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? 'Sending...' : 'Register interest'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
