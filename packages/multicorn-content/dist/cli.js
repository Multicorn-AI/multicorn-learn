import {
  run
} from "./chunk-IDUOLJF3.js";

// src/cli.ts
function requireEnv(name) {
  const v = process.env[name];
  if (v === void 0 || v.trim() === "") {
    console.error(`[multicorn-content] Missing required environment variable: ${name}`);
    process.exit(1);
  }
  return v.trim();
}
function readGithubToken() {
  const fromGithub = process.env.GITHUB_TOKEN?.trim();
  const fromContentAgent = process.env.CONTENT_AGENT_GITHUB_TOKEN?.trim();
  if (fromGithub) return fromGithub;
  if (fromContentAgent) return fromContentAgent;
  console.error(
    "[multicorn-content] Missing required environment variable: GITHUB_TOKEN or CONTENT_AGENT_GITHUB_TOKEN"
  );
  process.exit(1);
}
function loadConfig() {
  const shieldApiUrl = requireEnv("SHIELD_API_URL");
  const shieldApiKey = requireEnv("SHIELD_API_KEY");
  const githubToken = readGithubToken();
  const githubRepo = requireEnv("GITHUB_REPO");
  const statePath = process.env.CONTENT_STATE_PATH === void 0 || process.env.CONTENT_STATE_PATH.trim() === "" ? ".content-state.json" : process.env.CONTENT_STATE_PATH.trim();
  const config = {
    shieldApiUrl,
    shieldApiKey,
    githubToken,
    githubRepo
  };
  return { config, statePath };
}
async function main() {
  const { config, statePath } = loadConfig();
  let summary;
  try {
    summary = await run(config, statePath);
  } catch (e) {
    console.error("[multicorn-content] Run failed:", e);
    process.exit(1);
  }
  console.log("[multicorn-content] RunSummary:", JSON.stringify(summary));
  process.exit(0);
}
void main();
//# sourceMappingURL=cli.js.map