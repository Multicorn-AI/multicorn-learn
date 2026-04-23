import Link from 'next/link'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { Code2 } from 'lucide-react'
import { CourseProgressIndicator } from '@/components/CourseProgressIndicator'
import { LessonProgressHub } from '@/components/LessonProgress'
import { isCourse2Enabled } from '@/lib/feature-flags'
import { getAllCourse2Lessons } from '@/lib/course-2'
import { getTrackConfig } from '@/lib/course-2-track-config'

const trackConfig = getTrackConfig('cursor')

export const metadata: Metadata = {
  title: `${trackConfig.title} | Multicorn Learn`,
  description: trackConfig.description,
  openGraph: {
    title: `${trackConfig.title} | Multicorn Learn`,
    description: trackConfig.description,
    type: 'website',
  },
}

export default function Course2CursorHubPage() {
  if (!isCourse2Enabled()) {
    redirect('/learn')
  }

  const lessons = getAllCourse2Lessons('cursor')
  const hubItems = lessons.map((l) => ({
    slug: l.slug,
    title: l.meta.title,
    estimatedMinutes: l.meta.estimatedMinutes,
    outcome: l.meta.outcome,
  }))

  return (
    <main className="flex min-h-screen flex-col items-center px-6 pb-20 pt-16 sm:pb-28 sm:pt-24">
      <div className="w-full max-w-content">
        <div className="mb-10 flex flex-col items-center gap-6">
          <Link
            href="/learn/course-2"
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
            Course 2 overview
          </Link>
          <CourseProgressIndicator activeCourse={2} />
        </div>

        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-course-2-accent/10 text-course-2-accent"
            aria-hidden="true"
          >
            <Code2 className="h-6 w-6" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-course-2-accent">
              Cursor track
            </p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              {trackConfig.title}
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-text-secondary">
              {trackConfig.intro}
            </p>
          </div>
        </div>

        <section aria-labelledby="cursor-lessons-heading">
          <h2
            id="cursor-lessons-heading"
            className="mb-6 text-2xl font-bold tracking-tight text-text-primary"
          >
            Lessons
          </h2>
          <LessonProgressHub
            lessons={hubItems}
            basePath={trackConfig.basePath}
            storageKey={trackConfig.progressStorageKey}
            courseAccent="course-2"
          />
        </section>
      </div>
    </main>
  )
}
