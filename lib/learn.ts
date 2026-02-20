import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const LEARN_AI101_DIR = path.join(process.cwd(), 'content', 'learn', 'ai-101')

export interface LearnArticleMeta {
  readonly title: string
  readonly description: string
  readonly date: string
  readonly author: string
  readonly ogImage: string
  readonly tags: readonly string[]
  readonly order: number
  readonly series: string
}

export interface LearnArticle {
  readonly slug: string
  readonly meta: LearnArticleMeta
  readonly content: string
}

export interface TableOfContentsItem {
  readonly id: string
  readonly text: string
  readonly level: number
}

export interface ArticleNavigation {
  readonly prev: { readonly slug: string; readonly title: string } | null
  readonly next: { readonly slug: string; readonly title: string } | null
}

export function getLearnArticle(slug: string): LearnArticle | null {
  const filePath = path.join(LEARN_AI101_DIR, `${slug}.mdx`)

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
      date: data.date ?? '',
      author: data.author ?? '',
      ogImage: data.ogImage ?? '',
      tags: data.tags ?? [],
      order: data.order ?? 0,
      series: data.series ?? '',
    },
    content,
  }
}

export function getAllLearnArticles(): readonly LearnArticle[] {
  if (!fs.existsSync(LEARN_AI101_DIR)) {
    return []
  }

  const files = fs.readdirSync(LEARN_AI101_DIR).filter((f) => f.endsWith('.mdx'))

  const articles = files
    .map((file) => getLearnArticle(file.replace(/\.mdx$/, '')))
    .filter((article): article is LearnArticle => article !== null)
    .sort((a, b) => a.meta.order - b.meta.order)

  return articles
}

export function getAllLearnSlugs(): readonly string[] {
  if (!fs.existsSync(LEARN_AI101_DIR)) {
    return []
  }

  return fs
    .readdirSync(LEARN_AI101_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
}

export function getArticleNavigation(slug: string): ArticleNavigation {
  const articles = getAllLearnArticles()
  const index = articles.findIndex((a) => a.slug === slug)

  if (index === -1) {
    return { prev: null, next: null }
  }

  const prevArticle = index > 0 ? articles[index - 1] : undefined
  const prev = prevArticle ? { slug: prevArticle.slug, title: prevArticle.meta.title } : null

  const nextArticle = index < articles.length - 1 ? articles[index + 1] : undefined
  const next = nextArticle ? { slug: nextArticle.slug, title: nextArticle.meta.title } : null

  return { prev, next }
}

export function extractTableOfContents(content: string): readonly TableOfContentsItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm
  const items: TableOfContentsItem[] = []
  let match: RegExpExecArray | null

  while ((match = headingRegex.exec(content)) !== null) {
    const level = (match[1] ?? '##').length
    const text = (match[2] ?? '').trim()
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')

    items.push({ id, text, level })
  }

  return items
}
