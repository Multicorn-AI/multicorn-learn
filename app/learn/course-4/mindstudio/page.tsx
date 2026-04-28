import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { Course4PlatformStubArticle } from '@/components/Course4PlatformStubArticle'
import { course4PlatformStubCopy } from '@/lib/course-4-platform-stub-copy'
import { isCourse4Enabled } from '@/lib/feature-flags'

const copy = course4PlatformStubCopy.mindstudio

export const metadata: Metadata = {
  title: `Course 4: ${copy.name} | Multicorn Learn`,
  description: `${copy.tagline} Overview for Course 4.`,
  openGraph: {
    title: `Course 4: ${copy.name} | Multicorn Learn`,
    description: copy.intro.slice(0, 160),
    type: 'website',
  },
}

export default function Course4MindstudioPage() {
  if (!isCourse4Enabled()) {
    redirect('/learn')
  }

  return (
    <main className="flex min-h-screen flex-col items-center px-6 pb-20 pt-16 sm:pb-28 sm:pt-24">
      <div className="w-full max-w-content">
        <Course4PlatformStubArticle platformKey="mindstudio" />
      </div>
    </main>
  )
}
