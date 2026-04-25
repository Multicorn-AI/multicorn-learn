import { SIGNUP_URL } from '@/lib/urls'

/** Stripe checkout URL placeholder. Replace when checkout is wired. */
export const PRICING_STRIPE_PLACEHOLDER = 'https://checkout.stripe.com/placeholder'

export const PRICING_ENTERPRISE_MAILTO = 'mailto:enterprise@multicorn.ai'

/**
 * CTA target for a tier. Resolved to href via {@link getTierHref}.
 * - `signup` → `SIGNUP_URL` (app.multicorn.ai/signup)
 * - `upgrade` → `PRICING_STRIPE_PLACEHOLDER`
 * - `contact` → `PRICING_ENTERPRISE_MAILTO`
 */
export type TierCTA = 'signup' | 'upgrade' | 'contact'

export function getTierHref(cta: TierCTA): string {
  if (cta === 'signup') return SIGNUP_URL
  if (cta === 'upgrade') return PRICING_STRIPE_PLACEHOLDER
  return PRICING_ENTERPRISE_MAILTO
}

/** Annual billing: pay for 10 months, get 12 (2 months free). Use `monthlyPrice * 10` for the yearly total. */
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
      'Team policies',
      'Spending controls',
      'Activity feed',
      'Priority email support',
    ],
    cta: 'Upgrade',
    ctaTarget: 'upgrade',
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
      'SSO integration',
      'Approval workflows',
      'Priority support',
    ],
    cta: 'Upgrade',
    ctaTarget: 'upgrade',
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
  { name: 'Team policies', free: 'no', pro: 'yes', business: 'yes', enterprise: 'yes' },
  { name: 'Role-based access control', free: 'no', pro: 'no', business: 'yes', enterprise: 'yes' },
  { name: 'SSO integration', free: 'no', pro: 'no', business: 'yes', enterprise: 'yes' },
  { name: 'Approval workflows', free: 'no', pro: 'no', business: 'yes', enterprise: 'yes' },
  { name: 'Immutable audit logs', free: 'no', pro: 'no', business: 'no', enterprise: 'yes' },
  { name: 'Dedicated support', free: 'no', pro: 'no', business: 'no', enterprise: 'yes' },
]
