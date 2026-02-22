'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CodeBlock } from '@/components/CodeBlock'

interface QuickstartStep {
  readonly step: string
  readonly title: string
  readonly code: string
  readonly language: string
}

interface QuickstartPath {
  readonly id: string
  readonly label: string
  readonly description: string
  readonly steps: readonly QuickstartStep[]
  readonly note?: string
  readonly noteHref?: string
  readonly noteLinkText?: string
}

interface QuickstartTabsProps {
  readonly paths: readonly QuickstartPath[]
}

export function QuickstartTabs({ paths }: QuickstartTabsProps) {
  const [activeId, setActiveId] = useState(paths[0]?.id ?? '')

  const activePath = paths.find((p) => p.id === activeId) ?? paths[0]

  if (!activePath) return null

  return (
    <div>
      <div
        className="mx-auto flex max-w-2xl gap-2 rounded-lg border border-border bg-surface p-1"
        role="tablist"
        aria-label="Integration path"
      >
        {paths.map((path) => (
          <button
            key={path.id}
            role="tab"
            aria-selected={path.id === activeId}
            aria-controls={`tabpanel-${path.id}`}
            id={`tab-${path.id}`}
            onClick={() => setActiveId(path.id)}
            className={`flex-1 rounded-md px-4 py-2.5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 ${
              path.id === activeId
                ? 'bg-primary text-white shadow-sm'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {path.label}
          </button>
        ))}
      </div>

      <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-text-secondary">
        {activePath.description}
      </p>

      <div
        id={`tabpanel-${activePath.id}`}
        role="tabpanel"
        aria-labelledby={`tab-${activePath.id}`}
        className="mx-auto mt-10 max-w-2xl space-y-10"
      >
        {activePath.steps.map((item) => (
          <div key={item.step}>
            <div className="mb-3 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                {item.step}
              </span>
              <h3 className="text-lg font-semibold text-text-primary">{item.title}</h3>
            </div>
            <CodeBlock code={item.code} language={item.language} />
          </div>
        ))}

        {activePath.note && (
          <p className="text-center text-sm text-text-secondary">
            {activePath.note}
            {activePath.noteHref && activePath.noteLinkText && (
              <>
                {' '}
                <Link
                  href={activePath.noteHref}
                  className="font-medium text-primary underline underline-offset-2 hover:text-primary-dark"
                >
                  {activePath.noteLinkText}
                </Link>
              </>
            )}
          </p>
        )}
      </div>
    </div>
  )
}
