import OpenAI from 'openai'
import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions'
import type { LlmClient, LlmCompletionOptions, LlmMessage, LlmResponse } from './types.js'

// Default model. Override per-call via options.model.
// See https://platform.openai.com/docs/models for current model IDs.
const DEFAULT_MODEL = 'gpt-4o'

/**
 * {@link LlmClient} backed by OpenAI Chat Completions.
 *
 * @param apiKey - OpenAI API key (typically from `OPENAI_API_KEY`).
 *
 * @example
 * ```ts
 * const client = new OpenAILlmClient(process.env.OPENAI_API_KEY!)
 * const { content } = await client.complete(
 *   [{ role: 'user', content: 'Hello' }],
 *   { model: 'gpt-4o' },
 * )
 * ```
 */
export class OpenAILlmClient implements LlmClient {
  private readonly client!: OpenAI

  constructor(apiKey: string) {
    const client = new OpenAI({ apiKey })
    Object.defineProperty(this, 'client', { value: client, enumerable: false, writable: false })
  }

  async complete(
    messages: readonly LlmMessage[],
    options?: LlmCompletionOptions,
  ): Promise<LlmResponse> {
    const openaiMessages: ChatCompletionMessageParam[] = messages.map((m) => ({
      role: m.role,
      content: m.content,
    }))

    const model = options?.model ?? DEFAULT_MODEL
    const response = await this.client.chat.completions.create({
      model,
      messages: openaiMessages,
      max_tokens: options?.maxTokens,
      temperature: options?.temperature,
    })

    const choice = response.choices[0]
    const content = choice?.message?.content ?? ''

    return {
      content,
      model: response.model,
    }
  }
}
