import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllBlogPosts } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Multicorn Blog — Practical AI Agent Guides and Updates',
  description:
    'Read plain-English guides to safer AI agent use, product updates, and lessons from real deployments.',
  openGraph: {
    title: 'Multicorn Blog — Practical AI Agent Guides and Updates',
    description:
      'Read plain-English guides to safer AI agent use, product updates, and lessons from real deployments.',
    images: [
      {
        url: '/images/og-card.svg',
        width: 1200,
        height: 630,
        alt: 'Multicorn blog',
      },
    ],
  },
}

function formatDate(dateString: string): string {
  if (!dateString) return 'Invalid Date'
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return 'Invalid Date'
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function BlogPage() {
  const posts = getAllBlogPosts()

  return (
    <main className="flex min-h-screen flex-col items-center px-6 pb-20 pt-16 sm:pb-28 sm:pt-24">
      <div className="w-full max-w-content">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-pink/10 px-4 py-1.5 text-sm font-medium text-pink">
            Blog
          </span>
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
            Multicorn Blog
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-text-secondary">
            Insights on AI agent governance, security best practices, and the future of autonomous
            AI in the enterprise.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="text-center text-text-secondary">No posts yet. Check back soon.</p>
        ) : (
          <div className="mx-auto max-w-3xl space-y-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block rounded-card border border-border bg-surface-secondary p-6 transition-colors hover:border-primary/30 hover:bg-surface-tertiary sm:p-8"
              >
                <div className="mb-3 flex flex-wrap gap-2">
                  {post.meta.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h2 className="mb-2 text-xl font-bold tracking-tight text-text-primary sm:text-2xl">
                  {post.meta.title}
                </h2>

                <p className="mb-4 leading-relaxed text-text-secondary">{post.meta.description}</p>

                <div className="flex items-center gap-3 text-sm text-text-tertiary">
                  <span>{post.meta.author}</span>
                  <span aria-hidden="true">&middot;</span>
                  <time dateTime={post.meta.date}>{formatDate(post.meta.date)}</time>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
