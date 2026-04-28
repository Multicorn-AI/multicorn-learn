import type { AgentPlatform } from '@/lib/agent-platform-data'

export interface AgentPlatformCardProps {
  readonly platform: AgentPlatform
  readonly highlight?: boolean
}

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="mt-0.5 flex-shrink-0"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="8" fill="#059669" fillOpacity="0.12" />
      <path
        d="M5 8.5L7 10.5L11 6"
        stroke="#059669"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function MinusIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="mt-0.5 flex-shrink-0"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="8" fill="#6b7280" fillOpacity="0.12" />
      <path d="M5 8H11" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function ExternalLinkIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className="inline-block"
      aria-hidden="true"
    >
      <path
        d="M10.5 7.58V11.08C10.5 11.39 10.38 11.68 10.16 11.91C9.93 12.13 9.64 12.25 9.33 12.25H2.92C2.61 12.25 2.32 12.13 2.09 11.91C1.87 11.68 1.75 11.39 1.75 11.08V4.67C1.75 4.36 1.87 4.07 2.09 3.84C2.32 3.62 2.61 3.5 2.92 3.5H6.42"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.75 1.75H12.25V5.25"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.83 8.17L12.25 1.75"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function AgentPlatformCard({ platform, highlight = false }: AgentPlatformCardProps) {
  return (
    <article
      className={`rounded-card border bg-surface p-6 transition-all sm:p-8 ${
        highlight
          ? 'border-primary/30 bg-primary/5 shadow-sm ring-1 ring-primary/10'
          : 'border-border'
      }`}
    >
      <div className="mb-4">
        <h3 className="mb-2 text-xl font-semibold tracking-tight text-text-primary sm:text-2xl">
          {platform.name}
        </h3>
        <span className="inline-block rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
          {platform.builtFor}
        </span>
        <p className="mt-3 text-sm leading-relaxed text-text-secondary">{platform.tagline}</p>
      </div>

      <div className="my-4 border-t border-border" aria-hidden="true" />

      <div className="mb-4 flex gap-2.5">
        <CheckIcon />
        <div>
          <span className="sr-only">Best at:</span>
          <p className="text-sm leading-relaxed text-text-primary">{platform.bestAt}</p>
        </div>
      </div>

      <div className="mb-4 flex gap-2.5">
        <MinusIcon />
        <div>
          <span className="sr-only">Not ideal for:</span>
          <p className="text-sm leading-relaxed text-text-secondary">{platform.notBestAt}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
        <span className="text-sm text-text-tertiary">{platform.startingPrice}</span>
        <a
          href={platform.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${platform.name}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:underline focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
        >
          Visit
          <ExternalLinkIcon />
        </a>
      </div>
    </article>
  )
}
