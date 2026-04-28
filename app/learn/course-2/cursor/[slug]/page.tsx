import { notFound, redirect } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import type { Metadata } from 'next'
import Link from 'next/link'
import remarkGfm from 'remark-gfm'
import {
  getAllCourse2LessonSlugs,
  getAllCourse2Lessons,
  getCourse2Lesson,
  getCourse2LessonNavigation,
} from '@/lib/course-2'
import { getTrackConfig } from '@/lib/course-2-track-config'
import { extractTableOfContents } from '@/lib/learn'
import { cursorTrackComponents } from '@/lib/mdx-course2-components'
import { CourseFeedbackForm } from '@/components/CourseFeedbackForm'
import { LessonCompleteButton } from '@/components/LessonProgress'
import { LessonNavigation } from '@/components/LessonNavigation'
import { LessonThumbsFeedback } from '@/components/LessonThumbsFeedback'
import { MobileTableOfContents } from '@/components/MobileTableOfContents'
import { TableOfContents } from '@/components/TableOfContents'
import { isCourse2Enabled } from '@/lib/feature-flags'

const SITE_URL = 'https://multicorn.ai'
const TRACK = 'cursor' as const
const trackConfig = getTrackConfig(TRACK)
const COURSE_ID = `${SITE_URL}${trackConfig.basePath}#course`

interface CursorLessonPageProps {
  readonly params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getAllCourse2LessonSlugs(TRACK)
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: CursorLessonPageProps): Promise<Metadata> {
  const { slug } = await params
  const lesson = getCourse2Lesson(TRACK, slug)

  if (!lesson) {
    return { title: 'Lesson not found' }
  }

  return {
    title: `${lesson.meta.title} | Cursor track | Multicorn Learn`,
    description: lesson.meta.description,
    openGraph: {
      title: lesson.meta.title,
      description: lesson.meta.description,
      type: 'article',
      publishedTime: lesson.meta.date,
      url: `${SITE_URL}${trackConfig.basePath}/${lesson.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: lesson.meta.title,
      description: lesson.meta.description,
    },
  }
}

function formatDate(dateString: string): string {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function CursorLessonPage({ params }: CursorLessonPageProps) {
  if (!isCourse2Enabled()) {
    redirect('/learn')
  }

  const { slug } = await params
  const lesson = getCourse2Lesson(TRACK, slug)

  if (!lesson) {
    notFound()
  }

  const navigation = getCourse2LessonNavigation(TRACK, slug)
  const tocItems = extractTableOfContents(lesson.content)
  const lessonsOrdered = getAllCourse2Lessons(TRACK)
  const lessonIndex = lessonsOrdered.findIndex((l) => l.slug === slug)
  const lessonNumber = lessonIndex >= 0 ? lessonIndex + 1 : null

  const lessonUrl = `${SITE_URL}${trackConfig.basePath}/${lesson.slug}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Course',
        '@id': COURSE_ID,
        name: 'Build with Cursor',
        description:
          'A beginner-friendly track for building a web app with Cursor: install the editor, prompt an AI partner, read the code, iterate, and run tests locally.',
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
        datePublished: lesson.meta.date || undefined,
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
                      href="/learn/course-2"
                      className="text-text-secondary transition-colors hover:text-text-primary"
                    >
                      Course 2
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
                      Cursor
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
                  <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-course-2-accent">
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
                  {lesson.meta.date ? (
                    <>
                      <span aria-hidden="true">&middot;</span>
                      <time dateTime={lesson.meta.date}>{formatDate(lesson.meta.date)}</time>
                    </>
                  ) : null}
                </div>
                <p className="mt-4 rounded-lg border border-border bg-surface-secondary px-4 py-3 text-sm font-medium text-text-primary">
                  <span className="text-text-tertiary">By the end: </span>
                  {lesson.meta.outcome}
                </p>
              </header>

              <div className="mb-6 mt-3">
                <MobileTableOfContents items={tocItems} />
              </div>

              <div className="prose-multicorn">
                <MDXRemote
                  source={lesson.content}
                  components={cursorTrackComponents}
                  options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
                />
              </div>

              <LessonCompleteButton
                slug={slug}
                storageKey={trackConfig.progressStorageKey}
                courseAccent="course-2"
              />

              <LessonThumbsFeedback
                courseSlug="course-2-cursor"
                lessonSlug={slug}
                courseAccent="course-2"
              />

              {!navigation.next ? (
                <CourseFeedbackForm
                  courseName={trackConfig.title}
                  courseSlug="course-2-cursor"
                  lessonSlug={slug}
                  courseAccent="course-2"
                />
              ) : null}

              <LessonNavigation
                basePath={trackConfig.basePath}
                navigation={navigation}
                courseAccent="course-2"
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
