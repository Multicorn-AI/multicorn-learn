import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Multicorn Pricing | Free AI Agent Control SDK',
  description:
    'Start free with Multicorn Shield. Pro, Business, and Enterprise tiers for teams that need more agents, controls, and compliance.',
  openGraph: {
    title: 'Multicorn Pricing | Free AI Agent Control SDK',
    description:
      'Start free with Multicorn Shield. Pro, Business, and Enterprise tiers for teams that need more agents, controls, and compliance.',
    url: 'https://multicorn.ai/pricing',
    siteName: 'Multicorn',
    type: 'website',
    images: [
      {
        url: 'https://multicorn.ai/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Multicorn Pricing | Free AI Agent Control SDK',
      },
    ],
  },
}

export default function PricingLayout({ children }: { readonly children: ReactNode }) {
  return children
}
