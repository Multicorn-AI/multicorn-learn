import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Rocket } from 'lucide-react'
import { CourseLandingHero, CourseLandingTopNav } from '@/components/CourseLanding'
import { LessonProgressHub } from '@/components/LessonProgress'
import { isCourse3Enabled } from '@/lib/feature-flags'
import { COURSE_3 } from '@/lib/course-3-config'
import { COURSE_3_MOBILE } from '@/lib/course-3-mobile-config'
import { getAllCourse3MobileLessons } from '@/lib/course-3-mobile'

export const metadata: Metadata = {
  title: `${COURSE_3_MOBILE.title} | ${COURSE_3.title} | Multicorn Learn`,
  description: COURSE_3_MOBILE.description,
  openGraph: {
    title: `${COURSE_3_MOBILE.title} | ${COURSE_3.title} | Multicorn Learn`,
    description: COURSE_3_MOBILE.description,
    type: 'website',
  },
}

export default function Course3MobilePage() {
  if (!isCourse3Enabled()) {
    redirect('/learn')
  }

  const lessons = getAllCourse3MobileLessons()
  const hubItems = lessons.map((l) => ({
    slug: l.slug,
    title: l.meta.title,
    estimatedMinutes: l.meta.estimatedMinutes,
    outcome: l.meta.outcome,
  }))

  return (
    <main className="flex min-h-screen flex-col items-center px-6 pb-20 pt-16 sm:pb-28 sm:pt-24">
      <div className="w-full max-w-content">
        <CourseLandingTopNav activeCourse={3} />

        <nav aria-label="Breadcrumb" className="mx-auto mb-6 w-full max-w-3xl px-4">
          <ol className="flex flex-wrap items-center gap-2 text-sm" role="list">
            <li>
              <Link
                href="/"
                className="text-text-secondary transition-colors hover:text-text-primary"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <BreadcrumbChevron />
            </li>
            <li>
              <Link
                href="/learn"
                className="text-text-secondary transition-colors hover:text-text-primary"
              >
                Learn
              </Link>
            </li>
            <li aria-hidden="true">
              <BreadcrumbChevron />
            </li>
            <li>
              <Link
                href={COURSE_3.basePath}
                className="text-text-secondary transition-colors hover:text-text-primary"
              >
                Course 3
              </Link>
            </li>
            <li aria-hidden="true">
              <BreadcrumbChevron />
            </li>
            <li>
              <span className="font-medium text-text-primary" aria-current="page">
                {COURSE_3_MOBILE.title}
              </span>
            </li>
          </ol>
        </nav>

        <CourseLandingHero
          variant="course-3"
          icon={<Rocket className="h-6 w-6" strokeWidth={1.5} />}
          courseLabel="Course 3 - mobile track"
          title={COURSE_3_MOBILE.title}
        >
          <p className="text-lg leading-relaxed text-text-secondary">{COURSE_3_MOBILE.intro}</p>
        </CourseLandingHero>

        <section
          id="lessons"
          className="mx-auto w-full max-w-3xl px-4 pb-16"
          aria-labelledby="c3-mobile-lessons-heading"
        >
          <h2
            id="c3-mobile-lessons-heading"
            className="mb-6 text-2xl font-bold tracking-tight text-text-primary"
          >
            Lessons
          </h2>
          <LessonProgressHub
            lessons={hubItems}
            basePath={COURSE_3_MOBILE.basePath}
            storageKey={COURSE_3_MOBILE.progressStorageKey}
            courseAccent="course-3"
          />
        </section>
      </div>
    </main>
  )
}

function BreadcrumbChevron() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-4 w-4 text-text-tertiary"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M7.21 14.77a.75.75 0 01-.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
        clipRule="evenodd"
      />
    </svg>
  )
}
