'use client'

import { useCallback, useState } from 'react'
import { submitFeedback } from '@/lib/feedback'
import type { LearnCourseAccent } from '@/lib/learn-course-accents'

const submitAccent: Record<LearnCourseAccent, string> = {
  'course-1': 'bg-course-1-accent hover:bg-course-1-accent/90 focus:ring-course-1-accent/20',
  'course-2': 'bg-course-2-accent hover:bg-course-2-accent/90 focus:ring-course-2-accent/20',
  'course-3': 'bg-course-3-accent hover:bg-course-3-accent/90 focus:ring-course-3-accent/20',
}

const starAccent: Record<LearnCourseAccent, { filled: string; ring: string }> = {
  'course-1': { filled: 'text-course-1-accent', ring: 'focus:ring-course-1-accent/20' },
  'course-2': { filled: 'text-course-2-accent', ring: 'focus:ring-course-2-accent/20' },
  'course-3': { filled: 'text-course-3-accent', ring: 'focus:ring-course-3-accent/20' },
}

const inputAccent: Record<LearnCourseAccent, string> = {
  'course-1': 'focus:ring-course-1-accent/20',
  'course-2': 'focus:ring-course-2-accent/20',
  'course-3': 'focus:ring-course-3-accent/20',
}

interface CourseFeedbackFormProps {
  readonly courseName: string
  readonly courseSlug: string
  readonly lessonSlug: string
  readonly courseAccent: LearnCourseAccent
}

