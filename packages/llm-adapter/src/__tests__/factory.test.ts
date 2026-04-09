import { afterEach, describe, expect, it, vi } from 'vitest'
import { AnthropicLlmClient } from '../anthropic.js'
import { createLlmClient } from '../factory.js'
import { OpenAILlmClient } from '../openai.js'

describe('createLlmClient', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('returns AnthropicLlmClient when provider is anthropic with a dummy API key', () => {
    vi.stubEnv('ANTHROPIC_API_KEY', 'sk-ant-dummy')
    const client = createLlmClient({ provider: 'anthropic', apiKey: 'sk-ant-dummy' })
    expect(client).toBeInstanceOf(AnthropicLlmClient)
  })

  it('returns OpenAILlmClient when provider is openai with a dummy API key', () => {
    vi.stubEnv('OPENAI_API_KEY', 'sk-openai-dummy')
    const client = createLlmClient({ provider: 'openai', apiKey: 'sk-openai-dummy' })
    expect(client).toBeInstanceOf(OpenAILlmClient)
  })

  it('defaults to Anthropic when no provider is specified and LLM_PROVIDER is empty', () => {
    vi.stubEnv('LLM_PROVIDER', '')
    vi.stubEnv('ANTHROPIC_API_KEY', 'sk-ant-dummy')
    const client = createLlmClient({ apiKey: 'sk-ant-dummy' })
    expect(client).toBeInstanceOf(AnthropicLlmClient)
  })

  it('throws a clear error when the API key is missing', () => {
    vi.stubEnv('ANTHROPIC_API_KEY', '')
    vi.stubEnv('OPENAI_API_KEY', '')
    expect(() => createLlmClient({ provider: 'anthropic' })).toThrow(/Missing Anthropic API key/i)
  })

  it('throws a static error when the provider is invalid and does not echo the input', () => {
    vi.stubEnv('ANTHROPIC_API_KEY', 'sk-ant-dummy')
    expect(() =>
      createLlmClient({ provider: 'not-a-real-provider', apiKey: 'sk-ant-dummy' }),
    ).toThrow('Unsupported LLM provider. Accepted values: "anthropic", "openai".')
    try {
      createLlmClient({ provider: 'not-a-real-provider', apiKey: 'sk-ant-dummy' })
      expect.fail('expected throw')
    } catch (e) {
      expect(String(e)).not.toContain('not-a-real-provider')
    }
  })

  it('normalises provider: leading/trailing spaces and case', () => {
    vi.stubEnv('ANTHROPIC_API_KEY', 'sk-ant-dummy')
    vi.stubEnv('OPENAI_API_KEY', 'sk-openai-dummy')
    expect(createLlmClient({ provider: ' Anthropic ', apiKey: 'sk-ant-dummy' })).toBeInstanceOf(
      AnthropicLlmClient,
    )
    expect(createLlmClient({ provider: 'OPENAI', apiKey: 'sk-openai-dummy' })).toBeInstanceOf(
      OpenAILlmClient,
    )
  })
})
