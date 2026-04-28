import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { COURSE_4_TRACK_SLUGS, type Course4Track } from '@/lib/course-4-track-config'
import type { LessonNavigationData } from '@/lib/lesson-navigation'

const COURSE_4_CONTENT_ROOT = path.join(process.cwd(), 'content', 'learn', 'course-4')

function trackDir(track: Course4Track): string {
  return path.join(COURSE_4_CONTENT_ROOT, track)
}

export interface Course4LessonMeta {
  readonly title: string
  readonly description: string
  readonly order: number
  readonly estimatedMinutes: number
}

export interface Course4Lesson {
  readonly slug: string
  readonly track: Course4Track
  readonly meta: Course4LessonMeta
  readonly content: string
}

export type Course4LessonNavigation = LessonNavigationData

const REQUIRED_STRING_FIELDS = ['title', 'description'] as const
const REQUIRED_NUMBER_FIELDS = ['order', 'estimatedMinutes'] as const

function parseFrontmatter(
  track: Course4Track,
  slug: string,
  data: Record<string, unknown>,
): Course4LessonMeta {
  for (const field of REQUIRED_STRING_FIELDS) {
    const value = data[field]
    if (typeof value !== 'string' || value.trim() === '') {
      throw new Error(
        `Course 4 lesson "${track}/${slug}" is missing required string frontmatter field "${field}". Add it to content/learn/course-4/${track}/${slug}.mdx.`,
      )
    }
  }
  for (const field of REQUIRED_NUMBER_FIELDS) {
    const value = data[field]
    if (typeof value !== 'number' || !Number.isFinite(value) || value < 0) {
      throw new Error(
        `Course 4 lesson "${track}/${slug}" is missing required positive number frontmatter field "${field}".`,
      )
    }
  }

  return {
    title: data.title as string,
    description: data.description as string,
    order: data.order as number,
    estimatedMinutes: data.estimatedMinutes as number,
  }
}

export function getCourse4Lesson(track: Course4Track, slug: string): Course4Lesson | null {
  const filePath = path.join(trackDir(track), `${slug}.mdx`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  return {
    slug,
    track,
    meta: parseFrontmatter(track, slug, data),
    content,
  }
}

export function getAllCourse4Lessons(track: Course4Track): readonly Course4Lesson[] {
  const dir = trackDir(track)
  if (!fs.existsSync(dir)) {
    return []
  }

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'))

  return files
    .map((file) => getCourse4Lesson(track, file.replace(/\.mdx$/, '')))
    .filter((lesson): lesson is Course4Lesson => lesson !== null)
    .sort((a, b) => a.meta.order - b.meta.order)
}

export function getAllCourse4LessonSlugs(track: Course4Track): readonly string[] {
  const dir = trackDir(track)
  if (!fs.existsSync(dir)) {
    return []
  }

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
}

export function getCourse4LessonNavigation(
  track: Course4Track,
  slug: string,
): Course4LessonNavigation {
  const lessons = getAllCourse4Lessons(track)
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

export { COURSE_4_TRACK_SLUGS }
export type { Course4Track }
