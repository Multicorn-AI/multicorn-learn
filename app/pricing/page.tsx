import type { Metadata } from 'next'
import { PricingCard } from '@/components/PricingCard'
import { PricingFAQ } from '@/components/PricingFAQ'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Multicorn Pricing — Free AI Agent Control SDK',
  description:
    'Start free with Multicorn Shield. Pro, Business, and Enterprise tiers for teams that need more agents, controls, and compliance.',
  openGraph: {
    title: 'Multicorn Pricing — Free AI Agent Control SDK',
    description:
      'Start free with Multicorn Shield. Pro, Business, and Enterprise tiers for teams that need more agents, controls, and compliance.',
    url: 'https://multicorn.ai/pricing',
    siteName: 'Multicorn',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Multicorn Pricing — Free AI Agent Control SDK',
      },
    ],
  },
}

interface ShieldTier {
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

const SHIELD_TIERS: readonly ShieldTier[] = [
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
      'Activity feed',
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
    href: 'mailto:rachelle@multicorn.ai',
    highlighted: false,
    badge: 'Coming soon',
    disabled: true,
  },
]

interface ComparisonFeature {
  readonly name: string
  readonly free: 'yes' | 'no' | 'limited'
  readonly pro: 'yes' | 'no' | 'limited'
  readonly business: 'yes' | 'no' | 'limited'
  readonly enterprise: 'yes' | 'no' | 'limited'
}

const COMPARISON_FEATURES: readonly ComparisonFeature[] = [
  { name: 'Consent screens', free: 'yes', pro: 'yes', business: 'yes', enterprise: 'yes' },
  { name: 'Spending controls', free: 'no', pro: 'yes', business: 'yes', enterprise: 'yes' },
  { name: 'Activity logging', free: 'limited', pro: 'yes', business: 'yes', enterprise: 'yes' },
  { name: 'Team policies', free: 'no', pro: 'yes', business: 'yes', enterprise: 'yes' },
  { name: 'Role-based access control', free: 'no', pro: 'no', business: 'yes', enterprise: 'yes' },
  { name: 'SSO integration', free: 'no', pro: 'no', business: 'yes', enterprise: 'yes' },
  { name: 'Approval workflows', free: 'no', pro: 'no', business: 'yes', enterprise: 'yes' },
  { name: 'Immutable audit logs', free: 'no', pro: 'no', business: 'no', enterprise: 'yes' },
  { name: 'Dedicated support', free: 'no', pro: 'no', business: 'no', enterprise: 'yes' },
]

function ComparisonCell({ value }: { readonly value: 'yes' | 'no' | 'limited' }) {
  if (value === 'yes') {
    return (
      <span className="inline-flex items-center text-green" aria-label="Included">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    )
  }
  if (value === 'limited') {
    return (
      <span className="text-sm font-medium text-orange" aria-label="Limited">
        Limited
      </span>
    )
  }
  return (
    <span className="inline-flex items-center text-text-tertiary" aria-label="Not included">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
      </svg>
    </span>
  )
}

export default function PricingPage() {
  return (
    <>
      <main>
        {/* Hero */}
        <section className="px-6 pb-16 pt-24 sm:pt-32">
          <div className="mx-auto max-w-content text-center">
            <span className="mb-4 inline-block rounded-full bg-orange/10 px-4 py-1.5 text-sm font-medium text-orange">
              Pricing
            </span>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
              Simple, transparent pricing
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-text-secondary">
              Start free. Scale as your team grows. No hidden costs, no surprises.
            </p>
          </div>
        </section>

        {/* Shield pricing cards */}
        <section className="px-6 pb-20">
          <div className="mx-auto max-w-content">
            <h2 className="mb-4 text-center text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
              Multicorn Shield
            </h2>
            <p className="mx-auto mb-12 max-w-xl text-center text-text-secondary">
              The control layer for AI agents. Choose the plan that fits your team.
            </p>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {SHIELD_TIERS.map((tier) => (
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

        {/* Learn pricing */}
        <section className="bg-surface-secondary px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-content">
            <h2 className="mb-4 text-center text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
              Multicorn Learn
            </h2>
            <p className="mx-auto mb-12 max-w-xl text-center text-text-secondary">
              AI education for everyone. Learn how AI works, pick the right tools, and use them
              safely.
            </p>

            <div className="mx-auto grid max-w-2xl gap-8 sm:grid-cols-2">
              <PricingCard
                name="Free"
                price="$0"
                period="forever"
                audience="Everything you need to start learning about AI."
                features={[
                  'All AI 101 content',
                  'Interactive tool picker',
                  'AI news feed',
                  'Basic prompt library',
                ]}
                cta="Start learning"
                href="/learn"
              />
              <PricingCard
                name="Pro"
                price="$10"
                period="per month"
                audience="Go deeper with structured courses and a full prompt library."
                features={[
                  'Everything in Free',
                  'Full prompt library',
                  'Structured courses',
                  'Industry-specific guides',
                  'Bookmarking and progress tracking',
                ]}
                cta="Coming soon"
                href="/learn"
                badge="Coming soon"
                disabled
              />
            </div>
          </div>
        </section>

        {/* Feature comparison table */}
        <section className="px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-content">
            <h2 className="mb-4 text-center text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
              Compare Shield plans
            </h2>
            <p className="mx-auto mb-12 max-w-xl text-center text-text-secondary">
              See exactly what is included in each tier.
            </p>

            <div className="mx-auto max-w-4xl overflow-x-auto rounded-card border border-border bg-surface">
              <table className="w-full min-w-[600px] text-left text-sm">
                <thead>
                  <tr className="border-b border-border bg-surface-secondary">
                    <th scope="col" className="px-6 py-4 font-semibold text-text-primary">
                      Feature
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-center font-semibold text-text-primary"
                    >
                      Free
                    </th>
                    <th scope="col" className="px-6 py-4 text-center font-semibold text-primary">
                      Pro
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-center font-semibold text-text-primary"
                    >
                      Business
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-center font-semibold text-text-primary"
                    >
                      Enterprise
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_FEATURES.map((row, index) => (
                    <tr
                      key={row.name}
                      className={
                        index < COMPARISON_FEATURES.length - 1 ? 'border-b border-border' : ''
                      }
                    >
                      <td className="px-6 py-4 font-medium text-text-primary">{row.name}</td>
                      <td className="px-6 py-4 text-center">
                        <ComparisonCell value={row.free} />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <ComparisonCell value={row.pro} />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <ComparisonCell value={row.business} />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <ComparisonCell value={row.enterprise} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <PricingFAQ />

        {/* CTA */}
        <section className="bg-surface-secondary px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-content text-center">
            <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              Ready to control your AI agents?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-text-secondary">
              Free to start, no credit card required. Set up consent screens and spending controls
              in minutes.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="https://app.multicorn.ai"
                className="inline-flex min-h-[44px] items-center rounded-lg bg-primary px-8 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
              >
                Start for free
              </a>
              <a
                href="mailto:rachelle@multicorn.ai"
                className="inline-flex min-h-[44px] items-center rounded-lg border border-border px-8 py-3 text-base font-semibold text-text-primary transition-colors hover:bg-surface-secondary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
              >
                Contact us
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
