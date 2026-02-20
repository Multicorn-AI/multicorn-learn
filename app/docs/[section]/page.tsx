import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import type { Metadata } from 'next'
import remarkGfm from 'remark-gfm'
import { getDocSection, getAllDocSlugs, getDocNavigation } from '@/lib/docs'
import { extractTableOfContents } from '@/lib/learn'
import { docsComponents } from '@/lib/mdx-docs-components'
import { TableOfContents } from '@/components/TableOfContents'
import { DocsNavigation } from '@/components/DocsNavigation'
import { Breadcrumbs } from '@/components/Breadcrumbs'

interface DocsSectionPageProps {
  readonly params: Promise<{ section: string }>
}

export async function generateStaticParams() {
  const slugs = getAllDocSlugs()
  return slugs.map((section) => ({ section }))
}

export async function generateMetadata({ params }: DocsSectionPageProps): Promise<Metadata> {
  const { section } = await params
  const doc = getDocSection(section)

  if (!doc) {
    return { title: 'Section not found' }
  }

  return {
    title: `${doc.meta.title} | Multicorn Shield Documentation`,
    description: doc.meta.description,
    openGraph: {
      title: `${doc.meta.title} | Multicorn Shield Documentation`,
      description: doc.meta.description,
      type: 'article',
      url: `https://multicorn.ai/docs/${doc.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${doc.meta.title} | Multicorn Shield Documentation`,
      description: doc.meta.description,
    },
  }
}

export default async function DocsSectionPage({ params }: DocsSectionPageProps) {
  const { section } = await params
  const doc = getDocSection(section)

  if (!doc) {
    notFound()
  }

  const navigation = getDocNavigation(section)
  const tocItems = extractTableOfContents(doc.content)

  return (
    <div className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-10">
      <article className="max-w-3xl">
        <Breadcrumbs currentTitle={doc.meta.title} />

        <header className="mb-10">
          <h1 className="mb-3 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            {doc.meta.title}
          </h1>
          <p className="text-lg leading-relaxed text-text-secondary">{doc.meta.description}</p>
        </header>

        <div className="prose-multicorn">
          <MDXRemote
            source={doc.content}
            components={docsComponents}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          />
        </div>

        <DocsNavigation navigation={navigation} />
      </article>

      <TableOfContents items={tocItems} />
    </div>
  )
}
