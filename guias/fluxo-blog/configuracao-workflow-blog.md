# Guia de Configuração - Workflow de Auto-Postagem

## 📋 Pré-requisitos

### 1. Contas e APIs Necessárias

#### SerpAPI (Google Trends + Imagens)
- **URL**: https://serpapi.com/
- **Plano**: Basic ($50/mês) ou Free (100 buscas/mês para testes)
- **Configuração**:
  1. Criar conta
  2. Obter API Key em "Dashboard > API Key"
  3. Adicionar no n8n como credencial "HTTP Query Auth"
  4. Nome do parâmetro: `api_key`

#### Perplexity API (Pesquisa de Conteúdo)
- **URL**: https://www.perplexity.ai/
- **Plano**: Pro API ($20/mês)
- **Configuração**:
  1. Criar conta Pro
  2. Acessar "Settings > API"
  3. Gerar API Key
  4. Adicionar no n8n como credencial "HTTP Header Auth"
  5. Nome do header: `Authorization`
  6. Valor: `Bearer SUA_API_KEY`

#### OpenRouter (Modelos de IA)
- **URL**: https://openrouter.ai/
- **Plano**: Pay-as-you-go (~$15-20/mês para 4 posts)
- **Modelos Recomendados**:
  - `gpt-4-turbo`: Seleção de tópicos e redação principal
  - `gpt-4o-mini`: Slugs e metadados (mais barato)
  - `o1-mini`: Links internos (raciocínio avançado)
- **Configuração**:
  1. Criar conta
  2. Adicionar créditos
  3. Obter API Key em "Keys"
  4. Configurar no n8n como credencial OpenAI (compatível)

### 💰 Custos Estimados (1 post por semana = 4 posts/mês)

| Serviço | Plano Free | Plano Pago |
|---------|-----------|------------|
| **SerpAPI** | $0 (100 buscas/mês) ✅ | $50/mês (Basic) |
| **Perplexity API** | - | $5-10/mês (4 pesquisas) |
| **OpenRouter** | - | $15-20/mês (GPT-4 para 4 posts) |
| **n8n** | $0 (self-hosted) ✅ | $20/mês (cloud) |
| **TOTAL** | **~$20-30/mês** | **~$90-100/mês** |

> ✅ **Recomendação Inicial**: Começar com SerpAPI Free (100 buscas/mês são suficientes) + n8n self-hosted = **~$20-30/mês**
> 
> 📈 **Escalar Depois**: Quando o blog crescer, migrar para planos pagos para maior volume e recursos avançados.

#### Payload CMS (Publicação)
- **URL**: https://site-ariana-borges-final-production.up.railway.app
- **Configuração**:
  1. Criar usuário API no Payload Admin
  2. Gerar token de autenticação
  3. Adicionar no n8n como "HTTP Header Auth"
  4. Nome: `Authorization`
  5. Valor: `Bearer SEU_TOKEN_PAYLOAD`

#### Google Sheets (Logging e Links Internos)
- **Configuração**:
  1. Criar conta de serviço no Google Cloud Console
  2. Baixar arquivo JSON de credenciais
  3. Adicionar no n8n como "Google Sheets API"
  4. Compartilhar planilhas com o email da conta de serviço

---

## 📊 Templates do Google Sheets

### Planilha 1: Posts Publicados (Logging)

**Nome**: `Blog Instituto Ariana Borges - Controle de Publicações`

**Colunas**:
| Data | Título | Slug | Keyword Principal | URL Payload | Status | Categoria | Links Internos |
|------|--------|------|-------------------|-------------|--------|-----------|----------------|
| 2026-02-05 | Exemplo | exemplo-post | terapia holística | https://... | draft | Terapia | 5 |

**Fórmulas Úteis**:
- Contagem de posts: `=COUNTA(B2:B)`
- Posts publicados: `=COUNTIF(F2:F,"published")`
- Último post: `=SORT(A2:H, 1, FALSE)`

### Planilha 2: Base de Links Internos

**Nome**: `Blog Instituto Ariana Borges - Links Internos`

