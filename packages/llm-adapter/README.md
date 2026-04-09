# @multicorn/llm-adapter

Shared LLM client abstraction for Multicorn packages (Anthropic and OpenAI).

## Supported providers

- **Anthropic** (Claude) via `@anthropic-ai/sdk`
- **OpenAI** via `openai`

## Environment variables

| Variable            | Purpose                                                                             |
| ------------------- | ----------------------------------------------------------------------------------- |
| `LLM_PROVIDER`      | Optional. `anthropic` or `openai`. Defaults to **`anthropic`** when unset or empty. |
| `ANTHROPIC_API_KEY` | Required when using Anthropic (unless you pass `apiKey` to `createLlmClient()`).    |
| `OPENAI_API_KEY`    | Required when using OpenAI (unless you pass `apiKey` to `createLlmClient()`).       |

## Usage

```typescript
import { createLlmClient } from '@multicorn/llm-adapter'

const client = createLlmClient()
const { content, model } = await client.complete([
  { role: 'user', content: 'Say hello in one sentence.' },
])
```

Pass a specific model per request (overrides each client’s default):

```typescript
await client.complete(messages, { model: 'claude-sonnet-4-20250514' })
```

## Testing

```bash
pnpm run test
```

Tests cover the factory function (provider selection, validation, normalisation) and do not make real API calls.

## Internal package

This is an internal package used by other packages in the multicorn-learn monorepo via pnpm workspace references. It is not published to npm.
