'use client'

interface TimelineStep {
  readonly title: string
  readonly description: string
  readonly shieldInterventions: readonly string[]
  readonly hasIntervention: boolean
}

const TIMELINE_STEPS: readonly TimelineStep[] = [
  {
    title: 'PR opened',
    description: 'MJ Rathbun opened PR #31132 on matplotlib',
    shieldInterventions: ['Activity trail logs action'],
    hasIntervention: true,
  },
  {
    title: 'PR closed by maintainer',
    description: 'Scott Shambaugh closed the PR',
    shieldInterventions: ['Activity trail logs interaction'],
    hasIntervention: true,
  },
  {
    title: 'Agent researches maintainer',
    description: 'Agent researched Scott’s personal information',
    shieldInterventions: [
      'Reconnaissance alert triggers',
      'Deployer notified immediately',
      'Kill switch available',
    ],
    hasIntervention: true,
  },
  {
    title: 'Agent publishes hit piece',
    description: 'Agent published content on GitHub Pages',
    shieldInterventions: [
      'publish:web scope blocked by default',
      'Content review queue requires approval',
      'Kill switch stops all actions',
    ],
    hasIntervention: true,
  },
]

export function IncidentTimeline() {
  return (
    <div
      className="my-12 rounded-lg border border-border bg-surface-secondary p-6 sm:p-8"
      role="region"
      aria-label="Incident timeline comparison"
    >
      <div className="mb-8 grid gap-8 md:grid-cols-2">
        {/* Without Shield */}
        <div>
          <div className="mb-4 flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red" aria-hidden="true" />
            <h3 className="text-lg font-semibold text-text-primary">Without Shield</h3>
          </div>
          <div className="space-y-6">
            {TIMELINE_STEPS.map((step, index) => (
              <div key={step.title} className="relative">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold ${
                        step.title === 'Agent publishes hit piece'
                          ? 'border-red bg-red/10 text-red'
                          : 'border-border bg-surface text-text-secondary'
                      }`}
                      aria-label={`Step ${index + 1}: ${step.title}`}
                    >
                      {index + 1}
                    </div>
                    {index < TIMELINE_STEPS.length - 1 && (
                      <div className="my-1 h-full w-px bg-border" aria-hidden="true" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1 pb-2">
                    <h4 className="text-sm font-semibold text-text-primary">{step.title}</h4>
                    <p className="mt-1 text-sm text-text-secondary">{step.description}</p>
                    {step.title === 'Agent publishes hit piece' && (
                      <div className="mt-2 rounded-md bg-red/10 px-3 py-2">
                        <p className="text-xs font-medium text-red">Incident occurred</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* With Shield */}
        <div>
          <div className="mb-4 flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-green" aria-hidden="true" />
            <h3 className="text-lg font-semibold text-text-primary">With Shield</h3>
          </div>
          <div className="space-y-6">
            {TIMELINE_STEPS.map((step, index) => (
              <div key={step.title} className="relative">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-green bg-green/10 text-sm font-semibold text-green"
                      aria-label={`Step ${index + 1}: ${step.title} with Shield protection`}
                    >
                      {index + 1}
                    </div>
                    {index < TIMELINE_STEPS.length - 1 && (
                      <div className="my-1 h-full w-px bg-border" aria-hidden="true" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1 pb-2">
                    <h4 className="text-sm font-semibold text-text-primary">{step.title}</h4>
                    <p className="mt-1 text-sm text-text-secondary">{step.description}</p>
                    <div className="mt-3 space-y-1.5">
                      {step.shieldInterventions.map((intervention, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 rounded-md bg-green/10 px-3 py-2"
                        >
                          <svg
                            className="mt-0.5 h-4 w-4 shrink-0 text-green"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <p className="text-xs font-medium text-text-primary">{intervention}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-md border border-border bg-surface p-4">
        <p className="text-sm text-text-secondary">
          <strong className="font-semibold text-text-primary">Key difference:</strong> Shield
          intervenes at every stage, logging activity, alerting on suspicious behavior, and blocking
          harmful actions before they occur. The hit piece would have been stopped at the publish
          stage, even if earlier alerts were missed.
        </p>
      </div>
    </div>
  )
}
