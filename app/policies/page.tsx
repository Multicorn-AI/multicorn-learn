import Link from 'next/link'
import type { Metadata } from 'next'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Policies — Multicorn',
  description:
    'Legal policies for multicorn.ai and the Multicorn Shield SDK, including privacy, terms of service, and cookies.',
  openGraph: {
    title: 'Policies — Multicorn',
    description:
      'Legal policies for multicorn.ai and the Multicorn Shield SDK, including privacy, terms of service, and cookies.',
    url: 'https://multicorn.ai/policies',
    siteName: 'Multicorn',
    type: 'website',
  },
}

interface PolicyLink {
  readonly title: string
  readonly description: string
  readonly href: string
}

const POLICIES: readonly PolicyLink[] = [
  {
    title: 'Privacy policy',
    description: 'How we collect, use, and protect your data.',
    href: '/policies/privacy',
  },
  {
    title: 'Terms of service',
    description: 'Rules and conditions for using Multicorn and the Shield SDK.',
    href: '/policies/terms',
  },
  {
    title: 'Cookie policy',
    description: 'How we use cookies and similar technologies.',
    href: '/policies/cookies',
  },
]

export default function PoliciesPage() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center px-6 pb-20 pt-24 sm:pb-28 sm:pt-32">
        <div className="w-full max-w-3xl">
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            Legal
          </span>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
            Policies
          </h1>
          <p className="mb-12 text-lg leading-relaxed text-text-secondary">
            Legal policies for multicorn.ai and the Multicorn Shield SDK.
          </p>

          <div className="space-y-4">
            {POLICIES.map((policy) => (
              <Link
                key={policy.href}
                href={policy.href}
                className="group block rounded-card border border-border bg-surface-secondary p-6 transition-colors hover:border-primary/30 hover:bg-surface-tertiary"
              >
                <h2 className="mb-1 text-lg font-semibold text-text-primary group-hover:text-primary">
                  {policy.title}
                </h2>
                <p className="text-sm text-text-secondary">{policy.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
