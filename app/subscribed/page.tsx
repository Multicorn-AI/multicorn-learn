import Link from 'next/link'

export default async function SubscribedPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>
}) {
  const { status } = await searchParams

  const isSuccess = status === 'success'

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-surface px-6 py-14">
      <div className="w-full max-w-xl rounded-card border border-border bg-surface-secondary p-8 text-center shadow-sm sm:p-10">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          {isSuccess ? (
            <svg
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-primary"
              aria-hidden="true"
            >
              <circle cx="32" cy="32" r="32" fill="currentColor" fillOpacity="0.2" />
              <path
                d="M19 33.5L27.5 42L45 24.5"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-10 w-10 text-text-tertiary"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4M12 16h.01" />
            </svg>
          )}
        </div>

        <h1 className="mt-6 text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
          {isSuccess ? "You're subscribed!" : 'Link expired'}
        </h1>

        <p className="mt-3 text-base leading-relaxed text-text-secondary">
          {isSuccess
            ? "We'll email you about new blog posts, features, and SDK releases."
            : 'This link has expired or was already used. Try subscribing again.'}
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex min-h-[44px] items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
        >
          {isSuccess ? 'Back to multicorn.ai' : 'Subscribe again'}
        </Link>
      </div>
    </main>
  )
}
