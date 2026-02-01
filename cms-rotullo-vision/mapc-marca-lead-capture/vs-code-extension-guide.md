# Extensão do VS Code para Contexto MAPC

Este é um guia para criar uma extensão VS Code personalizada que forneça contexto para o GitHub Copilot.

## Passos para criar a extensão:

1. Instale o Yeoman e o gerador de extensões VS Code:
   ```
   npm install -g yo generator-code
   ```

2. Gere o scaffold da extensão:
   ```
   yo code
   ```
   
   Selecione:
   - TypeScript
   - Novo comando
   - Nome: "mapc-context"
   - Descrição: "Insere contexto MAPC para GitHub Copilot"

3. Edite o arquivo `extension.ts` para adicionar comandos que inserem os diferentes contextos:

```typescript
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	// Comando para inserir o contexto básico
	let basicContextCommand = vscode.commands.registerCommand('mapc-context.insertBasicContext', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			editor.edit(editBuilder => {
				editBuilder.insert(editor.selection.start, `/* Context: Você é um desenvolvedor especializado na manutenção e evolução da Landing Page da MAPC.
 * 
 * ## CONTEXTO DO PROJETO
 * Esta é uma landing page de captura de leads para uma empresa de registro de marcas e patentes.
 * O sistema integra React/TypeScript com Mautic CRM e Evolution API WhatsApp através de Netlify Functions.
 */\n\n`);
			});
		}
	});

	// Comando para inserir o contexto completo
	let fullContextCommand = vscode.commands.registerCommand('mapc-context.insertFullContext', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			editor.edit(editBuilder => {
				editBuilder.insert(editor.selection.start, `/* Context: Você é um desenvolvedor especializado na manutenção e evolução da Landing Page da MAPC.
 * 
 * ## CONTEXTO DO PROJETO
 * Esta é uma landing page de captura de leads para uma empresa de registro de marcas e patentes.
 * O sistema integra React/TypeScript com Mautic CRM e Evolution API WhatsApp através de Netlify Functions.
 * 
 * ## STACK TECNOLÓGICA PRINCIPAL
 * - Frontend: React 18 + TypeScript + Vite + Tailwind CSS + shadcn/ui
 * - Backend: Netlify Functions (Node.js serverless)
 * - Integrações: Mautic CRM + Evolution API WhatsApp + N8N Automation
 * - Deploy: Netlify com domínio customizado
 * 
 * ## DESIGN SYSTEM - CORE COLORS (HSL ONLY)
 * ### Cores da Marca MAPC:
 * - **primary**: 236 93% 24% (MAPC Deep Blue)
 * - **primary-light**: 234 89% 74% (Light Blue)
 * - **primary-dark**: 236 93% 18% (Darker Blue)
 * - **accent**: 0 72% 51% (MAPC Red)
 * - **accent-light**: 0 70% 85% (Light Red)
 * - **accent-dark**: 0 72% 41% (Darker Red)
 */\n\n`);
			});
		}
	});

	context.subscriptions.push(basicContextCommand);
	context.subscriptions.push(fullContextCommand);
}

export function deactivate() {}
```

4. Atualize o `package.json` para definir os comandos:

```json
{
  "contributes": {
    "commands": [
      {
        "command": "mapc-context.insertBasicContext",
        "title": "MAPC: Inserir Contexto Básico"
      },
      {
        "command": "mapc-context.insertFullContext",
        "title": "MAPC: Inserir Contexto Completo"
      }
    ]
  }
}
```

5. Compile e empacote a extensão:
   ```
   npm run vsce package
   ```

6. Instale a extensão no VS Code:
   - Vá para a visualização de extensões
   - Clique em "..." no canto superior direito
   - Selecione "Instalar do VSIX..."
   - Navegue até o arquivo .vsix gerado

Após instalada, você pode usar os comandos "MAPC: Inserir Contexto Básico" ou "MAPC: Inserir Contexto Completo" através da paleta de comandos (Ctrl+Shift+P).