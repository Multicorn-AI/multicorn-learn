/**
 * A single message in an LLM conversation.
 */
interface LlmMessage {
    readonly role: 'user' | 'assistant' | 'system';
    readonly content: string;
}
/**
 * Options for a completion request.
 */
interface LlmCompletionOptions {
    readonly maxTokens?: number;
    readonly temperature?: number;
    readonly model?: string;
}
/**
 * Normalized response from any LLM provider.
 */
interface LlmResponse {
    readonly content: string;
    readonly model: string;
}
/**
 * Provider-agnostic LLM client.
 */
interface LlmClient {
    complete(messages: readonly LlmMessage[], options?: LlmCompletionOptions): Promise<LlmResponse>;
}

declare class AnthropicLlmClient implements LlmClient {
    private readonly client;
    constructor(apiKey: string);
    complete(messages: readonly LlmMessage[], options?: LlmCompletionOptions): Promise<LlmResponse>;
}

declare class OpenAILlmClient implements LlmClient {
    private readonly client;
    constructor(apiKey: string);
    complete(messages: readonly LlmMessage[], options?: LlmCompletionOptions): Promise<LlmResponse>;
}

/**
 * Creates an {@link LlmClient} for Anthropic or OpenAI.
 *
 * - `provider` defaults to `LLM_PROVIDER` env var, then `'anthropic'`.
 * - `apiKey` defaults to `ANTHROPIC_API_KEY` or `OPENAI_API_KEY` based on provider.
 */
declare function createLlmClient(options?: {
    readonly provider?: string;
    readonly apiKey?: string;
}): LlmClient;

export { AnthropicLlmClient, type LlmClient, type LlmCompletionOptions, type LlmMessage, type LlmResponse, OpenAILlmClient, createLlmClient };
