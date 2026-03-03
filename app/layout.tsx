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
  icons: {
    icon: [
      { url: '/learn/favicon.ico', sizes: 'any' },
      { url: '/learn/favicon.svg', type: 'image/svg+xml' },
      { url: '/learn/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [{ url: '/learn/apple-touch-icon.png' }],
  },
  manifest: '/learn/site.webmanifest',
  openGraph: {
    title: 'Multicorn — The trusted layer between humans and AI agents',
    description:
      'Consent screens, spending controls, and activity logging for every AI agent. Open-source SDK, enterprise-grade controls.',
    url: 'https://multicorn.ai',
    siteName: 'Multicorn',
    type: 'website',
    images: [
      {
        url: '/images/og-card.svg',
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
    images: ['/images/og-card.svg'],
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen font-sans">
        <LaunchGate>{children}</LaunchGate>
        {process.env.NODE_ENV === 'production' && (
          <>
            <Script
              async
              src="https://plausible.io/js/pa-GYvkW2mmytiEOtMR5Enjz.js"
              strategy="afterInteractive"
            />
            <Script id="plausible-init" strategy="afterInteractive">
              {`window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()`}
            </Script>
          </>
        )}
      </body>
    </html>
  )
}
