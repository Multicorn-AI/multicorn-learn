# Contributing to multicorn-learn

Thanks for your interest in contributing. We want this project to be easy to run, easy to understand, and welcoming to first-time contributors.

## Code of Conduct

Please read and follow our [Code of Conduct](./CODE_OF_CONDUCT.md).

## Prerequisites

- Node.js 18+
- pnpm
- Git

## Quick Start (under 5 minutes)

```bash
git clone https://github.com/Multicorn-AI/multicorn-learn.git
cd multicorn-learn
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Run checks before opening a PR

```bash
pnpm lint
pnpm typecheck
pnpm build
```

## Coding standards

- TypeScript is strict: no `any`, no non-null assertions (`!`).
- Functional React components only.
- Named exports only, except Next.js pages where default export is required.
- Tailwind CSS for styling; avoid custom CSS unless Tailwind cannot express the style.
- Keep user-facing copy plain and clear.
- Do not leave unfinished copy or unresolved action items without a public issue reference.

## Project structure (high level)

- `app/` Next.js App Router pages and routes
- `components/` shared UI components
- `content/` MDX content for docs, learn, and blog
- `lib/` helpers and utilities
- `public/` static assets

## Pull request process

1. Create a focused branch from `main`.
2. Keep PRs small and easy to review.
3. Fill out the PR template completely.
4. Include clear test/verification steps.
5. Ensure lint, typecheck, and build pass locally.

## Issue labels

- `bug` confirmed bug or regression
- `enhancement` product or UX improvement
- `documentation` docs-only changes
- `good first issue` beginner-friendly scope
- `help wanted` maintainers welcome external help
- `needs reproduction` cannot act until reproduced

## Need help?

If setup fails or something is unclear, open an issue with your environment details and the command output. We will help you get unblocked.
