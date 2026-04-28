'use client'

import { useCallback, useEffect, useId, useRef, useState, useSyncExternalStore } from 'react'
import { getAgentPlatformById } from '@/lib/agent-platform-data'
import type { AgentPlatformPickerPhase } from '@/lib/agent-platform-picker'
import {
  AGENT_PLATFORM_PICKER_QUESTIONS,
  getAgentPlatformRecommendation,
  type AgentPlatformPickerAnswers,
  type AgentPlatformPickerResult,
} from '@/lib/agent-platform-picker'

const PHASE_ORDER: readonly AgentPlatformPickerPhase[] = ['q1', 'q2', 'q3', 'result']

function phaseIndex(phase: AgentPlatformPickerPhase): number {
  return PHASE_ORDER.indexOf(phase)
}

export interface AgentPlatformPickerProps {
  readonly ariaLabelledBy: string
  readonly onRecommendation?: (result: AgentPlatformPickerResult) => void
  readonly onStartOver?: () => void
}

export function AgentPlatformPicker({
  ariaLabelledBy,
  onRecommendation,
  onStartOver,
}: AgentPlatformPickerProps) {
  const rootId = useId()
  const [phase, setPhase] = useState<AgentPlatformPickerPhase>('q1')
  const [transitioning, setTransitioning] = useState(false)
  const [result, setResult] = useState<AgentPlatformPickerResult | null>(null)
  const resultTitleRef = useRef<HTMLHeadingElement>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const transitionMs = 200

  const [q1, setQ1] = useState<AgentPlatformPickerAnswers['q1'] | null>(null)
  const [q2, setQ2] = useState<AgentPlatformPickerAnswers['q2'] | null>(null)

  const emptySubscribe = useCallback(() => () => {}, [])
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  )

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (phase !== 'result') return undefined
    const id = requestAnimationFrame(() => {
      resultTitleRef.current?.focus()
    })
    return () => cancelAnimationFrame(id)
  }, [phase])

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

  const handleSelect = useCallback(
    (rawValue: string) => {
      if (phase === 'result') return

      if (phase === 'q1') {
        const value = rawValue as AgentPlatformPickerAnswers['q1']
        advanceAfterTransition(() => {
          setQ1(value)
          setPhase('q2')
        })
        return
      }
      if (phase === 'q2') {
        const value = rawValue as AgentPlatformPickerAnswers['q2']
        advanceAfterTransition(() => {
          setQ2(value)
          setPhase('q3')
        })
        return
      }

      const value = rawValue as AgentPlatformPickerAnswers['q3']
      advanceAfterTransition(() => {
        if (q1 === null || q2 === null) {
          return
        }
        const answers: AgentPlatformPickerAnswers = { q1, q2, q3: value }
        const next = getAgentPlatformRecommendation(answers)
        setResult(next)
        setPhase('result')
        onRecommendation?.(next)
      })
    },
    [advanceAfterTransition, onRecommendation, phase, q1, q2],
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
      setResult(null)
      setPhase('q1')
      onStartOver?.()
    })
  }, [advanceAfterTransition, onStartOver])

  if (!isClient) {
    return (
      <div
        className="min-h-[200px] rounded-card border border-border bg-surface-secondary p-6 sm:min-h-[240px] sm:p-8"
        aria-hidden="true"
      />
    )
  }

  const questionIndex = phase === 'result' ? -1 : phaseIndex(phase)
  const currentQuestion =
    questionIndex >= 0 ? AGENT_PLATFORM_PICKER_QUESTIONS[questionIndex] : undefined

  const stepMotionClasses = transitioning
    ? 'tool-picker-step translate-y-1 opacity-0'
    : 'tool-picker-step translate-y-0 opacity-100'

  const recommendedPlatform = result ? getAgentPlatformById(result.recommended) : undefined
  const runnerUpPlatform = result ? getAgentPlatformById(result.runnerUp) : undefined

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
                  className="inline-flex min-h-[44px] w-full flex-1 items-center justify-center rounded-lg border border-border bg-surface px-4 py-3 text-left text-sm font-medium text-text-primary transition-colors hover:border-primary/30 hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 sm:min-w-[160px] sm:flex-none"
                  aria-label={`${currentQuestion.label} ${opt.label}`}
                  onClick={() => handleSelect(opt.id)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {phase === 'result' && result && recommendedPlatform && runnerUpPlatform && (
          <div className="space-y-5" role="status" aria-live="polite" aria-atomic="true">
            <div className="rounded-lg border border-border bg-primary/5 p-5">
              <span className="mb-3 block w-fit rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                Recommended
              </span>
              <h3
                id={`${rootId}-recommendation-name`}
                ref={resultTitleRef}
                tabIndex={-1}
                className="text-xl font-bold tracking-tight text-text-primary sm:text-2xl"
              >
                {recommendedPlatform.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                Runner-up: {runnerUpPlatform.name}. Scroll down to compare all platforms in full.
              </p>
            </div>

            <div>
              <button
                type="button"
                className="min-h-[44px] text-sm font-medium text-text-secondary underline decoration-text-secondary/30 underline-offset-2 transition-colors hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
                aria-label="Start the questions over from the first question"
                onClick={handleStartOver}
              >
                Start over
              </button>
            </div>
          </div>
        )}
      </div>

      {(phase === 'q2' || phase === 'q3') && (
        <div className="mt-6 border-t border-border pt-4">
          <button
            type="button"
            className="min-h-[44px] text-sm font-medium text-text-secondary underline underline-offset-2 transition-colors hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
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
