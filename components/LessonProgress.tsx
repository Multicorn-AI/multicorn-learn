'use client'

import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import type { LearnCourseAccent } from '@/lib/learn-course-accents'

const completeButtonAccent: Record<LearnCourseAccent, { hoverBorder: string; ring: string }> = {
  'course-1': {
    hoverBorder: 'hover:border-course-1-accent/30',
    ring: 'focus:ring-course-1-accent/20',
  },
  'course-2': {
    hoverBorder: 'hover:border-course-2-accent/30',
    ring: 'focus:ring-course-2-accent/20',
  },
  'course-3': {
    hoverBorder: 'hover:border-course-3-accent/30',
    ring: 'focus:ring-course-3-accent/20',
  },
}

const hubAccent: Record<LearnCourseAccent, { hoverBorder: string; arrow: string }> = {
  'course-1': {
    hoverBorder: 'hover:border-course-1-accent/30',
    arrow: 'text-course-1-accent',
  },
  'course-2': {
    hoverBorder: 'hover:border-course-2-accent/30',
    arrow: 'text-course-2-accent',
  },
  'course-3': {
    hoverBorder: 'hover:border-course-3-accent/30',
    arrow: 'text-course-3-accent',
  },
}

function readCompletedSlugs(storageKey: string): readonly string[] {
  if (typeof window === 'undefined') {
    return []
  }
  try {
    const raw = window.localStorage.getItem(storageKey)
    if (raw === null || raw === '') {
      return []
    }
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) {
      return []
    }
    return parsed.filter((item): item is string => typeof item === 'string')
  } catch {
    return []
  }
}

function writeCompletedSlugs(storageKey: string, slugs: readonly string[]) {
  window.localStorage.setItem(storageKey, JSON.stringify([...slugs]))
}

interface LessonCompleteButtonProps {
  readonly slug: string
  readonly storageKey: string
  readonly courseAccent: LearnCourseAccent
}

export function LessonCompleteButton({
  slug,
  storageKey,
  courseAccent,
}: LessonCompleteButtonProps) {
  const btn = completeButtonAccent[courseAccent]
  const [completed, setCompleted] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setCompleted(readCompletedSlugs(storageKey).includes(slug))
  }, [slug, storageKey])

  const toggle = useCallback(() => {
    const current = readCompletedSlugs(storageKey)
    const next = completed ? current.filter((s) => s !== slug) : [...current, slug]
    writeCompletedSlugs(storageKey, next)
    setCompleted(!completed)
  }, [completed, slug, storageKey])

  const isCompleted = mounted && completed
  const label = isCompleted ? 'Marked complete' : 'Mark as complete'

  return (
    <div className="mt-12 border-t border-border pt-10">
      <button
        type="button"
        onClick={toggle}
        className={`flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg border border-border bg-surface-secondary px-6 py-3 text-base font-semibold text-text-primary transition-colors hover:bg-surface-tertiary focus:outline-none focus:ring-2 focus:ring-offset-2 sm:w-auto sm:justify-start ${btn.hoverBorder} ${btn.ring}`}
        aria-pressed={isCompleted}
      >
        {isCompleted ? <Check className="h-4 w-4 text-green" aria-hidden="true" /> : null}
        {label}
      </button>
      <p className="mt-3 text-sm text-text-secondary">
        Your progress saves in this browser only. Clearing site data will reset it.
      </p>
    </div>
  )
}

export interface Course2LessonListItem {
  readonly slug: string
  readonly title: string
  readonly estimatedMinutes: number
  readonly outcome: string
}

interface LessonProgressHubProps {
  readonly lessons: readonly Course2LessonListItem[]
  readonly basePath: string
  readonly storageKey: string
  readonly courseAccent: LearnCourseAccent
}

export function LessonProgressHub({
  lessons,
  basePath,
  storageKey,
  courseAccent,
}: LessonProgressHubProps) {
  const hub = hubAccent[courseAccent]
  const [completedSet, setCompletedSet] = useState<ReadonlySet<string>>(() => new Set())

  useEffect(() => {
    setCompletedSet(new Set(readCompletedSlugs(storageKey)))
  }, [storageKey])

  return (
    <ol className="list-none space-y-4 p-0">
      {lessons.map((lesson, index) => {
        const done = completedSet.has(lesson.slug)
        return (
          <li key={lesson.slug}>
            <Link
              href={`${basePath}/${lesson.slug}`}
              className={`flex min-h-[44px] flex-col gap-2 rounded-card border border-border bg-surface-secondary p-5 transition-colors hover:bg-surface-tertiary sm:flex-row sm:items-start sm:justify-between sm:gap-6 ${hub.hoverBorder}`}
            >
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wide text-text-tertiary">
                    Lesson {index + 1}
                  </span>
                  <span className="text-xs text-text-tertiary">{lesson.estimatedMinutes} min</span>
                  {done ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-green/10 px-2 py-0.5 text-xs font-medium text-green">
                      <Check className="h-3 w-3" aria-hidden="true" />
                      Done
                    </span>
                  ) : null}
                </div>
                <p className="mt-1 font-semibold text-text-primary">{lesson.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">{lesson.outcome}</p>
              </div>
              <ArrowRight
                className={`h-5 w-5 shrink-0 sm:self-center ${hub.arrow}`}
                aria-hidden="true"
              />
            </Link>
          </li>
        )
      })}
    </ol>
  )
}
