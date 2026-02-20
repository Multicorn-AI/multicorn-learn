import Link from 'next/link'
import { EmailSignupForm } from '@/components/EmailSignupForm'

interface FooterLink {
  readonly label: string
  readonly href: string
}

const PRODUCT_LINKS: readonly FooterLink[] = [
  { label: 'Shield', href: '/shield' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Documentation', href: '/docs' },
  { label: 'Changelog', href: '/changelog' },
]

const RESOURCE_LINKS: readonly FooterLink[] = [
  { label: 'Learn AI 101', href: '/learn' },
  { label: 'Blog', href: '/blog' },
  { label: 'GitHub', href: 'https://github.com/Multicorn-AI/multicorn-shield' },
  { label: 'npm', href: 'https://www.npmjs.com/package/multicorn-shield' },
]

const COMPANY_LINKS: readonly FooterLink[] = [
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
]

function FooterLinkGroup({
  title,
  links,
}: {
  readonly title: string
  readonly links: readonly FooterLink[]
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-text-primary">{title}</h3>
      <ul className="mt-4 space-y-3" role="list">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="text-sm text-text-secondary transition-colors hover:text-text-primary"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface-secondary px-6 pb-10 pt-16">
      <div className="mx-auto max-w-content">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
          <div className="sm:col-span-2">
            <Link href="/" className="text-lg font-bold text-text-primary">
              Multicorn
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-text-secondary">
              The trusted layer between humans and AI agents. Open-source SDK, enterprise-grade
              controls.
            </p>
            <div className="mt-6">
              <EmailSignupForm />
            </div>
          </div>

          <FooterLinkGroup title="Product" links={PRODUCT_LINKS} />
          <FooterLinkGroup title="Resources" links={RESOURCE_LINKS} />
          <FooterLinkGroup title="Company" links={COMPANY_LINKS} />
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-text-tertiary">
            &copy; {new Date().getFullYear()} Multicorn. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Multicorn-AI/multicorn-shield"
              aria-label="Multicorn on GitHub"
              className="text-text-tertiary transition-colors hover:text-text-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
            <a
              href="mailto:hello@multicorn.ai"
              aria-label="Email Multicorn"
              className="text-text-tertiary transition-colors hover:text-text-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
