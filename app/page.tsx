import type { Metadata } from 'next'
import { Hero } from '@/components/Hero'
import { Features } from '@/components/Features'
import { LearnSection } from '@/components/LearnSection'
import { SocialProof } from '@/components/SocialProof'
import { Pricing } from '@/components/Pricing'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Multicorn — AI Agent Safety, Permissions, and Spending Controls',
  description:
    'Help your team use AI agents safely with clear permissions, spending limits, and activity records.',
  openGraph: {
    title: 'Multicorn — AI Agent Safety, Permissions, and Spending Controls',
    description:
      'Help your team use AI agents safely with clear permissions, spending limits, and activity records.',
    images: [
      {
        url: '/images/og-card.svg',
        width: 1200,
        height: 630,
        alt: 'Multicorn platform overview',
      },
    ],
  },
}

export default function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <SocialProof />
        <Features />
        <LearnSection />
        <Pricing />
      </main>
      <Footer />
    </>
  )
}
