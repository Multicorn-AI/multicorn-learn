import { describe, expect, it } from 'vitest'
import { AGENT_PLATFORM_IDS } from '@/lib/agent-platform-data'
import {
  AGENT_PLATFORM_PICKER_Q1_IDS,
  AGENT_PLATFORM_PICKER_Q2_IDS,
  AGENT_PLATFORM_PICKER_Q3_IDS,
  getAgentPlatformRecommendation,
  type AgentPlatformPickerQ1Answer,
  type AgentPlatformPickerQ2Answer,
  type AgentPlatformPickerQ3Answer,
} from '@/lib/agent-platform-picker'

const KNOWN_IDS = new Set<string>(AGENT_PLATFORM_IDS)

function collectIds(ids: Record<string, string>): string[] {
  return Object.values(ids)
}

describe('getAgentPlatformRecommendation', () => {
  const q1Values = collectIds(AGENT_PLATFORM_PICKER_Q1_IDS) as AgentPlatformPickerQ1Answer[]
  const q2Values = collectIds(AGENT_PLATFORM_PICKER_Q2_IDS) as AgentPlatformPickerQ2Answer[]
  const q3Values = collectIds(AGENT_PLATFORM_PICKER_Q3_IDS) as AgentPlatformPickerQ3Answer[]

  it('returns distinct recommended and runner-up for every answer combination', () => {
    for (const q1 of q1Values) {
      for (const q2 of q2Values) {
        for (const q3 of q3Values) {
          const result = getAgentPlatformRecommendation({ q1, q2, q3 })
          expect(result.recommended).not.toBe(result.runnerUp)
          expect(KNOWN_IDS.has(result.recommended)).toBe(true)
          expect(KNOWN_IDS.has(result.runnerUp)).toBe(true)
        }
      }
    }
  })
})
