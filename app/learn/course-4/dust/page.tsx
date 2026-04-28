import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { CourseProgressIndicator } from '@/components/CourseProgressIndicator'
import { Course4PlatformStubArticle } from '@/components/Course4PlatformStubArticle'
import { LessonProgressHub } from '@/components/LessonProgress'
import { course4PlatformStubCopy } from '@/lib/course-4-platform-stub-copy'
import { getAllCourse4Lessons } from '@/lib/course-4'
import { getCourse4TrackConfig } from '@/lib/course-4-track-config'
import { isCourse4Enabled } from '@/lib/feature-flags'

const copy = course4PlatformStubCopy.dust
const trackConfig = getCourse4TrackConfig('dust')

export const metadata: Metadata = {
  title: `Course 4: ${copy.name} | Multicorn Learn`,
  description: `${copy.tagline} Overview for Course 4.`,
  openGraph: {
    title: `Course 4: ${copy.name} | Multicorn Learn`,
    description: copy.intro.slice(0, 160),
    type: 'website',
  },
}

export default function Course4DustPage() {
  if (!isCourse4Enabled()) {
    redirect('/learn')
  }

  const lessons = getAllCourse4Lessons('dust')
  const hubItems = lessons.map((l) => ({
    slug: l.slug,
    title: l.meta.title,
    estimatedMinutes: l.meta.estimatedMinutes,
    outcome: l.meta.description,
  }))

  return (
    <main className="flex min-h-screen flex-col items-center px-6 pb-20 pt-16 sm:pb-28 sm:pt-24">
      <div className="w-full max-w-content">
        <div className="mb-10 flex flex-col items-center gap-6">
          <Link
            href="/learn/course-4"
            className="flex items-center justify-center gap-1.5 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
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
            Course 4 overview
          </Link>
          <CourseProgressIndicator activeCourse={4} />
        </div>

        <Course4PlatformStubArticle platformKey="dust" />

        <div className="mx-auto mt-16 max-w-3xl px-4">
          <section aria-labelledby="dust-lessons-heading">
            <h2
              id="dust-lessons-heading"
              className="mb-6 text-2xl font-bold tracking-tight text-text-primary"
            >
              Lessons
            </h2>
            <LessonProgressHub
              lessons={hubItems}
              basePath={trackConfig.basePath}
              storageKey={trackConfig.progressStorageKey}
              courseAccent="course-4"
            />
          </section>
        </div>
      </div>
    </main>
  )
}
