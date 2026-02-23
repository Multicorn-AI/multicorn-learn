import { PricingCard } from '@/components/PricingCard'

interface Tier {
  readonly name: string
  readonly price: string
  readonly period: string
  readonly audience: string
  readonly features: readonly string[]
  readonly cta: string
  readonly href: string
  readonly highlighted: boolean
  readonly badge?: string
  readonly disabled?: boolean
}

const TIERS: readonly Tier[] = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    audience: 'For solo developers and hobbyists getting started with agent control.',
    features: [
      'Consent screens',
      'Basic dashboard',
      '1 agent',
      '1,000 actions per month',
      'Community support',
    ],
    cta: 'Start for free',
    href: 'https://app.multicorn.ai',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: 'per month',
    audience: 'For small teams that need more agents and deeper controls.',
    features: [
      'Everything in Free',
      '10 agents',
      'Unlimited activity logging',
      'Team policies',
      'Spending controls',
      'Priority email support',
    ],
    cta: 'Get started',
    href: 'https://app.multicorn.ai',
    highlighted: true,
  },
  {
    name: 'Business',
    price: '$199',
    period: 'per month',
    audience: 'For mid-size companies that need advanced governance and compliance.',
    features: [
      'Everything in Pro',
      'Unlimited agents',
      'Role-based access control',
      'SSO integration',
      'Approval workflows',
      'Priority support',
    ],
    cta: 'Get started',
    href: 'https://app.multicorn.ai',
    highlighted: false,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'tailored to your needs',
    audience: 'For organizations with custom security, compliance, and scale requirements.',
    features: [
      'Everything in Business',
      'Immutable audit logs',
      'Compliance reporting',
      'Data boundary controls',
      'Multi-party approval',
      'Dedicated support',
    ],
    cta: 'Register interest',
    href: 'mailto:sales@multicorn.ai',
    highlighted: false,
    badge: 'Coming soon',
    disabled: true,
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
            <PricingCard
              key={tier.name}
              name={tier.name}
              price={tier.price}
              period={tier.period}
              audience={tier.audience}
              features={tier.features}
              cta={tier.cta}
              href={tier.href}
              highlighted={tier.highlighted}
              badge={tier.badge}
              disabled={tier.disabled}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
