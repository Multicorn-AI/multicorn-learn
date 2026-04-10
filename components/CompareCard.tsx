import { TrackedCtaLink } from '@/components/TrackedCtaLink'

export interface CompareCardTrackedCta {
  readonly href: string
  readonly eventName: string
  readonly eventProps?: Record<string, string>
  readonly label: string
}

/**
 * Props for {@link CompareCard}.
 *
 * @property useCase - Main scenario line; rendered as the card's `h2`.
 * @property name - Product or tool name shown under the use case.
 * @property summary - One-line description body copy.
 * @property strengths - Bullets under "What it does well".
 * @property gaps - Bullets under "What it does not cover".
 * @property url - Optional external link; when set, shows a "Learn more" link (`target="_blank"`).
 * @property trackedCta - Optional primary CTA; use with `highlight` for the Shield card (client link).
 * @property highlight - When true, applies emphasized border/ring styling (e.g. Shield).
 */
interface CompareCardProps {
  readonly useCase: string
  readonly name: string
  readonly summary: string
  readonly strengths: readonly string[]
  readonly gaps: readonly string[]
  readonly url?: string
  readonly trackedCta?: CompareCardTrackedCta
  readonly highlight?: boolean
}

/**
 * Use-case comparison card: use case heading, name, summary, strengths, gaps, optional "Learn more", optional tracked CTA.
 *
 * @example
 * ```tsx
 * <CompareCard
 *   useCase="I want to protect my machine."
 *   name="Example Tool"
 *   summary="Short summary."
 *   strengths={['First strength']}
 *   gaps={['First gap']}
 *   url="https://example.com"
 * />
 * ```
 *
 * @example
 * ```tsx
 * <CompareCard
 *   useCase="I want org governance."
 *   name="Multicorn Shield"
 *   summary="…"
 *   strengths={[]}
 *   gaps={[]}
 *   highlight
 *   trackedCta={{ href: signupUrl, eventName: 'compare_click', label: 'Sign up' }}
 * />
 * ```
 */
export function CompareCard({
  useCase,
  name,
  summary,
  strengths,
  gaps,
  url,
  trackedCta,
  highlight = false,
}: CompareCardProps) {
  return (
    <article
      className={`rounded-card border bg-surface p-6 sm:p-8 ${
        highlight ? 'border-primary/30 shadow-sm ring-1 ring-primary/10' : 'border-border'
      }`}
    >
      <h2 className="text-xl font-bold tracking-tight text-text-primary sm:text-2xl">{useCase}</h2>
      <p className="mt-3 text-lg font-semibold text-text-primary">{name}</p>
      <p className="mt-2 leading-relaxed text-text-secondary">{summary}</p>
      {url ? (
        <p className="mt-2">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Learn more about ${name}`}
            className="rounded text-sm font-medium text-primary underline-offset-4 hover:text-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 motion-safe:transition-colors motion-safe:hover:underline"
          >
            Learn more
          </a>
        </p>
      ) : null}

      <h3 className="mt-8 text-base font-semibold text-text-primary">What it does well</h3>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-text-secondary">
        {strengths.map((item, index) => (
          <li key={`${name}-strength-${index}`} className="leading-relaxed">
            {item}
          </li>
        ))}
      </ul>

      <h3 className="mt-6 text-base font-semibold text-text-primary">What it does not cover</h3>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-text-secondary">
        {gaps.map((item, index) => (
          <li key={`${name}-gap-${index}`} className="leading-relaxed">
            {item}
          </li>
        ))}
      </ul>

      {trackedCta ? (
        <div className="mt-8">
          <TrackedCtaLink
            href={trackedCta.href}
            className="inline-flex min-h-[44px] items-center rounded-lg bg-primary px-8 py-3 text-base font-semibold text-white shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 motion-safe:transition-colors"
            eventName={trackedCta.eventName}
            eventProps={trackedCta.eventProps}
          >
            {trackedCta.label}
          </TrackedCtaLink>
        </div>
      ) : null}
    </article>
  )
}
