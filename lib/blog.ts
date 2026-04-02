import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

export interface BlogPostMeta {
  readonly title: string
  readonly description: string
  readonly date: string
  readonly author: string
  readonly ogImage: string
  readonly tags: readonly string[]
  readonly draft?: boolean
}

export interface BlogPost {
  readonly slug: string
  readonly meta: BlogPostMeta
  readonly content: string
}

export function getBlogPost(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  try {
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(raw)

    const date =
      (typeof data.date === 'string' && data.date) ||
      (typeof data.publishedAt === 'string' && data.publishedAt) ||
      ''

    return {
      slug,
      meta: {
        title: data.title ?? '',
        description: data.description ?? '',
        date,
        author: data.author ?? '',
        ogImage: data.ogImage ?? '',
        tags: data.tags ?? [],
        draft: data.draft ?? false,
      },
      content,
    }
  } catch (error) {
    console.error(`Error parsing blog post ${slug}:`, error)
    return null
  }
}

export function getAllBlogPosts(): readonly BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return []
  }

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'))

  const posts = files
    .map((file) => getBlogPost(file.replace(/\.mdx$/, '')))
    .filter((post): post is BlogPost => post !== null)
    .filter((post) => !post.meta.draft)
    .sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime())

  return posts
}

export function getAllBlogSlugs(): readonly string[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return []
  }

  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
}
