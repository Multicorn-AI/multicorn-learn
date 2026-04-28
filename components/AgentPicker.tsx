'use client'

import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import {
  AGENT_PICKER_QUESTIONS,
  AGENT_RECOMMENDATIONS,
  getAgentRecommendation,
  type AgentPickerAnswers,
  type AgentSlug,
  type HostingAnswer,
  type PriorityAnswer,
  type TechnicalAnswer,
} from '@/lib/agent-picker-constants'

type PickerPhase = 'q1' | 'q2' | 'q3' | 'result'

const PHASE_ORDER: readonly PickerPhase[] = ['q1', 'q2', 'q3', 'result']

/** Stable ids (single AgentPicker on /learn/course-4) avoid useId SSR/client skew and hydration errors. */
const AP_ROOT = 'course4-agent-picker'

function phaseIndex(phase: PickerPhase): number {
  return PHASE_ORDER.indexOf(phase)
}

export function AgentPicker() {
  const [phase, setPhase] = useState<PickerPhase>('q1')
  const [, setAnswers] = useState<Partial<AgentPickerAnswers>>({})
  const [transitioning, setTransitioning] = useState(false)
  const [result, setResult] = useState<{ slug: AgentSlug; reason: string } | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const advanceAfterTransition = useCallback((next: () => void) => {
    setTransitioning(true)
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      next()
      setTransitioning(false)
      timeoutRef.current = null
    }, 200)
  }, [])

  const handleSelect = useCallback(
    (rawValue: string) => {
      if (phase === 'result') return

      if (phase === 'q1') {
        const value = rawValue as TechnicalAnswer
        advanceAfterTransition(() => {
          setAnswers((a) => ({ ...a, technical: value }))
          setPhase('q2')
        })
        return
      }
      if (phase === 'q2') {
        const value = rawValue as PriorityAnswer
        advanceAfterTransition(() => {
          setAnswers((a) => ({ ...a, priority: value }))
          setPhase('q3')
        })
        return
      }
      const hosting = rawValue as HostingAnswer
      advanceAfterTransition(() => {
        let nextAnswers: AgentPickerAnswers | undefined
        flushSync(() => {
          setAnswers((prev) => {
            if (prev.technical === undefined || prev.priority === undefined) {
              return prev
            }
            nextAnswers = {
              technical: prev.technical,
              priority: prev.priority,
              hosting,
            }
            return nextAnswers
          })
        })
        if (nextAnswers !== undefined) {
          setResult(getAgentRecommendation(nextAnswers))
          setPhase('result')
        }
      })
    },
    [advanceAfterTransition, phase],
  )

  const handleBack = useCallback(() => {
    if (phase === 'q1' || phase === 'result') return
    advanceAfterTransition(() => {
      if (phase === 'q2') {
        setAnswers((a) => (a.technical !== undefined ? { technical: a.technical } : {}))
        setPhase('q1')
      } else if (phase === 'q3') {
        setAnswers((a) => {
          if (a.technical === undefined || a.priority === undefined) return {}
          return { technical: a.technical, priority: a.priority }
        })
        setPhase('q2')
      }
    })
  }, [advanceAfterTransition, phase])

  const handleStartOver = useCallback(() => {
    advanceAfterTransition(() => {
      setAnswers(() => ({}))
      setResult(null)
      setPhase('q1')
    })
  }, [advanceAfterTransition])

  const questionIndex = phase === 'result' ? -1 : phaseIndex(phase)
  const currentQuestion = questionIndex >= 0 ? AGENT_PICKER_QUESTIONS[questionIndex] : undefined
  const headingId = `${AP_ROOT}-heading`

  const stepMotionClasses = transitioning
    ? 'tool-picker-step translate-y-1 opacity-0'
    : 'tool-picker-step translate-y-0 opacity-100'

  const recommendation = result ? AGENT_RECOMMENDATIONS[result.slug] : null

  return (
    <div
      className="rounded-card border border-border bg-surface-secondary p-6 sm:p-8"
      role="region"
      aria-labelledby={headingId}
    >
      <div
        className={`mb-6 flex flex-col gap-2 sm:flex-row sm:items-center ${
          phase !== 'result' ? 'sm:justify-between' : ''
        }`}
      >
        <h2
          id={headingId}
          className="text-xl font-bold tracking-tight text-text-primary sm:text-2xl"
        >
          Find your platform
        </h2>
        {phase !== 'result' && (
          <p className="text-sm text-text-secondary" aria-live="polite" aria-atomic="true">
            {`Question ${questionIndex + 1} of 3`}
          </p>
        )}
      </div>

      <div
        className={`transition-[opacity,transform] duration-200 ease-in-out ${stepMotionClasses}`}
      >
        {phase !== 'result' && currentQuestion && (
          <div role="group" aria-labelledby={`${AP_ROOT}-q-${currentQuestion.id}`}>
            <p
              id={`${AP_ROOT}-q-${currentQuestion.id}`}
              className="mb-4 text-base font-medium text-text-primary"
            >
              {currentQuestion.label}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {currentQuestion.options.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-lg border border-border bg-surface px-4 py-3 text-left text-sm font-medium text-text-primary transition-colors hover:border-violet-500/30 hover:bg-violet-500/5 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:ring-offset-2 sm:min-w-[140px] sm:flex-none"
                  aria-label={`${currentQuestion.label} ${opt.label}`}
                  onClick={() => handleSelect(opt.id)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {phase === 'result' && recommendation && result && (
          <div className="space-y-6">
            <div
              className={`rounded-lg border p-5 ${recommendation.accentClass}`}
              role="status"
              aria-live="polite"
              aria-atomic="true"
            >
              <p className="text-sm font-semibold uppercase tracking-wide text-text-primary/80">
                Recommended
              </p>
              <p className="mt-1 text-2xl font-bold text-text-primary">{recommendation.name}</p>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">{result.reason}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                href={recommendation.href}
                className="inline-flex min-h-[44px] w-full items-center justify-center rounded-lg bg-violet-500 px-6 py-3 text-center text-base font-semibold text-white shadow-sm transition-colors hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:ring-offset-2 sm:w-auto"
                aria-label={`Start with ${recommendation.name}`}
              >
                Start with {recommendation.name}
              </Link>
              <button
                type="button"
                className="inline-flex min-h-[44px] w-full items-center justify-center rounded-lg border border-border bg-surface px-6 py-3 text-base font-medium text-text-primary transition-colors hover:bg-surface-tertiary focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:ring-offset-2 sm:w-auto"
                aria-label="Start the platform picker over from the first question"
                onClick={handleStartOver}
              >
                Start over
              </button>
            </div>
          </div>
        )}
      </div>

      {(phase === 'q2' || phase === 'q3') && (
        <div className="mt-6 border-t border-border-light pt-4">
          <button
            type="button"
            className="text-sm font-medium text-text-secondary underline-offset-2 transition-colors hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:ring-offset-2"
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
