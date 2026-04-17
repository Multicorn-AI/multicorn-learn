'use client'

import { useMemo, useId, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import Link from 'next/link'
import { CopyButton } from '@/components/CopyButton'
import { CATEGORIES, type Category, type Prompt } from '@/content/prompts'
import { trackEvent as trackAnalytics } from '@/lib/analytics'
import { trackEvent } from '@/lib/plausible'

interface PromptLibraryProps {
  readonly prompts: readonly Prompt[]
}

function normalize(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, '')
}

function matchesQuery(prompt: Prompt, query: string): boolean {
  const terms = normalize(query).split(/\s+/).filter(Boolean)
  if (terms.length === 0) return true

  const searchable = normalize(
    `${prompt.title} ${prompt.description} ${prompt.tags.join(' ')} ${prompt.prompt}`,
  )

  return terms.every((term) => searchable.includes(term))
}

function tabId(category: Category): string {
  return `prompt-tab-${category.toLowerCase()}`
}

function panelId(category: Category): string {
  return `prompt-panel-${category.toLowerCase()}`
}

const PLACEHOLDER_PART = /^\[[^\]]+\]$/

function splitPromptTemplate(text: string): readonly string[] {
  return text.split(/(\[[^\]]+\])/g)
}

function bracketInner(bracketPart: string): string {
  return bracketPart.slice(1, -1)
}

function isBlockField(placeholder: string): boolean {
  const lower = placeholder.toLowerCase()
  return /\b(paste|describe|list|state)\b/.test(lower)
}

function buildCopyablePrompt(template: string, valuesByFieldIndex: Record<number, string>): string {
  const parts = splitPromptTemplate(template)
  let fieldIndex = 0
  return parts
    .map((part) => {
      if (PLACEHOLDER_PART.test(part)) {
        const v = valuesByFieldIndex[fieldIndex] ?? ''
        fieldIndex += 1
        return v.trim() === '' ? part : v
      }
      return part
    })
    .join('')
}

function renderEditablePromptBody(
  template: string,
  values: Record<number, string>,
  onFieldChange: (fieldIndex: number, value: string) => void,
  segmentKeyPrefix: string,
): ReactNode {
  const parts = splitPromptTemplate(template)
  let fieldIndex = 0
  return parts.map((part, i) => {
    if (PLACEHOLDER_PART.test(part)) {
      const idx = fieldIndex
      fieldIndex += 1
      const inner = bracketInner(part)
      const ariaLabel = `Fill in: ${inner}`
      const blockMode = isBlockField(inner)
      const fieldProps = {
        value: values[idx] ?? '',
        onChange: (v: string) => onFieldChange(idx, v),
        placeholder: inner,
        ariaLabel,
        blockMode,
      } as const
      return blockMode ? (
        <div key={`${segmentKeyPrefix}-field-${idx}`} className="my-1 block w-full">
          <InlinePlaceholderField {...fieldProps} />
        </div>
      ) : (
        <InlinePlaceholderField key={`${segmentKeyPrefix}-field-${idx}`} {...fieldProps} />
      )
    }
    if (part === '') {
      return null
    }
    return (
      <span key={`${segmentKeyPrefix}-txt-${i}`} className="text-text-primary">
        {part}
      </span>
    )
  })
}

function InlinePlaceholderField({
  value,
  onChange,
  placeholder,
  ariaLabel,
  blockMode,
}: {
  readonly value: string
  readonly onChange: (value: string) => void
  readonly placeholder: string
  readonly ariaLabel: string
  readonly blockMode: boolean
}) {
  const ref = useRef<HTMLTextAreaElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    if (blockMode) {
      el.style.height = 'auto'
      el.style.height = `${el.scrollHeight}px`
      el.style.width = ''
    } else {
      el.style.height = 'auto'
      el.style.height = `${el.scrollHeight}px`
      el.style.width = 'auto'
      el.style.width = `${Math.max(80, el.scrollWidth)}px`
    }
  }, [value, blockMode, placeholder])

  const sharedFocus =
    'rounded border border-primary/20 bg-primary/5 px-1.5 py-0.5 font-mono text-sm text-primary placeholder:text-primary/50 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/30'

  return (
    <textarea
      ref={ref}
      value={value}
      rows={1}
      placeholder={placeholder}
      aria-label={ariaLabel}
      onChange={(e) => onChange(e.target.value)}
      onInput={(e) => {
        const ta = e.target as HTMLTextAreaElement
        if (blockMode) {
          ta.style.height = 'auto'
          ta.style.height = `${ta.scrollHeight}px`
        } else {
          ta.style.height = 'auto'
          ta.style.height = `${ta.scrollHeight}px`
          ta.style.width = 'auto'
          ta.style.width = `${Math.max(80, ta.scrollWidth)}px`
        }
      }}
      className={
        blockMode
          ? `block w-full min-w-0 resize-none whitespace-pre-wrap break-words ${sharedFocus}`
          : `inline-block min-w-[80px] max-w-full resize-none overflow-hidden whitespace-nowrap align-middle [field-sizing:content] ${sharedFocus}`
      }
    />
  )
}

