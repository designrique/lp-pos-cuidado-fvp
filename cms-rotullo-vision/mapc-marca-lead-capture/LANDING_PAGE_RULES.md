# 📋 Regras e Melhores Práticas para Landing Pages

> Baseado no projeto MAPC - Landing Page de captura de leads de alta conversão

## 🏗️ **ESTRUTURA DE PROJETO**

### Organização de Pastas
```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Sistema de design (shadcn)
│   ├── Hero.tsx        # Seção principal
│   ├── Benefits.tsx    # Benefícios/vantagens
│   ├── Services.tsx    # Serviços oferecidos
│   ├── Process.tsx     # Como funciona
│   ├── Testimonials.tsx # Depoimentos sociais
│   ├── LeadCaptureForm.tsx # Formulário principal
│   └── Footer.tsx      # Rodapé com informações
├── lib/                # Utilitários e configurações
│   ├── utils.ts        # Funções auxiliares
│   ├── form-utils.ts   # Validação de formulários
│   └── phone-formatter.ts # Formatação específica
├── hooks/              # Hooks customizados
└── assets/             # Imagens e recursos
```

## 🎨 **DESIGN SYSTEM**

### 1. Tokens Semânticos (index.css)
```css
:root {
  /* Cores primárias */
  --primary: [HSL da cor principal da marca];
  --primary-foreground: [HSL do texto sobre a cor primária];
  
  /* Cores secundárias */
  --secondary: [HSL da cor secundária];
  --accent: [HSL da cor de destaque];
  
  /* Gradientes */
  --gradient-primary: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)));
  
  /* Sombras */
  --shadow-elegant: 0 10px 30px -10px hsl(var(--primary) / 0.3);
  
  /* Transições */
  --transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### 2. Componentes Customizados
- **NUNCA** use cores diretas (text-white, bg-blue-500)
- **SEMPRE** use tokens semânticos (text-primary, bg-secondary)
- Crie variantes nos componentes shadcn

## 📝 **FORMULÁRIOS DE CAPTURA**

### 1. Estrutura Obrigatória
```typescript
// Schema de validação com Zod
const leadSchema = z.object({
  nome: z.string().min(2, "Nome deve ter ao menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  telefone: z.string().min(10, "Telefone inválido"),
  empresa: z.string().optional(),
  mensagem: z.string().optional()
});
```

### 2. Campos Essenciais
- **Nome**: Obrigatório, min 2 caracteres
- **Email**: Obrigatório, validação completa
- **Telefone**: Obrigatório, formatação automática
- **Empresa**: Opcional, para B2B
- **Interesse/Serviço**: Select com opções

### 3. UX do Formulário
- Loading states com spinner
- Mensagens de erro claras
- Toast notifications para feedback
- Validação em tempo real
- Máscaras para telefone/CPF

## 🔗 **INTEGRAÇÃO COM APIs**

### 1. Sistema Dual de Backup
```typescript
// Sempre implementar fallback
try {
  // API principal (CRM, NocoDB, etc.)
  await primaryAPI.submit(data);
} catch (error) {
  // Backup (Formspree, email, etc.)
  await backupAPI.submit(data);
}
```

### 2. Endpoints Recomendados
- **Principal**: CRM proprietário, NocoDB, Airtable
- **Backup**: Formspree, EmailJS, Netlify Forms
- **Notificação**: WhatsApp API, Slack, Discord

### 3. Estrutura de Dados Padrão
```typescript
interface LeadData {
  nome: string;
  email: string;
  telefone: string;
  empresa?: string;
  servico_interesse?: string;
  mensagem?: string;
  origem: string; // Landing page source
  timestamp: string;
}
```

## 🏆 **COMPONENTES ESSENCIAIS**

### 1. Hero Section
- **Headline** clara e impactante
- **Subheadline** explicativa
- **CTA primário** visível
- **Imagem/vídeo** de apoio
- **Proof points** (números, certificações)

### 2. Benefits/Vantagens
- Mínimo 3, máximo 6 benefícios
- Ícones representativos
- Títulos claros e diretos
- Descrições concisas

### 3. Social Proof
- **Depoimentos** com foto e nome
- **Vídeo depoimentos** (maior conversão)
- **Logos** de clientes
- **Números** de resultados

### 4. Processo/Como Funciona
- Máximo 4 passos
- Numeração clara
- Ícones representativos
- Fluxo lógico

## 🚀 **SEO E PERFORMANCE**

### 1. Meta Tags Obrigatórias
```html
<title>Palavra-chave Principal - Empresa</title>
<meta name="description" content="Descrição com palavra-chave em 160 chars" />
<meta property="og:title" content="Título para redes sociais" />
<meta property="og:description" content="Descrição para redes sociais" />
<meta property="og:image" content="URL da imagem de compartilhamento" />
```

### 2. Estrutura HTML Semântica
```html
<header>
  <nav>Menu de navegação</nav>
</header>
<main>
  <section>Hero</section>
  <section>Benefits</section>
  <section>Social Proof</section>
  <section>CTA Final</section>
</main>
<footer>Informações da empresa</footer>
```

### 3. Performance
- **Lazy loading** para imagens
- **Compressão** de imagens (WebP)
- **Minificação** de assets
- **CDN** para recursos estáticos

## 🎯 **CONVERSÃO E CRO**

### 1. CTAs (Call to Action)
- **Primário**: Apenas 1 por seção
- **Texto**: Verbo de ação + benefício
- **Cores**: Contrastantes com o fundo
- **Posição**: Above the fold e seções estratégicas

### 2. Redução de Fricção
- **Formulário curto**: Máximo 5 campos
- **Campos opcionais**: Claramente marcados
- **Validação suave**: Não bloquear durante digitação
- **Loading states**: Feedback visual constante

### 3. Urgência e Escassez
- **Ofertas limitadas**: Quando verdadeiras
- **Bonificações**: Por tempo limitado
- **Prova social**: Quantidades de clientes

## 📱 **RESPONSIVIDADE**

### 1. Breakpoints Padrão
```css
/* Mobile first */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
```

### 2. Componentes Adaptativos
- **Grid**: Automático com Tailwind Grid
- **Texto**: Responsive font sizes
- **Imagens**: Aspect ratio consistente
- **Formulários**: Stack no mobile

## 🔧 **CONFIGURAÇÃO TÉCNICA**

### 1. Arquivos Essenciais
```
netlify.toml           # Configuração de deploy
.env.example           # Template de variáveis
_redirects             # Redirecionamentos
robots.txt             # SEO
sitemap.xml            # SEO
```

### 2. Variáveis de Ambiente
```bash
# APIs
VITE_API_URL=
VITE_BACKUP_API=
VITE_ANALYTICS_ID=

# Integrações
VITE_WHATSAPP_NUMBER=
VITE_CRM_ENDPOINT=
```

### 3. Deploy Checklist
- [ ] Variáveis configuradas
- [ ] DNS apontando
- [ ] SSL ativo
- [ ] Redirects configurados
- [ ] Analytics configurado
- [ ] Formulário testado

## 📊 **MÉTRICAS E ANALYTICS**

### 1. Eventos Essenciais
```typescript
// Tracking de conversão
analytics.track('form_started');
analytics.track('form_completed');
analytics.track('cta_clicked', { section: 'hero' });
analytics.track('video_played');
```

### 2. KPIs Importantes
- **Taxa de conversão** geral
- **Conversão por seção** (qual CTA converte mais)
- **Tempo na página**
- **Taxa de rejeição**
- **Origem do tráfego**

## 🛡️ **SEGURANÇA E VALIDAÇÃO**

### 1. Validação de Dados
- **Client-side**: UX e feedback imediato
- **Server-side**: Segurança real
- **Sanitização**: Prevenir XSS
- **Rate limiting**: Prevenir spam

### 2. Proteção de APIs
- **CORS** configurado
- **API Keys** protegidas
- **Timeout** configurado
- **Error handling** robusto

## 📄 **DOCUMENTAÇÃO MÍNIMA**

### 1. README.md
- Instalação e setup
- Configuração de variáveis
- Deploy e manutenção
- Contatos e suporte

### 2. Changelog
- Versioning das mudanças
- Novas features
- Bug fixes
- Breaking changes

---

## ✅ **CHECKLIST DE LANÇAMENTO**

### Antes do Go-Live:
- [ ] Todos os links funcionando
- [ ] Formulário testado com dados reais
- [ ] Responsividade em todos dispositivos
- [ ] Performance > 90 no Lighthouse
- [ ] SEO otimizado
- [ ] Analytics configurado
- [ ] Backup de dados funcionando
- [ ] Certificado SSL ativo
- [ ] Redirects www/non-www configurados

### Pós-Lançamento:
- [ ] Monitor de uptime configurado
- [ ] Backup regular dos dados
- [ ] Análise mensal de métricas
- [ ] Testes A/B para otimização
- [ ] Atualização de conteúdo conforme necessário

---

**🎯 Meta de Conversão: 3-5% para tráfego pago, 1-3% para tráfego orgânico**

*Este guia é baseado em landing pages de alta conversão e deve ser adaptado conforme o nicho e público-alvo específico.*