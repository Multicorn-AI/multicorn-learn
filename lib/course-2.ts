import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const CURSOR_LESSONS_DIR = path.join(process.cwd(), 'content', 'learn', 'course-2', 'cursor')

export interface CursorLessonMeta {
  readonly title: string
  readonly description: string
  readonly order: number
  readonly estimatedMinutes: number
  readonly outcome: string
  readonly date: string
}

export interface CursorLesson {
  readonly slug: string
  readonly meta: CursorLessonMeta
  readonly content: string
}

export interface CursorLessonNavigation {
  readonly prev: { readonly slug: string; readonly title: string } | null
  readonly next: { readonly slug: string; readonly title: string } | null
}

const REQUIRED_STRING_FIELDS = ['title', 'description', 'outcome', 'date'] as const
const REQUIRED_NUMBER_FIELDS = ['order', 'estimatedMinutes'] as const

function parseFrontmatter(slug: string, data: Record<string, unknown>): CursorLessonMeta {
  for (const field of REQUIRED_STRING_FIELDS) {
    const value = data[field]
    if (typeof value !== 'string' || value.trim() === '') {
      throw new Error(
        `Cursor lesson "${slug}" is missing required string frontmatter field "${field}". Add it to content/learn/course-2/cursor/${slug}.mdx.`,
      )
    }
  }
  for (const field of REQUIRED_NUMBER_FIELDS) {
    const value = data[field]
    if (typeof value !== 'number' || !Number.isFinite(value) || value < 0) {
      throw new Error(
        `Cursor lesson "${slug}" is missing required positive number frontmatter field "${field}".`,
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

export function getCursorLesson(slug: string): CursorLesson | null {
  const filePath = path.join(CURSOR_LESSONS_DIR, `${slug}.mdx`)

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

// Build-time only. Six lessons means per-file existsSync + readFileSync is fine.
// If this list grows past ~50, batch the read once and cache.
export function getAllCursorLessons(): readonly CursorLesson[] {
  if (!fs.existsSync(CURSOR_LESSONS_DIR)) {
    return []
  }

  const files = fs.readdirSync(CURSOR_LESSONS_DIR).filter((f) => f.endsWith('.mdx'))

  const lessons = files
    .map((file) => getCursorLesson(file.replace(/\.mdx$/, '')))
    .filter((lesson): lesson is CursorLesson => lesson !== null)
    .sort((a, b) => a.meta.order - b.meta.order)

  return lessons
}

export function getAllCursorLessonSlugs(): readonly string[] {
  if (!fs.existsSync(CURSOR_LESSONS_DIR)) {
    return []
  }

  return fs
    .readdirSync(CURSOR_LESSONS_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
}

export function getCursorLessonNavigation(slug: string): CursorLessonNavigation {
  const lessons = getAllCursorLessons()
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
