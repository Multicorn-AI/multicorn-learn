import OpenAI from 'openai'
import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions'
import type { LlmClient, LlmCompletionOptions, LlmMessage, LlmResponse } from './types.js'

const DEFAULT_MODEL = 'gpt-4o'

export class OpenAILlmClient implements LlmClient {
  private readonly client: OpenAI

  constructor(apiKey: string) {
    this.client = new OpenAI({ apiKey })
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
