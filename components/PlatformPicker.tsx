'use client'

import Link from 'next/link'
import { useCallback, useEffect, useId, useRef, useState } from 'react'
import {
  clearCourse3MdxPlatformOnClient,
  setCourse3MdxPlatformOnClient,
} from '@/lib/course-3-platform'
import { COURSE_3_AWS } from '@/lib/course-3-aws-config'
import { COURSE_3_MOBILE } from '@/lib/course-3-mobile-config'
import { COURSE_3_NPM } from '@/lib/course-3-npm-config'
import {
  AWS_TRACK_PICKER_RESULT,
  getPlatformRecommendation,
  isAwsTrackPickerResult,
  isMobileTrackPickerResult,
  isNpmTrackPickerResult,
  MOBILE_TRACK_PICKER_RESULT,
  NPM_TRACK_PICKER_RESULT,
  PLATFORM_PICKER_QUESTIONS,
  type AwsTrackPickerResult,
  type MobileTrackPickerResult,
  type NpmTrackPickerResult,
  type PlatformRecommendation,
  type Q1Answer,
  type Q2Answer,
  type Q3Answer,
  type WebPlatformPickerAnswers,
} from '@/lib/platform-picker'

type PickerPhase = 'q1' | 'q2' | 'q3' | 'result'

const PHASE_ORDER: readonly PickerPhase[] = ['q1', 'q2', 'q3', 'result']

function phaseIndex(phase: PickerPhase): number {
  return PHASE_ORDER.indexOf(phase)
}

type PickerResult =
  | PlatformRecommendation
  | MobileTrackPickerResult
  | AwsTrackPickerResult
  | NpmTrackPickerResult

