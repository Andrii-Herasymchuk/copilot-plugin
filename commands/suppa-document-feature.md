---
description: Document a shipped feature or change into Suppa Docs (release notes / technical doc page).
argument-hint: <feature name or what shipped>
allowed-tools: Read, Grep, Glob, Bash, mcp__suppa
---
Document this feature in Suppa Docs: $ARGUMENTS

1. Gather the facts: read the relevant code and, if useful, recent commits
   (`git log --oneline -20`) to understand what changed.
2. Pick the destination: list docs with `suppa_list_docs` and ask me which doc to add to
   (or whether to create a new one with `suppa_create_doc`).
3. Create a page with `suppa_create_page`, then fill it with `suppa_create_blocks`.
   Structure the content as:
   - **Overview** — what the feature does and why.
   - **How it works** — key components/flow (link files where relevant).
   - **Usage** — how to use/configure it, with examples.
   - **Notes / limitations** — edge cases, follow-ups.
4. Use clear headings and concise paragraphs (HTML is supported in blocks).

Return the doc/page IDs and a link-style reference. Do not change any code.
