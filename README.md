# Suppa Dev — agent plugin

A single installable plugin that makes any compatible AI coding agent **Suppa-aware**.
It ships an expert development agent, ready-to-run commands, domain skills, and a
bundled **Suppa MCP server** (50 `suppa_*` tools for Tasks, Docs, Entities, and Forms).

Works with **GitHub Copilot CLI** and **Claude Code** — same repo, no build step.

## Install

### GitHub Copilot CLI

```bash
copilot plugin marketplace add Andrii-Herasymchuk/copilot-plugin
copilot plugin install suppa-dev@copilot-plugin
```

### Claude Code

```bash
/plugin marketplace add Andrii-Herasymchuk/copilot-plugin
/plugin install suppa-dev@copilot-plugin
```

## Prerequisites

- **Python 3.10+** on your PATH (runs the bundled MCP server).
- The MCP runtime dependency:
  ```bash
  pip install "mcp[cli]>=1.0.0"
  ```

### Suppa API key

You do **not** paste your key into chat. On **Claude Code**, when you enable the
plugin it prompts you in a secure (masked) input for your **Suppa API key** and
stores it in the system keychain — declared via `userConfig` in
[`.claude-plugin/plugin.json`](.claude-plugin/plugin.json) (`sensitive: true`) and
injected into the MCP server as `${user_config.suppa_api_key}`.

Use a **user JWT** for full Tasks access (an integrator key works for
Docs/Entities/Forms but returns empty Tasks).

> **GitHub Copilot CLI** does not support the secure prompt yet. There, set the key
> in your environment before launching: `export SUPPA_API_KEY="your-token"`
> (PowerShell: `$env:SUPPA_API_KEY="your-token"`).

The MCP server is bundled at [`mcp-server/`](mcp-server/) and loaded from the plugin
directory — no separate install or clone needed.

## What's inside

| Component | Path | What it does |
|-----------|------|--------------|
| Agent | [`agents/`](agents/) | **Suppa Dev Engineer** — ships code and keeps Suppa in sync |
| Commands | [`commands/`](commands/) | `/suppa-implement-task`, `/suppa-standup`, `/suppa-bug-to-task`, `/suppa-document-feature`, `/code-review` |
| Skills | [`skills/`](skills/) | `engineering-standards`, `suppa-platform`, plus `suppa-tasks`, `suppa-docs`, `suppa-entity`, `suppa-forms` |
| MCP server | [`.mcp.json`](.mcp.json) + [`mcp-server/`](mcp-server/) | The `suppa` server exposing 50 `suppa_*` tools |

## Usage

- Select the **suppa-dev-engineer** agent (or just describe dev work — it auto-engages).
- Run a command, e.g. `/suppa-implement-task 1234` or `/suppa-standup`.
- The skills load automatically when relevant (writing code, or working with Suppa).
- Verify the MCP server is connected with `/mcp` (Copilot CLI / Claude Code).

## License

MIT — see [LICENSE](LICENSE).
