import Link from 'next/link'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { Rocket } from 'lucide-react'
import { CourseProgressIndicator } from '@/components/CourseProgressIndicator'
import { LessonProgressHub } from '@/components/LessonProgress'
import { isCourse3Enabled } from '@/lib/feature-flags'
import { COURSE_3 } from '@/lib/course-3-config'
import { getAllCourse3Lessons } from '@/lib/course-3'

export const metadata: Metadata = {
  title: `${COURSE_3.title} | Multicorn Learn`,
  description: COURSE_3.description,
  openGraph: {
    title: `${COURSE_3.title} | Multicorn Learn`,
    description: COURSE_3.description,
    type: 'website',
  },
}

export default function Course3Page() {
  if (!isCourse3Enabled()) {
    redirect('/learn')
  }

  const lessons = getAllCourse3Lessons()
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
            href="/learn"
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
            All courses
          </Link>
          <CourseProgressIndicator activeCourse={3} />
        </div>

        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"
            aria-hidden="true"
          >
            <Rocket className="h-6 w-6" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">Course 3</p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              {COURSE_3.title}
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-text-secondary">
              {COURSE_3.intro}
            </p>
          </div>
        </div>

        <section aria-labelledby="course-3-lessons-heading">
          <h2
            id="course-3-lessons-heading"
            className="mb-6 text-2xl font-bold tracking-tight text-text-primary"
          >
            Lessons
          </h2>
          <LessonProgressHub
            lessons={hubItems}
            basePath={COURSE_3.basePath}
            storageKey={COURSE_3.progressStorageKey}
          />
        </section>
      </div>
    </main>
  )
}
