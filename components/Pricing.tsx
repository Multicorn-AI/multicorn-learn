'use client'

import { PricingCard } from '@/components/PricingCard'
import {
  ANNUAL_BILLING_MONTHS,
  getTierHref,
  SHIELD_TIERS,
  type PricingTierDef,
} from '@/lib/pricing-constants'

function formatUsd(dollars: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(dollars)
}

/** Matches /pricing when Monthly billing is selected (same formatting rules). */
function getDisplayPrice(
  tier: PricingTierDef,
  billing: 'monthly' | 'annual',
): { readonly price: string; readonly period: string } {
  if (tier.monthlyPrice === null) {
    return { price: 'Custom', period: 'tailored to your needs' }
  }
  if (tier.monthlyPrice === 0) {
    return { price: formatUsd(0), period: 'forever' }
  }
  if (billing === 'monthly') {
    return { price: formatUsd(tier.monthlyPrice), period: 'per month' }
  }
  const effectivePerMonth = (tier.monthlyPrice * ANNUAL_BILLING_MONTHS) / 12
  return {
    price: formatUsd(effectivePerMonth),
    period: 'per month, billed annually',
  }
}

export function Pricing() {
  const billing = 'monthly' as const

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
          {SHIELD_TIERS.map((tier) => {
            const { price, period } = getDisplayPrice(tier, billing)
            return (
              <PricingCard
                key={tier.name}
                name={tier.name}
                price={price}
                period={period}
                audience={tier.audience}
                features={tier.features}
                cta={tier.cta}
                href={getTierHref(tier.ctaTarget)}
                highlighted={tier.highlighted}
                badge={tier.badge}
                disabled={tier.disabled}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
