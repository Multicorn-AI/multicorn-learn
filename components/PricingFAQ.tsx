interface FAQItem {
  readonly question: string
  readonly answer: string
}

const FAQ_ITEMS: readonly FAQItem[] = [
  {
    question: 'What happens when I hit my action limit?',
    answer:
      'Your agents will be paused until your limit resets at the start of the next billing cycle. You will get a notification when you are approaching your limit so there are no surprises. You can upgrade your plan at any time to increase your limit immediately.',
  },
  {
    question: 'Can I cancel anytime?',
    answer:
      'Yes. There are no contracts and no cancellation fees. You can downgrade or cancel your plan at any time from your dashboard. If you downgrade, your data is kept and you retain access until the end of your current billing period.',
  },
  {
    question: 'Is the SDK really free?',
    answer:
      'Yes. The Multicorn Shield SDK is open source under the MIT licence and free forever. You can use it in personal and commercial projects with no restrictions. Revenue comes from the hosted dashboard and enterprise features, not the SDK itself.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit and debit cards through Stripe. Enterprise customers can pay by invoice with net-30 terms. Contact us at sales@multicorn.ai for invoicing details.',
  },
]

export function PricingFAQ() {
  return (
    <section className="px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          Frequently asked questions
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-lg text-text-secondary">
          Everything you need to know about Multicorn pricing.
        </p>

        <dl className="mt-12 space-y-4">
          {FAQ_ITEMS.map((item) => (
            <details
              key={item.question}
              className="group rounded-card border border-border bg-surface-secondary"
            >
              <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 text-left text-base font-semibold text-text-primary [&::-webkit-details-marker]:hidden">
                <dt>{item.question}</dt>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5 shrink-0 text-text-tertiary transition-transform group-open:rotate-180"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </summary>
              <dd className="px-6 pb-5 text-sm leading-relaxed text-text-secondary">
                {item.answer}
              </dd>
            </details>
          ))}
        </dl>
      </div>
    </section>
  )
}
