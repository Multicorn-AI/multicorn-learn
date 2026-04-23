import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import type { Metadata } from 'next'
import Link from 'next/link'
import remarkGfm from 'remark-gfm'
import {
  getLearnArticle,
  getAllLearnSlugs,
  getArticleNavigation,
  extractTableOfContents,
} from '@/lib/learn'
import { blogComponents } from '@/lib/mdx-blog-components'
import { MobileTableOfContents } from '@/components/MobileTableOfContents'
import { TableOfContents } from '@/components/TableOfContents'
import { LessonNavigation } from '@/components/LessonNavigation'
import { EmailSignupForm } from '@/components/EmailSignupForm'

interface LearnArticlePageProps {
  readonly params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getAllLearnSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: LearnArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const article = getLearnArticle(slug)

  if (!article) {
    return { title: 'Article not found' }
  }

  return {
    title: `${article.meta.title} | Multicorn Learn`,
    description: article.meta.description,
    openGraph: {
      title: article.meta.title,
      description: article.meta.description,
      type: 'article',
      publishedTime: article.meta.date,
      authors: [article.meta.author],
      images: article.meta.ogImage
        ? [
            {
              url: article.meta.ogImage,
              width: 1200,
              height: 630,
              alt: article.meta.title,
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.meta.title,
      description: article.meta.description,
      images: article.meta.ogImage ? [article.meta.ogImage] : [],
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

export default async function LearnArticlePage({ params }: LearnArticlePageProps) {
  const { slug } = await params
  const article = getLearnArticle(slug)

  if (!article) {
    notFound()
  }

  const navigation = getArticleNavigation(slug)
  const tocItems = extractTableOfContents(article.content)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.meta.title,
    description: article.meta.description,
    datePublished: article.meta.date,
    author: {
      '@type': 'Organization',
      name: article.meta.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Multicorn',
      url: 'https://multicorn.ai',
    },
    url: `https://multicorn.ai/learn/course-1/${article.slug}`,
    image: article.meta.ogImage ? `https://multicorn.ai${article.meta.ogImage}` : undefined,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="px-6 pb-20 pt-16 sm:pb-28 sm:pt-24">
        <div className="mx-auto max-w-content">
          <div className="lg:grid lg:grid-cols-[1fr_250px] lg:gap-12">
            <article className="mx-auto max-w-3xl lg:mx-0">
              <nav aria-label="Breadcrumb" className="mb-8">
                <ol className="flex flex-wrap items-center gap-2 text-sm" role="list">
                  <li>
                    <Link
                      href="/"
                      className="text-text-secondary transition-colors hover:text-text-primary"
                    >
                      Home
                    </Link>
                  </li>
                  <li aria-hidden="true">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-4 w-4 text-text-tertiary"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </li>
                  <li>
                    <Link
                      href="/learn"
                      className="text-text-secondary transition-colors hover:text-text-primary"
                    >
                      Learn
                    </Link>
                  </li>
                  <li aria-hidden="true">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-4 w-4 text-text-tertiary"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </li>
                  <li>
                    <Link
                      href="/learn/course-1"
                      className="text-text-secondary transition-colors hover:text-text-primary"
                    >
                      AI 101
                    </Link>
                  </li>
                  <li aria-hidden="true">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-4 w-4 text-text-tertiary"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </li>
                  <li>
                    <span className="font-medium text-text-primary" aria-current="page">
                      {article.meta.title}
                    </span>
                  </li>
                </ol>
              </nav>

              <header className="mb-12">
                <div className="mb-4 flex flex-wrap gap-2">
                  {article.meta.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-green/10 px-3 py-1 text-xs font-medium text-green"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h1 className="mb-4 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
                  {article.meta.title}
                </h1>

                <p className="mb-6 text-lg leading-relaxed text-text-secondary">
                  {article.meta.description}
                </p>

                <div className="flex items-center gap-3 text-sm text-text-tertiary">
                  <span>{article.meta.author}</span>
                  <span aria-hidden="true">&middot;</span>
                  <time dateTime={article.meta.date}>{formatDate(article.meta.date)}</time>
                </div>
              </header>

              <div className="mb-6 mt-3">
                <MobileTableOfContents items={tocItems} />
              </div>

              <div className="prose-multicorn">
                <MDXRemote
                  source={article.content}
                  components={blogComponents}
                  options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
                />
              </div>

              <section className="mt-16 border-t border-border pt-10">
                <h2 className="mb-2 text-lg font-semibold text-text-primary">
                  Stay up to date with Multicorn
                </h2>
                <p className="mb-6 text-sm text-text-secondary">
                  Get the latest articles and product updates delivered to your inbox.
                </p>
                <EmailSignupForm source="learn-blog" />
              </section>

              <LessonNavigation
                basePath="/learn/course-1"
                navigation={navigation}
                courseAccent="course-1"
              />
            </article>

            <TableOfContents items={tocItems} />
          </div>
        </div>
      </main>
    </>
  )
}
