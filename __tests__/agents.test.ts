import { describe, expect, it } from 'vitest'
import {
  getAgentGuide,
  getAllAgentGuides,
  getAllAgentSlugs,
  getAgentGuideNavigation,
} from '@/lib/agents'

const CANONICAL_SLUGS = [
  'what-is-an-ai-agent',
  'why-ai-agents-need-permissions',
  'how-to-evaluate-if-an-agent-is-safe-to-use',
  'what-multicorn-shield-does',
] as const

describe('lib/agents', () => {
  describe('getAgentGuide', () => {
    it('returns null for an unknown slug', () => {
      expect(getAgentGuide('does-not-exist')).toBeNull()
    })
  })

  describe('getAllAgentGuides', () => {
    it('returns four guides sorted by order', () => {
      const guides = getAllAgentGuides()
      expect(guides).toHaveLength(4)

      const orders = guides.map((g) => g.meta.order)
      expect(orders).toEqual([...orders].sort((a, b) => a - b))
      expect(orders[0]).toBe(1)
      expect(orders[orders.length - 1]).toBe(4)
    })

    it('every guide has a non-empty title, description, and content', () => {
      for (const guide of getAllAgentGuides()) {
        expect(guide.meta.title.trim()).not.toBe('')
        expect(guide.meta.description.trim()).not.toBe('')
        expect(guide.content.length).toBeGreaterThan(0)
      }
    })
  })

  describe('getAllAgentSlugs', () => {
    it('includes the four canonical slugs', () => {
      const slugs = getAllAgentSlugs()
      for (const slug of CANONICAL_SLUGS) {
        expect(slugs).toContain(slug)
      }
    })

    it('matches slugs from getAllAgentGuides', () => {
      const fromSlugs = [...getAllAgentSlugs()].sort()
      const fromGuides = getAllAgentGuides()
        .map((g) => g.slug)
        .sort()
      expect(fromSlugs).toEqual(fromGuides)
    })
  })

  describe('getAgentGuideNavigation', () => {
    it('guide 1 has null prev; guide 4 has null next', () => {
      const first = getAgentGuideNavigation('what-is-an-ai-agent')
      expect(first.prev).toBeNull()
      expect(first.next).not.toBeNull()
      expect(first.next?.slug).toBe('why-ai-agents-need-permissions')

      const last = getAgentGuideNavigation('what-multicorn-shield-does')
      expect(last.next).toBeNull()
      expect(last.prev).not.toBeNull()
      expect(last.prev?.slug).toBe('how-to-evaluate-if-an-agent-is-safe-to-use')
    })

    it('guides 2 and 3 have both prev and next', () => {
      const g2 = getAgentGuideNavigation('why-ai-agents-need-permissions')
      expect(g2.prev).not.toBeNull()
      expect(g2.next).not.toBeNull()
      expect(g2.prev?.slug).toBe('what-is-an-ai-agent')
      expect(g2.next?.slug).toBe('how-to-evaluate-if-an-agent-is-safe-to-use')

      const g3 = getAgentGuideNavigation('how-to-evaluate-if-an-agent-is-safe-to-use')
      expect(g3.prev).not.toBeNull()
      expect(g3.next).not.toBeNull()
      expect(g3.prev?.slug).toBe('why-ai-agents-need-permissions')
      expect(g3.next?.slug).toBe('what-multicorn-shield-does')
    })
  })
})
