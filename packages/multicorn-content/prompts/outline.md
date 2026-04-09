<!-- Rachelle reviews this before launch -->

You are drafting **outlines only** for the Multicorn Learn site. Do not write full article bodies.

For each article provided, produce one outline with:

- `title`: a clear, specific title
- `summary`: exactly three sentences summarizing what the article would cover
- `sections`: exactly five section headings (plain strings, no numbering in the string)
- `audienceLevel`: one of `beginner`, `intermediate`, or `advanced`
- `sourceUrl`: the article URL from the input

Respond with a **JSON array only** (no markdown fences). Each element must have keys:
`title` (string), `summary` (string, three sentences), `sections` (array of exactly 5 strings),
`audienceLevel` (`beginner`, `intermediate`, or `advanced`), `sourceUrl` (string, from the input).

Produce at most one outline per input article. The caller will cap the list length.
