# Suppa Dev (Claude Code plugin)

Suppa-aware development for Claude Code: the **Suppa Dev Engineer** subagent, five
development commands, and the **Suppa MCP server** (Tasks, Docs, Entities, Forms).

## Install

This folder is a Claude Code **plugin marketplace**. Point Claude Code at it:

```bash
# From a published git repo:
/plugin marketplace add Andrii-Herasymchuk/copilot-plugin
/plugin install suppa-dev@suppa-dev-marketplace

# Or from a local clone (the claude-plugin folder):
/plugin marketplace add /absolute/path/to/suppa-dev-agent/claude-plugin
/plugin install suppa-dev@suppa-dev-marketplace
```

## Prerequisites

- Python 3.10+ and the `suppa2.0-mcp-server` package installed (`pip install -e .`).
- Export your token before launching Claude Code:
  ```bash
  export SUPPA_API_KEY="your-user-jwt"
  ```

## What you get

- **Agent**: `suppa-dev-engineer` — ships code and keeps Suppa in sync.
- **Commands**: `/suppa-implement-task`, `/suppa-standup`, `/suppa-bug-to-task`,
  `/suppa-document-feature`, `/code-review`.
- **MCP server**: `suppa` (`suppa_*` tools).

Verify the server with `/mcp` and the commands with `/help`.