**Colunas**:
| Título | URL | Categoria | Keywords | Resumo |
|--------|-----|-----------|----------|--------|
| Como a Terapia Holística Transforma Vidas | /blog/terapia-holistica-transforma-vidas | Terapia Individual | terapia holística, cura emocional, transformação | Post sobre os benefícios da terapia holística... |

**Instruções**:
1. Preencher manualmente posts existentes
2. Workflow adiciona automaticamente novos posts
3. IA usa esta base para criar links internos relevantes

---

## ⚙️ Configuração do Workflow n8n

### Passo 1: Importar Workflow

1. Abrir n8n (self-hosted ou cloud)
2. Clicar em "Import from File"
3. Selecionar `fluxo-postagem-ariana-borges.json`
4. Workflow será importado sem credenciais

### Passo 2: Configurar Credenciais

#### SerpAPI
- Nó: "Get Google Trends - Terapias Holísticas"
- Tipo: HTTP Query Auth
- Parâmetro: `api_key`
- Valor: Sua chave SerpAPI

#### Perplexity
- Nó: "Research Reliable Sources"
- Tipo: HTTP Header Auth
- Header: `Authorization`
- Valor: `Bearer SUA_CHAVE_PERPLEXITY`

#### OpenRouter/OpenAI
- Nós: Todos os que usam IA (Select Best SEO Topic, Draft Blog Content, etc.)
- Tipo: OpenAI
- API Key: Sua chave OpenRouter
- Base URL: `https://openrouter.ai/api/v1` (se usar OpenRouter)

#### Payload CMS
- Nó: "Publish to Payload CMS"
- Tipo: HTTP Header Auth
- Header: `Authorization`
- Valor: `Bearer SEU_TOKEN_PAYLOAD`

#### Google Sheets
- Nós: "Find Previous Posts", "Log Published Post"
- Tipo: Google Sheets API
- Credenciais: JSON da conta de serviço

### Passo 3: Configurar IDs do Google Sheets

1. Criar as duas planilhas conforme templates acima
2. Copiar IDs das planilhas (parte da URL)
3. Atualizar nos nós:
   - "Find Previous Posts": ID da planilha de Links Internos
   - "Log Published Post": ID da planilha de Controle

### Passo 4: Ajustar Keywords Base

No nó "Get Google Trends - Terapias Holísticas", você pode alternar entre diferentes keywords base:

**Opção 1: Terapia Holística** (padrão)
```
q: "terapia holística"
```

**Opção 2: Autoconhecimento**
```
q: "autoconhecimento"
```

**Opção 3: Desenvolvimento Pessoal**
```
q: "desenvolvimento pessoal"
```

**Opção 4: Cura Emocional**
```
q: "cura emocional"
```

**Dica**: Crie 4 workflows separados, um para cada keyword base, e execute em dias alternados.

### Passo 5: Configurar Schedule

No nó "Schedule Trigger":

**✅ RECOMENDADO: Semanal (1 post por semana)**
```json
{
  "rule": {
    "interval": [
      {
        "field": "cronExpression",
        "expression": "0 9 * * 1"
      }
    ]
  }
}
```
**Executa toda segunda-feira às 9h.**

**Benefícios da frequência semanal:**
- Custos reduzidos (~$20-30/mês com planos free)
- Qualidade consistente do conteúdo
- Tempo para revisar posts antes de publicar
- Sustentável a longo prazo
- Permite ajustes baseados em feedback

**Alternativa: Quinzenal (2 posts por mês)**
```json
{
  "rule": {
    "interval": [
      {
        "field": "cronExpression",
        "expression": "0 9 1,15 * *"
      }
    ]
  }
}
```
Executa dias 1 e 15 de cada mês às 9h.

**Alternativa: Diária (apenas para teste)**
```json
{
  "rule": {
    "interval": [
      {
        "field": "cronExpression",
        "expression": "0 9 * * *"
      }
    ]
  }
}
```
⚠️ **Não recomendado para produção** - custos elevados e pode saturar o blog.

---

## 🧪 Teste Manual

Antes de ativar o schedule automático:

1. **Desativar Schedule Trigger**
   - Clicar com botão direito no nó
   - "Disable"

2. **Adicionar Manual Trigger**
   - Arrastar nó "Manual Trigger" para o canvas
   - Conectar ao "Get Google Trends"

