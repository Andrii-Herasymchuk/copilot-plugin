# Suppa Development Agent (VS Code extension)

Makes GitHub Copilot in VS Code **Suppa-aware**:

- **Registers the Suppa MCP server** (50 `suppa_*` tools for Tasks, Docs, Entities, Forms)
  and prompts for your API token securely on first use (stored in VS Code SecretStorage).
- **Installs the Suppa Dev Engineer agent**, development prompts, and engineering
  instructions into your workspace's `.github/` folder via a command.

## Requirements

- VS Code 1.102+ with GitHub Copilot Chat.
- Python 3.10+ and the [`suppa2.0-mcp-server`](https://github.com/your-org/skills)
  package installed (`pip install -e .` inside that folder).

## Setup

1. Install this extension (from the Marketplace or a `.vsix`).
2. Make sure the `suppa2.0-mcp-server` folder is in your workspace, or set
   **`suppaDevAgent.serverCwd`** to its absolute path in Settings.
3. Open the Command Palette → **MCP: List Servers** → start **Suppa**. You'll be asked
   for your `SUPPA_API_KEY` (use a **user JWT** for full Tasks access).
4. Run **Suppa: Install workspace customizations** to drop the agent, prompts, and
   instructions into `.github/`.

## Usage

- Pick **Suppa Dev Engineer** in the Copilot Chat agent picker.
- Type `/` to run a prompt: `/suppa-implement-task`, `/suppa-standup`,
  `/suppa-bug-to-task`, `/suppa-document-feature`, `/code-review`.

## Settings

| Setting | Default | Description |
|---------|---------|-------------|
| `suppaDevAgent.command` | `python` | Interpreter used to launch the MCP server |
| `suppaDevAgent.serverCwd` | _(empty)_ | Absolute path to `suppa2.0-mcp-server` |
| `suppaDevAgent.baseUrl` | `https://modern.suppa.me` | Suppa base URL |
| `suppaDevAgent.lang` | `en` | `SUPPA_LANG` |
| `suppaDevAgent.timezone` | `Europe/Kyiv` | `SUPPA_TZ` |

## Security

Your token is stored in VS Code SecretStorage and injected only into the MCP server's
environment — it is never exposed to the model. Treat tool output as untrusted data.
