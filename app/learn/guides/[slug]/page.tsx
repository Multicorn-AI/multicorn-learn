import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import type { Metadata } from 'next'
import Link from 'next/link'
import remarkGfm from 'remark-gfm'
import { getGuideBySlug, getAllGuideSlugs } from '@/lib/guides'
import { blogComponents } from '@/lib/mdx-blog-components'
import { EmailSignupForm } from '@/components/EmailSignupForm'

interface GuidePageProps {
  readonly params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getAllGuideSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params
  const guide = getGuideBySlug(slug)

  if (!guide) {
    return { title: 'Guide not found' }
  }

  return {
    title: `${guide.meta.title} | Multicorn Learn`,
    description: guide.meta.description,
    openGraph: {
      title: guide.meta.title,
      description: guide.meta.description,
      type: 'article',
      publishedTime: guide.meta.published,
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.meta.title,
      description: guide.meta.description,
    },
  }
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params
  const guide = getGuideBySlug(slug)

  if (!guide) {
    notFound()
  }

  return (
    <main className="px-6 pb-20 pt-16 sm:pb-28 sm:pt-24">
      <article className="mx-auto max-w-3xl">
        <Link
          href="/learn"
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
          Back to Learn
        </Link>

        <header className="mb-12">
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
            {guide.meta.title}
          </h1>

          <p className="mb-6 text-lg leading-relaxed text-text-secondary">
            {guide.meta.description}
          </p>
        </header>

        <div className="prose-multicorn">
          <MDXRemote
            source={guide.content}
            components={blogComponents}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          />
        </div>

        <section className="mt-10 border-t border-border pt-8">
          <h2 className="mb-2 text-lg font-semibold text-text-primary">
            Stay up to date with Multicorn
          </h2>
          <p className="mb-6 text-sm text-text-secondary">
            Get the latest articles and product updates delivered to your inbox.
          </p>
          <EmailSignupForm source="learn-guide" />
        </section>
      </article>
    </main>
  )
}
