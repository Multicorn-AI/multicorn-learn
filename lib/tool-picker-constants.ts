export type ToolSlug = 'cursor' | 'claude-code' | 'windsurf'

export type TerminalAnswer = 'yes' | 'no' | 'whats-a-terminal'
export type BuildAnswer = 'web-app' | 'mobile-app' | 'api-backend' | 'not-sure'
export type BudgetAnswer = 'free-only' | 'paid-ok' | 'budget-no-concern'

export interface ToolPickerAnswers {
  readonly terminal: TerminalAnswer
  readonly build: BuildAnswer
  readonly budget: BudgetAnswer
}

export interface ToolRecommendation {
  readonly name: string
  readonly href: string
  readonly accentClass: string
}

export const TOOL_RECOMMENDATIONS: Record<ToolSlug, ToolRecommendation> = {
  cursor: {
    name: 'Cursor',
    href: '/learn/course-2/cursor',
    accentClass: 'bg-primary/10 text-primary border-primary/20',
  },
  'claude-code': {
    name: 'Claude Code',
    href: '/learn/course-2/claude-code',
    accentClass: 'bg-indigo/10 text-indigo border-indigo/20',
  },
  windsurf: {
    name: 'Windsurf',
    href: '/learn/course-2/windsurf',
    accentClass: 'bg-teal/10 text-teal border-teal/20',
  },
}

export interface ToolPickerQuestionOption {
  readonly id: string
  readonly label: string
}

export interface ToolPickerQuestion {
  readonly id: keyof ToolPickerAnswers
  readonly label: string
  readonly options: readonly ToolPickerQuestionOption[]
}

export const TOOL_PICKER_QUESTIONS: readonly ToolPickerQuestion[] = [
  {
    id: 'terminal',
    label: 'Are you comfortable using a terminal?',
    options: [
      { id: 'yes', label: 'Yes' },
      { id: 'no', label: 'No' },
      { id: 'whats-a-terminal', label: "What's a terminal?" },
    ],
  },
  {
    id: 'build',
    label: 'What are you building?',
    options: [
      { id: 'web-app', label: 'Web app' },
      { id: 'mobile-app', label: 'Mobile app' },
      { id: 'api-backend', label: 'API or backend' },
      { id: 'not-sure', label: 'Not sure yet' },
    ],
  },
  {
    id: 'budget',
    label: 'Do you have a budget for tools?',
    options: [
      { id: 'free-only', label: 'Free only' },
      { id: 'paid-ok', label: 'Happy to pay ~$20/mo' },
      { id: 'budget-no-concern', label: 'Budget not a concern' },
    ],
  },
] as const

function getBaseline(terminal: TerminalAnswer, budget: BudgetAnswer): ToolSlug {
  if (terminal === 'whats-a-terminal') {
    return budget === 'free-only' ? 'windsurf' : 'cursor'
  }
  if (terminal === 'no') {
    return budget === 'free-only' ? 'windsurf' : 'cursor'
  }
  if (budget === 'free-only') {
    return 'claude-code'
  }
  return 'cursor'
}

function resolveSlug(answers: ToolPickerAnswers): ToolSlug {
  const { terminal, build, budget } = answers

  if (build === 'mobile-app') {
    if (terminal === 'yes' && budget === 'free-only') {
      return 'windsurf'
    }
    return 'cursor'
  }

  if (build === 'api-backend') {
    if (terminal === 'yes') {
      return 'claude-code'
    }
    return getBaseline(terminal, budget)
  }

  if (build === 'web-app') {
    if (terminal === 'yes' && budget === 'free-only') {
      return 'claude-code'
    }
    if (terminal === 'yes' && (budget === 'paid-ok' || budget === 'budget-no-concern')) {
      return 'cursor'
    }
    return getBaseline(terminal, budget)
  }

  return getBaseline(terminal, budget)
}

function buildReason(slug: ToolSlug, answers: ToolPickerAnswers): string {
  const { terminal, build, budget } = answers

  switch (slug) {
    case 'cursor': {
      const tool = TOOL_RECOMMENDATIONS.cursor.name
      if (build === 'mobile-app') {
        return `${tool} gives you a visual editor and previews that suit mobile-style UI work. You said you are building a mobile app, so seeing layout and tweaks in one place will save time.`
      }
      if (build === 'web-app' && terminal === 'yes') {
        return `${tool} pairs a full editor with fast previews for web work. You are comfortable in a terminal and open to paid tooling, so you get strong models and a smooth loop.`
      }
      if (terminal === 'whats-a-terminal' || terminal === 'no') {
        return `${tool} keeps everything in a visual app so you rarely need the terminal. That matches how you said you like to work, and you have room in budget for the Pro tier.`
      }
      return `${tool} balances a clear UI with serious coding features. For what you described, it is the most straightforward way to ship without fighting your tools.`
    }
    case 'windsurf': {
      const tool = TOOL_RECOMMENDATIONS.windsurf.name
      if (build === 'mobile-app' && terminal === 'yes' && budget === 'free-only') {
        return `${tool} gives you a visual editor with a free tier that fits a mobile UI workflow. You are fine using a terminal but asked to stay free, so this track keeps costs down while you preview changes.`
      }
      return `${tool} keeps setup light and works well on a free tier. You wanted to avoid cost or keep things simple, so this track stays friendly while you learn.`
    }
    case 'claude-code': {
      const tool = TOOL_RECOMMENDATIONS['claude-code'].name
      if (build === 'api-backend') {
        return `${tool} runs from the terminal and fits API and backend workflows. You said you are comfortable there, so you can stay in one environment end to end.`
      }
      return `${tool} is built for terminal-first coding with Claude. You are fine on the command line and want to stay free, so this track avoids extra paid editor seats.`
    }
  }
}

export function getRecommendation(answers: ToolPickerAnswers): {
  readonly slug: ToolSlug
  readonly reason: string
} {
  const slug = resolveSlug(answers)
  return {
    slug,
    reason: buildReason(slug, answers),
  }
}
