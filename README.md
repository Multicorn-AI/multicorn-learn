# multicorn-learn

Multicorn Learn: the AI education site and landing page for [multicorn.ai](https://multicorn.ai).

[![License: MIT](https://img.shields.io/badge/License-MIT-violet.svg)](./LICENSE)

## Overview

This is the public-facing Next.js application that serves:

- **Landing page:** communicates the Multicorn value proposition
- **Shield product page:** details on the agent permission control SDK
- **Learn:** free, practical education on AI agent security and governance
- **Blog:** articles on AI agent best practices
- **Pricing:** transparent pricing for Multicorn Shield

Part of the [Multicorn](https://github.com/multicorn) ecosystem.

## Quick Start

```bash
# Clone the repo
git clone https://github.com/multicorn/multicorn-learn.git
cd multicorn-learn

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Prerequisites

- Node.js 18.17+
- pnpm 8+

## Project Structure

```
multicorn-learn/
├── app/                  # Next.js App Router pages
│   ├── page.tsx          # Landing page
│   ├── layout.tsx        # Root layout
│   ├── globals.css       # Global styles + Tailwind directives
│   ├── shield/           # Shield product page
│   ├── learn/            # Education routes
│   ├── blog/             # Blog routes
│   └── pricing/          # Pricing page
├── components/           # Shared UI components
├── content/              # MDX articles and education content
├── lib/                  # Utility functions and helpers
├── public/               # Static assets (images, fonts, etc.)
├── mdx-components.tsx    # MDX component overrides
├── tailwind.config.ts    # Tailwind CSS with Learn light theme tokens
├── next.config.mjs       # Next.js configuration with MDX support
└── tsconfig.json         # TypeScript strict mode configuration
```

## Scripts

| Command             | Description                  |
| ------------------- | ---------------------------- |
| `pnpm dev`          | Start development server     |
| `pnpm build`        | Build for production         |
| `pnpm start`        | Start production server      |
| `pnpm lint`         | Run ESLint                   |
| `pnpm lint:fix`     | Run ESLint with auto-fix     |
| `pnpm format`       | Format code with Prettier    |
| `pnpm format:check` | Check formatting             |
| `pnpm typecheck`    | Run TypeScript type checking |

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS with custom light theme design tokens
- **Content:** MDX via @next/mdx
- **Linting:** ESLint + Prettier

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for development guidelines.

## License

[MIT](./LICENSE). Copyright (c) 2026 Multicorn AI
