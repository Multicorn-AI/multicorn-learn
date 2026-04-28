import Link from 'next/link'
import {
  course4PlatformStubCopy,
  course4PlatformTaglineClass,
  type Course4PlatformStubKey,
} from '@/lib/course-4-platform-stub-copy'

export function Course4PlatformStubArticle({
  platformKey,
}: {
  platformKey: Course4PlatformStubKey
}) {
  const p = course4PlatformStubCopy[platformKey]
  const taglineClass = course4PlatformTaglineClass(platformKey)

  return (
    <article className="mx-auto max-w-3xl px-4">
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
            <BreadcrumbChevron />
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
            <BreadcrumbChevron />
          </li>
          <li>
            <Link
              href="/learn/course-4"
              className="text-text-secondary transition-colors hover:text-text-primary"
            >
              Course 4
            </Link>
          </li>
          <li aria-hidden="true">
            <BreadcrumbChevron />
          </li>
          <li>
            <span className="font-medium text-text-primary" aria-current="page">
              {p.name}
            </span>
          </li>
        </ol>
      </nav>

      <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">{p.name}</h1>
      <p className={`mt-3 text-lg font-medium leading-snug ${taglineClass}`}>{p.tagline}</p>
      <p className="mt-6 leading-relaxed text-text-secondary">{p.intro}</p>

      <div className="mb-8 rounded-lg border border-primary/20 bg-primary/5 px-5 py-4">
        <p className="text-sm text-text-secondary">
          <strong className="text-text-primary">Guided lessons are on the way.</strong> The
          step-by-step build for this platform is not ready yet. The profile below will help you get
          started on your own, and the full track will replace this page when it ships.
        </p>
      </div>

      <h2 className="mb-3 mt-10 text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
        What {p.name} does
      </h2>
      <ul className="list-inside list-disc space-y-3 leading-relaxed text-text-secondary">
        {p.whatItDoes.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <h2 className="mb-3 mt-10 text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
        Who it is for
      </h2>
      <p className="leading-relaxed text-text-secondary">{p.whoItsFor}</p>

      <h2 className="mb-3 mt-10 text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
        Your first build
      </h2>
      <p className="leading-relaxed text-text-secondary">{p.firstBuild}</p>

      <h2 className="mb-3 mt-10 text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
        Honest limitations
      </h2>
      <p className="leading-relaxed text-text-secondary">{p.honestLimitations}</p>

      <h2 className="mb-3 mt-10 text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
        Get started
      </h2>
      <p className="leading-relaxed text-text-secondary">{p.getStarted}</p>

      <p className="mt-8">
        <a
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`font-semibold underline-offset-2 transition-colors hover:underline ${taglineClass}`}
        >
          Visit {p.name}
        </a>
      </p>
    </article>
  )
}

function BreadcrumbChevron() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-4 w-4 text-text-tertiary"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M7.21 14.77a.75.75 0 01-.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
        clipRule="evenodd"
      />
    </svg>
  )
}
