'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { TableOfContentsItem } from '@/lib/learn'

interface MobileTableOfContentsProps {
  readonly items: readonly TableOfContentsItem[]
}

export function MobileTableOfContents({ items }: MobileTableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(false)

  if (items.length === 0) {
    return null
  }

  return (
    <nav aria-label="Table of contents" className="lg:hidden">
      <div className="border-l-2 border-green pl-3">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 py-2 text-left text-sm font-medium text-text-secondary"
          aria-expanded={isOpen}
        >
          <span>In this article</span>
          <ChevronDown
            aria-hidden
            className={`size-4 shrink-0 text-text-tertiary transition-transform duration-200 ${
              isOpen ? 'rotate-180' : 'rotate-0'
            }`}
          />
        </button>
        <div
          className="grid transition-[grid-template-rows] duration-200"
          style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
        >
          <div className="min-h-0 overflow-hidden">
            <ul className="pl-4">
              {items.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setIsOpen(false)}
                    className={`block py-1.5 text-sm transition-colors hover:text-text-primary ${
                      item.level === 3 ? 'pl-4 text-text-tertiary' : 'text-text-secondary'
                    }`}
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}
