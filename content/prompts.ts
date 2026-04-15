export const CATEGORIES = ['Writing', 'Analysis', 'Coding', 'Research', 'Agents'] as const

export type Category = (typeof CATEGORIES)[number]

export interface Prompt {
  readonly id: string
  readonly title: string
  readonly description: string
  readonly prompt: string
  readonly category: Category
  readonly tags: readonly string[]
  readonly isFree: boolean
}

const FREE_PER_CATEGORY = 10

function categoryPrompts(
  category: Category,
  slug: string,
  titles: readonly string[],
): readonly Prompt[] {
  return titles.map((title, index) => ({
    id: `${slug}-${index + 1}`,
    category,
    title,
    description: `Placeholder description for this ${category.toLowerCase()} prompt. Rachelle will replace with final copy.`,
    prompt: `Placeholder prompt text for "${title}". Rachelle will replace with the full prompt users can copy.`,
    tags: [category, 'placeholder'],
    isFree: index < FREE_PER_CATEGORY,
  }))
}

const WRITING_TITLES = [
  'Clarify tone for a blog post',
  'Turn bullet notes into a first draft',
  'Rewrite for a shorter word count',
  'Improve clarity for non-experts',
  'Generate headline options',
  'Outline a long-form article',
  'Edit for active voice',
  'Adapt copy for email vs web',
  'Summarize feedback into edits',
  'Draft a product update blurb',
  'Craft a narrative arc for long-form content',
  'Structure a counterargument that stays collegial',
] as const

const ANALYSIS_TITLES = [
  'Compare two options with pros and cons',
  'Extract risks from a document',
  'Build a simple decision matrix',
  'Summarize metrics for leadership',
  'Spot gaps in an argument',
  'Turn raw data into takeaways',
  'Stress-test an assumption',
  'Draft questions before a review',
  'Prioritize issues by impact',
  'Explain variance vs plan',
  'Build a sensitivity table for key assumptions',
  'Turn meeting notes into a decision recap',
] as const

const CODING_TITLES = [
  'Explain a bug from a stack trace',
  'Suggest tests for a function',
  'Refactor for readability',
  'Review a pull request diff',
  'Generate commit messages',
  'Break a feature into tasks',
  'Document an API endpoint',
  'Debug a failing build step',
  'Propose a minimal fix',
  'Translate requirements into acceptance criteria',
  'Plan a safe rollback after a bad deploy',
  'Draft a code review comment that teaches',
] as const

const RESEARCH_TITLES = [
  'Create a research brief',
  'Draft interview questions',
  'Summarize sources with citations',
  'Compare methodologies',
  'Extract open questions from notes',
  'Build a literature-style outline',
  'Evaluate source credibility',
  'Turn notes into a memo',
  'Define scope for a topic',
  'List unknowns to validate next',
  'Map conflicting claims across two papers',
  'Design a short survey to validate a hypothesis',
] as const

const AGENTS_TITLES = [
  'Define a safe task for an agent',
  'Write a handoff between agents',
  'Draft guardrails for a workflow',
  'Specify success criteria for automation',
  'Plan a human review checkpoint',
  'List permissions an agent needs',
  'Write a failure-mode checklist',
  'Summarize what an agent did',
  'Request a rollback plan',
  'Clarify boundaries for tool use',
  'Write a runbook for when an agent hits a permission error',
  'Define what "done" means for an automated workflow',
] as const

const ALL_PROMPTS: readonly Prompt[] = [
  ...categoryPrompts('Writing', 'writing', WRITING_TITLES),
  ...categoryPrompts('Analysis', 'analysis', ANALYSIS_TITLES),
  ...categoryPrompts('Coding', 'coding', CODING_TITLES),
  ...categoryPrompts('Research', 'research', RESEARCH_TITLES),
  ...categoryPrompts('Agents', 'agents', AGENTS_TITLES),
]

export function getPrompts(): readonly Prompt[] {
  return ALL_PROMPTS
}

/** Reads static `ALL_PROMPTS`. If prompts ever load dynamically, derive counts from that source instead. */
export function countPromptsForCategory(category: Category): {
  readonly total: number
  readonly free: number
} {
  const inCat = ALL_PROMPTS.filter((p) => p.category === category)
  const free = inCat.filter((p) => p.isFree).length
  return { total: inCat.length, free }
}
