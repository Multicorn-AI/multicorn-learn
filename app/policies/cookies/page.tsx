import Link from 'next/link'
import type { Metadata } from 'next'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Cookie Policy — Multicorn',
  description: 'How Multicorn uses cookies and similar technologies on multicorn.ai.',
  openGraph: {
    title: 'Cookie Policy — Multicorn',
    description: 'How Multicorn uses cookies and similar technologies on multicorn.ai.',
    url: 'https://multicorn.ai/policies/cookies',
    siteName: 'Multicorn',
    type: 'website',
  },
}

export default function CookiePolicyPage() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center px-6 pb-20 pt-24 sm:pb-28 sm:pt-32">
        <div className="w-full max-w-3xl">
          <Link
            href="/policies"
            className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
                clipRule="evenodd"
              />
            </svg>
            All policies
          </Link>
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
            Cookie policy
          </h1>
          <p className="text-lg leading-relaxed text-text-secondary">
            Our full cookie policy is being finalised and will be published here before launch.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
