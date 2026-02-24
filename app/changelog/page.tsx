import type { Metadata } from 'next'
import { getAllReleases } from '@/lib/changelog'
import { ChangelogEntry } from '@/components/ChangelogEntry'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Multicorn Shield Changelog',
  description:
    'Release history for the Multicorn Shield SDK. See what changed in each version — new features, fixes, and security updates.',
  alternates: {
    types: {
      'application/rss+xml': '/changelog/feed.xml',
    },
  },
  openGraph: {
    title: 'Multicorn Shield Changelog',
    description: 'Release history for the Multicorn Shield SDK. See what changed in each version.',
    url: 'https://multicorn.ai/changelog',
    siteName: 'Multicorn',
    type: 'website',
    images: [
      {
        url: '/images/og-card.svg',
        width: 1200,
        height: 630,
        alt: 'Multicorn Shield Changelog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Multicorn Shield Changelog',
    description: 'Release history for the Multicorn Shield SDK. See what changed in each version.',
    images: ['/images/og-card.svg'],
  },
}

export default function ChangelogPage() {
  const releases = getAllReleases()

  return (
    <>
      <main className="flex min-h-screen flex-col items-center px-6 pb-20 pt-16 sm:pb-28 sm:pt-24">
        <div className="w-full max-w-content">
          <div className="mb-16 text-center">
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              Changelog
            </span>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
              Multicorn Shield Changelog
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-text-secondary">
              Everything that shipped in each release of the Shield SDK. New features, fixes, and
              security updates — all in one place.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://github.com/Multicorn-AI/multicorn-shield/releases"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-text-primary transition-colors hover:bg-surface-secondary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
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
                GitHub releases
              </a>
              <a
                href="https://www.npmjs.com/package/multicorn-shield"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-text-primary transition-colors hover:bg-surface-secondary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5 text-red"
                  aria-hidden="true"
                >
                  <path d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0h-2.666V8.667h2.666v5.331zm12 0h-2.666v-4h-1.334v4h-1.335v-4h-1.333v4h-2.666V8.667H22.666v5.331zM11.333 8.667h1.334v4h-1.334v-4z" />
                </svg>
                npm package
              </a>
              <a
                href="/changelog/feed.xml"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-text-primary transition-colors hover:bg-surface-secondary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
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
                  <path d="M4 11a9 9 0 0 1 9 9" />
                  <path d="M4 4a16 16 0 0 1 16 16" />
                  <circle cx="5" cy="19" r="1" />
                </svg>
                RSS feed
              </a>
            </div>
          </div>

          <div className="mx-auto max-w-3xl">
            {releases.length === 0 ? (
              <p className="text-center text-text-secondary">No releases yet. Check back soon.</p>
            ) : (
              releases.map((release) => <ChangelogEntry key={release.version} release={release} />)
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