3. **Executar Teste**
   - Clicar em "Execute Workflow"
   - Acompanhar execução de cada nó
   - Verificar erros

4. **Validar Resultado**
   - Checar se post foi criado no Payload CMS
   - Verificar qualidade do conteúdo
   - Confirmar que foi logado no Google Sheets

5. **Ajustar Prompts**
   - Se tom não estiver adequado, editar prompts
   - Se conteúdo muito curto/longo, ajustar instruções
   - Se links internos irrelevantes, melhorar base de dados

---

## 🎨 Customizações Avançadas

### Adicionar Categorias Dinâmicas

No nó "Publish to Payload CMS", adicionar lógica para selecionar categoria:

```javascript
// Mapear keyword para categoria
const keyword = $('Select Best SEO Topic - Instituto').item.json.message.content.toLowerCase();

let categoryId;
if (keyword.includes('terapia') || keyword.includes('cura')) {
  categoryId = 'ID_CATEGORIA_TERAPIA';
} else if (keyword.includes('formação') || keyword.includes('curso')) {
  categoryId = 'ID_CATEGORIA_FORMACAO';
} else if (keyword.includes('autoconhecimento') || keyword.includes('desenvolvimento')) {
  categoryId = 'ID_CATEGORIA_AUTOCONHECIMENTO';
} else {
  categoryId = 'ID_CATEGORIA_ESPIRITUALIDADE';
}

return { categoryId };
```

### Gerar Imagens com IA

Substituir nó "Fetch Cover Image" por geração com DALL-E:

```json
{
  "method": "POST",
  "url": "https://api.openai.com/v1/images/generations",
  "body": {
    "model": "dall-e-3",
    "prompt": "Imagem serena e acolhedora representando {{ keyword }}, estilo aquarela suave, tons pastéis, atmosfera de paz e cura",
    "size": "1792x1024",
    "quality": "hd"
  }
}
```

### Adicionar Revisão Humana

Inserir nó "Wait for Approval" antes de publicar:

1. Workflow cria post como "draft"
2. Envia email/Slack para revisor
3. Aguarda aprovação manual
4. Só então publica como "published"

---

## 📈 Monitoramento e Otimização

### Métricas para Acompanhar

1. **Taxa de Sucesso**: % de execuções sem erro
2. **Qualidade do Conteúdo**: Revisar posts gerados
3. **SEO Performance**: Ranking das keywords no Google Search Console
4. **Engajamento**: Tempo na página, bounce rate (via Google Analytics)
5. **Conversões**: Leads gerados via blog

### Ajustes Baseados em Dados

- **Se posts muito técnicos**: Simplificar prompts
- **Se SEO fraco**: Aumentar densidade de keywords
- **Se baixo engajamento**: Tornar introduções mais empáticas
- **Se muitos erros**: Revisar credenciais e limites de API

---

## 🆘 Troubleshooting

### Erro: "SerpAPI quota exceeded"
**Solução**: Upgrade de plano ou reduzir frequência

### Erro: "Perplexity API timeout"
**Solução**: Adicionar retry logic ou usar modelo mais rápido

### Erro: "Payload CMS unauthorized"
**Solução**: Regenerar token de autenticação

### Erro: "Google Sheets permission denied"
**Solução**: Compartilhar planilha com email da conta de serviço

### Conteúdo muito genérico
**Solução**: Melhorar prompt de redação, adicionar mais contexto específico do Instituto

### Links internos irrelevantes
**Solução**: Enriquecer planilha de links internos com mais detalhes e keywords

---

## 📞 Suporte

Para dúvidas sobre:
- **n8n**: https://community.n8n.io/
- **SerpAPI**: https://serpapi.com/support
- **Perplexity**: https://docs.perplexity.ai/
- **OpenRouter**: https://openrouter.ai/docs

---

## 🚀 Próximos Passos

1. ✅ Configurar todas as APIs
2. ✅ Criar planilhas do Google Sheets
3. ✅ Importar e configurar workflow
4. ✅ Executar teste manual
5. ✅ Revisar e ajustar prompts
6. ✅ Ativar schedule automático
7. ✅ Monitorar primeiras execuções
8. ✅ Otimizar baseado em resultados
