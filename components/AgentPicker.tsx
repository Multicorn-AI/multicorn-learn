'use client'

import { useCallback, useMemo, useState } from 'react'
import {
  FALLBACK_RECOMMENDATION_PLATFORM_NAME,
  findSupportedPlatform,
  supportedPlatformBadgeClass,
  type SupportedPlatform,
  type SupportedPlatformName,
} from '@/lib/supported-platforms-data'

const HOW_IT_WORKS_HASH = '#how-it-works'

const Q1_OPTIONS = ['A coding project', 'Automating tasks', 'Just exploring'] as const
const Q2_OPTIONS = ['VS Code', 'JetBrains', 'Cursor', 'Terminal / CLI', 'No preference'] as const
const Q3_OPTIONS = ['I write code daily', 'I can follow a tutorial', "I'm non-technical"] as const

const LEGEND_Q1 = 'What are you building?'
const LEGEND_Q2 = "What's your preferred editor?"
const LEGEND_Q3 = 'How technical are you?'

type Q1 = (typeof Q1_OPTIONS)[number]
type Q2 = (typeof Q2_OPTIONS)[number]
type Q3 = (typeof Q3_OPTIONS)[number]

function pickPlatform(name: SupportedPlatformName): SupportedPlatform | undefined {
  return findSupportedPlatform(name)
}

/** Resolution uses SupportedPlatformName so picks stay aligned with SUPPORTED_PLATFORMS data. */
function recommendedPlatform(
  building: Q1,
  editor: Q2,
  technical: Q3,
): SupportedPlatform | undefined {
  if (editor === 'Cursor') return pickPlatform('Cursor')
  if (editor === 'Terminal / CLI') {
    if (technical === 'I write code daily') return pickPlatform('OpenClaw')
    if (technical === 'I can follow a tutorial') return pickPlatform('Gemini CLI')
    return pickPlatform('Claude Code')
  }
  if (editor === 'VS Code') {
    if (building === 'A coding project') return pickPlatform('Cline')
    return pickPlatform('Claude Code')
  }
  if (editor === 'JetBrains') return pickPlatform('Claude Code')
  if (technical === "I'm non-technical") return pickPlatform('Cursor')
  return pickPlatform('Claude Code')
}

export function AgentPicker() {
  const [step, setStep] = useState(0)
  const [building, setBuilding] = useState<Q1 | null>(null)
  const [editor, setEditor] = useState<Q2 | null>(null)
  const [technical, setTechnical] = useState<Q3 | null>(null)

  const recommendation = useMemo(() => {
    if (building === null || editor === null || technical === null) return null
    const picked = recommendedPlatform(building, editor, technical)
    return picked !== undefined
      ? picked
      : findSupportedPlatform(FALLBACK_RECOMMENDATION_PLATFORM_NAME)
  }, [building, editor, technical])

  const reset = useCallback(() => {
    setStep(0)
    setBuilding(null)
    setEditor(null)
    setTechnical(null)
  }, [])

  const pickQ1 = (value: Q1) => {
    setBuilding(value)
    setStep(1)
  }
  const pickQ2 = (value: Q2) => {
    setEditor(value)
    setStep(2)
  }
  const pickQ3 = (value: Q3) => {
    setTechnical(value)
    setStep(3)
  }

  return (
    <div className="mx-auto max-w-xl">
      <h3 className="text-center text-xl font-semibold text-text-primary">
        Not sure which agent to use? We can help.
      </h3>
      <p className="mt-2 text-center text-sm text-text-secondary">
        Answer a few questions and we&apos;ll recommend one.
      </p>

      <div className="mt-8">
        {step < 3 && (
          <div
            key={step}
            className="motion-safe:animate-agent-picker-fade motion-reduce:animate-none"
          >
            {step === 0 && (
              <fieldset>
                <legend className="mb-4 text-center text-sm font-medium text-text-primary">
                  {LEGEND_Q1}
                </legend>
                <div className="flex flex-wrap justify-center gap-2">
                  {Q1_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => pickQ1(opt)}
                      aria-label={`${opt} - answer to ${LEGEND_Q1}`}
                      className="min-h-[44px] rounded-full border border-border bg-surface px-4 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:border-primary/25 hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </fieldset>
            )}
            {step === 1 && (
              <fieldset>
                <legend className="mb-4 text-center text-sm font-medium text-text-primary">
                  {LEGEND_Q2}
                </legend>
                <div className="flex flex-wrap justify-center gap-2">
                  {Q2_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => pickQ2(opt)}
                      aria-label={`${opt} - answer to ${LEGEND_Q2}`}
                      className="min-h-[44px] rounded-full border border-border bg-surface px-4 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:border-primary/25 hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </fieldset>
            )}
            {step === 2 && (
              <fieldset>
                <legend className="mb-4 text-center text-sm font-medium text-text-primary">
                  {LEGEND_Q3}
                </legend>
                <div className="flex flex-wrap justify-center gap-2">
                  {Q3_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => pickQ3(opt)}
                      aria-label={`${opt} - answer to ${LEGEND_Q3}`}
                      className="min-h-[44px] rounded-full border border-border bg-surface px-4 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:border-primary/25 hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </fieldset>
            )}
          </div>
        )}

        {step === 3 && recommendation && (
          <ResultCard platform={recommendation} onStartOver={reset} />
        )}
      </div>
    </div>
  )
}

function ResultCard({
  platform,
  onStartOver,
}: {
  platform: SupportedPlatform
  onStartOver: () => void
}) {
  const Icon = platform.icon
  return (
    <div key="result" className="motion-safe:animate-agent-picker-fade motion-reduce:animate-none">
      <div className="rounded-card border border-border bg-surface-secondary p-5 text-left">
        <p className="text-center text-sm font-medium text-text-primary">We recommend</p>
        <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-shield/10">
            <Icon className="h-6 w-6 text-shield" aria-hidden />
          </div>
          <div className="flex flex-col items-center gap-2 sm:items-start">
            <p className="text-center text-lg font-semibold tracking-tight text-text-primary sm:text-left">
              {platform.name}
            </p>
            <span className={supportedPlatformBadgeClass(platform.badge)}>{platform.badge}</span>
          </div>
        </div>
        <p className="mt-2 text-center text-xs leading-relaxed text-text-secondary">
          {platform.description}
        </p>
        <a
          href={HOW_IT_WORKS_HASH}
          className="mt-5 inline-flex min-h-[44px] w-full items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2"
        >
          See how to connect
        </a>
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={onStartOver}
            className="text-sm font-medium text-primary underline-offset-4 hover:underline focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
          >
            Start over
          </button>
        </div>
      </div>
    </div>
  )
}
