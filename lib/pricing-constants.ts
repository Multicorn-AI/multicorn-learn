import { SIGNUP_URL } from '@/lib/urls'

export const PRICING_ENTERPRISE_MAILTO = 'mailto:enterprise@multicorn.ai'

/**
 * CTA target for a tier. Resolved to href via {@link getTierHref}.
 * Paid tiers use `signup` like Free; checkout happens inside the authenticated dashboard.
 * - `signup` → `SIGNUP_URL` (app.multicorn.ai/signup)
 * - `contact` → `PRICING_ENTERPRISE_MAILTO`
 */
export type TierCTA = 'signup' | 'contact'

/** Returns signup URL or enterprise mailto for pricing CTAs. */
export function getTierHref(cta: TierCTA): string {
  return cta === 'signup' ? SIGNUP_URL : PRICING_ENTERPRISE_MAILTO
}

/** Months billed per year on annual pricing (12 months access, 10 months paid). */
export const ANNUAL_BILLING_MONTHS = 10 as const

export interface PricingTierDef {
  /** `0` = free, positive = paid per month, `null` = custom/enterprise. */
  readonly monthlyPrice: number | null
  readonly name: string
  readonly audience: string
  readonly features: readonly string[]
  readonly cta: string
  readonly ctaTarget: TierCTA
  /** Only one should be true per product section. */
  readonly highlighted: boolean
  readonly badge?: string
  readonly disabled?: boolean
}

/** Formats a USD amount as currency with no fractional digits (pricing UI). */
export function formatUsd(dollars: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(dollars)
}

/**
 * Builds price label and billing-period copy for {@link PricingTierDef} rows (homepage and /pricing cards).
 */
export function getDisplayPrice(
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

/** Shield tier definitions for homepage and /pricing cards (single source of truth). */
export const SHIELD_TIERS: readonly PricingTierDef[] = [
  {
    name: 'Free',
    monthlyPrice: 0,
    audience: 'For solo developers and hobbyists getting started with agent control.',
    features: [
      'Consent screens',
      'Basic dashboard',
      '3 agents',
      '1,000 actions per month',
      'Community support',
    ],
    cta: 'Get started free',
    ctaTarget: 'signup',
    highlighted: false,
  },
  {
    name: 'Pro',
    monthlyPrice: 29,
    audience: 'For individuals and small teams that need more agents and deeper controls.',
    features: [
      'Everything in Free',
      '10 agents',
      'Unlimited activity logging',
      'Team management',
      'Spending controls',
      'Priority email support',
    ],
    cta: 'Get started',
    ctaTarget: 'signup',
    highlighted: true,
  },
  {
    name: 'Business',
    monthlyPrice: 199,
    audience:
      'For growing teams and mid-size companies that need advanced governance and compliance.',
    features: [
      'Everything in Pro',
      'Unlimited agents',
      'Role-based access control',
      'SSO integration (coming soon)',
      'Approval workflows',
      'Priority support',
    ],
    cta: 'Get started',
    ctaTarget: 'signup',
    highlighted: false,
  },
  {
    name: 'Enterprise',
    monthlyPrice: null,
    audience: 'For organizations with custom security, compliance, and scale requirements.',
    features: [
      'Everything in Business',
      'Immutable audit logs',
      'Compliance reporting',
      'Data boundary controls',
      'Multi-party approval',
      'Dedicated support',
    ],
    cta: 'Contact us',
    ctaTarget: 'contact',
    highlighted: false,
    badge: 'Coming soon',
    disabled: true,
  },
]

export interface ComparisonFeature {
  readonly name: string
  readonly free: 'yes' | 'no' | 'limited'
  readonly pro: 'yes' | 'no' | 'limited'
  readonly business: 'yes' | 'no' | 'limited'
  readonly enterprise: 'yes' | 'no' | 'limited'
}

export const COMPARISON_FEATURES: readonly ComparisonFeature[] = [
  { name: 'Consent screens', free: 'yes', pro: 'yes', business: 'yes', enterprise: 'yes' },
  { name: 'Spending controls', free: 'no', pro: 'yes', business: 'yes', enterprise: 'yes' },
  { name: 'Activity logging', free: 'limited', pro: 'yes', business: 'yes', enterprise: 'yes' },
  { name: 'Team management', free: 'no', pro: 'yes', business: 'yes', enterprise: 'yes' },
  { name: 'Role-based access control', free: 'no', pro: 'no', business: 'yes', enterprise: 'yes' },
  { name: 'SSO integration', free: 'no', pro: 'no', business: 'yes', enterprise: 'yes' },
  { name: 'Approval workflows', free: 'no', pro: 'no', business: 'yes', enterprise: 'yes' },
  { name: 'Immutable audit logs', free: 'no', pro: 'no', business: 'no', enterprise: 'yes' },
  { name: 'Dedicated support', free: 'no', pro: 'no', business: 'no', enterprise: 'yes' },
]
