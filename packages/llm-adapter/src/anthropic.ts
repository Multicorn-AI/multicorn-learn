import Anthropic from '@anthropic-ai/sdk'
import type { LlmClient, LlmCompletionOptions, LlmMessage, LlmResponse } from './types.js'

const DEFAULT_MODEL = 'claude-sonnet-4-20250514'

export class AnthropicLlmClient implements LlmClient {
  private readonly client: Anthropic

  constructor(apiKey: string) {
    this.client = new Anthropic({ apiKey })
  }

  async complete(
    messages: readonly LlmMessage[],
    options?: LlmCompletionOptions,
  ): Promise<LlmResponse> {
    const systemParts = messages
      .filter((m) => m.role === 'system')
      .map((m) => m.content.trim())
      .filter(Boolean)
    const system = systemParts.length === 0 ? undefined : systemParts.join('\n\n')

    const conversation = messages.filter((m) => m.role !== 'system')
    const anthropicMessages: Anthropic.MessageParam[] = conversation.map((m) => ({
      role: m.role === 'assistant' ? 'assistant' : 'user',
      content: m.content,
    }))

    const model = options?.model ?? DEFAULT_MODEL
    const response = await this.client.messages.create({
      model,
      max_tokens: options?.maxTokens ?? 4096,
      temperature: options?.temperature,
      ...(system !== undefined ? { system } : {}),
      messages: anthropicMessages,
    })

    let content = ''
    for (const block of response.content) {
      if (block.type === 'text') {
        content = block.text
        break
      }
    }

    return {
      content,
      model: response.model,
    }
  }
}
