/* eslint-disable no-console -- CLI entry logs errors and run summary */
import { run } from './index.js'
import type { AgentConfig, RunSummary } from './types.js'

void (async () => {
  const missing: string[] = []

  const shieldApiUrl = process.env.SHIELD_API_URL?.trim()
  const shieldApiKey = process.env.SHIELD_API_KEY?.trim()
  const githubRepo = process.env.GITHUB_REPO?.trim()
  const githubToken =
    process.env.CONTENT_AGENT_GITHUB_TOKEN?.trim() || process.env.GITHUB_TOKEN?.trim()

  if (!shieldApiUrl) missing.push('SHIELD_API_URL')
  if (!shieldApiKey) missing.push('SHIELD_API_KEY')
  if (!githubRepo) missing.push('GITHUB_REPO')
  if (!githubToken) missing.push('GITHUB_TOKEN or CONTENT_AGENT_GITHUB_TOKEN')

  if (missing.length > 0) {
    console.error(
      `[multicorn-content] Missing required environment variable(s): ${missing.join(', ')}`,
    )
    process.exit(1)
  }

  if (!shieldApiUrl || !shieldApiKey || !githubRepo || !githubToken) {
    console.error('[multicorn-content] Missing required environment variable(s)')
    process.exit(1)
  }

  const statePath =
    process.env.CONTENT_STATE_PATH === undefined || process.env.CONTENT_STATE_PATH.trim() === ''
      ? '.content-state.json'
      : process.env.CONTENT_STATE_PATH.trim()

  const config: AgentConfig = {
    shieldApiUrl,
    shieldApiKey,
    githubToken,
    githubRepo,
  }

  let summary: RunSummary
  try {
    summary = await run(config, statePath)
  } catch (e) {
    console.error('[multicorn-content] Run failed:', e)
    process.exit(1)
  }

  console.log('[multicorn-content] RunSummary:', JSON.stringify(summary))
  process.exit(0)
})()
