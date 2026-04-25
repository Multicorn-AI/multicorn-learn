'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { label: 'Shield', href: '/shield' },
  { label: 'Learn', href: '/learn' },
  { label: 'Pricing', href: '/pricing' },
] as const

const SIGNUP_URL = 'https://app.multicorn.ai/signup'

export function SiteHeader() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/80">
      <div className="mx-auto flex h-14 max-w-content items-center justify-between px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded text-lg font-bold tracking-tight text-text-primary transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
        >
          <img src="/images/logo-icon.png" alt="" className="h-7 w-auto shrink-0" aria-hidden />
          multicorn
        </Link>

        <nav aria-label="Main navigation" className="hidden md:block">
          <ul className="flex items-center gap-1" role="list">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`)
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`inline-flex min-h-[44px] items-center rounded-lg px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 ${
                      isActive ? 'text-primary' : 'text-text-secondary hover:text-text-primary'
                    }`}
                    {...(isActive ? { 'aria-current': 'page' as const } : {})}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
            <li>
              <a
                href={SIGNUP_URL}
                className="ml-2 inline-flex min-h-[44px] items-center rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
              >
                Get Started
              </a>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-text-secondary transition-colors hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 md:hidden"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          {mobileMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
              aria-hidden="true"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {mobileMenuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Mobile navigation"
          className="border-t border-border bg-surface px-6 pb-4 pt-2 md:hidden"
        >
          <ul className="flex flex-col gap-1" role="list">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`)
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`inline-flex min-h-[44px] w-full items-center rounded-lg px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 ${
                      isActive ? 'text-primary' : 'text-text-secondary hover:text-text-primary'
                    }`}
                    {...(isActive ? { 'aria-current': 'page' as const } : {})}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
            <li>
              <a
                href={SIGNUP_URL}
                className="mt-2 inline-flex min-h-[44px] w-full items-center justify-center rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
