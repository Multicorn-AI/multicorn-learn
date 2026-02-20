'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface DocsSidebarSection {
  readonly slug: string
  readonly title: string
}

interface DocsSidebarProps {
  readonly sections: readonly DocsSidebarSection[]
}

export function DocsSidebar({ sections }: DocsSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  const closeMobile = useCallback(() => {
    setMobileOpen(false)
  }, [])

  useEffect(() => {
    closeMobile()
  }, [pathname, closeMobile])

  useEffect(() => {
    if (!mobileOpen) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        closeMobile()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [mobileOpen, closeMobile])

  const currentSlug = pathname.replace('/docs/', '').replace('/docs', '')

  const sidebarContent = (
    <nav aria-label="Documentation sections">
      <div className="mb-6 flex items-center gap-2">
        <Link
          href="/docs/getting-started"
          className="text-lg font-bold tracking-tight text-text-primary"
        >
          Shield Docs
        </Link>
      </div>
      <ul className="space-y-1" role="list">
        {sections.map((section) => {
          const isActive = currentSlug === section.slug
          return (
            <li key={section.slug}>
              <Link
                href={`/docs/${section.slug}`}
                aria-current={isActive ? 'page' : undefined}
                className={`block min-h-[44px] rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-text-secondary hover:bg-surface-tertiary hover:text-text-primary'
                }`}
              >
                {section.title}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={() => setMobileOpen(true)}
        aria-label="Open documentation menu"
        className="fixed left-4 top-4 z-40 flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-border bg-surface shadow-sm lg:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5 text-text-primary"
          aria-hidden="true"
        >
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-text-primary/50"
            onClick={closeMobile}
            aria-hidden="true"
          />
          <div className="absolute inset-y-0 left-0 w-72 overflow-y-auto bg-surface px-6 py-6 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-lg font-bold text-text-primary">Shield Docs</span>
              <button
                onClick={closeMobile}
                aria-label="Close documentation menu"
                className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-text-secondary hover:text-text-primary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <ul className="space-y-1" role="list">
              {sections.map((section) => {
                const isActive = currentSlug === section.slug
                return (
                  <li key={section.slug}>
                    <Link
                      href={`/docs/${section.slug}`}
                      aria-current={isActive ? 'page' : undefined}
                      onClick={closeMobile}
                      className={`block min-h-[44px] rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-text-secondary hover:bg-surface-tertiary hover:text-text-primary'
                      }`}
                    >
                      {section.title}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 lg:block">
        <div className="sticky top-8 overflow-y-auto pb-8">{sidebarContent}</div>
      </aside>
    </>
  )
}
