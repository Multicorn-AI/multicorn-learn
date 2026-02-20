import type { TableOfContentsItem } from '@/lib/learn'

interface TableOfContentsProps {
  readonly items: readonly TableOfContentsItem[]
}

export function TableOfContents({ items }: TableOfContentsProps) {
  if (items.length === 0) {
    return null
  }

  return (
    <nav aria-label="Table of contents" className="hidden lg:block">
      <div className="sticky top-24">
        <h2 className="mb-4 text-sm font-semibold text-text-primary">In this article</h2>
        <ul className="space-y-2 border-l border-border pl-4">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`block text-sm transition-colors hover:text-primary ${
                  item.level === 3 ? 'pl-4 text-text-tertiary' : 'text-text-secondary'
                }`}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
