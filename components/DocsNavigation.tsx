import Link from 'next/link'
import type { DocNavigation } from '@/lib/docs'

interface DocsNavigationProps {
  readonly navigation: DocNavigation
}

export function DocsNavigation({ navigation }: DocsNavigationProps) {
  const { prev, next } = navigation

  if (!prev && !next) {
    return null
  }

  return (
    <nav aria-label="Documentation navigation" className="mt-16 border-t border-border pt-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
        {prev ? (
          <Link
            href={`/docs/${prev.slug}`}
            className="group flex items-center gap-2 rounded-card border border-border bg-surface-secondary px-5 py-4 transition-colors hover:border-primary/30 hover:bg-surface-tertiary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4 shrink-0 text-text-tertiary transition-colors group-hover:text-primary"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <span className="block text-xs font-medium text-text-tertiary">Previous</span>
              <span className="text-sm font-semibold text-text-primary group-hover:text-primary">
                {prev.title}
              </span>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {next ? (
          <Link
            href={`/docs/${next.slug}`}
            className="group flex items-center justify-end gap-2 rounded-card border border-border bg-surface-secondary px-5 py-4 text-right transition-colors hover:border-primary/30 hover:bg-surface-tertiary sm:ml-auto"
          >
            <div>
              <span className="block text-xs font-medium text-text-tertiary">Next</span>
              <span className="text-sm font-semibold text-text-primary group-hover:text-primary">
                {next.title}
              </span>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4 shrink-0 text-text-tertiary transition-colors group-hover:text-primary"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M3 10a.75.75 0 01.75-.75h10.638l-4.158-3.96a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </nav>
  )
}
