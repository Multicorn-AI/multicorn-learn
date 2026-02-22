import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getBlogPost, getAllBlogSlugs } from '@/lib/blog'
import { blogComponents } from '@/lib/mdx-blog-components'
import { EmailSignupForm } from '@/components/EmailSignupForm'

interface BlogPostPageProps {
  readonly params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    return { title: 'Post not found' }
  }

  return {
    title: `${post.meta.title} | Multicorn Blog`,
    description: post.meta.description,
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
      type: 'article',
      publishedTime: post.meta.date,
      authors: [post.meta.author],
      images: post.meta.ogImage
        ? [
            {
              url: post.meta.ogImage,
              width: 1200,
              height: 630,
              alt: post.meta.title,
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.meta.title,
      description: post.meta.description,
      images: post.meta.ogImage ? [post.meta.ogImage] : [],
    },
  }
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="px-6 pb-20 pt-16 sm:pb-28 sm:pt-24">
      <article className="mx-auto max-w-3xl">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
              clipRule="evenodd"
            />
          </svg>
          All posts
        </Link>

        <header className="mb-12">
          <div className="mb-4 flex flex-wrap gap-2">
            {post.meta.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="mb-4 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
            {post.meta.title}
          </h1>

          <p className="mb-6 text-lg leading-relaxed text-text-secondary">
            {post.meta.description}
          </p>

          <div className="flex items-center gap-3 text-sm text-text-tertiary">
            <span>{post.meta.author}</span>
            <span aria-hidden="true">&middot;</span>
            <time dateTime={post.meta.date}>{formatDate(post.meta.date)}</time>
          </div>
        </header>

        <div className="prose-multicorn">
          <MDXRemote source={post.content} components={blogComponents} />
        </div>

        <section className="mt-16 border-t border-border pt-10">
          <h2 className="mb-2 text-lg font-semibold text-text-primary">
            Stay up to date with Multicorn
          </h2>
          <p className="mb-6 text-sm text-text-secondary">
            Get the latest articles and product updates delivered to your inbox.
          </p>
          <EmailSignupForm />
        </section>
      </article>
    </main>
  )
}
