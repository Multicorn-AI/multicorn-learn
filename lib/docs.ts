import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const DOCS_DIR = path.join(process.cwd(), 'content', 'docs')

export interface DocSectionMeta {
  readonly title: string
  readonly description: string
  readonly order: number
}

export interface DocSection {
  readonly slug: string
  readonly meta: DocSectionMeta
  readonly content: string
}

export interface DocNavigation {
  readonly prev: { readonly slug: string; readonly title: string } | null
  readonly next: { readonly slug: string; readonly title: string } | null
}

export function getDocSection(slug: string): DocSection | null {
  const filePath = path.join(DOCS_DIR, `${slug}.mdx`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  return {
    slug,
    meta: {
      title: data.title ?? '',
      description: data.description ?? '',
      order: data.order ?? 0,
    },
    content,
  }
}

export function getAllDocSections(): readonly DocSection[] {
  if (!fs.existsSync(DOCS_DIR)) {
    return []
  }

  const files = fs.readdirSync(DOCS_DIR).filter((f) => f.endsWith('.mdx'))

  const sections = files
    .map((file) => getDocSection(file.replace(/\.mdx$/, '')))
    .filter((section): section is DocSection => section !== null)
    .sort((a, b) => a.meta.order - b.meta.order)

  return sections
}

export function getAllDocSlugs(): readonly string[] {
  if (!fs.existsSync(DOCS_DIR)) {
    return []
  }

  return fs
    .readdirSync(DOCS_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
}

export function getDocNavigation(slug: string): DocNavigation {
  const sections = getAllDocSections()
  const index = sections.findIndex((s) => s.slug === slug)

  if (index === -1) {
    return { prev: null, next: null }
  }

  const prevSection = index > 0 ? sections[index - 1] : undefined
  const prev = prevSection ? { slug: prevSection.slug, title: prevSection.meta.title } : null

  const nextSection = index < sections.length - 1 ? sections[index + 1] : undefined
  const next = nextSection ? { slug: nextSection.slug, title: nextSection.meta.title } : null

  return { prev, next }
}
