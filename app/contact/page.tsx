import type { Metadata } from 'next'
import Link from 'next/link'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Contact Multicorn',
  description:
    'Get in touch with the Multicorn team. Reach us for general enquiries, enterprise sales, security disclosures, or privacy requests.',
  openGraph: {
    title: 'Contact Multicorn',
    description:
      'Get in touch with the Multicorn team. Reach us for general enquiries, enterprise sales, security disclosures, or privacy requests.',
    url: 'https://multicorn.ai/contact',
    siteName: 'Multicorn',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Contact Multicorn',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Multicorn',
    description:
      'Get in touch with the Multicorn team. Reach us for general enquiries, enterprise sales, security disclosures, or privacy requests.',
    images: ['/og-image.png'],
  },
}

interface ContactCategory {
  readonly name: string
  readonly email: string
  readonly description: string
  readonly note?: string
}

const CONTACT_CATEGORIES: readonly ContactCategory[] = [
  {
    name: 'General enquiries',
    email: 'rachelle@multicorn.ai',
    description: 'Questions about Multicorn, partnerships, or just saying hello.',
  },
  {
    name: 'Enterprise sales',
    email: 'rachelle@multicorn.ai',
    description: 'Custom plans, volume pricing, or compliance requirements for your organisation.',
  },
  {
    name: 'Security issues',
    email: 'rachelle@multicorn.ai',
    description:
      'For security vulnerabilities, please email directly rather than opening a public issue.',
  },
  {
    name: 'Privacy and data requests',
    email: 'rachelle@multicorn.ai',
    description: 'Data subject access requests (DSARs) and privacy-related enquiries.',
  },
]

export default function ContactPage() {
  return (
    <>
      <main>
        {/* Hero */}
        <section className="px-6 pb-16 pt-24 sm:pt-32">
          <div className="mx-auto max-w-content text-center">
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              Contact
            </span>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
              Get in touch
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-text-secondary">
              Whether you have a question, want to explore enterprise options, or need to report a
              security issue, we are here to help.
            </p>
            <div className="mt-10">
              <a
                href="mailto:rachelle@multicorn.ai"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-primary px-8 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                rachelle@multicorn.ai
              </a>
            </div>
            <p className="mt-4 text-sm text-text-tertiary">
              We typically respond within 1–2 business days
            </p>
          </div>
        </section>

        {/* Categorised contacts */}
        <section className="bg-surface-secondary px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-10 text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
              How to reach us
            </h2>
            <div className="grid gap-8 sm:grid-cols-2">
              {CONTACT_CATEGORIES.map((category) => (
                <div
                  key={category.name}
                  className="rounded-card border border-border bg-surface p-6"
                >
                  <h3 className="mb-2 text-lg font-semibold text-text-primary">{category.name}</h3>
                  <p className="mb-4 text-sm text-text-secondary">{category.description}</p>
                  {category.name === 'Privacy and data requests' && (
                    <p className="mb-4 text-sm text-text-secondary">
                      See our{' '}
                      <Link
                        href="/privacy"
                        className="font-medium text-primary underline underline-offset-2 hover:text-primary-dark"
                      >
                        privacy policy
                      </Link>{' '}
                      for details on how we handle personal data.
                    </p>
                  )}
                  <a
                    href={`mailto:${category.email}`}
                    className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                      aria-hidden="true"
                    >
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    {category.email}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SDK bugs and feature requests */}
        <section className="px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
              SDK bugs and feature requests
            </h2>
            <p className="text-lg leading-relaxed text-text-secondary">
              Found a bug in the Shield SDK or have an idea for a new feature? Open an issue on
              GitHub. This helps us track and prioritise community feedback in the open.
            </p>
            <div className="mt-8">
              <a
                href="https://github.com/Multicorn-AI/multicorn-shield/issues"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-semibold text-text-primary transition-colors hover:bg-surface-tertiary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                Open an issue on GitHub
              </a>
            </div>
          </div>
        </section>

        {/* Company details */}
        <section className="bg-surface-secondary px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
              Company
            </h2>
            <p className="text-lg leading-relaxed text-text-secondary">
              Multicorn AI Pty Ltd
              <br />
              Lane Cove, NSW, Australia
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
