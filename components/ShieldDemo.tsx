interface ActivityRow {
  readonly icon: string
  readonly action: string
  readonly agent: string
  readonly service: string
  readonly time: string
  readonly status: 'Approved' | 'Blocked' | 'Pending'
  readonly cost?: string
}

const ACTIVITIES: readonly ActivityRow[] = [
  {
    icon: '📧',
    action: 'Sent reply to Sarah re: Q1 report',
    agent: 'OpenClaw',
    service: 'Gmail',
    time: '2m ago',
    status: 'Approved',
  },
  {
    icon: '💳',
    action: 'Attempted purchase: $849 MacBook case',
    agent: 'ShopBot',
    service: 'Amazon',
    time: '5m ago',
    status: 'Blocked',
    cost: '$849',
  },
  {
    icon: '📅',
    action: 'Created meeting: Team standup',
    agent: 'OpenClaw',
    service: 'Calendar',
    time: '12m ago',
    status: 'Approved',
  },
  {
    icon: '💬',
    action: 'Posted update to #engineering',
    agent: 'OpenClaw',
    service: 'Slack',
    time: '18m ago',
    status: 'Approved',
  },
]

const STATUS_STYLES = {
  Approved: 'bg-green/10 text-green',
  Blocked: 'bg-red/10 text-red',
  Pending: 'bg-orange/10 text-orange',
} as const

interface Agent {
  readonly name: string
  readonly colour: string
  readonly actions: number
  readonly status: string
}

const AGENTS: readonly Agent[] = [
  { name: 'OpenClaw', colour: 'bg-indigo', actions: 142, status: 'Active' },
  { name: 'ShopBot', colour: 'bg-pink', actions: 38, status: 'Active' },
  { name: 'DocAgent', colour: 'bg-teal', actions: 67, status: 'Active' },
]

export function ShieldDemo() {
  return (
    <div
      className="overflow-hidden rounded-card border border-border bg-surface shadow-xl"
      aria-label="Multicorn Shield dashboard preview"
      role="img"
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-2 border-b border-border-light bg-surface-secondary px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red/60" aria-hidden="true" />
        <span className="h-3 w-3 rounded-full bg-orange/60" aria-hidden="true" />
        <span className="h-3 w-3 rounded-full bg-green/60" aria-hidden="true" />
        <div className="ml-3 flex-1 rounded-md bg-surface-tertiary px-3 py-1">
          <span className="text-xs text-text-tertiary">dashboard.multicorn.ai</span>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h4 className="text-base font-bold text-text-primary">Dashboard</h4>
            <p className="mt-0.5 text-xs text-text-tertiary">
              Friday, 20 February 2026 &middot; All agents
            </p>
          </div>
          <div className="flex items-center gap-1.5 rounded-md bg-green/10 px-2.5 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-green" aria-hidden="true" />
            <span className="text-xs font-medium text-green">All systems normal</span>
          </div>
        </div>

        {/* Stat cards */}
        <div className="mb-5 grid grid-cols-3 gap-3">
          <div className="rounded-lg border border-border bg-surface-secondary p-3 sm:p-4">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-text-tertiary">
              Actions today
            </div>
            <div className="mt-1 text-xl font-bold text-shield sm:text-2xl">47</div>
            <div className="mt-1 text-[11px] text-text-tertiary">
              <span className="font-medium text-green">+12%</span> from yesterday
            </div>
          </div>
          <div className="rounded-lg border border-border bg-surface-secondary p-3 sm:p-4">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-text-tertiary">
              Blocked
            </div>
            <div className="mt-1 text-xl font-bold text-red sm:text-2xl">3</div>
            <div className="mt-1 text-[11px] text-text-tertiary">2 spending limits</div>
          </div>
          <div className="rounded-lg border border-border bg-surface-secondary p-3 sm:p-4">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-text-tertiary">
              Spent today
            </div>
            <div className="mt-1 text-xl font-bold text-orange sm:text-2xl">$34</div>
            <div className="mt-1 text-[11px] text-text-tertiary">of $200 limit</div>
          </div>
        </div>

        {/* Activity feed */}
        <div className="mb-5 rounded-lg border border-border bg-surface-secondary">
          <div className="border-b border-border px-4 py-2.5">
            <span className="text-xs font-semibold text-text-primary">Recent activity</span>
          </div>
          {ACTIVITIES.map((row) => (
            <div
              key={`${row.agent}-${row.time}`}
              className="flex items-center gap-3 border-b border-border-light px-4 py-2.5 last:border-b-0"
            >
              <span className="text-sm" aria-hidden="true">
                {row.icon}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-text-primary">{row.action}</p>
                <p className="text-[11px] text-text-tertiary">
                  {row.agent} &middot; {row.service} &middot; {row.time}
                </p>
              </div>
              {row.cost && <span className="text-xs font-medium text-orange">{row.cost}</span>}
              <span
                className={`rounded px-2 py-0.5 text-[10px] font-medium ${STATUS_STYLES[row.status]}`}
              >
                {row.status}
              </span>
            </div>
          ))}
        </div>

        {/* Agents */}
        <div className="grid grid-cols-3 gap-3">
          {AGENTS.map((agent) => (
            <div
              key={agent.name}
              className="rounded-lg border border-border bg-surface-secondary p-3"
            >
              <div className="mb-2 flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${agent.colour}`} aria-hidden="true" />
                <span className="text-xs font-semibold text-text-primary">{agent.name}</span>
              </div>
              <div className="text-[11px] text-text-tertiary">{agent.actions} actions today</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
