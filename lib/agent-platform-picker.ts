import { AGENT_PLATFORM_IDS, type AgentPlatformId } from '@/lib/agent-platform-data'

export const AGENT_PLATFORM_PICKER_PHASE = {
  q1: 'q1',
  q2: 'q2',
  q3: 'q3',
  result: 'result',
} as const

export type AgentPlatformPickerPhase =
  (typeof AGENT_PLATFORM_PICKER_PHASE)[keyof typeof AGENT_PLATFORM_PICKER_PHASE]

export const AGENT_PLATFORM_PICKER_Q1_IDS = {
  microsoft365: 'microsoft_365',
  googleWorkspace: 'google_workspace',
  slackNotion: 'slack_notion',
  spreadsheetsEmail: 'spreadsheets_email',
} as const

export type AgentPlatformPickerQ1Answer =
  (typeof AGENT_PLATFORM_PICKER_Q1_IDS)[keyof typeof AGENT_PLATFORM_PICKER_Q1_IDS]

export const AGENT_PLATFORM_PICKER_Q2_IDS = {
  triageReply: 'triage_reply',
  repetitiveReports: 'repetitive_reports',
  repurposeContent: 'repurpose_content',
  searchOwnStuff: 'search_my_own_stuff',
  qualifyLeads: 'qualify_leads',
} as const

export type AgentPlatformPickerQ2Answer =
  (typeof AGENT_PLATFORM_PICKER_Q2_IDS)[keyof typeof AGENT_PLATFORM_PICKER_Q2_IDS]

export const AGENT_PLATFORM_PICKER_Q3_IDS = {
  notAtAll: 'not_at_all',
  aBit: 'a_bit',
  iWriteCode: 'i_write_code',
} as const

export type AgentPlatformPickerQ3Answer =
  (typeof AGENT_PLATFORM_PICKER_Q3_IDS)[keyof typeof AGENT_PLATFORM_PICKER_Q3_IDS]

export interface AgentPlatformPickerAnswers {
  readonly q1: AgentPlatformPickerQ1Answer
  readonly q2: AgentPlatformPickerQ2Answer
  readonly q3: AgentPlatformPickerQ3Answer
}

export interface AgentPlatformPickerResult {
  readonly recommended: AgentPlatformId
  readonly runnerUp: AgentPlatformId
}

export type AgentPlatformPickerOption = {
  readonly id: string
  readonly label: string
}

export type AgentPlatformPickerQuestion = {
  readonly id: 'q1' | 'q2' | 'q3'
  readonly label: string
  readonly options: readonly AgentPlatformPickerOption[]
}

export const AGENT_PLATFORM_PICKER_QUESTIONS: readonly AgentPlatformPickerQuestion[] = [
  {
    id: 'q1',
    label: 'What tools do you already use?',
    options: [
      { id: AGENT_PLATFORM_PICKER_Q1_IDS.microsoft365, label: 'Microsoft 365' },
      { id: AGENT_PLATFORM_PICKER_Q1_IDS.googleWorkspace, label: 'Google Workspace' },
      { id: AGENT_PLATFORM_PICKER_Q1_IDS.slackNotion, label: 'Slack and Notion' },
      { id: AGENT_PLATFORM_PICKER_Q1_IDS.spreadsheetsEmail, label: 'Spreadsheets and email' },
    ],
  },
  {
    id: 'q2',
    label: 'What do you want the agent to do?',
    options: [
      { id: AGENT_PLATFORM_PICKER_Q2_IDS.triageReply, label: 'Triage and reply' },
      { id: AGENT_PLATFORM_PICKER_Q2_IDS.repetitiveReports, label: 'Repetitive reports' },
      { id: AGENT_PLATFORM_PICKER_Q2_IDS.repurposeContent, label: 'Repurpose content' },
      { id: AGENT_PLATFORM_PICKER_Q2_IDS.searchOwnStuff, label: 'Search my own stuff' },
      { id: AGENT_PLATFORM_PICKER_Q2_IDS.qualifyLeads, label: 'Qualify leads' },
    ],
  },
  {
    id: 'q3',
    label: 'How technical are you?',
    options: [
      { id: AGENT_PLATFORM_PICKER_Q3_IDS.notAtAll, label: 'Not at all' },
      { id: AGENT_PLATFORM_PICKER_Q3_IDS.aBit, label: 'A bit' },
      { id: AGENT_PLATFORM_PICKER_Q3_IDS.iWriteCode, label: 'I write code' },
    ],
  },
] as const

