import Link from 'next/link'
import { isCourse3Enabled } from '@/lib/feature-flags'
import { EmailSignupForm } from '@/components/EmailSignupForm'

type Course2NextTrack = 'cursor' | 'claude-code'

function emailSource(track: Course2NextTrack) {
  return track === 'cursor' ? 'learn-course2-cursor' : 'learn-course2-claude-code'
}

/**
 * "Course 3 preview" body: when Course 3 is off, the original coming-soon copy.
 * When Course 3 is on, a short line that points to the real course and avoids saying it is "not live yet."
 */
export function Course2WhatsNextCourse3Preview({ track }: { readonly track: Course2NextTrack }) {
  if (isCourse3Enabled()) {
    return (
      <p className="leading-relaxed text-text-secondary">
        <strong>Course 3: Getting to production</strong> is available on the Learn hub. It walks you
        from the app you built in this track to a public URL, environment variables, a custom
        domain, and HTTPS, with a troubleshooting path when a deploy goes wrong.{' '}
        <Link
          href="/learn/course-3"
          className="font-semibold text-primary underline decoration-primary/30 underline-offset-2 transition-colors hover:text-primary-dark"
        >
          Open Course 3
        </Link>
      </p>
    )
  }

  if (track === 'cursor') {
    return (
      <p className="leading-relaxed text-text-secondary">
        The next course focuses on <strong>shipping</strong>: hosting providers, DNS, safe secrets,
        and a checklist before you share a link with customers or investors. It is not live yet.
        When it is, you will see it on the Learn hub the same way you found this track.
      </p>
    )
  }

  return (
    <p className="leading-relaxed text-text-secondary">
      The next course focuses on <strong>shipping</strong>: hosting providers, DNS, safe secrets,
      and a checklist before you share a link with customers. It is not live yet. When it is, you
      will see it on the Learn hub the same way you found this track.
    </p>
  )
}

/**
 * "Stay in the loop" + email form when Course 3 is off. Renders nothing when Course 3 is on (the
 * preview block already includes the open link).
 */
export function Course2WhatsNextStayInLoop({ track }: { readonly track: Course2NextTrack }) {
  if (isCourse3Enabled()) {
    return null
  }

  return (
    <>
      <h2 className="mb-4 text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
        Stay in the loop
      </h2>
      <p className="mb-6 leading-relaxed text-text-secondary">
        If you want an email when Course 3 launches, subscribe below. We use the same list as other
        Multicorn product updates. Unsubscribe any time.
      </p>
      <div className="mb-6">
        <EmailSignupForm source={emailSource(track)} />
      </div>
    </>
  )
}
