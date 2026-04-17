# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Course 2 Cursor track at `/learn/course-2/cursor`: 6 lessons (install, first prompt, reading code, iterating, writing tests, Course 3 bridge), `SecurityNote`/`CopyablePrompt`/`LessonProgress`/`LessonNavigation` components, localStorage progress tracking under `multicorn_progress_cursor_track_v1`, and build-time frontmatter validation
- Shared LLM adapter package (`packages/llm-adapter/`) supporting Anthropic and OpenAI providers
- Content agent package (`packages/multicorn-content/`) for automated article outline generation
- Weekly GitHub Actions workflow (`content-agent.yml`) with manual dispatch support
- `drafts/` directory for agent-generated outline files
- ADR-007 documenting the LLM adapter and content agent architecture
- Added "Built with Shield" section to multicorn-shield README documenting that Multicorn is built using AI agents (Cursor and GitHub Actions) that run under Shield
- Added "Built with Shield" callout block on the Shield landing page (multicorn.ai/shield) highlighting that Multicorn uses AI agents governed by Shield
