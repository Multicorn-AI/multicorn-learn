import Link from 'next/link'

type ConfirmationVariant = 'confirmed' | 'subscribed'

interface ConfirmationCopy {
  readonly heading: string
  readonly subheading: string
  readonly body: string
  readonly xShareUrl: string
}

const CONFIRMATION_COPY: Record<ConfirmationVariant, ConfirmationCopy> = {
  confirmed: {
    heading: "You're on the list",
    subheading: 'Thanks for confirming your email.',
    body: "We'll reach out when Multicorn is ready. Keep an eye on your inbox - you'll be among the first to know.",
    xShareUrl:
      'https://twitter.com/intent/tweet?text=Just%20signed%20up%20for%20early%20access%20to%20%40MulticornAI%20-%20the%20trust%20layer%20for%20AI%20agents.&url=https%3A%2F%2Fmulticorn.ai',
  },
  subscribed: {
    heading: "You're subscribed",
    subheading: 'Thanks for joining.',
    body: "Expect AI agent insights, Shield updates, and a look at what we're building - straight to your inbox.",
    xShareUrl:
      'https://twitter.com/intent/tweet?text=Following%20%40MulticornAI%20-%E2%80%8B%20building%20the%20trust%20layer%20for%20AI%20agents.%20Worth%20watching.&url=https%3A%2F%2Fmulticorn.ai',
  },
}

const LINKEDIN_SHARE_URL =
  'https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fmulticorn.ai'
const GITHUB_URL = 'https://github.com/Multicorn-AI'

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-16 w-16 sm:h-20 sm:w-20"
      aria-hidden="true"
    >
      <circle cx="32" cy="32" r="32" fill="url(#confirm-circle)" />
      <path
        d="M19 33.5L27.5 42L45 24.5"
        stroke="white"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id="confirm-circle" x1="10" y1="10" x2="56" y2="56">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#6D28D9" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <path d="M18.244 2H21.5l-7.11 8.123L22.75 22h-6.55l-5.13-6.703L5.198 22H1.94l7.607-8.694L1.5 2h6.716l4.637 6.112L18.244 2Zm-1.15 18.02h1.804L7.23 3.875H5.295L17.094 20.02Z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <path d="M6.94 8.5H3.56v11h3.38v-11ZM5.25 3A2.25 2.25 0 1 0 5.25 7.5 2.25 2.25 0 0 0 5.25 3Zm15.19 9.69c0-3.28-1.76-4.81-4.1-4.81-1.89 0-2.74 1.04-3.22 1.78h-.05V8.5H9.7c.04.78 0 11 0 11h3.37v-6.14c0-.33.02-.66.12-.9.26-.66.84-1.35 1.82-1.35 1.28 0 1.8.98 1.8 2.42v5.97h3.38v-6.8Z" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12a12 12 0 0 0 8.2 11.4c.6.1.82-.26.82-.58 0-.28-.01-1.03-.01-2.02-3.34.73-4.04-1.61-4.04-1.61-.55-1.38-1.33-1.75-1.33-1.75-1.1-.74.08-.73.08-.73 1.2.08 1.84 1.25 1.84 1.25 1.08 1.84 2.84 1.31 3.53 1 .1-.78.42-1.31.76-1.61-2.67-.31-5.47-1.34-5.47-5.94 0-1.3.46-2.36 1.23-3.19-.13-.3-.54-1.55.11-3.22 0 0 1.01-.32 3.3 1.22a11.6 11.6 0 0 1 6 0c2.29-1.54 3.3-1.22 3.3-1.22.65 1.67.24 2.92.12 3.22.77.83 1.23 1.9 1.23 3.19 0 4.61-2.8 5.63-5.48 5.94.43.37.82 1.1.82 2.22 0 1.6-.01 2.88-.01 3.27 0 .32.22.68.83.57A12.01 12.01 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
    </svg>
  )
}

export function ConfirmationPage({ variant }: { readonly variant: ConfirmationVariant }) {
  const copy = CONFIRMATION_COPY[variant]

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6 py-14 text-slate-100 sm:px-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/30 via-slate-950 to-slate-950"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(124,58,237,0.4),transparent_45%),radial-gradient(circle_at_80%_30%,rgba(99,102,241,0.3),transparent_45%)] bg-[length:200%_200%] motion-safe:animate-gradient-shift motion-reduce:animate-none"
      />

      <section className="relative w-full max-w-xl rounded-card border border-white/15 bg-white/5 p-8 text-center shadow-2xl backdrop-blur sm:p-10">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/20 motion-safe:animate-pulse motion-reduce:animate-none">
          <CheckIcon />
        </div>

        <h1 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {copy.heading}
        </h1>
        <p className="mt-3 text-lg font-medium text-violet-100">{copy.subheading}</p>
        <p className="mt-4 text-base leading-relaxed text-slate-200">{copy.body}</p>

        <div
          className="mt-8 flex items-center justify-center gap-3"
          role="list"
          aria-label="Social sharing"
        >
          <a
            href={copy.xShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on X"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-primary-light/40 focus:ring-offset-2 focus:ring-offset-slate-950"
          >
            <XIcon />
          </a>
          <a
            href={LINKEDIN_SHARE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on LinkedIn"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-primary-light/40 focus:ring-offset-2 focus:ring-offset-slate-950"
          >
            <LinkedInIcon />
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Multicorn on GitHub"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-primary-light/40 focus:ring-offset-2 focus:ring-offset-slate-950"
          >
            <GitHubIcon />
          </a>
        </div>

        <Link
          href="/"
          className="mt-8 inline-flex min-h-[44px] items-center justify-center text-sm font-semibold text-violet-200 underline underline-offset-4 transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-light/40 focus:ring-offset-2 focus:ring-offset-slate-950"
        >
          Visit multicorn.ai
        </Link>
      </section>
    </main>
  )
}