const Q1_POINTS: Record<AgentPlatformPickerQ1Answer, Record<AgentPlatformId, number>> = {
  [AGENT_PLATFORM_PICKER_Q1_IDS.microsoft365]: {
    autohive: 3,
    dust: 3,
    lindy: 3,
    mindstudio: 3,
    'relevance-ai': 4,
    taskade: 4,
    'zapier-ai-actions': 5,
    n8n: 2,
  },
  [AGENT_PLATFORM_PICKER_Q1_IDS.googleWorkspace]: {
    autohive: 3,
    dust: 5,
    lindy: 4,
    mindstudio: 4,
    'relevance-ai': 3,
    taskade: 4,
    'zapier-ai-actions': 5,
    n8n: 2,
  },
  [AGENT_PLATFORM_PICKER_Q1_IDS.slackNotion]: {
    autohive: 4,
    dust: 5,
    lindy: 5,
    mindstudio: 3,
    'relevance-ai': 3,
    taskade: 3,
    'zapier-ai-actions': 5,
    n8n: 3,
  },
  [AGENT_PLATFORM_PICKER_Q1_IDS.spreadsheetsEmail]: {
    autohive: 2,
    dust: 2,
    lindy: 2,
    mindstudio: 3,
    'relevance-ai': 3,
    taskade: 3,
    'zapier-ai-actions': 5,
    n8n: 5,
  },
}

const Q2_POINTS: Record<AgentPlatformPickerQ2Answer, Record<AgentPlatformId, number>> = {
  [AGENT_PLATFORM_PICKER_Q2_IDS.triageReply]: {
    autohive: 3,
    dust: 4,
    lindy: 5,
    mindstudio: 3,
    'relevance-ai': 3,
    taskade: 3,
    'zapier-ai-actions': 4,
    n8n: 2,
  },
  [AGENT_PLATFORM_PICKER_Q2_IDS.repetitiveReports]: {
    autohive: 2,
    dust: 2,
    lindy: 2,
    mindstudio: 3,
    'relevance-ai': 3,
    taskade: 4,
    'zapier-ai-actions': 5,
    n8n: 5,
  },
  [AGENT_PLATFORM_PICKER_Q2_IDS.repurposeContent]: {
    autohive: 2,
    dust: 5,
    lindy: 3,
    mindstudio: 5,
    'relevance-ai': 2,
    taskade: 4,
    'zapier-ai-actions': 3,
    n8n: 3,
  },
  [AGENT_PLATFORM_PICKER_Q2_IDS.searchOwnStuff]: {
    autohive: 3,
    dust: 5,
    lindy: 3,
    mindstudio: 3,
    'relevance-ai': 4,
    taskade: 3,
    'zapier-ai-actions': 4,
    n8n: 2,
  },
  [AGENT_PLATFORM_PICKER_Q2_IDS.qualifyLeads]: {
    autohive: 3,
    dust: 3,
    lindy: 5,
    mindstudio: 3,
    'relevance-ai': 5,
    taskade: 3,
    'zapier-ai-actions': 4,
    n8n: 2,
  },
}

const Q3_POINTS: Record<AgentPlatformPickerQ3Answer, Record<AgentPlatformId, number>> = {
  [AGENT_PLATFORM_PICKER_Q3_IDS.notAtAll]: {
    autohive: 3,
    dust: 3,
    lindy: 4,
    mindstudio: 5,
    'relevance-ai': 2,
    taskade: 4,
    'zapier-ai-actions': 5,
    n8n: 1,
  },
  [AGENT_PLATFORM_PICKER_Q3_IDS.aBit]: {
    autohive: 3,
    dust: 4,
    lindy: 4,
    mindstudio: 4,
    'relevance-ai': 3,
    taskade: 4,
    'zapier-ai-actions': 4,
    n8n: 3,
  },
  [AGENT_PLATFORM_PICKER_Q3_IDS.iWriteCode]: {
    autohive: 3,
    dust: 2,
    lindy: 2,
    mindstudio: 3,
    'relevance-ai': 4,
    taskade: 2,
    'zapier-ai-actions': 2,
    n8n: 5,
  },
}

function totalScore(
  q1: AgentPlatformPickerQ1Answer,
  q2: AgentPlatformPickerQ2Answer,
  q3: AgentPlatformPickerQ3Answer,
  id: AgentPlatformId,
): number {
  return Q1_POINTS[q1][id] + Q2_POINTS[q2][id] + Q3_POINTS[q3][id]
}

/**
 * Pure decision tree over answer triples. Returns the top two platforms by weighted score,
 * with stable tie-break on platform id. No two platforms share the same rank at first and second place.
 */
export function getAgentPlatformRecommendation(
  answers: AgentPlatformPickerAnswers,
): AgentPlatformPickerResult {
  const scored = AGENT_PLATFORM_IDS.map((id) => ({
    id,
    score: totalScore(answers.q1, answers.q2, answers.q3, id),
  }))

  scored.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score
    }
    return a.id.localeCompare(b.id)
  })

  const first = scored[0]
  const second = scored[1]
  if (!first || !second) {
    throw new Error('Agent platform picker could not rank platforms')
  }

  const recommended = first.id
  const runnerUp = second.id

  if (recommended === runnerUp) {
    throw new Error('Agent platform picker returned identical recommended and runner-up')
  }

  return { recommended, runnerUp }
}
