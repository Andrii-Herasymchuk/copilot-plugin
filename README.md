# Suppa Development Agent

A distributable bundle that makes AI coding assistants **Suppa-aware**. Same agent,
prompts, and engineering rules, packaged for two ecosystems:

| Folder | Target | Distribution |
|--------|--------|--------------|
| [`vscode-extension/`](vscode-extension/) | VS Code + GitHub Copilot | VS Code Marketplace (`.vsix`) |
| [`claude-plugin/`](claude-plugin/) | Claude Code | Git-repo plugin marketplace |

Both wrap the **Suppa MCP server** (`suppa2.0-mcp-server`, 50 `suppa_*` tools for Tasks,
Docs, Entities, and Forms) and ship the **Suppa Dev Engineer** agent plus development
workflows.

---

## Publish to the VS Code Marketplace

> Requires a **publisher identity** and an **Azure DevOps Personal Access Token** you
> create yourself. Replace `your-publisher-id` in `vscode-extension/package.json` first.

```powershell
npm install -g @vscode/vsce
cd vscode-extension

# 1. Build and test locally (install the .vsix via "Extensions: Install from VSIX")
vsce package

# 2. One-time: create a publisher at https://marketplace.visualstudio.com/manage
#    and a PAT (Marketplace > Manage scope) at https://dev.azure.com

# 3. Publish
vsce login your-publisher-id
vsce publish
```

To also publish to **Open VSX** (Cursor / VSCodium):

```powershell
npm install -g ovsx
ovsx publish -p <open-vsx-token>
```

## Publish to Claude Code

Claude Code has **no central marketplace**; you publish by hosting this repo on GitHub.

```bash
# Push this repository to GitHub, then users run:
/plugin marketplace add Andrii-Herasymchuk/copilot-plugin
/plugin install suppa-dev@suppa-dev-marketplace
```

The marketplace manifest lives at
[`claude-plugin/.claude-plugin/marketplace.json`](claude-plugin/.claude-plugin/marketplace.json).

---

## Prerequisites (both targets)

- Python 3.10+ and the `suppa2.0-mcp-server` package installed:
  ```bash
  cd suppa2.0-mcp-server && pip install -e .
  ```
- A Suppa API token — a **user JWT** for full Tasks access (an integrator key works for
  Docs/Entities/Forms but returns empty Task results).

## Before you publish — fill in these placeholders

- `vscode-extension/package.json`: `publisher`, `repository.url`, and add an
  `assets/icon.png` (128×128).
- `claude-plugin/.claude-plugin/marketplace.json` and `plugins/suppa-dev/.claude-plugin/plugin.json`:
  `owner` / `author` name and email.

## License

MIT — see [LICENSE](LICENSE).
