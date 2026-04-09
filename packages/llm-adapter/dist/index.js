// src/anthropic.ts
import Anthropic from "@anthropic-ai/sdk";
var DEFAULT_MODEL = "claude-sonnet-4-20250514";
var AnthropicLlmClient = class {
  client;
  constructor(apiKey) {
    this.client = new Anthropic({ apiKey });
  }
  async complete(messages, options) {
    const systemParts = messages.filter((m) => m.role === "system").map((m) => m.content.trim()).filter(Boolean);
    const system = systemParts.length === 0 ? void 0 : systemParts.join("\n\n");
    const conversation = messages.filter((m) => m.role !== "system");
    const anthropicMessages = conversation.map((m) => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content: m.content
    }));
    const model = options?.model ?? DEFAULT_MODEL;
    const response = await this.client.messages.create({
      model,
      max_tokens: options?.maxTokens ?? 4096,
      temperature: options?.temperature,
      ...system !== void 0 ? { system } : {},
      messages: anthropicMessages
    });
    let content = "";
    for (const block of response.content) {
      if (block.type === "text") {
        content = block.text;
        break;
      }
    }
    return {
      content,
      model: response.model
    };
  }
};

// src/openai.ts
import OpenAI from "openai";
var DEFAULT_MODEL2 = "gpt-4o";
var OpenAILlmClient = class {
  client;
  constructor(apiKey) {
    this.client = new OpenAI({ apiKey });
  }
  async complete(messages, options) {
    const openaiMessages = messages.map((m) => ({
      role: m.role,
      content: m.content
    }));
    const model = options?.model ?? DEFAULT_MODEL2;
    const response = await this.client.chat.completions.create({
      model,
      messages: openaiMessages,
      max_tokens: options?.maxTokens,
      temperature: options?.temperature
    });
    const choice = response.choices[0];
    const content = choice?.message?.content ?? "";
    return {
      content,
      model: response.model
    };
  }
};

// src/factory.ts
function normalizeProvider(value) {
  return (value ?? "").trim().toLowerCase();
}
function createLlmClient(options) {
  const provider = normalizeProvider(options?.provider ?? process.env.LLM_PROVIDER) || "anthropic";
  if (provider !== "anthropic" && provider !== "openai") {
    throw new Error(`Invalid LLM provider "${provider}". Expected "anthropic" or "openai".`);
  }
  if (provider === "anthropic") {
    const apiKey2 = options?.apiKey ?? process.env.ANTHROPIC_API_KEY;
    if (!apiKey2 || apiKey2.trim() === "") {
      throw new Error(
        "Missing Anthropic API key. Set ANTHROPIC_API_KEY or pass apiKey to createLlmClient()."
      );
    }
    return new AnthropicLlmClient(apiKey2);
  }
  const apiKey = options?.apiKey ?? process.env.OPENAI_API_KEY;
  if (!apiKey || apiKey.trim() === "") {
    throw new Error(
      "Missing OpenAI API key. Set OPENAI_API_KEY or pass apiKey to createLlmClient()."
    );
  }
  return new OpenAILlmClient(apiKey);
}
export {
  AnthropicLlmClient,
  OpenAILlmClient,
  createLlmClient
};
//# sourceMappingURL=index.js.map