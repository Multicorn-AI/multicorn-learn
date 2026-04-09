/**
 * A single message in an LLM conversation.
 */
export interface LlmMessage {
  readonly role: 'user' | 'assistant' | 'system'
  readonly content: string
}

/**
 * Options for a completion request.
 */
export interface LlmCompletionOptions {
  readonly maxTokens?: number
  readonly temperature?: number
  readonly model?: string
}

/**
 * Normalized response from any LLM provider.
 */
export interface LlmResponse {
  readonly content: string
  readonly model: string
}

/**
 * Provider-agnostic LLM client.
 */
export interface LlmClient {
  complete(messages: readonly LlmMessage[], options?: LlmCompletionOptions): Promise<LlmResponse>
}
