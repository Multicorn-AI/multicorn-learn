import type { Metadata } from 'next'
import { CompareCard } from '@/components/CompareCard'
import { Footer } from '@/components/Footer'
import { TrackedCtaLink } from '@/components/TrackedCtaLink'
import { COMPARE_COMPETITORS, SHIELD_COMPARE } from '@/lib/compare-data'
import { SIGNUP_URL } from '@/lib/urls'

const CANONICAL_URL = 'https://multicorn.ai/shield/compare'
/** Same default OG asset as other product pages (e.g. /shield, /pricing). */
const OG_IMAGE_URL = 'https://multicorn.ai/images/og-image.png'

const META_DESCRIPTION =
  'Compare Multicorn Shield to Agent Safehouse, agentsh, and AgentGate. Find the right AI agent control tool for your team based on what you need to protect.'

export const metadata: Metadata = {
  title: 'Compare tools for AI agent control | Multicorn Shield',
  description: META_DESCRIPTION,
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: 'Compare tools for AI agent control | Multicorn Shield',
    description: META_DESCRIPTION,
    url: CANONICAL_URL,
    siteName: 'Multicorn',
    type: 'website',
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: 'Compare tools for AI agent control',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compare tools for AI agent control | Multicorn Shield',
    description: META_DESCRIPTION,
    images: [OG_IMAGE_URL],
  },
}

export default function ShieldComparePage() {
  return (
    <>
      <main>
        <section className="relative overflow-hidden px-6 pb-10 pt-20 sm:pb-16 sm:pt-28">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-indigo/5 to-transparent"
          />
          <div className="mx-auto max-w-content text-center">
            <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
              Choosing the right tool for AI agent control
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary sm:text-xl">
              Different jobs need different kinds of control. The sections below are four common
              situations. Each one names a type of tool, what it is good at, and what it does not
              try to solve. Read them in order, or jump to the one that matches your situation.
            </p>
          </div>
        </section>

        <section className="px-6 pb-14 sm:pb-24">
          <div className="mx-auto flex max-w-3xl flex-col gap-10">
            {COMPARE_COMPETITORS.map((competitor) => (
              <CompareCard
                key={competitor.id}
                useCase={competitor.useCase}
                name={competitor.name}
                summary={competitor.summary}
                strengths={competitor.strengths}
                gaps={competitor.gaps}
                url={competitor.url}
              />
            ))}

            <CompareCard
              useCase={SHIELD_COMPARE.useCase}
              name={SHIELD_COMPARE.name}
              summary={SHIELD_COMPARE.summary}
              strengths={SHIELD_COMPARE.strengths}
              gaps={SHIELD_COMPARE.gaps}
              highlight
              trackedCta={{
                href: SIGNUP_URL,
                eventName: 'compare_shield_card_signup_click',
                eventProps: { location: 'compare_shield_card' },
                label: 'Sign up for Shield',
              }}
            />
          </div>
        </section>

        <section className="border-t border-border-light bg-surface-secondary px-6 py-14 sm:py-20">
          <div className="mx-auto max-w-content text-center">
            <h2 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
              Ready for team-wide governance?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-text-secondary">
              Start free. No credit card required. Connect agents and MCP tools when you are ready.
            </p>
            <div className="mt-10 flex justify-center">
              <TrackedCtaLink
                href={SIGNUP_URL}
                className="inline-flex min-h-[44px] items-center rounded-lg bg-primary px-8 py-3 text-base font-semibold text-white shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 motion-safe:transition-colors"
                eventName="compare_signup_click"
                eventProps={{ location: 'compare_bottom_cta' }}
              >
                Start for free
              </TrackedCtaLink>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
