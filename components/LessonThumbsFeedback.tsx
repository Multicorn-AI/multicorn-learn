'use client'

import { useCallback, useEffect, useState } from 'react'
import { submitFeedback } from '@/lib/feedback'
import type { LearnCourseAccent } from '@/lib/learn-course-accents'

const accentClasses: Record<LearnCourseAccent, string> = {
  'course-1': 'hover:border-course-1-accent/30 focus:ring-course-1-accent/20',
  'course-2': 'hover:border-course-2-accent/30 focus:ring-course-2-accent/20',
  'course-3': 'hover:border-course-3-accent/30 focus:ring-course-3-accent/20',
}

interface LessonThumbsFeedbackProps {
  readonly courseSlug: string
  readonly lessonSlug: string
  readonly courseAccent: LearnCourseAccent
}

function storageKey(course: string, lesson: string): string {
  return `feedback-thumbs-${course}-${lesson}`
}

export function LessonThumbsFeedback({
  courseSlug,
  lessonSlug,
  courseAccent,
}: LessonThumbsFeedbackProps) {
  const accent = accentClasses[courseAccent]
  const [voted, setVoted] = useState<'up' | 'down' | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const saved = window.localStorage.getItem(storageKey(courseSlug, lessonSlug))
      if (saved === 'up' || saved === 'down') {
        setVoted(saved)
      }
    } catch {
      // localStorage unavailable
    }
  }, [courseSlug, lessonSlug])

  const vote = useCallback(
    (value: 'up' | 'down') => {
      setVoted(value)
      try {
        window.localStorage.setItem(storageKey(courseSlug, lessonSlug), value)
      } catch {
        // localStorage unavailable
      }
      void submitFeedback({
        course_slug: courseSlug,
        lesson_slug: lessonSlug,
        feedback_type: 'thumbs',
        rating_value: value === 'up' ? 1 : 0,
      })
    },
    [courseSlug, lessonSlug],
  )

  if (!mounted) return null

  if (voted) {
    return (
      <div className="mt-8 border-t border-border pt-6">
        <p className="text-sm text-text-secondary">Thanks for your feedback</p>
      </div>
    )
  }

  return (
    <div className="mt-8 border-t border-border pt-6">
      <p className="mb-3 text-sm font-medium text-text-primary">Was this lesson helpful?</p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => vote('up')}
          aria-label="Yes, this lesson was helpful"
          className={`inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-border bg-surface-secondary px-3 py-1.5 text-sm text-text-primary transition-colors hover:bg-surface-tertiary focus:outline-none focus:ring-2 focus:ring-offset-2 ${accent}`}
        >
          <ThumbUpIcon />
          Yes
        </button>
        <button
          type="button"
          onClick={() => vote('down')}
          aria-label="No, this lesson was not helpful"
          className={`inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-border bg-surface-secondary px-3 py-1.5 text-sm text-text-primary transition-colors hover:bg-surface-tertiary focus:outline-none focus:ring-2 focus:ring-offset-2 ${accent}`}
        >
          <ThumbDownIcon />
          No
        </button>
      </div>
    </div>
  )
}

function ThumbUpIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M1 8.25a1.25 1.25 0 112.5 0v7.5a1.25 1.25 0 11-2.5 0v-7.5zM7.188 3.734a1.12 1.12 0 00-2.094.59l.67 2.682a.75.75 0 01-.728.934H3.75a.75.75 0 00-.75.75v3.685c0 .18.065.355.183.492l2.36 2.72A2.25 2.25 0 017.242 16h3.508a2.25 2.25 0 002.2-1.8l.803-4.014a2.25 2.25 0 00-2.2-2.7h-1.99l.46-1.838a1.12 1.12 0 00-.52-1.233L7.188 3.734z" />
    </svg>
  )
}

function ThumbDownIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M19 11.75a1.25 1.25 0 10-2.5 0v-7.5a1.25 1.25 0 102.5 0v7.5zM12.812 16.266a1.12 1.12 0 002.094-.59l-.67-2.682a.75.75 0 01.728-.934h1.286a.75.75 0 00.75-.75V7.625a.75.75 0 00-.183-.492l-2.36-2.72A2.25 2.25 0 0012.758 4H9.25a2.25 2.25 0 00-2.2 1.8l-.803 4.014a2.25 2.25 0 002.2 2.7h1.99l-.46 1.838a1.12 1.12 0 00.52 1.233l2.315.68z" />
    </svg>
  )
}
