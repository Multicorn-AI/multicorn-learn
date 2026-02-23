import type { Metadata } from 'next'
import { Footer } from '@/components/Footer'
import { DocsSidebar } from '@/components/DocsSidebar'
import { getAllDocSections } from '@/lib/docs'

export const metadata: Metadata = {
  title: 'Multicorn Shield Documentation',
  description:
    'Developer documentation for Multicorn Shield. Installation, consent screens, permissions, action logging, spending controls, and full API reference.',
  openGraph: {
    title: 'Multicorn Shield Documentation',
    description:
      'Developer documentation for Multicorn Shield. Installation, consent screens, permissions, action logging, spending controls, and full API reference.',
    url: 'https://multicorn.ai/docs',
    siteName: 'Multicorn',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Multicorn Shield Documentation',
    description:
      'Developer documentation for Multicorn Shield. Installation, consent screens, permissions, action logging, spending controls, and full API reference.',
  },
}

export default function DocsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const sections = getAllDocSections()
  const sidebarSections = sections.map((s) => ({
    slug: s.slug,
    title: s.meta.title,
  }))

  return (
    <>
      <div className="mx-auto grid min-h-screen w-full max-w-[1600px] grid-cols-1 px-6 pt-16 sm:pt-20 lg:grid-cols-[256px_minmax(0,1fr)] lg:gap-8">
        <DocsSidebar sections={sidebarSections} />
        <main className="min-w-0 pb-20 lg:w-full lg:max-w-[1100px]">{children}</main>
      </div>
      <Footer />
    </>
  )
}