export function PlatformPicker({ ariaLabelledBy }: { readonly ariaLabelledBy: string }) {
  const rootId = useId()
  const [phase, setPhase] = useState<PickerPhase>('q1')
  const [transitioning, setTransitioning] = useState(false)
  const [recommendation, setRecommendation] = useState<PickerResult | null>(null)
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
      if (typeof window !== 'undefined') {
        try {
          if (
            isMobileTrackPickerResult(recommendation) ||
            isAwsTrackPickerResult(recommendation) ||
            isNpmTrackPickerResult(recommendation)
          ) {
            clearCourse3MdxPlatformOnClient()
          } else {
            setCourse3MdxPlatformOnClient(recommendation.slug)
          }
        } catch {
          /* localStorage can throw in private mode or when quota is exceeded */
        }
      }
      const id = requestAnimationFrame(() => {
        resultTitleRef.current?.focus()
      })
      return () => cancelAnimationFrame(id)
    }
    return undefined
  }, [phase, recommendation])

  useEffect(() => {
    setIsClient(true)
  }, [])

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
  /** Avoid SSR/client markup drift in this interactive wizard (useId, many buttons, etc.). */
  const [isClient, setIsClient] = useState(false)

  const handleSelect = useCallback(
    (rawValue: string) => {
      if (phase === 'result') return

      if (phase === 'q1') {
        const value = rawValue as Q1Answer
        if (value === 'mobile_app') {
          advanceAfterTransition(() => {
            setQ1(value)
            setRecommendation(MOBILE_TRACK_PICKER_RESULT)
            setPhase('result')
          })
          return
        }
        if (value === 'thinking_about_aws') {
          advanceAfterTransition(() => {
            setQ1(value)
            setRecommendation(AWS_TRACK_PICKER_RESULT)
            setPhase('result')
          })
          return
        }
        if (value === 'npm_package') {
          advanceAfterTransition(() => {
            setQ1(value)
            setRecommendation(NPM_TRACK_PICKER_RESULT)
            setPhase('result')
          })
          return
        }
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
        const answers: WebPlatformPickerAnswers = {
          q1: q1 as WebPlatformPickerAnswers['q1'],
          q2: q2,
          q3: value,
        }
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
      clearCourse3MdxPlatformOnClient()
    })
  }, [advanceAfterTransition])

  if (!isClient) {
    return (
      <div
        className="min-h-[200px] rounded-card border border-border bg-surface-secondary p-6 sm:min-h-[240px] sm:p-8"
        aria-hidden="true"
      />
    )
  }

  const questionIndex = phase === 'result' ? -1 : phaseIndex(phase)
  const currentQuestion = questionIndex >= 0 ? PLATFORM_PICKER_QUESTIONS[questionIndex] : undefined

  const stepMotionClasses = transitioning
    ? 'tool-picker-step translate-y-1 opacity-0'
    : 'tool-picker-step translate-y-0 opacity-100'

  const mobileFirstLessonHref = `${COURSE_3_MOBILE.basePath}/${COURSE_3_MOBILE.firstLessonSlug}`
  const awsFirstLessonHref = `${COURSE_3_AWS.basePath}/${COURSE_3_AWS.firstLessonSlug}`
  const npmFirstLessonHref = `${COURSE_3_NPM.basePath}/${COURSE_3_NPM.firstLessonSlug}`

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
                  className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-lg border border-border bg-surface px-4 py-3 text-left text-sm font-medium text-text-primary transition-colors hover:border-course-3-accent/30 hover:bg-course-3-accent/5 focus:outline-none focus:ring-2 focus:ring-course-3-accent/20 focus:ring-offset-2 sm:min-w-[160px] sm:flex-none"
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
              <span className="mb-3 block w-fit rounded-full bg-course-3-accent/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-course-3-accent">
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

            <Link
              href={
                isMobileTrackPickerResult(recommendation)
                  ? mobileFirstLessonHref
                  : isAwsTrackPickerResult(recommendation)
                    ? awsFirstLessonHref
                    : isNpmTrackPickerResult(recommendation)
                      ? npmFirstLessonHref
                      : `/learn/course-3/choosing-a-host?platform=${recommendation.slug}`
              }
              className="inline-flex min-h-[44px] w-full items-center justify-center rounded-lg bg-course-3-accent px-6 py-3 text-center text-base font-semibold text-white shadow-sm transition-colors hover:bg-course-3-accent/90 focus:outline-none focus:ring-2 focus:ring-course-3-accent/20 focus:ring-offset-2 sm:w-auto"
            >
              {isMobileTrackPickerResult(recommendation)
                ? 'Start mobile lesson 1'
                : isAwsTrackPickerResult(recommendation)
                  ? 'Start AWS lesson 1'
                  : isNpmTrackPickerResult(recommendation)
                    ? 'Start npm lesson 1'
                    : 'Start Lesson 1'}
            </Link>

            <div>
              <button
                type="button"
                className="min-h-[44px] text-sm font-medium text-text-secondary underline decoration-text-secondary/30 underline-offset-2 transition-colors hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-course-3-accent/20 focus:ring-offset-2"
                aria-label="Start the platform questions over from the first question"
                onClick={handleStartOver}
              >
                Start over
              </button>
            </div>

            <p className="text-sm leading-relaxed text-text-tertiary">
              {isMobileTrackPickerResult(recommendation)
                ? 'The lessons below this page are for web hosting (Vercel, Netlify, Fly.io). Use the mobile track link above for App Store and Play Store steps. You can return here any time to compare options.'
                : isAwsTrackPickerResult(recommendation)
                  ? 'The list below is still the main web hosting path. The AWS track link above is for the next step after a PaaS, when you are sure you need it.'
                  : isNpmTrackPickerResult(recommendation)
                    ? 'The list below is still the main Course 3 web hosting path. The npm publishing track link above covers publishing SDKs and libraries rather than deploying a URL.'
                    : 'We recommend this path. You can still follow any lesson below if you prefer another platform. The concepts are the same, and Lesson 1 covers the differences.'}
            </p>
          </div>
        )}
      </div>

      {(phase === 'q2' || phase === 'q3') && (
        <div className="mt-6 border-t border-border pt-4">
          <button
            type="button"
            className="min-h-[44px] text-sm font-medium text-text-secondary underline underline-offset-2 transition-colors hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-course-3-accent/20 focus:ring-offset-2"
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
