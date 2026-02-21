import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter } from 'next/font/google'
import { LaunchGate } from '@/components/LaunchGate'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Multicorn — The trusted layer between humans and AI agents',
  description:
    'Multicorn Shield gives your team consent screens, spending controls, and activity logging for every AI agent. Open-source SDK, enterprise-grade controls.',
  metadataBase: new URL('https://multicorn.ai'),
  openGraph: {
    title: 'Multicorn — The trusted layer between humans and AI agents',
    description:
      'Consent screens, spending controls, and activity logging for every AI agent. Open-source SDK, enterprise-grade controls.',
    url: 'https://multicorn.ai',
    siteName: 'Multicorn',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Multicorn — The trusted layer between humans and AI agents',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Multicorn — The trusted layer between humans and AI agents',
    description: 'Consent screens, spending controls, and activity logging for every AI agent.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen font-sans">
        <LaunchGate>{children}</LaunchGate>
        {process.env.NODE_ENV === 'production' && (
          <Script
            defer
            data-domain="multicorn.ai"
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  )
}
