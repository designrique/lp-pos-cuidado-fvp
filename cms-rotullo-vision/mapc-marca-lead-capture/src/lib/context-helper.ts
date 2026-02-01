// src/lib/context-helper.ts

/**
 * Função para gerar comentários de contexto para o GitHub Copilot
 * Você pode importar esta função e usar em qualquer arquivo que precise do contexto.
 */
export const getMAPCContext = (componentType?: 'form' | 'integration' | 'design' | 'full') => {
  // Contexto básico presente em todos os tipos
  const baseContext = `
/* Context: Você é um desenvolvedor especializado na manutenção e evolução da Landing Page da MAPC.
 * 
 * ## CONTEXTO DO PROJETO
 * Esta é uma landing page de captura de leads para uma empresa de registro de marcas e patentes.
 * O sistema integra React/TypeScript com Mautic CRM e Evolution API WhatsApp através de Netlify Functions.
 */
`;

  // Contexto específico para formulários
  const formContext = `
/* Context: Você está trabalhando no formulário de captura de leads da MAPC.
 * 
 * ## FLUXO DO FORMULÁRIO
 * 1. Validação de campos (nome, email, telefone são obrigatórios)
 * 2. Envio para Netlify Function (submit-form.js)
 * 3. Netlify Function envia para Mautic CRM
 * 4. Exibição de feedback ao usuário
 * 5. Mautic dispara automaticamente N8N para envio de WhatsApp
 */
`;

  // Contexto específico para integrações
  const integrationContext = `
/* Context: Você está trabalhando nas integrações da Landing Page MAPC.
 * 
 * ## INTEGRAÇÕES ATIVAS
 * - Mautic: https://crm.mapc.com.br (formulário ID: 1)
 * - Evolution API: https://api.digitalfisher.com.br (instância: mapc)
 * - N8N: Webhook acionado pelo Mautic após captura de lead
 */
`;

  // Contexto específico para design
  const designContext = `
/* Context: Você está trabalhando com o Design System da Landing Page MAPC.
 * 
 * ## DESIGN SYSTEM - CORE COLORS (HSL ONLY)
 * ### Cores da Marca MAPC:
 * - **primary**: 236 93% 24% (MAPC Deep Blue)
 * - **primary-light**: 234 89% 74% (Light Blue)
 * - **primary-dark**: 236 93% 18% (Darker Blue)
 * - **accent**: 0 72% 51% (MAPC Red)
 */
`;

  // Contexto completo com tudo
  const fullContext = `
/* Context: Você é um desenvolvedor especializado na manutenção e evolução da Landing Page da MAPC.
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
 * ## FLUXO DE DADOS CRÍTICO
 * 1. Usuário preenche formulário → 2. Netlify Function envia para Mautic →
 * 3. Mautic dispara webhook N8N → 4. N8N envia WhatsApp via Evolution API
 * 
 * ## REGRAS DE DESENVOLVIMENTO
 * 1. NUNCA quebrar o fluxo Mautic → N8N → WhatsApp
 * 2. SEMPRE testar integrações após mudanças
 * 3. MANTER compatibilidade com Netlify Functions
 * 4. PRESERVAR configurações de CORS e redirects
 * 5. VALIDAR campos obrigatórios (nome, email, telefone)
 */
`;

  // Retornar o contexto apropriado com base no tipo solicitado
  switch (componentType) {
    case 'form':
      return baseContext + formContext;
    case 'integration':
      return baseContext + integrationContext;
    case 'design':
      return baseContext + designContext;
    case 'full':
      return fullContext;
    default:
      return baseContext;
  }
};

// Exemplos de uso:
// 
// 1. No topo de um arquivo de formulário:
// ```
// import { getMAPCContext } from '@/lib/context-helper';
// 
// // Isso é apenas um comentário para o Copilot e será ignorado pelo compilador
// eval(getMAPCContext('form'));
// 
// export function MyFormComponent() {
//   // seu código aqui
// }
// ```
//
// 2. Ou diretamente no JSDoc:
// ```
// /**
//  * Componente de formulário para captura de leads
//  * @component
//  * ${getMAPCContext('form')}
//  */
// export function MyFormComponent() {
//   // seu código aqui
// }
// ```