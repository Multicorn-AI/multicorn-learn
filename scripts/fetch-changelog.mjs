#!/usr/bin/env node
/**
 * Fetches CHANGELOG.md from multicorn-shield (Keep a Changelog format)
 * and writes content/changelog.json for the learn site build.
 * On fetch failure: warns and exits 0 so the build uses the committed fallback.
 */

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const CHANGELOG_URL =
  "https://raw.githubusercontent.com/Multicorn-AI/multicorn-shield/main/CHANGELOG.md";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = join(__dirname, "..", "content", "changelog.json");

const CATEGORY_KEYS = ["added", "changed", "fixed", "security"];

/**
 * @param {string} md
 * @returns {Array<{ version: string, date: string, added: string[], changed: string[], fixed: string[], security: string[] }>}
 */
function parseKeepAChangelog(md) {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  /** @type {Array<{ version: string, date: string, added: string[], changed: string[], fixed: string[], security: string[] }>} */
  const entries = [];
  let current = null;
  /** @type {'added'|'changed'|'fixed'|'security'|null} */
  let category = null;

  const versionRe = /^##\s+\[([^\]]+)\]\s+-\s+(\d{4}-\d{2}-\d{2})\s*$/;
  const unreleasedRe = /^##\s+\[Unreleased\]/i;
  const categoryRe = /^###\s+(Added|Changed|Fixed|Security)\s*$/i;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (unreleasedRe.test(line)) {
      current = null;
      category = null;
      continue;
    }

    const vMatch = line.match(versionRe);
    if (vMatch) {
      const versionLabel = vMatch[1].trim();
      if (versionLabel.toLowerCase() === "unreleased") {
        current = null;
        category = null;
        continue;
      }
      current = {
        version: versionLabel,
        date: vMatch[2],
        added: [],
        changed: [],
        fixed: [],
        security: [],
      };
      entries.push(current);
      category = null;
      continue;
    }

    if (line.startsWith("### ")) {
      const cMatch = line.match(categoryRe);
      if (cMatch) {
        const key = cMatch[1].toLowerCase();
        if (key === "added") category = "added";
        else if (key === "changed") category = "changed";
        else if (key === "fixed") category = "fixed";
        else if (key === "security") category = "security";
        else category = null;
      } else {
        category = null;
      }
      continue;
    }

    if (!current || !category) continue;

    if (line.startsWith("- ")) {
      current[category].push(line.slice(2).trim());
      continue;
    }

    if (current[category].length > 0 && line.trim() !== "") {
      const lastIdx = current[category].length - 1;
      const sep = current[category][lastIdx].length > 0 ? " " : "";
      current[category][lastIdx] += sep + line.trim();
    }
  }

  return entries;
}

async function main() {
  let text;
  try {
    const res = await fetch(CHANGELOG_URL, {
      headers: { "User-Agent": "multicorn-learn-fetch-changelog" },
    });
    if (!res.ok) {
      console.warn(
        `fetch-changelog: HTTP ${res.status} fetching CHANGELOG.md; keeping existing content/changelog.json`
      );
      process.exit(0);
    }
    text = await res.text();
  } catch (err) {
    console.warn(
      "fetch-changelog: failed to fetch CHANGELOG.md; keeping existing content/changelog.json:",
      err instanceof Error ? err.message : err
    );
    process.exit(0);
  }

  try {
    const entries = parseKeepAChangelog(text);
    for (const e of entries) {
      for (const k of CATEGORY_KEYS) {
        if (!Array.isArray(e[k])) e[k] = [];
      }
    }
    const json = JSON.stringify(entries, null, 2) + "\n";
    mkdirSync(dirname(OUT_PATH), { recursive: true });
    writeFileSync(OUT_PATH, json, "utf8");
  } catch (err) {
    console.warn(
      "fetch-changelog: parse/write failed; keeping existing content/changelog.json:",
      err instanceof Error ? err.message : err
    );
    process.exit(0);
  }
}

main();
