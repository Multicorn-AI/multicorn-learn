import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const GUIDES_DIR = path.join(process.cwd(), 'content', 'guides')

export interface GuideMeta {
  readonly title: string
  readonly description: string
  readonly published: string
}

export interface Guide {
  readonly slug: string
  readonly meta: GuideMeta
  readonly content: string
}

export function getGuideBySlug(slug: string): Guide | null {
  const filePath = path.join(GUIDES_DIR, `${slug}.mdx`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  try {
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(raw)

    return {
      slug,
      meta: {
        title: data.title ?? '',
        description: data.description ?? '',
        published: data.published ?? '',
      },
      content,
    }
  } catch (error) {
    console.error(`Error parsing guide ${slug}:`, error)
    return null
  }
}

export function getAllGuides(): readonly Guide[] {
  if (!fs.existsSync(GUIDES_DIR)) {
    return []
  }

  const files = fs.readdirSync(GUIDES_DIR).filter((f) => f.endsWith('.mdx'))

  const guides = files
    .map((file) => getGuideBySlug(file.replace(/\.mdx$/, '')))
    .filter((guide): guide is Guide => guide !== null)
    .sort((a, b) => new Date(b.meta.published).getTime() - new Date(a.meta.published).getTime())

  return guides
}

export function getAllGuideSlugs(): readonly string[] {
  if (!fs.existsSync(GUIDES_DIR)) {
    return []
  }

  return fs
    .readdirSync(GUIDES_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
}
