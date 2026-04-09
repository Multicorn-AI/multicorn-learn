import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { AnthropicLlmClient } from '../anthropic.js'
import { createLlmClient } from '../factory.js'
import { OpenAILlmClient } from '../openai.js'

const ENV_KEYS = ['LLM_PROVIDER', 'ANTHROPIC_API_KEY', 'OPENAI_API_KEY'] as const

describe('createLlmClient', () => {
  let snapshot: Partial<Record<(typeof ENV_KEYS)[number], string | undefined>>

  beforeEach(() => {
    snapshot = {}
    for (const key of ENV_KEYS) {
      snapshot[key] = process.env[key]
    }
  })

  afterEach(() => {
    for (const key of ENV_KEYS) {
      const prev = snapshot[key]
      if (prev === undefined) {
        delete process.env[key]
      } else {
        process.env[key] = prev
      }
    }
  })

  it('returns AnthropicLlmClient when provider is anthropic and a dummy API key are passed', () => {
    process.env.ANTHROPIC_API_KEY = 'sk-ant-dummy'
    const client = createLlmClient({ provider: 'anthropic', apiKey: 'sk-ant-dummy' })
    expect(client).toBeInstanceOf(AnthropicLlmClient)
  })

  it('returns OpenAILlmClient when provider is openai and a dummy API key are passed', () => {
    process.env.OPENAI_API_KEY = 'sk-openai-dummy'
    const client = createLlmClient({ provider: 'openai', apiKey: 'sk-openai-dummy' })
    expect(client).toBeInstanceOf(OpenAILlmClient)
  })

  it('defaults to Anthropic when no provider is specified and LLM_PROVIDER env var is unset', () => {
    delete process.env.LLM_PROVIDER
    process.env.ANTHROPIC_API_KEY = 'sk-ant-dummy'
    const client = createLlmClient({ apiKey: 'sk-ant-dummy' })
    expect(client).toBeInstanceOf(AnthropicLlmClient)
  })

  it('throws when API key is missing for the selected provider', () => {
    process.env.ANTHROPIC_API_KEY = ''
    process.env.OPENAI_API_KEY = ''
    expect(() => createLlmClient({ provider: 'anthropic' })).toThrow(/Missing Anthropic API key/i)
  })

  it('throws when provider is invalid, message includes Accepted values and not the bad string', () => {
    process.env.ANTHROPIC_API_KEY = 'sk-ant-dummy'
    const bad = 'not-a-real-provider-xyz'
    expect(() => createLlmClient({ provider: bad, apiKey: 'sk-ant-dummy' })).toThrow()
    try {
      createLlmClient({ provider: bad, apiKey: 'sk-ant-dummy' })
      expect.fail('expected throw')
    } catch (e) {
      const msg = String(e)
      expect(msg).toContain('Accepted values')
      expect(msg).not.toContain(bad)
    }
  })

  it('normalises provider strings: Anthropic, OPENAI, openai with spacing', () => {
    process.env.ANTHROPIC_API_KEY = 'sk-ant-dummy'
    process.env.OPENAI_API_KEY = 'sk-openai-dummy'
    expect(createLlmClient({ provider: ' Anthropic ', apiKey: 'sk-ant-dummy' })).toBeInstanceOf(
      AnthropicLlmClient,
    )
    expect(createLlmClient({ provider: 'OPENAI', apiKey: 'sk-openai-dummy' })).toBeInstanceOf(
      OpenAILlmClient,
    )
    expect(createLlmClient({ provider: '  openai  ', apiKey: 'sk-openai-dummy' })).toBeInstanceOf(
      OpenAILlmClient,
    )
  })
})
