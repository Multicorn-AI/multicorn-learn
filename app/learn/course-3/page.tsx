import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Rocket } from 'lucide-react'
import { CourseLandingHero, CourseLandingTopNav } from '@/components/CourseLanding'
import { LessonProgressHub } from '@/components/LessonProgress'
import { PlatformPicker } from '@/components/PlatformPicker'
import { isCourse3Enabled } from '@/lib/feature-flags'
import { COURSE_3 } from '@/lib/course-3-config'
import { COURSE_3_AWS } from '@/lib/course-3-aws-config'
import { COURSE_3_MOBILE } from '@/lib/course-3-mobile-config'
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

        <section
          className="mx-auto w-full max-w-3xl px-4 pb-10"
          aria-labelledby="what-this-course-covers-heading"
        >
          <h2
            id="what-this-course-covers-heading"
            className="text-2xl font-bold tracking-tight text-text-primary"
          >
            What this course covers
          </h2>
          <p className="mt-2 text-text-secondary">
            You will pick a hosting platform, deploy your app to a public URL with HTTPS, connect a
            custom domain, set up environment variables so your secrets stay out of your code, and
            learn what to do when something breaks after you deploy. By the end, anyone with the
            link can use what you built.
          </p>
        </section>

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

        <div className="mx-auto w-full max-w-3xl px-4">
          <h2 className="pb-6 text-2xl font-bold tracking-tight text-text-primary">
            Other deployment paths
          </h2>
        </div>

        <section
          className="mx-auto w-full max-w-3xl px-4 pb-10"
          aria-labelledby="c3-mobile-callout-heading"
        >
          <div className="rounded-lg border border-border bg-surface-secondary p-4 sm:p-5">
            <h2
              id="c3-mobile-callout-heading"
              className="text-sm font-semibold uppercase tracking-wide text-text-tertiary"
            >
              Mobile app
            </h2>
            <p className="mt-2 text-text-secondary">
              Building a mobile app? The lessons below are for <strong>web</strong> deployment. For
              App Store and Play Store steps, use the{' '}
              <Link
                href={COURSE_3_MOBILE.basePath}
                className="font-semibold text-course-3-accent underline decoration-course-3-accent/30 underline-offset-2 transition-colors hover:text-course-3-accent/90"
              >
                mobile deployment track
              </Link>
              . You can also pick &quot;mobile app&quot; in the questions above and we will send you
              there.
            </p>
          </div>
        </section>

        <section
          className="mx-auto w-full max-w-3xl px-4 pb-10"
          aria-labelledby="c3-aws-callout-heading"
        >
          <div className="rounded-lg border border-border bg-surface-secondary p-4 sm:p-5">
            <h2
              id="c3-aws-callout-heading"
              className="text-sm font-semibold uppercase tracking-wide text-text-tertiary"
            >
              Outgrowing your host
            </h2>
            <p className="mt-2 text-text-secondary">
              If you already have a live app on Vercel, Netlify, or Fly.io and you are thinking
              about AWS or another large cloud, the{' '}
              <Link
                href={COURSE_3_AWS.basePath}
                className="font-semibold text-course-3-accent underline decoration-course-3-accent/30 underline-offset-2 transition-colors hover:text-course-3-accent/90"
              >
                AWS and larger cloud track
              </Link>{' '}
              walks through an honest &quot;do you need this?&quot; first. You can also pick &quot;I
              am thinking about AWS or a larger cloud&quot; in the questions above.
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}
