'use client'

import { useCallback, useEffect, useId, useRef, useState } from 'react'
import {
  getPlatformRecommendation,
  PLATFORM_PICKER_QUESTIONS,
  type PlatformPickerAnswers,
  type PlatformRecommendation,
  type Q1Answer,
  type Q2Answer,
  type Q3Answer,
} from '@/lib/platform-picker'

type PickerPhase = 'q1' | 'q2' | 'q3' | 'result'

const PHASE_ORDER: readonly PickerPhase[] = ['q1', 'q2', 'q3', 'result']

function phaseIndex(phase: PickerPhase): number {
  return PHASE_ORDER.indexOf(phase)
}

export function PlatformPicker({ ariaLabelledBy }: { readonly ariaLabelledBy: string }) {
  const rootId = useId()
  const [phase, setPhase] = useState<PickerPhase>('q1')
  const [transitioning, setTransitioning] = useState(false)
  const [recommendation, setRecommendation] = useState<PlatformRecommendation | null>(null)
  const resultTitleRef = useRef<HTMLHeadingElement>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const transitionMs = 200

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (phase === 'result' && recommendation) {
      const id = requestAnimationFrame(() => {
        resultTitleRef.current?.focus()
      })
      return () => cancelAnimationFrame(id)
    }
    return undefined
  }, [phase, recommendation])

  const advanceAfterTransition = useCallback(
    (next: () => void) => {
      setTransitioning(true)
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(() => {
        next()
        setTransitioning(false)
        timeoutRef.current = null
      }, transitionMs)
    },
    [transitionMs],
  )

  const [q1, setQ1] = useState<Q1Answer | null>(null)
  const [q2, setQ2] = useState<Q2Answer | null>(null)

  const handleSelect = useCallback(
    (rawValue: string) => {
      if (phase === 'result') return

      if (phase === 'q1') {
        const value = rawValue as Q1Answer
        advanceAfterTransition(() => {
          setQ1(value)
          setPhase('q2')
        })
        return
      }
      if (phase === 'q2') {
        const value = rawValue as Q2Answer
        advanceAfterTransition(() => {
          setQ2(value)
          setPhase('q3')
        })
        return
      }

      const value = rawValue as Q3Answer
      advanceAfterTransition(() => {
        if (q1 === null || q2 === null) {
          return
        }
        const answers: PlatformPickerAnswers = { q1, q2, q3: value }
        setRecommendation(getPlatformRecommendation(answers))
        setPhase('result')
      })
    },
    [advanceAfterTransition, phase, q1, q2],
  )

  const handleBack = useCallback(() => {
    if (phase === 'q1' || phase === 'result') return
    advanceAfterTransition(() => {
      if (phase === 'q2') {
        setQ1(null)
        setPhase('q1')
      } else if (phase === 'q3') {
        setQ2(null)
        setPhase('q2')
      }
    })
  }, [advanceAfterTransition, phase])

  const handleStartOver = useCallback(() => {
    advanceAfterTransition(() => {
      setQ1(null)
      setQ2(null)
      setRecommendation(null)
      setPhase('q1')
    })
  }, [advanceAfterTransition])

  const questionIndex = phase === 'result' ? -1 : phaseIndex(phase)
  const currentQuestion = questionIndex >= 0 ? PLATFORM_PICKER_QUESTIONS[questionIndex] : undefined

  const stepMotionClasses = transitioning
    ? 'tool-picker-step translate-y-1 opacity-0'
    : 'tool-picker-step translate-y-0 opacity-100'

  return (
    <div
      className="rounded-card border border-border bg-surface-secondary p-6 sm:p-8"
      role="group"
      aria-labelledby={ariaLabelledBy}
    >
      {phase !== 'result' ? (
        <div className="mb-6 flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
          <p className="text-sm text-text-secondary" aria-live="polite" aria-atomic="true">
            {`Question ${questionIndex + 1} of 3`}
          </p>
        </div>
      ) : null}

      <div
        className={`transition-[opacity,transform] duration-200 ease-in-out ${stepMotionClasses}`}
      >
        {phase !== 'result' && currentQuestion && (
          <div role="group" aria-labelledby={`${rootId}-q-${currentQuestion.id}`}>
            <p
              id={`${rootId}-q-${currentQuestion.id}`}
              className="mb-4 text-base font-medium text-text-primary"
            >
              {currentQuestion.label}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {currentQuestion.options.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-lg border border-border bg-surface px-4 py-3 text-left text-sm font-medium text-text-primary transition-colors hover:border-primary/30 hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 sm:min-w-[160px] sm:flex-none"
                  aria-label={`${currentQuestion.label} ${opt.label}`}
                  onClick={() => handleSelect(opt.id)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {phase === 'result' && recommendation && (
          <div className="space-y-5">
            <div
              className={`rounded-lg border border-border p-5 ${recommendation.accentClass}`}
              role="status"
              aria-live="polite"
              aria-atomic="true"
            >
              <span className="mb-3 inline-block rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                Recommended
              </span>
              <h3
                id={`${rootId}-recommendation-name`}
                ref={resultTitleRef}
                tabIndex={-1}
                className="text-xl font-bold tracking-tight text-text-primary sm:text-2xl"
              >
                {recommendation.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                {recommendation.reason}
              </p>
            </div>

            <a
              href="#lessons"
              className="inline-flex min-h-[44px] w-full items-center justify-center rounded-lg bg-primary px-6 py-3 text-center text-base font-semibold text-white shadow-sm transition-colors hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 sm:w-auto"
            >
              Start Lesson 1
            </a>

            <div>
              <button
                type="button"
                className="min-h-[44px] text-sm font-medium text-text-secondary underline decoration-text-secondary/30 underline-offset-2 transition-colors hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
                aria-label="Start the platform questions over from the first question"
                onClick={handleStartOver}
              >
                Start over
              </button>
            </div>

            <p className="text-sm leading-relaxed text-text-tertiary">
              We recommend this path. You can still follow any lesson below if you prefer another
              platform. The concepts are the same, and Lesson 1 covers the differences.
            </p>
          </div>
        )}
      </div>

      {(phase === 'q2' || phase === 'q3') && (
        <div className="mt-6 border-t border-border pt-4">
          <button
            type="button"
            className="min-h-[44px] text-sm font-medium text-text-secondary underline-offset-2 transition-colors hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
            aria-label="Go back to the previous question"
            onClick={handleBack}
          >
            Back
          </button>
        </div>
      )}
    </div>
  )
}