export function CourseFeedbackForm({
  courseName,
  courseSlug,
  lessonSlug,
  courseAccent,
}: CourseFeedbackFormProps) {
  const [rating, setRating] = useState<number>(0)
  const [hoverRating, setHoverRating] = useState<number>(0)
  const [textPositive, setTextPositive] = useState('')
  const [textNegative, setTextNegative] = useState('')
  const [recommend, setRecommend] = useState<boolean | null>(null)
  const [email, setEmail] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      if (rating < 1 || rating > 5) {
        setError('Please select a rating.')
        return
      }
      setSubmitting(true)
      setError(null)
      const ok = await submitFeedback({
        courseSlug,
        lessonSlug,
        feedbackType: 'star_rating',
        ratingValue: rating as 1 | 2 | 3 | 4 | 5,
        textPositive: textPositive.trim() || undefined,
        textNegative: textNegative.trim() || undefined,
        wouldRecommend: recommend ?? undefined,
        email: email.trim() || undefined,
        website: honeypot || undefined,
      })
      setSubmitting(false)
      if (ok) {
        setSubmitted(true)
      } else {
        setError('Something went wrong. Please try again.')
      }
    },
    [courseSlug, lessonSlug, rating, textPositive, textNegative, recommend, email, honeypot],
  )

  if (submitted) {
    return (
      <div className="mt-16 rounded-card border border-border bg-surface-secondary p-8">
        <p className="text-lg font-semibold text-text-primary">Thanks for your feedback</p>
        <p className="mt-2 text-sm text-text-secondary">It helps us improve the course.</p>
      </div>
    )
  }

  const stars = starAccent[courseAccent]
  const inputRing = inputAccent[courseAccent]
  const activeRating = hoverRating || rating

  return (
    <div className="mt-16 rounded-card border border-border bg-surface-secondary p-8">
      <h2 className="mb-1 text-lg font-semibold text-text-primary">
        You finished {courseName}. How was it?
      </h2>
      <p className="mb-6 text-sm text-text-secondary">
        Your feedback is anonymous unless you provide an email.
      </p>

      <form onSubmit={handleSubmit} noValidate>
        <fieldset>
          <legend className="mb-2 text-sm font-medium text-text-primary">
            Course rating <span className="text-text-tertiary">(required)</span>
          </legend>
          <div
            role="radiogroup"
            aria-label="Course rating from 1 to 5 stars"
            className="flex gap-1"
            onMouseLeave={() => setHoverRating(0)}
          >
            {[1, 2, 3, 4, 5].map((value) => (
              <label key={value} className="cursor-pointer">
                <input
                  type="radio"
                  name="rating"
                  value={value}
                  checked={rating === value}
                  onChange={() => setRating(value)}
                  className="sr-only"
                  aria-label={value === 1 ? '1 star' : `${value} stars`}
                />
                <span
                  onMouseEnter={() => setHoverRating(value)}
                  className={`block rounded p-0.5 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 ${stars.ring}`}
                >
                  <StarIcon filled={value <= activeRating} accentClass={stars.filled} />
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="mt-6">
          <label
            htmlFor="feedback-positive"
            className="mb-1.5 block text-sm font-medium text-text-primary"
          >
            What worked well
          </label>
          <textarea
            id="feedback-positive"
            value={textPositive}
            onChange={(e) => setTextPositive(e.target.value)}
            placeholder="Anything that clicked or helped you learn?"
            rows={3}
            maxLength={5000}
            className={`bg-surface-primary w-full rounded-lg border border-border px-3 py-2 text-sm text-text-primary placeholder:text-text-tertiary focus:border-border focus:outline-none focus:ring-2 focus:ring-offset-2 ${inputRing}`}
          />
        </div>

        <div className="mt-4">
          <label
            htmlFor="feedback-negative"
            className="mb-1.5 block text-sm font-medium text-text-primary"
          >
            What was confusing or missing
          </label>
          <textarea
            id="feedback-negative"
            value={textNegative}
            onChange={(e) => setTextNegative(e.target.value)}
            placeholder="Anything unclear, out of date, or missing?"
            rows={3}
            maxLength={5000}
            className={`bg-surface-primary w-full rounded-lg border border-border px-3 py-2 text-sm text-text-primary placeholder:text-text-tertiary focus:border-border focus:outline-none focus:ring-2 focus:ring-offset-2 ${inputRing}`}
          />
        </div>

        <fieldset className="mt-4">
          <legend className="mb-1.5 text-sm font-medium text-text-primary">
            Would you recommend this course to someone else?
          </legend>
          <div className="flex gap-4">
            <label className="flex items-center gap-1.5 text-sm text-text-primary">
              <input
                type="radio"
                name="recommend"
                value="yes"
                checked={recommend === true}
                onChange={() => setRecommend(true)}
                className="accent-current"
              />
              Yes
            </label>
            <label className="flex items-center gap-1.5 text-sm text-text-primary">
              <input
                type="radio"
                name="recommend"
                value="no"
                checked={recommend === false}
                onChange={() => setRecommend(false)}
                className="accent-current"
              />
              No
            </label>
          </div>
        </fieldset>

        <div className="mt-4">
          <label
            htmlFor="feedback-email"
            className="mb-1.5 block text-sm font-medium text-text-primary"
          >
            Email{' '}
            <span className="text-text-tertiary">
              (optional, only if you&apos;d like us to follow up)
            </span>
          </label>
          <input
            id="feedback-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            maxLength={320}
            className={`bg-surface-primary w-full rounded-lg border border-border px-3 py-2 text-sm text-text-primary placeholder:text-text-tertiary focus:border-border focus:outline-none focus:ring-2 focus:ring-offset-2 ${inputRing} sm:max-w-xs`}
          />
        </div>

        {/* Honeypot - same pattern as EnterpriseInterestModal */}
        <div aria-hidden="true" className="absolute -left-[9999px] -top-[9999px]">
          <label htmlFor="feedback-website">Website</label>
          <input
            id="feedback-website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        {error ? (
          <p role="alert" className="text-red-500 mt-4 text-sm">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={submitting}
          className={`mt-6 inline-flex min-h-[44px] items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 ${submitAccent[courseAccent]}`}
        >
          {submitting ? 'Sending...' : 'Submit feedback'}
        </button>
      </form>
    </div>
  )
}

function StarIcon({
  filled,
  accentClass,
}: {
  readonly filled: boolean
  readonly accentClass: string
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={filled ? 0 : 1.5}
      className={`h-7 w-7 transition-colors ${filled ? accentClass : 'text-text-tertiary'}`}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
      />
    </svg>
  )
}
