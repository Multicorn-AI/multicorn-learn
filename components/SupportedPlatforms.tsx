'use client'

import { useCallback, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { AgentPicker } from '@/components/AgentPicker'
import { SUPPORTED_PLATFORMS } from '@/lib/supported-platforms-data'

export function SupportedPlatforms() {
  const [expandedName, setExpandedName] = useState<string | null>(null)

  const toggleCard = useCallback((name: string) => {
    setExpandedName((prev) => (prev === name ? null : name))
  }, [])

  return (
    <section className="px-6 py-14 sm:py-28">
      <div className="mx-auto w-full max-w-content">
        <h2 className="text-center text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          Works with your favourite agents
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-text-secondary">
          Shield sits between your agent and its tools. Connect any MCP-compatible agent in minutes.
        </p>
        <div className="mt-10 grid w-full min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {SUPPORTED_PLATFORMS.map((platform) => {
            const Icon = platform.icon
            const isExpanded = expandedName === platform.name

            if (platform.comingSoon) {
              return (
                <div
                  key={platform.name}
                  className="min-w-0 rounded-card border border-dashed border-border bg-surface-secondary p-5 text-left opacity-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-shield/10">
                      <Icon className="h-5 w-5 text-shield" aria-hidden />
                    </div>
                    <span className="text-sm font-semibold text-text-primary">{platform.name}</span>
                  </div>
                  <span className="mt-1 block text-xs text-text-tertiary">{platform.badge}</span>
                  <p className="mt-2 text-xs leading-relaxed text-text-secondary">
                    {platform.description}
                  </p>
                </div>
              )
            }

            return (
              <div
                key={platform.name}
                role="button"
                tabIndex={0}
                aria-expanded={isExpanded}
                onClick={() => toggleCard(platform.name)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    toggleCard(platform.name)
                  }
                }}
                className={`min-w-0 cursor-pointer rounded-card border border-border bg-surface-secondary p-5 text-left outline-none transition-all duration-200 hover:border-shield/40 focus-visible:ring-2 focus-visible:ring-shield/30 focus-visible:ring-offset-2 ${
                  isExpanded ? 'border-shield/40' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-shield/10">
                    <Icon className="h-5 w-5 text-shield" aria-hidden />
                  </div>
                  <span className="min-w-0 flex-1 text-sm font-semibold text-text-primary">
                    {platform.name}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-text-tertiary transition-transform duration-200 motion-reduce:transition-none ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                    aria-hidden
                  />
                </div>
                <span className="mt-1 block text-xs text-text-tertiary">{platform.badge}</span>
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
              </div>
            )
          })}
        </div>
        <p className="mt-6 text-center text-sm text-text-tertiary">
          ...and any other MCP-compatible agent
        </p>
        <div className="mt-12 border-t border-border pt-12">
          <AgentPicker />
        </div>
      </div>
    </section>
  )
}
