'use client'

import { useCallback, useId, useState } from 'react'
import { AgentPlatformCard } from '@/components/AgentPlatformCard'
import { AgentPlatformPicker } from '@/components/AgentPlatformPicker'
import type { AgentPlatformId } from '@/lib/agent-platform-data'
import { AGENT_PLATFORMS } from '@/lib/agent-platform-data'
import type { AgentPlatformPickerResult } from '@/lib/agent-platform-picker'

export function AgentPlatformsContent() {
  const pickerHeadingId = useId()
  const [highlightId, setHighlightId] = useState<AgentPlatformId | null>(null)

  const handleRecommendation = useCallback((result: AgentPlatformPickerResult) => {
    setHighlightId(result.recommended)
  }, [])

  const handleStartOver = useCallback(() => {
    setHighlightId(null)
  }, [])

  return (
    <>
      <section className="px-6 pb-8 sm:pb-12" aria-labelledby={pickerHeadingId}>
        <h2
          id={pickerHeadingId}
          className="mx-auto max-w-content text-center text-2xl font-bold tracking-tight text-text-primary sm:text-3xl"
        >
          Answer three questions
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-base text-text-secondary sm:text-lg">
          We suggest a platform to try first plus a runner-up. Your answers drive a fixed score
          only, not an AI call.
        </p>
        <div className="mx-auto mt-10 max-w-3xl">
          <AgentPlatformPicker
            ariaLabelledBy={pickerHeadingId}
            onRecommendation={handleRecommendation}
            onStartOver={handleStartOver}
          />
        </div>
      </section>

      <section className="px-6 pb-14 sm:pb-20" aria-labelledby="agent-platform-profiles-heading">
        <h2
          id="agent-platform-profiles-heading"
          className="mx-auto max-w-content text-center text-2xl font-bold tracking-tight text-text-primary sm:text-3xl"
        >
          Platform profiles
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-base text-text-secondary">
          Neutral summaries. We do not get paid to rank these.
        </p>
        <div className="mx-auto mt-10 flex max-w-3xl flex-col gap-10">
          {AGENT_PLATFORMS.map((platform) => (
            <AgentPlatformCard
              key={platform.id}
              platform={platform}
              highlight={highlightId === platform.id}
            />
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-3xl text-center text-sm text-text-tertiary">
          This page is refreshed quarterly. Prices and product details change, so check each vendor
          before you buy.
        </p>
      </section>
    </>
  )
}
