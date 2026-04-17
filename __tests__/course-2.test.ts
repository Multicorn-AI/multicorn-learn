import { describe, expect, it } from 'vitest'
import {
  getAllCursorLessonSlugs,
  getAllCursorLessons,
  getCursorLesson,
  getCursorLessonNavigation,
} from '@/lib/course-2'

describe('lib/course-2', () => {
  describe('getCursorLesson', () => {
    it('returns null for an unknown slug', () => {
      expect(getCursorLesson('does-not-exist')).toBeNull()
    })

    it('loads the installing-cursor lesson with valid frontmatter', () => {
      const lesson = getCursorLesson('installing-cursor')
      expect(lesson).not.toBeNull()
      if (!lesson) return

      expect(lesson.slug).toBe('installing-cursor')
      expect(lesson.meta.title).toBeTruthy()
      expect(lesson.meta.description).toBeTruthy()
      expect(lesson.meta.outcome).toBeTruthy()
      expect(typeof lesson.meta.order).toBe('number')
      expect(lesson.meta.order).toBe(1)
      expect(lesson.meta.estimatedMinutes).toBeGreaterThan(0)
      expect(lesson.content.length).toBeGreaterThan(0)
    })
  })

  describe('getAllCursorLessons', () => {
    it('returns six lessons sorted by order', () => {
      const lessons = getAllCursorLessons()
      expect(lessons).toHaveLength(6)

      const orders = lessons.map((l) => l.meta.order)
      expect(orders).toEqual([...orders].sort((a, b) => a - b))
      expect(orders[0]).toBe(1)
      expect(orders[orders.length - 1]).toBe(6)
    })

    it('every lesson has a non-empty title and outcome', () => {
      for (const lesson of getAllCursorLessons()) {
        expect(lesson.meta.title.trim()).not.toBe('')
        expect(lesson.meta.outcome.trim()).not.toBe('')
      }
    })
  })

  describe('getAllCursorLessonSlugs', () => {
    it('matches the slugs returned by getAllCursorLessons', () => {
      const slugs = getAllCursorLessonSlugs()
      const lessonSlugs = getAllCursorLessons().map((l) => l.slug)
      expect([...slugs].sort()).toEqual([...lessonSlugs].sort())
    })

    it('includes the expected canonical slugs', () => {
      const slugs = getAllCursorLessonSlugs()
      expect(slugs).toContain('installing-cursor')
      expect(slugs).toContain('your-first-prompt')
      expect(slugs).toContain('whats-next')
    })
  })

  describe('getCursorLessonNavigation', () => {
    it('returns null prev for the first lesson', () => {
      const nav = getCursorLessonNavigation('installing-cursor')
      expect(nav.prev).toBeNull()
      expect(nav.next).not.toBeNull()
      expect(nav.next?.slug).toBe('your-first-prompt')
    })

    it('returns null next for the last lesson', () => {
      const nav = getCursorLessonNavigation('whats-next')
      expect(nav.next).toBeNull()
      expect(nav.prev).not.toBeNull()
      expect(nav.prev?.slug).toBe('writing-tests')
    })

    it('returns both prev and next for a middle lesson', () => {
      const nav = getCursorLessonNavigation('reading-the-code')
      expect(nav.prev?.slug).toBe('your-first-prompt')
      expect(nav.next?.slug).toBe('iterating-on-your-app')
    })

    it('returns nulls for an unknown slug', () => {
      const nav = getCursorLessonNavigation('not-a-real-slug')
      expect(nav.prev).toBeNull()
      expect(nav.next).toBeNull()
    })
  })
})
