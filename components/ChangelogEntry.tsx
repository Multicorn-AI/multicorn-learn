import type { Release } from '@/lib/changelog'
import { CHANGE_CATEGORIES } from '@/lib/changelog'

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function ChangelogEntry({ release }: { readonly release: Release }) {
  const categories = CHANGE_CATEGORIES.filter((category) => release[category.key].length > 0)

  return (
    <section id={`v${release.version}`} className="relative scroll-mt-24 pb-12 pl-8 last:pb-0">
      <div
        aria-hidden="true"
        className="absolute left-0 top-1.5 h-3 w-3 rounded-full border-2 border-primary bg-surface"
      />
      <div aria-hidden="true" className="absolute bottom-0 left-[5px] top-5 w-0.5 bg-border" />

      <div className="mb-4">
        <a
          href={`#v${release.version}`}
          className="text-2xl font-bold tracking-tight text-text-primary transition-colors hover:text-primary sm:text-3xl"
        >
          v{release.version}
        </a>
        <time dateTime={release.date} className="mt-1 block text-sm text-text-tertiary">
          {formatDate(release.date)}
        </time>
      </div>

      <div className="space-y-6">
        {categories.map((category) => (
          <div key={category.key}>
            <h3
              className={`mb-2 text-sm font-semibold uppercase tracking-wide ${category.accentClass}`}
            >
              {category.label}
            </h3>
            <ul className="space-y-2" role="list">
              {release[category.key].map((change) => (
                <li key={change} className="flex gap-2 leading-relaxed text-text-secondary">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-text-tertiary"
                  />
                  {change}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
