'use client'

import { useState } from 'react'
import { PricingCard } from '@/components/PricingCard'
import { PricingFAQ } from '@/components/PricingFAQ'
import { Footer } from '@/components/Footer'
import { SIGNUP_URL } from '@/lib/urls'
import {
  ANNUAL_BILLING_MONTHS,
  COMPARISON_FEATURES,
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

/**
 * Derives the price/period strings passed to PricingCard. Free and Enterprise
 * are unchanged by billing period; paid tiers use effective monthly for annual
 * (10 months paid per year) with period text that includes "billed annually".
 */
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

type BillingId = 'monthly' | 'annual'

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

const BILLING_OPTIONS: readonly { readonly id: BillingId; readonly label: string }[] = [
  { id: 'monthly', label: 'Monthly' },
  { id: 'annual', label: 'Annual' },
]

export default function PricingPage() {
  const [billing, setBilling] = useState<BillingId>('monthly')

  return (
    <>
      <main>
        <section className="px-6 pb-8 pt-24 sm:pt-32">
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

            <div
              className="mx-auto mt-8 flex max-w-sm gap-2 rounded-lg border border-border bg-surface p-1"
              role="tablist"
              aria-label="Billing period"
            >
              {BILLING_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  role="tab"
                  aria-selected={billing === opt.id}
                  id={`billing-tab-${opt.id}`}
                  onClick={() => setBilling(opt.id)}
                  className={`flex-1 rounded-md px-4 py-2.5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 ${
                    billing === opt.id
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            {billing === 'annual' && (
              <p className="mt-3 text-sm text-text-secondary">
                Save 2 months when you pay annually.
              </p>
            )}
          </div>
        </section>

        <section className="px-6 pb-20">
          <div className="mx-auto max-w-content">
            <h2 className="mb-4 text-center text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
              Multicorn Shield
            </h2>
            <p className="mx-auto mb-12 max-w-xl text-center text-text-secondary">
              The control layer for AI agents. Choose the plan that fits your team.
            </p>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
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

        <PricingFAQ />

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
                href={SIGNUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center rounded-lg bg-primary px-8 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
              >
                Get started free
              </a>
              <a
                href="mailto:hello@multicorn.ai"
                className="inline-flex min-h-[44px] items-center rounded-lg border border-border px-8 py-3 text-base font-semibold text-text-primary transition-colors hover:bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
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
