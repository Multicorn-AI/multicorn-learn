import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { COURSE_2_TRACK_SLUGS, type Course2Track } from '@/lib/course-2-track-config'

const COURSE_2_CONTENT_ROOT = path.join(process.cwd(), 'content', 'learn', 'course-2')

function trackDir(track: Course2Track): string {
  return path.join(COURSE_2_CONTENT_ROOT, track)
}

export interface Course2LessonMeta {
  readonly title: string
  readonly description: string
  readonly order: number
  readonly estimatedMinutes: number
  readonly outcome: string
  readonly date: string
}

export interface Course2Lesson {
  readonly slug: string
  readonly track: Course2Track
  readonly meta: Course2LessonMeta
  readonly content: string
}

export interface Course2LessonNavigation {
  readonly prev: { readonly slug: string; readonly title: string } | null
  readonly next: { readonly slug: string; readonly title: string } | null
}

const REQUIRED_STRING_FIELDS = ['title', 'description', 'outcome', 'date'] as const
const REQUIRED_NUMBER_FIELDS = ['order', 'estimatedMinutes'] as const

function parseFrontmatter(
  track: Course2Track,
  slug: string,
  data: Record<string, unknown>,
): Course2LessonMeta {
  for (const field of REQUIRED_STRING_FIELDS) {
    const value = data[field]
    if (typeof value !== 'string' || value.trim() === '') {
      throw new Error(
        `Course 2 lesson "${track}/${slug}" is missing required string frontmatter field "${field}". Add it to content/learn/course-2/${track}/${slug}.mdx.`,
      )
    }
  }
  for (const field of REQUIRED_NUMBER_FIELDS) {
    const value = data[field]
    if (typeof value !== 'number' || !Number.isFinite(value) || value < 0) {
      throw new Error(
        `Course 2 lesson "${track}/${slug}" is missing required positive number frontmatter field "${field}".`,
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

export function getCourse2Lesson(track: Course2Track, slug: string): Course2Lesson | null {
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

// Build-time only. Six lessons per track means per-file existsSync + readFileSync is fine.
// If a track grows past ~50 lessons, batch the read once and cache.
export function getAllCourse2Lessons(track: Course2Track): readonly Course2Lesson[] {
  const dir = trackDir(track)
  if (!fs.existsSync(dir)) {
    return []
  }

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'))

  return files
    .map((file) => getCourse2Lesson(track, file.replace(/\.mdx$/, '')))
    .filter((lesson): lesson is Course2Lesson => lesson !== null)
    .sort((a, b) => a.meta.order - b.meta.order)
}

export function getAllCourse2LessonSlugs(track: Course2Track): readonly string[] {
  const dir = trackDir(track)
  if (!fs.existsSync(dir)) {
    return []
  }

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
}

export function getCourse2LessonNavigation(
  track: Course2Track,
  slug: string,
): Course2LessonNavigation {
  const lessons = getAllCourse2Lessons(track)
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

export { COURSE_2_TRACK_SLUGS }
export type { Course2Track }
