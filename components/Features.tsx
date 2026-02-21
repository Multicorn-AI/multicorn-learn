import { FeatureCard } from '@/components/FeatureCard'

interface Feature {
  readonly name: string
  readonly description: string
  readonly icon: React.ReactNode
}

const FEATURES: readonly Feature[] = [
  {
    name: 'Consent screens',
    description:
      'A drop-in approval screen so users can review and approve what an agent wants to do before it acts.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    name: 'Spending controls',
    description:
      'Set per-transaction, daily, and monthly limits. Know exactly what your agents spend and stop them before they go over.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    name: 'Activity logging',
    description:
      'A tamper-evident audit trail of every action every agent takes. See what happened, when, and why.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    name: 'Permission scopes',
    description:
      'Define exactly what each agent can access — Gmail, Calendar, Slack, GitHub — with type-safe, granular permissions.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
]

function DashboardPreview() {
  return (
    <div
      className="overflow-hidden rounded-card border border-border bg-surface shadow-lg"
      aria-label="Multicorn Shield dashboard preview"
      role="img"
    >
      <div className="flex items-center gap-2 border-b border-border-light bg-surface-secondary px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red/60" />
        <span className="h-3 w-3 rounded-full bg-orange/60" />
        <span className="h-3 w-3 rounded-full bg-green/60" />
        <span className="ml-2 text-xs text-text-tertiary">Multicorn Shield</span>
      </div>
      <div className="space-y-3 p-6">
        <div className="flex items-center justify-between">
          <div className="h-3 w-28 rounded bg-surface-tertiary" />
          <div className="h-6 w-16 rounded-full bg-green/10 px-2 py-0.5 text-center text-xs font-medium text-green">
            Active
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-lg bg-surface-secondary p-3">
            <div className="mb-1 text-xs text-text-tertiary">Agents</div>
            <div className="text-lg font-semibold text-text-primary">12</div>
          </div>
          <div className="rounded-lg bg-surface-secondary p-3">
            <div className="mb-1 text-xs text-text-tertiary">Approved</div>
            <div className="text-lg font-semibold text-green">847</div>
          </div>
          <div className="rounded-lg bg-surface-secondary p-3">
            <div className="mb-1 text-xs text-text-tertiary">Blocked</div>
            <div className="text-lg font-semibold text-red">23</div>
          </div>
        </div>
        <div className="space-y-2">
          {(
            [
              'OpenClaw read Gmail',
              'Claude Code push to GitHub',
              'GPT-5.3 send Slack message',
            ] as const
          ).map((action) => (
            <div
              key={action}
              className="flex items-center justify-between rounded-lg bg-surface-secondary px-3 py-2"
            >
              <span className="text-xs text-text-secondary">{action}</span>
              <span className="text-xs font-medium text-green">Approved</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function Features() {
  return (
    <section id="features" className="px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-content">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            What Shield does
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary">
            One SDK to control what your AI agents can do, track what they did, and keep your users
            in the loop.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => (
            <FeatureCard
              key={feature.name}
              icon={feature.icon}
              name={feature.name}
              description={feature.description}
            />
          ))}
        </div>

        <div className="mt-20 grid items-center gap-12 lg:grid-cols-2">
          <DashboardPreview />

          <div>
            <h3 className="mb-4 text-2xl font-bold tracking-tight text-text-primary">
              See everything your agents do
            </h3>
            <p className="mb-8 text-text-secondary">
              The Shield dashboard gives you a real-time view of every agent, every action, and
              every permission — all in one place.
            </p>

            <div className="mb-6 overflow-hidden rounded-lg border border-border bg-text-primary">
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2">
                <span className="text-xs text-text-tertiary">Terminal</span>
              </div>
              <pre className="px-4 py-3">
                <code className="text-sm text-green">
                  <span className="select-none text-text-tertiary">$ </span>npm install
                  multicorn-shield
                </code>
              </pre>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="https://github.com/Multicorn-AI/multicorn-shield"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-semibold text-text-primary transition-colors hover:bg-surface-secondary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                View on GitHub
              </a>
              <a
                href="https://github.com/Multicorn-AI/multicorn-shield#readme"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
              >
                Read the docs
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
