'use client'

import { useState, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { trackEvent } from '@/lib/plausible'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.multicorn.ai'

const FORM_STATES = {
  idle: 'idle',
  submitting: 'submitting',
  success: 'success',
  error: 'error',
} as const

type FormState = (typeof FORM_STATES)[keyof typeof FORM_STATES]

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function deriveSource(pathname: string): string {
  if (pathname === '/' || pathname === '') return 'learn-landing'
  if (pathname.startsWith('/blog') || pathname.startsWith('/learn')) return 'learn-blog'
  if (pathname.startsWith('/docs') || pathname.startsWith('/shield')) return 'shield-docs'
  if (pathname.startsWith('/pricing')) return 'shield-pricing'
  return 'learn-other'
}

interface EmailSignupFormProps {
  readonly source?: string
}

export function EmailSignupForm({ source: sourceProp }: EmailSignupFormProps = {}) {
  const pathname = usePathname()
  const source = sourceProp ?? deriveSource(pathname ?? '')

  const [formState, setFormState] = useState<FormState>(FORM_STATES.idle)
  const [email, setEmail] = useState('')
  const [validationError, setValidationError] = useState('')
  const [submitError, setSubmitError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  function handleBlur() {
    if (email && !isValidEmail(email)) {
      setValidationError('Please enter a valid email address.')
    } else {
      setValidationError('')
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!email.trim()) {
      setValidationError('Please enter your email address.')
      inputRef.current?.focus()
      return
    }

    if (!isValidEmail(email)) {
      setValidationError('Please enter a valid email address.')
      inputRef.current?.focus()
      return
    }

    setFormState(FORM_STATES.submitting)
    setValidationError('')
    setSubmitError('')

    try {
      const response = await fetch(`${API_URL}/api/v1/newsletter/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source }),
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
      trackEvent('email_signup')
    } catch {
      setFormState(FORM_STATES.error)
      setSubmitError('Something went wrong. Please try again.')
    }
  }

  if (formState === FORM_STATES.success) {
    return (
      <div
        role="status"
        className="rounded-lg border border-green/20 bg-green/5 px-6 py-4 text-center"
      >
        <p className="font-medium text-text-primary">
          Check your inbox to confirm your subscription.
        </p>
      </div>
    )
  }

  const isSubmitting = formState === FORM_STATES.submitting

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full max-w-md">
      <label htmlFor="launch-email" className="mb-2 block text-sm font-medium text-text-primary">
        Email address
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          ref={inputRef}
          id="launch-email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          onBlur={handleBlur}
          aria-invalid={validationError ? 'true' : undefined}
          aria-describedby={
            [validationError ? 'email-error' : '', submitError ? 'submit-error' : '']
              .filter(Boolean)
              .join(' ') || undefined
          }
          className="min-h-[44px] flex-1 rounded-lg border border-border bg-surface px-4 py-3 text-text-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          aria-label="Sign up for email updates"
          className="min-h-[44px] rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? 'Subscribing…' : 'Subscribe'}
        </button>
      </div>
      <p aria-live="polite" className="sr-only">
        {isSubmitting ? 'Subscribing…' : ''}
      </p>
      {validationError && (
        <p id="email-error" role="alert" className="mt-2 text-sm text-red">
          {validationError}
        </p>
      )}
      {submitError && (
        <p id="submit-error" role="alert" className="mt-2 text-sm text-red">
          {submitError}
        </p>
      )}
      <p className="mt-3 text-xs text-text-tertiary">
        We&apos;ll send you updates about Multicorn. No spam, ever. Unsubscribe any time.{' '}
        <a href="/policies/privacy" className="underline hover:text-text-secondary">
          Privacy policy
        </a>
      </p>
    </form>
  )
}