/** When false (default), every prompt is shown as free. Set NEXT_PUBLIC_LEARN_PRO_ENABLED=true to enable Pro gating in the UI. */
const learnProEnabled = process.env.NEXT_PUBLIC_LEARN_PRO_ENABLED === 'true'

export function PromptLibrary({ prompts }: PromptLibraryProps) {
  const [activeCategory, setActiveCategory] = useState<Category>(CATEGORIES[0])
  const [query, setQuery] = useState('')
  const [placeholderFields, setPlaceholderFields] = useState<
    Record<string, Record<number, string>>
  >({})
  const inputRef = useRef<HTMLInputElement>(null)
  const searchId = useId()
  const resultsId = useId()

  const trimmedQuery = query.trim()
  const isSearchActive = trimmedQuery.length > 0

  const filtered = useMemo(() => {
    if (!isSearchActive) return []
    return prompts.filter((p) => matchesQuery(p, trimmedQuery))
  }, [prompts, isSearchActive, trimmedQuery])

  const categoryStats = useMemo(() => {
    const map = new Map<Category, { total: number; free: number }>()
    for (const cat of CATEGORIES) {
      const inCat = prompts.filter((p) => p.category === cat)
      map.set(cat, { total: inCat.length, free: inCat.filter((p) => p.isFree).length })
    }
    return map
  }, [prompts])

  const activeStats = categoryStats.get(activeCategory) ?? { total: 0, free: 0 }
  const categoryHasLocked =
    learnProEnabled &&
    !isSearchActive &&
    prompts.some((p) => p.category === activeCategory && !p.isFree)

  function handlePlaceholderFieldChange(promptId: string, fieldIndex: number, value: string) {
    setPlaceholderFields((prev) => ({
      ...prev,
      [promptId]: {
        ...(prev[promptId] ?? {}),
        [fieldIndex]: value,
      },
    }))
  }

  function handleClearSearch() {
    setQuery('')
    inputRef.current?.focus()
  }

  function trackUnlockClick(promptItem: Prompt) {
    const props = { prompt: promptItem.id, category: promptItem.category }
    trackEvent('locked_prompt_unlock_clicked', props)
    trackAnalytics('locked_prompt_unlock_clicked', props)
  }

  function trackCategoryUnlockClick(category: Category) {
    const props = { category }
    trackEvent('category_unlock_clicked', props)
    trackAnalytics('category_unlock_clicked', props)
  }

  return (
    <div className="w-full max-w-content">
      <div className="mb-8">
        <label htmlFor={searchId} className="mb-2 block text-sm font-medium text-text-primary">
          Search prompts
        </label>
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-tertiary"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
              clipRule="evenodd"
            />
          </svg>
          <input
            ref={inputRef}
            id={searchId}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-controls={isSearchActive ? resultsId : panelId(activeCategory)}
            className="min-h-[44px] w-full rounded-lg border border-border bg-surface py-3 pl-10 pr-4 text-text-primary focus:border-green focus:outline-none focus:ring-2 focus:ring-green/20"
          />
        </div>
        <p className="mt-1.5 text-sm text-text-secondary" aria-live="polite">
          {isSearchActive
            ? `${filtered.length} ${filtered.length === 1 ? 'prompt' : 'prompts'} found`
            : 'Search across every category'}
        </p>
      </div>

      {isSearchActive && (
        <p className="mb-4 text-sm font-medium text-text-primary" id={`${searchId}-mode`}>
          Showing results across all categories
        </p>
      )}

      <div
        className={`-mx-6 mb-8 px-6 sm:mx-0 sm:px-0 ${isSearchActive ? 'pointer-events-none opacity-40' : ''}`}
        aria-hidden={isSearchActive}
      >
        <div
          className="flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:overflow-visible"
          role="tablist"
          aria-label="Prompt categories"
        >
          {CATEGORIES.map((category) => {
            const { total } = categoryStats.get(category) ?? { total: 0 }
            const selected = category === activeCategory
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={panelId(category)}
                id={tabId(category)}
                tabIndex={isSearchActive ? -1 : 0}
                onClick={() => setActiveCategory(category)}
                className={`shrink-0 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                  selected && !isSearchActive
                    ? 'bg-primary text-white shadow-sm'
                    : 'border border-border bg-surface text-text-secondary hover:text-text-primary'
                } ${isSearchActive ? 'cursor-default' : ''}`}
              >
                {category} <span className="tabular-nums opacity-90">({total})</span>
              </button>
            )
          })}
        </div>
      </div>

      {!isSearchActive && learnProEnabled && (
        <p className="mb-6 text-sm text-text-secondary">
          {activeStats.free} of {activeStats.total} free in this category
        </p>
      )}

      {isSearchActive ? (
        <div id={resultsId} aria-labelledby={`${searchId}-mode`}>
          {filtered.length === 0 ? (
            <div className="rounded-lg border border-border bg-surface-secondary px-6 py-10 text-center">
              <p className="font-medium text-text-primary">No prompts match your search</p>
              <p className="mt-2 text-sm text-text-secondary">
                Try different keywords or{' '}
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="font-medium text-green underline underline-offset-2 hover:text-green/80"
                >
                  clear the search
                </button>
                .
              </p>
            </div>
          ) : (
            <ul className="space-y-6" role="list">
              {filtered.map((prompt) => (
                <li key={prompt.id}>
                  <PromptCard
                    prompt={prompt}
                    showCategory
                    learnProEnabled={learnProEnabled}
                    fieldValues={placeholderFields[prompt.id] ?? {}}
                    onPlaceholderFieldChange={handlePlaceholderFieldChange}
                    onUnlockClick={trackUnlockClick}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <>
          {CATEGORIES.map((category) => {
            const forCategory = prompts.filter((p) => p.category === category)
            return (
              <div
                key={category}
                id={panelId(category)}
                role="tabpanel"
                hidden={activeCategory !== category}
                aria-labelledby={tabId(category)}
              >
                <ul className="space-y-6" role="list">
                  {forCategory.map((prompt) => (
                    <li key={prompt.id}>
                      <PromptCard
                        prompt={prompt}
                        showCategory={false}
                        learnProEnabled={learnProEnabled}
                        fieldValues={placeholderFields[prompt.id] ?? {}}
                        onPlaceholderFieldChange={handlePlaceholderFieldChange}
                        onUnlockClick={trackUnlockClick}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}

          {categoryHasLocked && (
            <div className="mt-10 rounded-card border border-dashed border-primary/30 bg-primary/5 p-6 text-center sm:p-8">
              <p className="font-semibold text-text-primary">Want the full library?</p>
              <p className="mx-auto mt-2 max-w-lg text-sm text-text-secondary">
                Unlock every prompt in this category with Learn Pro.
              </p>
              <Link
                href="/pricing"
                onClick={() => trackCategoryUnlockClick(activeCategory)}
                className="mt-4 inline-flex min-h-[44px] items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                Unlock with Learn Pro
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  )
}

function PromptCard({
  prompt,
  showCategory,
  learnProEnabled,
  fieldValues,
  onPlaceholderFieldChange,
  onUnlockClick,
}: {
  readonly prompt: Prompt
  readonly showCategory: boolean
  readonly learnProEnabled: boolean
  readonly fieldValues: Record<number, string>
  readonly onPlaceholderFieldChange: (promptId: string, fieldIndex: number, value: string) => void
  readonly onUnlockClick: (p: Prompt) => void
}) {
  const showLockedChrome = learnProEnabled && !prompt.isFree

  const reconstructedPromptText = buildCopyablePrompt(prompt.prompt, fieldValues)

  return (
    <article
      className="rounded-card border border-border bg-surface-secondary p-6 sm:p-8"
      {...(showLockedChrome
        ? {
            'aria-label': `Locked prompt: ${prompt.title}. Unlock with Learn Pro.`,
          }
        : {})}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          {showCategory && (
            <span className="mb-2 inline-block rounded-full bg-surface-tertiary px-2.5 py-0.5 text-xs font-medium text-text-secondary">
              {prompt.category}
            </span>
          )}
          <h2 className="text-xl font-bold tracking-tight text-text-primary sm:text-2xl">
            {prompt.title}
          </h2>
        </div>
        {!showLockedChrome && (
          <div className="flex w-full justify-end sm:w-auto sm:shrink-0">
            <CopyButton
              text={reconstructedPromptText}
              label="Copy prompt"
              analyticsEvent={{
                event: 'prompt_copied',
                props: { prompt: prompt.id, category: prompt.category },
              }}
            />
          </div>
        )}
      </div>
      <p className="mt-3 leading-relaxed text-text-secondary">{prompt.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {prompt.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
          >
            {tag}
          </span>
        ))}
      </div>

      {!showLockedChrome ? (
        <pre className="mt-4 whitespace-pre-wrap break-words rounded-lg border border-border bg-surface p-4 text-sm text-text-primary">
          {renderEditablePromptBody(
            prompt.prompt,
            fieldValues,
            (fieldIndex, value) => onPlaceholderFieldChange(prompt.id, fieldIndex, value),
            prompt.id,
          )}
        </pre>
      ) : (
        <div className="relative mt-4 min-h-[120px] rounded-lg border border-border bg-surface">
          <pre
            aria-hidden="true"
            className="pointer-events-none select-none whitespace-pre-wrap break-words p-4 text-sm text-text-secondary blur-sm"
          >
            {prompt.prompt}
          </pre>
          <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-surface/85 p-4">
            <Link
              href="/pricing"
              onClick={() => onUnlockClick(prompt)}
              className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              Unlock with Learn Pro
            </Link>
          </div>
        </div>
      )}
    </article>
  )
}
