import { EmailSignupForm } from '@/components/EmailSignupForm'

export function EmailSignupSection() {
  return (
    <section className="border-y border-border-light px-6 py-12 sm:py-16">
      <div className="mx-auto max-w-md text-center">
        <p className="mb-3 text-sm font-medium text-text-secondary">
          Get updates on Multicorn. No spam, ever.
        </p>
        <EmailSignupForm source="learn-landing" />
      </div>
    </section>
  )
}
