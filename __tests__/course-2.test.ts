import { describe, expect, it } from 'vitest'
import {
  getAllCourse2LessonSlugs,
  getAllCourse2Lessons,
  getCourse2Lesson,
  getCourse2LessonNavigation,
} from '@/lib/course-2'

describe('lib/course-2 - cursor track', () => {
  describe('getCourse2Lesson', () => {
    it('returns null for an unknown slug', () => {
      expect(getCourse2Lesson('cursor', 'does-not-exist')).toBeNull()
    })

    it('loads the installing-cursor lesson with valid frontmatter', () => {
      const lesson = getCourse2Lesson('cursor', 'installing-cursor')
      expect(lesson).not.toBeNull()
      if (!lesson) return

      expect(lesson.slug).toBe('installing-cursor')
      expect(lesson.track).toBe('cursor')
      expect(lesson.meta.title).toBeTruthy()
      expect(lesson.meta.description).toBeTruthy()
      expect(lesson.meta.outcome).toBeTruthy()
      expect(typeof lesson.meta.order).toBe('number')
      expect(lesson.meta.order).toBe(1)
      expect(lesson.meta.estimatedMinutes).toBeGreaterThan(0)
      expect(lesson.content.length).toBeGreaterThan(0)
    })
  })

  describe('getAllCourse2Lessons', () => {
    it('returns six lessons sorted by order', () => {
      const lessons = getAllCourse2Lessons('cursor')
      expect(lessons).toHaveLength(6)

      const orders = lessons.map((l) => l.meta.order)
      expect(orders).toEqual([...orders].sort((a, b) => a - b))
      expect(orders[0]).toBe(1)
      expect(orders[orders.length - 1]).toBe(6)
    })

    it('every lesson has a non-empty title and outcome', () => {
      for (const lesson of getAllCourse2Lessons('cursor')) {
        expect(lesson.meta.title.trim()).not.toBe('')
        expect(lesson.meta.outcome.trim()).not.toBe('')
      }
    })
  })

  describe('getAllCourse2LessonSlugs', () => {
    it('matches the slugs returned by getAllCourse2Lessons', () => {
      const slugs = getAllCourse2LessonSlugs('cursor')
      const lessonSlugs = getAllCourse2Lessons('cursor').map((l) => l.slug)
      expect([...slugs].sort()).toEqual([...lessonSlugs].sort())
    })

    it('includes the expected canonical slugs', () => {
      const slugs = getAllCourse2LessonSlugs('cursor')
      expect(slugs).toContain('installing-cursor')
      expect(slugs).toContain('your-first-prompt')
      expect(slugs).toContain('whats-next')
    })
  })

  describe('getCourse2LessonNavigation', () => {
    it('returns null prev for the first lesson', () => {
      const nav = getCourse2LessonNavigation('cursor', 'installing-cursor')
      expect(nav.prev).toBeNull()
      expect(nav.next).not.toBeNull()
      expect(nav.next?.slug).toBe('your-first-prompt')
    })

    it('returns null next for the last lesson', () => {
      const nav = getCourse2LessonNavigation('cursor', 'whats-next')
      expect(nav.next).toBeNull()
      expect(nav.prev).not.toBeNull()
      expect(nav.prev?.slug).toBe('writing-tests')
    })

    it('returns both prev and next for a middle lesson', () => {
      const nav = getCourse2LessonNavigation('cursor', 'reading-the-code')
      expect(nav.prev?.slug).toBe('your-first-prompt')
      expect(nav.next?.slug).toBe('iterating-on-your-app')
    })

    it('returns nulls for an unknown slug', () => {
      const nav = getCourse2LessonNavigation('cursor', 'not-a-real-slug')
      expect(nav.prev).toBeNull()
      expect(nav.next).toBeNull()
    })
  })
})

describe('lib/course-2 - claude-code track', () => {
  it('returns six lessons sorted by order', () => {
    const lessons = getAllCourse2Lessons('claude-code')
    expect(lessons).toHaveLength(6)

    const orders = lessons.map((l) => l.meta.order)
    expect(orders).toEqual([...orders].sort((a, b) => a - b))
    expect(orders[0]).toBe(1)
    expect(orders[orders.length - 1]).toBe(6)
  })

  it('exposes the expected canonical slugs', () => {
    const slugs = getAllCourse2LessonSlugs('claude-code')
    expect(slugs).toContain('installing-claude-code')
    expect(slugs).toContain('your-first-task')
    expect(slugs).toContain('file-editing-model')
    expect(slugs).toContain('using-mcp')
    expect(slugs).toContain('writing-tests')
    expect(slugs).toContain('whats-next')
  })

  it('every lesson has a non-empty title, outcome, and content', () => {
    for (const lesson of getAllCourse2Lessons('claude-code')) {
      expect(lesson.track).toBe('claude-code')
      expect(lesson.meta.title.trim()).not.toBe('')
      expect(lesson.meta.outcome.trim()).not.toBe('')
      expect(lesson.content.length).toBeGreaterThan(0)
    }
  })

  it('navigation links the first and last lessons correctly', () => {
    const first = getCourse2LessonNavigation('claude-code', 'installing-claude-code')
    expect(first.prev).toBeNull()
    expect(first.next?.slug).toBe('your-first-task')

    const last = getCourse2LessonNavigation('claude-code', 'whats-next')
    expect(last.next).toBeNull()
    expect(last.prev?.slug).toBe('writing-tests')
  })
})
