interface PricingCardProps {
  readonly name: string
  readonly price: string
  readonly period: string
  readonly audience: string
  readonly features: readonly string[]
  readonly cta: string
  readonly href: string
  readonly highlighted?: boolean
  readonly badge?: string
  readonly disabled?: boolean
}

export function PricingCard({
  name,
  price,
  period,
  audience,
  features,
  cta,
  href,
  highlighted = false,
  badge,
  disabled = false,
}: PricingCardProps) {
  return (
    <div
      className={`relative flex flex-col rounded-card border p-6 ${
        highlighted
          ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10'
          : 'border-border bg-surface'
      }`}
    >
      {highlighted && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
          Most popular
        </span>
      )}

      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold text-text-primary">{name}</h3>
        {badge && (
          <span className="rounded-full bg-orange/10 px-2.5 py-0.5 text-xs font-medium text-orange">
            {badge}
          </span>
        )}
      </div>

      <div className="mt-4">
        <span className="text-4xl font-bold tracking-tight text-text-primary">{price}</span>
        {price !== 'Custom' && <span className="ml-1 text-sm text-text-secondary">/ {period}</span>}
        {price === 'Custom' && <p className="mt-1 text-sm text-text-secondary">{period}</p>}
      </div>

      <p className="mt-3 text-sm leading-relaxed text-text-secondary">{audience}</p>

      <ul className="mt-6 flex-1 space-y-3" role="list">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="mt-0.5 h-4 w-4 shrink-0 text-green"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                clipRule="evenodd"
              />
            </svg>
            {feature}
          </li>
        ))}
      </ul>

      {disabled ? (
        <span
          className="mt-8 flex min-h-[44px] cursor-not-allowed items-center justify-center rounded-lg border border-border px-6 py-3 text-sm font-semibold text-text-tertiary"
          aria-disabled="true"
        >
          {cta}
        </span>
      ) : (
        <a
          href={href}
          className={[
            'mt-8 flex min-h-[44px] items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
            highlighted
              ? 'bg-primary text-white shadow-sm hover:bg-primary-dark focus:ring-primary/20'
              : 'border border-border text-text-primary hover:bg-surface-secondary focus:ring-primary/20',
          ].join(' ')}
        >
          {cta}
        </a>
      )}
    </div>
  )
}
