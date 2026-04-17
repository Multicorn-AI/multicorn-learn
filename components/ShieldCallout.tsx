import Link from 'next/link'
import { ArrowRight, ShieldCheck } from 'lucide-react'

export type ShieldCalloutVariant = 'mcp' | 'default'

interface ShieldCalloutProps {
  readonly variant?: ShieldCalloutVariant
  readonly title?: string
  readonly children?: React.ReactNode
  readonly ctaLabel?: string
}

const VARIANT_DEFAULTS: Record<ShieldCalloutVariant, { title: string; body: string }> = {
  mcp: {
    title: 'When your agent can connect to tools, it needs permissions',
    body: "That's what Multicorn Shield is for. See which tools your agent can reach, what it did, and stop it cold when something looks wrong.",
  },
  default: {
    title: 'Give your agent guardrails',
    body: 'Multicorn Shield reviews what your agents can do, logs every action, and lets you pull the plug when needed.',
  },
}

export function ShieldCallout({
  variant = 'mcp',
  title,
  children,
  ctaLabel = 'Learn how Shield works',
}: ShieldCalloutProps) {
  const defaults = VARIANT_DEFAULTS[variant]
  const heading = title ?? defaults.title
  const body = children ?? defaults.body

  return (
    <aside
      className="mb-6 rounded-card border border-primary/20 bg-primary/5 p-5 sm:p-6"
      aria-label="Multicorn Shield callout"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"
          aria-hidden="true"
        >
          <ShieldCheck className="h-5 w-5" strokeWidth={1.75} />
        </div>
        <div className="min-w-0 flex-1 space-y-2">
          <p className="text-base font-semibold text-text-primary">{heading}</p>
          <div className="text-sm leading-relaxed text-text-secondary [&_p:last-child]:mb-0 [&_p]:mb-3">
            {typeof body === 'string' ? <p>{body}</p> : body}
          </div>
          <div className="pt-2">
            <Link
              href="/shield"
              className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
            >
              {ctaLabel}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </aside>
  )
}
