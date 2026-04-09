# ADR-007: Shared LLM adapter and autonomous content agent

## Status

Accepted

## Context

Multicorn Learn needs a steady pipeline of article ideas based on current AI news. Manually scanning RSS feeds and drafting outlines is time-consuming. We also anticipate multiple packages needing LLM access (multicorn-ops persona reviews, future tooling), so a shared abstraction avoids duplicating provider integration code.

## Decision

Introduce two new packages inside multicorn-learn:

- `packages/llm-adapter/` — a shared LLM client abstraction supporting Anthropic and OpenAI, selected at runtime via the `LLM_PROVIDER` environment variable. Thin adapter layer with a `LlmClient` interface and provider-specific implementations.
- `packages/multicorn-content/` — an autonomous content agent that runs weekly via GitHub Actions cron. It fetches RSS feeds, filters for relevance using an LLM, generates structured outlines, submits them to Shield for approval, and creates draft PRs for approved outlines. The agent never writes full articles or pushes directly to main.

Approval is enforced via Shield's existing `requires_approval` action status. A batched email with signed one-click approve/reject links is sent after outline submission. The approval endpoint uses HMAC-SHA256 signed tokens with 7-day expiry.

## Consequences

- Weekly article pipeline with minimal manual effort. Rachelle reviews and approves outlines from email, approved outlines appear as PRs.
- LLM provider can be swapped without code changes. Shared adapter is reusable by multicorn-ops and future packages.
- The agent has a GitHub PAT with write access to multicorn-learn. Token scope is limited to Contents and Pull Requests on this repo only.
- State is stored in `.content-state.json` for deduplication. If this file is lost, the agent may re-evaluate previously seen articles but will not create duplicate outlines (Shield tracks action IDs).
- The agent runs unattended. Failures trigger GitHub Actions notifications. No content is published without explicit human approval.
