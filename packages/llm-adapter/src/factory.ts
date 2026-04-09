import { AnthropicLlmClient } from './anthropic.js'
import { OpenAILlmClient } from './openai.js'
import type { LlmClient } from './types.js'

function normalizeProvider(value: string | undefined): string {
  return (value ?? '').trim().toLowerCase()
}

/**
 * Creates an {@link LlmClient} for Anthropic or OpenAI.
 *
 * - `provider` defaults to `LLM_PROVIDER` env var, then `'anthropic'`.
 * - `apiKey` defaults to `ANTHROPIC_API_KEY` or `OPENAI_API_KEY` based on provider.
 */
export function createLlmClient(options?: {
  readonly provider?: string
  readonly apiKey?: string
}): LlmClient {
  const provider = normalizeProvider(options?.provider ?? process.env.LLM_PROVIDER) || 'anthropic'

  if (provider !== 'anthropic' && provider !== 'openai') {
    throw new Error(`Invalid LLM provider "${provider}". Expected "anthropic" or "openai".`)
  }

  if (provider === 'anthropic') {
    const apiKey = options?.apiKey ?? process.env.ANTHROPIC_API_KEY
    if (!apiKey || apiKey.trim() === '') {
      throw new Error(
        'Missing Anthropic API key. Set ANTHROPIC_API_KEY or pass apiKey to createLlmClient().',
      )
    }
    return new AnthropicLlmClient(apiKey)
  }

  const apiKey = options?.apiKey ?? process.env.OPENAI_API_KEY
  if (!apiKey || apiKey.trim() === '') {
    throw new Error(
      'Missing OpenAI API key. Set OPENAI_API_KEY or pass apiKey to createLlmClient().',
    )
  }
  return new OpenAILlmClient(apiKey)
}
