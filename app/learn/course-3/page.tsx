import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { Rocket } from 'lucide-react'
import { CourseLandingHero, CourseLandingTopNav } from '@/components/CourseLanding'
import { LessonProgressHub } from '@/components/LessonProgress'
import { PlatformPicker } from '@/components/PlatformPicker'
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
        <CourseLandingTopNav activeCourse={3} />

        <CourseLandingHero
          variant="course-3"
          icon={<Rocket className="h-6 w-6" strokeWidth={1.5} />}
          courseLabel="Course 3"
          title={COURSE_3.title}
        >
          <p className="text-lg leading-relaxed text-text-secondary">{COURSE_3.intro}</p>
        </CourseLandingHero>

        <section id="pick-your-platform" className="mx-auto w-full max-w-3xl px-4 pb-12">
          <h2
            id="pick-your-platform-heading"
            className="text-2xl font-bold tracking-tight text-text-primary"
          >
            Not sure which platform to use?
          </h2>
          <p className="mt-2 text-text-secondary">
            Answer three short questions and we will recommend one. It takes about 30 seconds.
          </p>
          <div className="mt-6">
            <PlatformPicker ariaLabelledBy="pick-your-platform-heading" />
          </div>
        </section>

        <section
          id="lessons"
          className="mx-auto w-full max-w-3xl px-4 pb-16"
          aria-labelledby="lessons-heading"
        >
          <h2
            id="lessons-heading"
            className="mb-6 text-2xl font-bold tracking-tight text-text-primary"
          >
            Lessons
          </h2>
          <LessonProgressHub
            lessons={hubItems}
            basePath={COURSE_3.basePath}
            storageKey={COURSE_3.progressStorageKey}
            courseAccent="course-3"
          />
        </section>
      </div>
    </main>
  )
}
