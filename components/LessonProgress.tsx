'use client'

import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import {
  CURSOR_TRACK_BASE_PATH,
  CURSOR_TRACK_PROGRESS_STORAGE_KEY,
} from '@/lib/cursor-track-config'

function readCompletedSlugs(): readonly string[] {
  if (typeof window === 'undefined') {
    return []
  }
  try {
    const raw = window.localStorage.getItem(CURSOR_TRACK_PROGRESS_STORAGE_KEY)
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

function writeCompletedSlugs(slugs: readonly string[]) {
  window.localStorage.setItem(CURSOR_TRACK_PROGRESS_STORAGE_KEY, JSON.stringify([...slugs]))
}

interface LessonCompleteButtonProps {
  readonly slug: string
}

export function LessonCompleteButton({ slug }: LessonCompleteButtonProps) {
  const [completed, setCompleted] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setCompleted(readCompletedSlugs().includes(slug))
  }, [slug])

  const toggle = useCallback(() => {
    const current = readCompletedSlugs()
    const next = completed ? current.filter((s) => s !== slug) : [...current, slug]
    writeCompletedSlugs(next)
    setCompleted(!completed)
  }, [completed, slug])

  const isCompleted = mounted && completed
  const label = isCompleted ? 'Marked complete' : 'Mark as complete'

  return (
    <div className="mt-12 border-t border-border pt-10">
      <button
        type="button"
        onClick={toggle}
        className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg border border-border bg-surface-secondary px-6 py-3 text-base font-semibold text-text-primary transition-colors hover:border-primary/30 hover:bg-surface-tertiary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 sm:w-auto sm:justify-start"
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

export interface CursorLessonListItem {
  readonly slug: string
  readonly title: string
  readonly estimatedMinutes: number
  readonly outcome: string
}

interface LessonProgressHubProps {
  readonly lessons: readonly CursorLessonListItem[]
}

export function LessonProgressHub({ lessons }: LessonProgressHubProps) {
  const [completedSet, setCompletedSet] = useState<ReadonlySet<string>>(() => new Set())

  useEffect(() => {
    setCompletedSet(new Set(readCompletedSlugs()))
  }, [])

  return (
    <ol className="list-none space-y-4 p-0">
      {lessons.map((lesson, index) => {
        const done = completedSet.has(lesson.slug)
        return (
          <li key={lesson.slug}>
            <Link
              href={`${CURSOR_TRACK_BASE_PATH}/${lesson.slug}`}
              className="flex min-h-[44px] flex-col gap-2 rounded-card border border-border bg-surface-secondary p-5 transition-colors hover:border-primary/30 hover:bg-surface-tertiary sm:flex-row sm:items-start sm:justify-between sm:gap-6"
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
                className="h-5 w-5 shrink-0 text-primary sm:self-center"
                aria-hidden="true"
              />
            </Link>
          </li>
        )
      })}
    </ol>
  )
}
