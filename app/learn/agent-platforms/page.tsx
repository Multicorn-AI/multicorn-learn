import type { Metadata } from 'next'
import { AgentPlatformsContent } from './AgentPlatformsContent'

const CANONICAL_URL = 'https://multicorn.ai/learn/agent-platforms'

const OG_IMAGE_URL = 'https://multicorn.ai/images/og-image.png'

const META_DESCRIPTION =
  'Compare agent platforms including AutoHive, Dust, Lindy, MindStudio, Relevance AI, Taskade, Zapier with AI actions, and n8n. Three quick questions, then honest profiles for non-technical readers.'

export const metadata: Metadata = {
  title: 'Agent platform comparison | Multicorn Learn',
  description: META_DESCRIPTION,
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: 'Agent platform comparison | Multicorn Learn',
    description: META_DESCRIPTION,
    url: CANONICAL_URL,
    siteName: 'Multicorn',
    type: 'article',
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: 'Agent platform comparison on Multicorn Learn',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agent platform comparison | Multicorn Learn',
    description: META_DESCRIPTION,
    images: [OG_IMAGE_URL],
  },
}

const ARTICLE_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Agent platform comparison',
  description: META_DESCRIPTION,
  datePublished: '2026-04-28',
  author: {
    '@type': 'Organization',
    name: 'Multicorn',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Multicorn',
    url: 'https://multicorn.ai',
  },
  url: CANONICAL_URL,
  image: OG_IMAGE_URL,
}

export default function AgentPlatformsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(ARTICLE_JSONLD).replace(/</g, '\\u003c'),
        }}
      />
      <main>
        <section className="relative overflow-hidden px-6 pb-10 pt-20 sm:pb-14 sm:pt-24">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-indigo/5 to-transparent"
          />
          <div className="mx-auto max-w-content text-center">
            <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
              Compare agent platforms without the hype
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary sm:text-xl">
              This is a neutral overview of tools you are likely to bump into. Answer three
              questions to get a suggestion, then read short profiles for each product. No signup
              walls here, just a clear place to start reading.
            </p>
          </div>
        </section>

        <AgentPlatformsContent />
      </main>
    </>
  )
}
