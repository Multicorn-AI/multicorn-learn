import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { ArticleNavigation, LearnArticle, LearnArticleMeta } from '@/lib/learn'

const LEARN_AGENTS_DIR = path.join(process.cwd(), 'content', 'learn', 'agents')

export type AgentSafetyGuide = LearnArticle
export type AgentSafetyGuideMeta = LearnArticleMeta

interface ValidatedFrontmatter {
  readonly title: string
  readonly description: string
  readonly order: number
  readonly tags: readonly string[]
}

function validateFrontmatter(slug: string, data: Record<string, unknown>): ValidatedFrontmatter {
  if (typeof data.title !== 'string' || data.title.trim() === '') {
    throw new Error(`Agent guide "${slug}" is missing a non-empty "title" in frontmatter`)
  }
  if (typeof data.description !== 'string' || data.description.trim() === '') {
    throw new Error(`Agent guide "${slug}" is missing a non-empty "description" in frontmatter`)
  }
  if (typeof data.order !== 'number' || !Number.isFinite(data.order)) {
    throw new Error(
      `Agent guide "${slug}" is missing a finite numeric "order" in frontmatter (got ${typeof data.order})`,
    )
  }

  let tags: readonly string[] = []
  if (data.tags !== undefined) {
    if (!Array.isArray(data.tags) || !data.tags.every((t) => typeof t === 'string')) {
      throw new Error(
        `Agent guide "${slug}" has malformed "tags" in frontmatter (expected an array of strings)`,
      )
    }
    tags = data.tags
  }

  return {
    title: data.title,
    description: data.description,
    order: data.order,
    tags,
  }
}

export function getAgentGuide(slug: string): AgentSafetyGuide | null {
  const filePath = path.join(LEARN_AGENTS_DIR, `${slug}.mdx`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  const validated = validateFrontmatter(slug, data)

  return {
    slug,
    meta: {
      title: validated.title,
      description: validated.description,
      date: typeof data.date === 'string' ? data.date : '',
      author: typeof data.author === 'string' ? data.author : '',
      ogImage: typeof data.ogImage === 'string' ? data.ogImage : '',
      tags: validated.tags,
      order: validated.order,
      series: typeof data.series === 'string' ? data.series : '',
    },
    content,
  }
}

export function getAllAgentGuides(): readonly AgentSafetyGuide[] {
  if (!fs.existsSync(LEARN_AGENTS_DIR)) {
    return []
  }

  const files = fs.readdirSync(LEARN_AGENTS_DIR).filter((f) => f.endsWith('.mdx'))

  const guides = files
    .map((file) => getAgentGuide(file.replace(/\.mdx$/, '')))
    .filter((guide): guide is AgentSafetyGuide => guide !== null)
    .sort((a, b) => a.meta.order - b.meta.order)

  return guides
}

export function getAllAgentSlugs(): readonly string[] {
  if (!fs.existsSync(LEARN_AGENTS_DIR)) {
    return []
  }

  return fs
    .readdirSync(LEARN_AGENTS_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
}

export function getAgentGuideNavigation(slug: string): ArticleNavigation {
  const guides = getAllAgentGuides()
  const index = guides.findIndex((g) => g.slug === slug)

  if (index === -1) {
    return { prev: null, next: null }
  }

  const prevGuide = index > 0 ? guides[index - 1] : undefined
  const prev = prevGuide ? { slug: prevGuide.slug, title: prevGuide.meta.title } : null

  const nextGuide = index < guides.length - 1 ? guides[index + 1] : undefined
  const next = nextGuide ? { slug: nextGuide.slug, title: nextGuide.meta.title } : null

  return { prev, next }
}
