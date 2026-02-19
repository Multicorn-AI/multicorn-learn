interface Tier {
  readonly name: string
  readonly price: string
  readonly period: string
  readonly description: string
  readonly features: readonly string[]
  readonly cta: string
  readonly href: string
  readonly highlighted: boolean
}

const TIERS: readonly Tier[] = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'For individual developers getting started with agent security.',
    features: [
      'Consent screens',
      'Up to 3 agents',
      'Basic activity logging',
      '1,000 actions per month',
      'Community support',
    ],
    cta: 'Get started',
    href: '/shield',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: 'per month',
    description: 'For growing teams that need more agents and deeper controls.',
    features: [
      'Everything in Free',
      'Unlimited agents',
      'Spending controls',
      '50,000 actions per month',
      'Priority email support',
      'Detailed activity export',
    ],
    cta: 'Start free trial',
    href: '/shield',
    highlighted: true,
  },
  {
    name: 'Business',
    price: '$199',
    period: 'per month',
    description: 'For teams that need advanced governance and compliance.',
    features: [
      'Everything in Pro',
      'SSO and team roles',
      'Advanced audit trail',
      '500,000 actions per month',
      'Custom permission scopes',
      'Dedicated support channel',
    ],
    cta: 'Start free trial',
    href: '/shield',
    highlighted: false,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'tailored to your needs',
    description: 'For organizations with custom security, compliance, and scale requirements.',
    features: [
      'Everything in Business',
      'Unlimited actions',
      'On-premise deployment',
      'Custom integrations',
      'SLA guarantee',
      'Dedicated account manager',
    ],
    cta: 'Contact sales',
    href: 'mailto:sales@multicorn.ai',
    highlighted: false,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-content">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-text-secondary">
            Start free. Scale as your team grows. No hidden costs.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col rounded-card border p-6 ${
                tier.highlighted
                  ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10'
                  : 'border-border bg-surface'
              }`}
            >
              {tier.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
                  Most popular
                </span>
              )}

              <h3 className="text-lg font-semibold text-text-primary">{tier.name}</h3>

              <div className="mt-4">
                <span className="text-4xl font-bold tracking-tight text-text-primary">
                  {tier.price}
                </span>
                {tier.price !== 'Custom' && (
                  <span className="ml-1 text-sm text-text-secondary">/ {tier.period}</span>
                )}
                {tier.price === 'Custom' && (
                  <p className="mt-1 text-sm text-text-secondary">{tier.period}</p>
                )}
              </div>

              <p className="mt-3 text-sm leading-relaxed text-text-secondary">{tier.description}</p>

              <ul className="mt-6 flex-1 space-y-3" role="list">
                {tier.features.map((feature) => (
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

              <a
                href={tier.href}
                className={[
                  'mt-8 flex min-h-[44px] items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
                  tier.highlighted
                    ? 'bg-primary text-white shadow-sm hover:bg-primary-dark focus:ring-primary/20'
                    : 'border border-border text-text-primary hover:bg-surface-secondary focus:ring-primary/20',
                ].join(' ')}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
