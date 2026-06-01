---
description: Implement a Suppa task end-to-end — fetch context, plan, code, verify, then update the task.
argument-hint: <task ID or short description>
allowed-tools: Read, Edit, Write, Grep, Glob, Bash, TodoWrite, mcp__suppa
---
Implement the work described by: $ARGUMENTS

Steps:
1. If a task ID is given, fetch full context with `suppa_get_task` and recent discussion
   with `suppa_get_comments`. Otherwise search with `suppa_search_tasks`.
2. Restate the goal and acceptance criteria in one or two sentences.
3. Plan the implementation as a todo list for anything non-trivial.
4. Implement the change following existing code patterns. Keep edits minimal and focused.
5. Verify: run the relevant build/tests/linter and fix any failures.
6. Update Suppa: add a progress comment with `suppa_add_comment` summarizing what
   changed, and move/close the task with `suppa_move_task` or `suppa_close_task` if done.

End with a short summary of the code changes and the Suppa updates (with IDs).
