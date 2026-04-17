import { createElement } from 'react'
import { describe, expect, it } from 'vitest'
import { extractTextFromChildren } from '@/lib/extract-text-from-children'

describe('extractTextFromChildren', () => {
  it('returns plain strings unchanged', () => {
    expect(extractTextFromChildren('Hello world')).toBe('Hello world')
  })

  it('coerces numbers to strings', () => {
    expect(extractTextFromChildren(42)).toBe('42')
    expect(extractTextFromChildren(0)).toBe('0')
  })

  it('returns empty string for null, undefined, false', () => {
    expect(extractTextFromChildren(null)).toBe('')
    expect(extractTextFromChildren(undefined)).toBe('')
    expect(extractTextFromChildren(false)).toBe('')
  })

  it('joins arrays of mixed primitives', () => {
    expect(extractTextFromChildren(['a', 'b', 'c'])).toBe('abc')
    expect(extractTextFromChildren(['Lesson ', 1, ': intro'])).toBe('Lesson 1: intro')
  })

  it('walks into React elements and reads their children', () => {
    const element = createElement('span', null, 'inner')
    expect(extractTextFromChildren(element)).toBe('inner')
  })

  it('walks nested elements recursively', () => {
    const inner = createElement('em', null, 'bold')
    const outer = createElement('p', null, 'before ', inner, ' after')
    expect(extractTextFromChildren(outer)).toBe('before bold after')
  })

  it('returns empty string for elements with no children prop', () => {
    const element = createElement('br')
    expect(extractTextFromChildren(element)).toBe('')
  })
})
