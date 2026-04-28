export type AgentSlug = 'autohive' | 'dust' | 'mindstudio' | 'n8n'

export type TechnicalAnswer = 'no-code-first' | 'some-setup-ok' | 'developer-mindset'
export type PriorityAnswer = 'ship-quickly' | 'shared-knowledge' | 'pick-models'
export type HostingAnswer = 'managed' | 'flexible' | 'self-host'

export interface AgentPickerAnswers {
  readonly technical: TechnicalAnswer
  readonly priority: PriorityAnswer
  readonly hosting: HostingAnswer
}

export interface AgentRecommendation {
  readonly name: string
  readonly href: string
  readonly accentClass: string
}

/** Quiz result panel accents (match platform picker card tints). */
export const AGENT_RECOMMENDATIONS: Record<AgentSlug, AgentRecommendation> = {
  autohive: {
    name: 'AutoHive',
    href: '/learn/course-4/autohive',
    accentClass: 'bg-violet-500/10 text-violet-600 border-violet-500/20',
  },
  dust: {
    name: 'Dust',
    href: '/learn/course-4/dust',
    accentClass: 'bg-[#6366f1]/10 text-[#4f46e5] border-[#6366f1]/20',
  },
  mindstudio: {
    name: 'MindStudio',
    href: '/learn/course-4/mindstudio',
    accentClass: 'bg-[#14b8a6]/10 text-[#0d9488] border-[#14b8a6]/20',
  },
  n8n: {
    name: 'n8n',
    href: '/learn/course-4/n8n',
    accentClass: 'bg-sky-500/10 text-sky-700 border-sky-500/20',
  },
}

export interface AgentPickerQuestionOption {
  readonly id: string
  readonly label: string
}

export interface AgentPickerQuestion {
  readonly id: keyof AgentPickerAnswers
  readonly label: string
  readonly options: readonly AgentPickerQuestionOption[]
}

export const AGENT_PICKER_QUESTIONS: readonly AgentPickerQuestion[] = [
  {
    id: 'technical',
    label: 'How do you like to work with software today?',
    options: [
      { id: 'no-code-first', label: 'Mostly no-code, guided builders' },
      { id: 'some-setup-ok', label: 'Some setup is fine if it saves time later' },
      { id: 'developer-mindset', label: 'Comfortable in technical tools and docs' },
    ],
  },
  {
    id: 'priority',
    label: 'What matters most for your first agent?',
    options: [
      { id: 'ship-quickly', label: 'Ship something useful fast for a small team' },
      { id: 'shared-knowledge', label: 'Connect docs and context the team already uses' },
      { id: 'pick-models', label: 'Try different models and custom behaviour' },
    ],
  },
  {
    id: 'hosting',
    label: 'Where should workflows and data live?',
    options: [
      { id: 'managed', label: 'Managed cloud is fine' },
      { id: 'flexible', label: 'Open to cloud or a bit of self-serve setup' },
      { id: 'self-host', label: 'We need to run it on our own infrastructure' },
    ],
  },
] as const

function resolveSlug(answers: AgentPickerAnswers): AgentSlug {
  const { technical, priority, hosting } = answers

  if (hosting === 'self-host') {
    return 'n8n'
  }

  if (priority === 'shared-knowledge') {
    return 'dust'
  }

  if (priority === 'pick-models' || technical === 'developer-mindset') {
    return 'mindstudio'
  }

  if (technical === 'no-code-first') {
    return 'autohive'
  }

  if (priority === 'ship-quickly' && hosting === 'flexible' && technical === 'some-setup-ok') {
    return 'n8n'
  }

  if (priority === 'ship-quickly') {
    return 'autohive'
  }

  return 'dust'
}

function buildReason(slug: AgentSlug, answers: AgentPickerAnswers): string {
  const { technical, priority, hosting } = answers
  const name = AGENT_RECOMMENDATIONS[slug].name

  switch (slug) {
    case 'autohive': {
      if (technical === 'no-code-first') {
        return `${name} fits teams that want a guided, SMB-friendly path without living in code. You said you prefer no-code style work, so this track keeps the first agent approachable.`
      }
      return `${name} is a strong pick when the goal is to get an agent in front of people quickly. You wanted to ship fast, and this path keeps setup and iteration light.`
    }
    case 'dust': {
      return `${name} is built around knowledge and shared context. You said connecting docs and how the team works matters most, so this track matches that workflow.`
    }
    case 'mindstudio': {
      if (priority === 'pick-models') {
        return `${name} gives you room to swap models and shape behaviour. You prioritized trying different models and custom logic, so this track aligns with that.`
      }
      return `${name} suits builders who are fine digging into options and configuration. You said you are comfortable with technical tools, so you can take advantage of what it offers.`
    }
    case 'n8n': {
      if (hosting === 'self-host') {
        return `${name} is visual but developer-friendly and works well self-hosted. You need your own infrastructure, so this track follows that constraint.`
      }
      return `${name} shines when you want visual workflows and do not mind a bit of setup. You were open to flexible hosting, so this path can grow with more technical use cases.`
    }
  }
}

export function getAgentRecommendation(answers: AgentPickerAnswers): {
  readonly slug: AgentSlug
  readonly reason: string
} {
  const slug = resolveSlug(answers)
  return {
    slug,
    reason: buildReason(slug, answers),
  }
}
