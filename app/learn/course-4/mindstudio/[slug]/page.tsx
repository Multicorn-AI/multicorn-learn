import { notFound, redirect } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import type { Metadata } from 'next'
import Link from 'next/link'
import remarkGfm from 'remark-gfm'
import {
  getAllCourse4LessonSlugs,
  getAllCourse4Lessons,
  getCourse4Lesson,
  getCourse4LessonNavigation,
} from '@/lib/course-4'
import { getCourse4TrackConfig } from '@/lib/course-4-track-config'
import { extractTableOfContents } from '@/lib/learn'
import { course4MindstudioComponents } from '@/lib/mdx-course2-components'
import { CourseFeedbackForm } from '@/components/CourseFeedbackForm'
import { LessonCompleteButton } from '@/components/LessonProgress'
import { LessonNavigation } from '@/components/LessonNavigation'
import { LessonThumbsFeedback } from '@/components/LessonThumbsFeedback'
import { MobileTableOfContents } from '@/components/MobileTableOfContents'
import { TableOfContents } from '@/components/TableOfContents'
import { isCourse4Enabled } from '@/lib/feature-flags'

const SITE_URL = 'https://multicorn.ai'
const TRACK = 'mindstudio' as const
const trackConfig = getCourse4TrackConfig(TRACK)
const COURSE_ID = `${SITE_URL}${trackConfig.basePath}#course`

interface LessonPageProps {
  readonly params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getAllCourse4LessonSlugs(TRACK)
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: LessonPageProps): Promise<Metadata> {
  const { slug } = await params
  const lesson = getCourse4Lesson(TRACK, slug)

  if (!lesson) {
    return { title: 'Lesson not found' }
  }

  return {
    title: `${lesson.meta.title} | ${trackConfig.title} track | Multicorn Learn`,
    description: lesson.meta.description,
    openGraph: {
      title: lesson.meta.title,
      description: lesson.meta.description,
      type: 'article',
      url: `${SITE_URL}${trackConfig.basePath}/${lesson.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: lesson.meta.title,
      description: lesson.meta.description,
    },
  }
}

export default async function Course4MindstudioLessonPage({ params }: LessonPageProps) {
  if (!isCourse4Enabled()) {
    redirect('/learn')
  }

  const { slug } = await params
  const lesson = getCourse4Lesson(TRACK, slug)

  if (!lesson) {
    notFound()
  }

  const navigation = getCourse4LessonNavigation(TRACK, slug)
  const tocItems = extractTableOfContents(lesson.content)
  const lessonsOrdered = getAllCourse4Lessons(TRACK)
  const lessonIndex = lessonsOrdered.findIndex((l) => l.slug === slug)
  const lessonNumber = lessonIndex >= 0 ? lessonIndex + 1 : null

  const lessonUrl = `${SITE_URL}${trackConfig.basePath}/${lesson.slug}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Course',
        '@id': COURSE_ID,
        name: `Build with ${trackConfig.title}`,
        description: trackConfig.description,
        provider: {
          '@type': 'Organization',
          name: 'Multicorn',
          url: SITE_URL,
        },
        hasCourseInstance: {
          '@type': 'CourseInstance',
          courseMode: 'online',
          url: `${SITE_URL}${trackConfig.basePath}`,
        },
      },
      {
        '@type': 'LearningResource',
        '@id': `${lessonUrl}#lesson`,
        name: lesson.meta.title,
        description: lesson.meta.description,
        url: lessonUrl,
        learningResourceType: 'Lesson',
        isPartOf: { '@id': COURSE_ID },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <main className="px-6 pb-20 pt-16 sm:pb-28 sm:pt-24">
        <div className="mx-auto max-w-content">
          <div className="lg:grid lg:grid-cols-[1fr_250px] lg:gap-12">
            <article className="mx-auto max-w-3xl lg:mx-0">
              <nav aria-label="Breadcrumb" className="mb-8">
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
                    <Chevron />
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
                    <Chevron />
                  </li>
                  <li>
                    <Link
                      href="/learn/course-4"
                      className="text-text-secondary transition-colors hover:text-text-primary"
                    >
                      Course 4
                    </Link>
                  </li>
                  <li aria-hidden="true">
                    <Chevron />
                  </li>
                  <li>
                    <Link
                      href={trackConfig.basePath}
                      className="text-text-secondary transition-colors hover:text-text-primary"
                    >
                      {trackConfig.title}
                    </Link>
                  </li>
                  <li aria-hidden="true">
                    <Chevron />
                  </li>
                  <li>
                    <span className="font-medium text-text-primary" aria-current="page">
                      {lesson.meta.title}
                    </span>
                  </li>
                </ol>
              </nav>

              <header className="mb-10">
                {lessonNumber !== null ? (
                  <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-course-4-accent">
                    Lesson {lessonNumber} of {lessonsOrdered.length}
                  </p>
                ) : null}
                <h1 className="mb-4 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
                  {lesson.meta.title}
                </h1>
                <p className="mb-4 text-lg leading-relaxed text-text-secondary">
                  {lesson.meta.description}
                </p>
                <div className="flex flex-wrap items-center gap-3 text-sm text-text-tertiary">
                  <span>{lesson.meta.estimatedMinutes} min read</span>
                </div>
              </header>

              <div className="mb-6 mt-3">
                <MobileTableOfContents items={tocItems} />
              </div>

              <div className="prose-multicorn">
                <MDXRemote
                  source={lesson.content}
                  components={course4MindstudioComponents}
                  options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
                />
              </div>

              <LessonCompleteButton
                slug={slug}
                storageKey={trackConfig.progressStorageKey}
                courseAccent="course-4"
              />

              <LessonThumbsFeedback
                courseSlug="course-4-mindstudio"
                lessonSlug={slug}
                courseAccent="course-4"
              />

              {!navigation.next ? (
                <CourseFeedbackForm
                  courseName={trackConfig.title}
                  courseSlug="course-4-mindstudio"
                  lessonSlug={slug}
                  courseAccent="course-4"
                />
              ) : null}

              <LessonNavigation
                basePath={trackConfig.basePath}
                navigation={navigation}
                courseAccent="course-4"
              />
            </article>

            <TableOfContents items={tocItems} />
          </div>
        </div>
      </main>
    </>
  )
}

function Chevron() {
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
