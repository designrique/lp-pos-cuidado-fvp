# Contexto do Projeto MAPC - Landing Page de Captura

Este documento serve como contexto para o GitHub Copilot compreender o projeto.

## CONTEXTO DO PROJETO

Esta é uma landing page de captura de leads para uma empresa de registro de marcas e patentes.
O sistema integra React/TypeScript com Mautic CRM e Evolution API WhatsApp através de Netlify Functions.

## STACK TECNOLÓGICA PRINCIPAL

- Frontend: React 18 + TypeScript + Vite + Tailwind CSS + shadcn/ui
- Backend: Netlify Functions (Node.js serverless)
- Integrações: Mautic CRM + Evolution API WhatsApp + N8N Automation
- Deploy: Netlify com domínio customizado

## FLUXO DE DADOS CRÍTICO

1. Usuário preenche formulário → 2. Netlify Function envia para Mautic →
3. Mautic dispara webhook N8N → 4. N8N envia WhatsApp via Evolution API

## ARQUIVOS MAIS IMPORTANTES

- src/components/ContactModal.tsx - Modal principal de contato
- src/components/MauticDirectForm.tsx - Formulário integrado com Mautic
- netlify/functions/submit-form.js - Proxy para Mautic (resolve CORS)
- netlify/functions/send-whatsapp.js - Integração Evolution API
- src/lib/mautic-config.ts - Configurações Mautic
- netlify.toml - Configurações deploy e redirects

## DESIGN SYSTEM - CORE COLORS (HSL ONLY)

### Cores da Marca MAPC:
- primary: 236 93% 24% (MAPC Deep Blue)
- primary-light: 234 89% 74% (Light Blue)
- primary-dark: 236 93% 18% (Darker Blue)
- accent: 0 72% 51% (MAPC Red)
- accent-light: 0 70% 85% (Light Red)
- accent-dark: 0 72% 41% (Darker Red)

### Cores Semânticas:
- success: 142 76% 36% (Green)
- warning: 38 92% 50% (Orange)
- info: 221 83% 53% (Blue)
- destructive: 0 84.2% 60.2% (Error Red)

### Gradientes Pré-definidos:
- gradient-primary: linear-gradient(135deg, primary, primary-light)
- gradient-hero: linear-gradient(135deg, primary 0%, primary-light 100%)
- gradient-accent: linear-gradient(135deg, accent, accent-light)
- gradient-card: linear-gradient(145deg, card 0%, muted/30% 100%)

## SISTEMA DE COMPONENTES PRONTOS

### Botões (use as classes CSS):
- .btn-hero: Botão principal com gradiente accent e hover effect
- .btn-primary: Botão primário com cor da marca
- .btn-secondary: Botão secundário neutro
- .btn-outline: Botão com borda primary
- .btn-ghost: Botão transparente

### Cards:
- .card-default: Card básico com border e shadow
- .card-hover: Card com efeito hover (scale + translate)
- .card-interactive: Card clicável
- .card-gradient: Card com gradiente sutil

### Layout:
- .section-padding: Padding padrão para seções (py-16)
- .section-padding-lg: Padding grande (py-24)
- .container-narrow: Container max-w-4xl
- .container-wide: Container max-w-7xl

### Texto:
- .text-hero: Texto principal (4xl-6xl, bold)
- .text-heading: Títulos seção (2xl-4xl, bold)
- .text-gradient-primary: Texto com gradiente primary
- .text-gradient-accent: Texto com gradiente accent

## INTEGRAÇÕES ATIVAS

- Mautic: https://crm.mapc.com.br (formulário ID: 1)
- Evolution API: https://api.digitalfisher.com.br (instância: mapc)
- Domínio: https://registrese.mapc.com.br

## VARIÁVEIS AMBIENTE CRÍTICAS

- EVOLUTION_API_INSTANCE=mapc
- EVOLUTION_API_KEY=5A64F88E9D5F43AC9E1A7285AE4F8D0C
- EVOLUTION_API_BASE_URL=https://api.digitalfisher.com.br
- VITE_MAUTIC_BASE_URL=https://crm.mapc.com.br

## REGRAS DE DESENVOLVIMENTO

1. NUNCA quebrar o fluxo Mautic → N8N → WhatsApp
2. SEMPRE testar integrações após mudanças
3. MANTER compatibilidade com Netlify Functions
4. PRESERVAR configurações de CORS e redirects
5. VALIDAR campos obrigatórios (nome, email, telefone)

PRINCÍPIO FUNDAMENTAL: Esta é uma aplicação de produção gerando leads reais.
Priorize estabilidade e funcionalidade sobre novidades.