import { describe, expect, it } from 'vitest'
import {
  getAllCourse4LessonSlugs,
  getAllCourse4Lessons,
  getCourse4Lesson,
  getCourse4LessonNavigation,
  COURSE_4_TRACK_SLUGS,
  type Course4Track,
} from '@/lib/course-4'

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

const TRACK_NAV_FIXTURES: Record<
  Course4Track,
  {
    first: string
    second: string
    middle: string
    beforeMiddle: string
    afterMiddle: string
    penultimate: string
    last: string
  }
> = {
  autohive: {
    first: 'creating-your-first-agent',
    second: 'connecting-tools',
    beforeMiddle: 'connecting-tools',
    middle: 'scheduling-and-triggers',
    afterMiddle: 'agent-teams',
    penultimate: 'agent-teams',
    last: 'permissions-and-review',
  },
  dust: {
    first: 'connecting-your-data',
    second: 'building-your-first-agent',
    beforeMiddle: 'building-your-first-agent',
    middle: 'permissions-and-spaces',
    afterMiddle: 'multi-agent-workflows',
    penultimate: 'multi-agent-workflows',
    last: 'reviewing-and-improving',
  },
  mindstudio: {
    first: 'your-first-workflow',
    second: 'choosing-models',
    beforeMiddle: 'choosing-models',
    middle: 'branching-and-logic',
    afterMiddle: 'connecting-external-tools',
    penultimate: 'connecting-external-tools',
    last: 'testing-and-publishing',
  },
  n8n: {
    first: 'your-first-workflow',
    second: 'triggers-and-scheduling',
    beforeMiddle: 'triggers-and-scheduling',
    middle: 'ai-nodes-and-llm-calls',
    afterMiddle: 'error-handling-and-branching',
    penultimate: 'error-handling-and-branching',
    last: 'self-hosting-and-credentials',
  },
}

describe.each(COURSE_4_TRACK_SLUGS)('lib/course-4 - %s track', (track) => {
  const fix = TRACK_NAV_FIXTURES[track]

  it('has exactly 5 lessons', () => {
    const lessons = getAllCourse4Lessons(track)
    expect(lessons).toHaveLength(5)
  })

  it('all slugs are valid (lowercase, hyphens, no spaces)', () => {
    const slugs = getAllCourse4LessonSlugs(track)
    for (const slug of slugs) {
      expect(slug).toMatch(SLUG_PATTERN)
    }
  })

  it('every lesson has required frontmatter (title, description, order)', () => {
    for (const lesson of getAllCourse4Lessons(track)) {
      expect(lesson.meta.title.trim()).not.toBe('')
      expect(lesson.meta.description.trim()).not.toBe('')
      expect(typeof lesson.meta.order).toBe('number')
      expect(lesson.meta.order).toBeGreaterThan(0)
    }
  })

  it('lessons are sorted by order', () => {
    const lessons = getAllCourse4Lessons(track)
    const orders = lessons.map((l) => l.meta.order)
    expect(orders).toEqual([...orders].sort((a, b) => a - b))
    expect(orders[0]).toBe(1)
    expect(orders[orders.length - 1]).toBe(5)
  })

  it('slug list matches lessons list', () => {
    const slugs = getAllCourse4LessonSlugs(track)
    const lessonSlugs = getAllCourse4Lessons(track).map((l) => l.slug)
    expect([...slugs].sort()).toEqual([...lessonSlugs].sort())
  })

  it('navigation returns null prev for the first lesson', () => {
    const nav = getCourse4LessonNavigation(track, fix.first)
    expect(nav.prev).toBeNull()
    expect(nav.next).not.toBeNull()
    expect(nav.next?.slug).toBe(fix.second)
  })

  it('navigation returns null next for the last lesson', () => {
    const nav = getCourse4LessonNavigation(track, fix.last)
    expect(nav.next).toBeNull()
    expect(nav.prev).not.toBeNull()
    expect(nav.prev?.slug).toBe(fix.penultimate)
  })

  it('navigation returns both prev and next for a middle lesson', () => {
    const nav = getCourse4LessonNavigation(track, fix.middle)
    expect(nav.prev?.slug).toBe(fix.beforeMiddle)
    expect(nav.next?.slug).toBe(fix.afterMiddle)
  })

  it('navigation returns nulls for an unknown slug', () => {
    const nav = getCourse4LessonNavigation(track, 'not-a-real-slug')
    expect(nav.prev).toBeNull()
    expect(nav.next).toBeNull()
  })

  it('getCourse4Lesson returns null for an unknown slug', () => {
    expect(getCourse4Lesson(track, 'does-not-exist')).toBeNull()
  })

  it('loads without errors', () => {
    expect(() => getAllCourse4Lessons(track)).not.toThrow()
  })
})
