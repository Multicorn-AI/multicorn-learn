'use client'

import { useState } from 'react'
import Image from 'next/image'

type DashboardTab = 'agents' | 'activity'

/** Intrinsic layout width; heights preserve each screenshot's aspect ratio (sources differ). */
const IMG_WIDTH = 1200

const AGENTS_HEIGHT = Math.round((IMG_WIDTH * 1242) / 2876)
const ACTIVITY_HEIGHT = Math.round((IMG_WIDTH * 1592) / 2858)

const TAB_CONFIG = {
  agents: {
    src: '/images/shield-agents.png',
    alt: 'Multicorn Shield dashboard showing 8 connected AI agents with action counts, spend tracking, and budget limits',
    width: IMG_WIDTH,
    height: AGENTS_HEIGHT,
  },
  activity: {
    src: '/images/shield-activity.png',
    alt: 'Multicorn Shield activity log showing approved, blocked, and pending agent actions with filters',
    width: IMG_WIDTH,
    height: ACTIVITY_HEIGHT,
  },
} as const

const TAB_IDS: readonly { readonly id: DashboardTab; readonly label: string }[] = [
  { id: 'agents', label: 'Agents' },
  { id: 'activity', label: 'Activity Log' },
]

export function ShieldDemo() {
  const [activeTab, setActiveTab] = useState<DashboardTab>('agents')

  const img = TAB_CONFIG[activeTab]

  return (
    <div role="region" aria-label="Multicorn Shield dashboard preview">
      <div className="mb-6 flex justify-center">
        <div
          className="mx-auto flex w-full max-w-sm gap-1 rounded-lg border border-border bg-surface p-1"
          role="tablist"
          aria-label="Dashboard view"
        >
          {TAB_IDS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={activeTab === id}
              id={`shield-demo-tab-${id}`}
              aria-controls="shield-demo-panel"
              onClick={() => setActiveTab(id)}
              className={`min-h-[44px] min-w-0 flex-1 basis-0 whitespace-nowrap rounded-md px-4 py-2.5 text-center text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 ${
                activeTab === id
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div id="shield-demo-panel" role="tabpanel" aria-labelledby={`shield-demo-tab-${activeTab}`}>
        <Image
          src={img.src}
          alt={img.alt}
          width={img.width}
          height={img.height}
          className="h-auto w-full rounded-xl shadow-lg"
          priority={false}
          sizes="(max-width: 768px) 100vw, 768px"
        />
      </div>
    </div>
  )
}
