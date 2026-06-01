const vscode = require('vscode');
const path = require('path');
const fs = require('fs');

const TOKEN_KEY = 'suppaDevAgent.apiToken';

/**
 * Resolve the folder that contains the suppa2.0-mcp-server package.
 * Priority: explicit setting -> a workspace folder containing it -> undefined.
 */
function resolveServerCwd() {
  const configured = vscode.workspace
    .getConfiguration('suppaDevAgent')
    .get('serverCwd');
  if (configured && fs.existsSync(configured)) {
    return configured;
  }
  const folders = vscode.workspace.workspaceFolders || [];
  for (const folder of folders) {
    const candidate = path.join(folder.uri.fsPath, 'suppa2.0-mcp-server');
    if (fs.existsSync(candidate)) {
      return candidate;
    }
    // The folder itself might be the server.
    if (fs.existsSync(path.join(folder.uri.fsPath, 'src', 'suppa_mcp'))) {
      return folder.uri.fsPath;
    }
  }
  return undefined;
}

async function getToken(context) {
  let token = await context.secrets.get(TOKEN_KEY);
  if (!token) {
    token = await vscode.window.showInputBox({
      title: 'Suppa API token',
      prompt:
        'Enter your Suppa API token (user JWT for full Tasks access, or integrator API key).',
      password: true,
      ignoreFocusOut: true,
    });
    if (token) {
      await context.secrets.store(TOKEN_KEY, token);
    }
  }
  return token;
}

function registerMcpProvider(context) {
  // The MCP server definition provider API is available on recent VS Code.
  if (!vscode.lm || !vscode.lm.registerMcpServerDefinitionProvider) {
    return;
  }

  const didChange = new vscode.EventEmitter();
  context.subscriptions.push(didChange);

  const provider = {
    onDidChangeMcpServerDefinitions: didChange.event,
    async provideMcpServerDefinitions() {
      const cwd = resolveServerCwd();
      if (!cwd) {
        vscode.window.showWarningMessage(
          'Suppa Dev Agent: could not find suppa2.0-mcp-server. Set "suppaDevAgent.serverCwd" in settings.'
        );
        return [];
      }
      const cfg = vscode.workspace.getConfiguration('suppaDevAgent');
      const command = cfg.get('command') || 'python';
      return [
        new vscode.McpStdioServerDefinition(
          'Suppa',
          command,
          ['-m', 'suppa_mcp'],
          {
            SUPPA_BASE_URL: cfg.get('baseUrl') || 'https://modern.suppa.me',
            SUPPA_LANG: cfg.get('lang') || 'en',
            SUPPA_TZ: cfg.get('timezone') || 'Europe/Kyiv',
          },
          cwd
        ),
      ];
    },
    async resolveMcpServerDefinition(server) {
      const token = await getToken(context);
      if (token) {
        server.env = server.env || {};
        server.env.SUPPA_API_KEY = token;
      }
      return server;
    },
  };

  context.subscriptions.push(
    vscode.lm.registerMcpServerDefinitionProvider('suppa-dev-agent.mcp', provider)
  );
}

/**
 * Copy the bundled Copilot customizations (agent, prompts, instructions) into the
 * open workspace's .github folder.
 */
async function installCustomizations(context) {
  const folders = vscode.workspace.workspaceFolders;
  if (!folders || folders.length === 0) {
    vscode.window.showErrorMessage('Open a folder first, then run this command.');
    return;
  }
  const target = folders[0].uri.fsPath;
  const source = path.join(context.extensionPath, 'assets', 'github');

  const subdirs = ['agents', 'instructions', 'prompts'];
  let copied = 0;
  for (const sub of subdirs) {
    const from = path.join(source, sub);
    if (!fs.existsSync(from)) continue;
    const to = path.join(target, '.github', sub);
    fs.mkdirSync(to, { recursive: true });
    for (const file of fs.readdirSync(from)) {
      fs.copyFileSync(path.join(from, file), path.join(to, file));
      copied++;
    }
  }
  vscode.window.showInformationMessage(
    `Suppa Dev Agent: installed ${copied} customization file(s) into .github/. Reload the window if they don't appear.`
  );
}

function activate(context) {
  registerMcpProvider(context);
  context.subscriptions.push(
    vscode.commands.registerCommand(
      'suppa-dev-agent.installCustomizations',
      () => installCustomizations(context)
    )
  );
}

function deactivate() {}

module.exports = { activate, deactivate };
