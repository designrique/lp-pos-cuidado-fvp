# Automação de Blog - Instituto Ariana Borges

Esta pasta contém todos os arquivos necessários para implementar a automação de postagens no blog do Instituto Ariana Borges usando n8n e Google Trends.

## 📁 Arquivos

### 1. [fluxo-postagem-ariana-borges.json](./fluxo-postagem-ariana-borges.json)
**Workflow n8n adaptado** para o nicho de terapias holísticas.

- Importar no n8n para começar
- Contém nós principais customizados
- Prompts otimizados para o Instituto

### 2. [configuracao-workflow-blog.md](./configuracao-workflow-blog.md)
**Guia completo de configuração** com passo a passo detalhado.

- Configuração de APIs (SerpAPI, Perplexity, OpenRouter)
- Setup do Google Sheets
- Credenciais e autenticação
- Troubleshooting
- Custos estimados

### 3. [prompts-workflow-blog.md](./prompts-workflow-blog.md)
**Biblioteca de prompts customizados** para cada etapa do workflow.

- Seleção de tópico SEO
- Redação do blog post
- Links internos
- Geração de HTML
- Meta descriptions
- Slugs otimizados

### 4. [calendario-editorial-blog.md](./calendario-editorial-blog.md)
**Estratégia de publicação semanal** com rotação de keywords.

- Calendário mensal
- Rotação de keywords base
- Temas sazonais
- Checklist de publicação
- Métricas de monitoramento

## 🚀 Quick Start

1. **Ler primeiro**: [configuracao-workflow-blog.md](./configuracao-workflow-blog.md)
2. **Configurar APIs**: SerpAPI, Perplexity, OpenRouter
3. **Importar workflow**: [fluxo-postagem-ariana-borges.json](./fluxo-postagem-ariana-borges.json) no n8n
4. **Consultar prompts**: [prompts-workflow-blog.md](./prompts-workflow-blog.md) para customizações
5. **Seguir calendário**: [calendario-editorial-blog.md](./calendario-editorial-blog.md) para estratégia

## 💰 Custos

**Configuração Inicial (Econômica)**:
- ~$20-30/mês
- 1 post por semana
- Planos free quando possível

**Configuração Escalada**:
- ~$100-110/mês
- Planos pagos completos
- Maior volume e recursos

## 📊 Estratégia

- **Frequência**: 1 post por semana (segunda-feira 9h)
- **Volume**: 4 posts/mês = 48 posts/ano
- **Keywords**: Rotação semanal (Terapia Holística → Autoconhecimento → Cura Emocional → Desenvolvimento Pessoal)
- **Qualidade**: 1800-2200 palavras por post
- **Tom**: Acolhedor, empático, científico e espiritual

## 🎯 Pipeline Automatizado

1. Google Trends detecta tópicos em alta
2. IA seleciona melhor keyword para o nicho
3. Perplexity API pesquisa fontes confiáveis
4. GPT-4 redige artigo completo
5. IA adiciona links internos relevantes
6. Geração de HTML semântico
7. Criação de slug, título e meta description
8. Publicação no Payload CMS como draft
9. Logging no Google Sheets

## 📞 Suporte

- **n8n**: https://community.n8n.io/
- **SerpAPI**: https://serpapi.com/support
- **Perplexity**: https://docs.perplexity.ai/
- **OpenRouter**: https://openrouter.ai/docs

---

**Última atualização**: 05/02/2026  
**Versão**: 1.0
