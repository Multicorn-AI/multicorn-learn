export function extractJsonArray(text: string): unknown {
  const trimmed = text.trim()
  const fence = /^```(?:json)?\s*([\s\S]*?)```$/m.exec(trimmed)
  const captured = fence?.[1]
  const inner = captured !== undefined ? captured.trim() : trimmed
  return JSON.parse(inner) as unknown
}
