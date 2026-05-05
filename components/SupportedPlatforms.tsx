'use client'

import { useCallback, useState } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { AgentPicker } from '@/components/AgentPicker'
import { SUPPORTED_PLATFORMS, supportedPlatformBadgeClass } from '@/lib/supported-platforms-data'

const CARD_SURFACE = 'rounded-card border border-border bg-surface-secondary p-5 text-left'

export function SupportedPlatforms() {
  const [expandedName, setExpandedName] = useState<string | null>(null)

  const toggleCard = useCallback((name: string) => {
    setExpandedName((prev) => (prev === name ? null : name))
  }, [])

  return (
    <section className="px-6 py-14 sm:py-28">
      <div className="mx-auto w-full max-w-content">
        <h2 className="text-center text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          Works with your favorite agents
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-text-secondary">
          Shield controls what your agent can access. Connect any compatible AI coding agent in
          minutes.
        </p>
        <div className="mt-10 grid w-full min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {SUPPORTED_PLATFORMS.map((platform) => {
            const Icon = platform.icon
            const isExpanded = expandedName === platform.name

            if (platform.comingSoon) {
              return (
                <button
                  key={platform.name}
                  type="button"
                  aria-disabled="true"
                  aria-label={`${platform.name}. Coming soon. Not selectable yet.`}
                  onClick={(e) => e.preventDefault()}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') e.preventDefault()
                  }}
                  className={`${CARD_SURFACE} w-full min-w-0 cursor-not-allowed border-dashed opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-shield/30`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex min-w-0 flex-1 items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-shield/10">
                        <Icon className="h-5 w-5 text-shield" aria-hidden />
                      </div>
                      <span className="min-w-0 text-sm font-semibold text-text-primary">
                        {platform.name}
                      </span>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-1">
                      <span className={supportedPlatformBadgeClass(platform.badge)}>
                        {platform.badge}
                      </span>
                      <span className="rounded-full bg-surface px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-text-secondary ring-1 ring-border">
                        Coming soon
                      </span>
                    </div>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-text-secondary">
                    {platform.description}
                  </p>
                </button>
              )
            }

            return (
              <button
                key={platform.name}
                type="button"
                aria-expanded={isExpanded}
                aria-label={`${platform.name} - click to ${isExpanded ? 'collapse' : 'expand'} details`}
                onClick={() => toggleCard(platform.name)}
                className={`${CARD_SURFACE} w-full min-w-0 cursor-pointer outline-none transition-colors duration-200 hover:bg-surface-tertiary focus-visible:ring-2 focus-visible:ring-shield/30 focus-visible:ring-offset-2`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-shield/10">
                      <Icon className="h-5 w-5 text-shield" aria-hidden />
                    </div>
                    <span className="min-w-0 text-left text-sm font-semibold text-text-primary">
                      {platform.name}
                    </span>
                  </div>
                  <div className="flex shrink-0 items-start gap-2">
                    <span className={supportedPlatformBadgeClass(platform.badge)}>
                      {platform.badge}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-text-tertiary transition-transform duration-200 motion-reduce:transition-none ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                      aria-hidden
                    />
                  </div>
                </div>
                <div
                  className={`grid overflow-hidden transition-all duration-200 ease-out motion-reduce:transition-none ${
                    isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="min-h-0">
                    <p className="mt-2 text-xs leading-relaxed text-text-secondary">
                      {platform.description}
                    </p>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
        <p className="mt-6 text-center text-sm text-text-tertiary">
          ...and any other compatible AI coding agent
        </p>
        <p className="mt-3 text-center">
          <Link
            href="/shield/threat-model"
            className="text-sm font-medium text-primary underline-offset-2 hover:underline"
          >
            How native plugins and hosted proxy compare →
          </Link>
        </p>
        <div className="mt-12 border-t border-border pt-12">
          <AgentPicker />
        </div>
      </div>
    </section>
  )
}
