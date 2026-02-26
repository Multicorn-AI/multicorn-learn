import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Multicorn Docs: Set Up AI Agent Controls Step by Step',
  description:
    'Follow step-by-step docs to add consent screens, permissions, and spending limits to your AI agents.',
  openGraph: {
    title: 'Multicorn Docs: Set Up AI Agent Controls Step by Step',
    description:
      'Follow step-by-step docs to add consent screens, permissions, and spending limits to your AI agents.',
    images: [
      {
        url: '/images/og-card.svg',
        width: 1200,
        height: 630,
        alt: 'Multicorn documentation',
      },
    ],
  },
}

export default function DocsIndexPage() {
  redirect('/docs/getting-started')
}
