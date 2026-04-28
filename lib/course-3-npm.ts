import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Course3LessonMeta, Course3Lesson } from '@/lib/course-3'
import type { LessonNavigationData } from '@/lib/lesson-navigation'

const COURSE_3_NPM_CONTENT_ROOT = path.join(process.cwd(), 'content', 'learn', 'course-3', 'npm')

const REQUIRED_STRING_FIELDS = ['title', 'description', 'outcome', 'date'] as const
const REQUIRED_NUMBER_FIELDS = ['order', 'estimatedMinutes'] as const

function parseFrontmatter(slug: string, data: Record<string, unknown>): Course3LessonMeta {
  for (const field of REQUIRED_STRING_FIELDS) {
    const value = data[field]
    if (typeof value !== 'string' || value.trim() === '') {
      throw new Error(
        `Course 3 npm lesson "${slug}" is missing required string frontmatter field "${field}". Add it to content/learn/course-3/npm/${slug}.mdx.`,
      )
    }
  }
  for (const field of REQUIRED_NUMBER_FIELDS) {
    const value = data[field]
    if (typeof value !== 'number' || !Number.isFinite(value) || value < 0) {
      throw new Error(
        `Course 3 npm lesson "${slug}" is missing required positive number frontmatter field "${field}".`,
      )
    }
  }

  return {
    title: data.title as string,
    description: data.description as string,
    order: data.order as number,
    estimatedMinutes: data.estimatedMinutes as number,
    outcome: data.outcome as string,
    date: data.date as string,
  }
}

export function getCourse3NpmLesson(slug: string): Course3Lesson | null {
  const filePath = path.join(COURSE_3_NPM_CONTENT_ROOT, `${slug}.mdx`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  return {
    slug,
    meta: parseFrontmatter(slug, data),
    content,
  }
}

export function getAllCourse3NpmLessons(): readonly Course3Lesson[] {
  if (!fs.existsSync(COURSE_3_NPM_CONTENT_ROOT)) {
    return []
  }

  const files = fs.readdirSync(COURSE_3_NPM_CONTENT_ROOT).filter((f) => f.endsWith('.mdx'))

  return files
    .map((file) => getCourse3NpmLesson(file.replace(/\.mdx$/, '')))
    .filter((lesson): lesson is Course3Lesson => lesson !== null)
    .sort((a, b) => a.meta.order - b.meta.order)
}

export function getAllCourse3NpmLessonSlugs(): readonly string[] {
  if (!fs.existsSync(COURSE_3_NPM_CONTENT_ROOT)) {
    return []
  }

  return fs
    .readdirSync(COURSE_3_NPM_CONTENT_ROOT)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
}

export function getCourse3NpmLessonNavigation(slug: string): LessonNavigationData {
  const lessons = getAllCourse3NpmLessons()
  const index = lessons.findIndex((l) => l.slug === slug)

  if (index === -1) {
    return { prev: null, next: null }
  }

  const prevLesson = index > 0 ? lessons[index - 1] : undefined
  const prev = prevLesson ? { slug: prevLesson.slug, title: prevLesson.meta.title } : null

  const nextLesson = index < lessons.length - 1 ? lessons[index + 1] : undefined
  const next = nextLesson ? { slug: nextLesson.slug, title: nextLesson.meta.title } : null

  return { prev, next }
}
