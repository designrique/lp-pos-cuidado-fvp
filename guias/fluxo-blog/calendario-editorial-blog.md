# Calendário Editorial - Blog Instituto Ariana Borges

## 📅 Estratégia de Publicação Semanal

### Frequência Recomendada
- **1 post por semana** (toda segunda-feira às 9h)
- **4 posts por mês**
- **48 posts por ano**

### Benefícios da Frequência Semanal
✅ Custos acessíveis (~$20-30/mês)  
✅ Qualidade consistente  
✅ Tempo para revisão e ajustes  
✅ Sustentável a longo prazo  
✅ Permite monitoramento de performance  

---

## 🎯 Rotação de Keywords Base

Para maximizar alcance e relevância, alterne entre 4 keywords base ao longo do mês:

### Semana 1: Terapia Holística
**Keyword Base**: `terapia holística`  
**Público**: Pessoas buscando tratamento alternativo  
**Temas Esperados**: Benefícios, técnicas, casos de sucesso

### Semana 2: Autoconhecimento
**Keyword Base**: `autoconhecimento`  
**Público**: Pessoas em jornada de desenvolvimento pessoal  
**Temas Esperados**: Práticas, reflexões, transformação interior

### Semana 3: Cura Emocional
**Keyword Base**: `cura emocional`  
**Público**: Pessoas lidando com traumas e questões emocionais  
**Temas Esperados**: Processos de cura, ferramentas, superação

### Semana 4: Desenvolvimento Pessoal
**Keyword Base**: `desenvolvimento pessoal`  
**Público**: Pessoas buscando crescimento e evolução  
**Temas Esperados**: Hábitos, mindset, propósito de vida

---

## 📊 Exemplo de Calendário Mensal

### Fevereiro 2026

| Data | Keyword Base | Tópico Esperado | Status |
|------|--------------|-----------------|--------|
| 03/02 (Seg) | Terapia Holística | Ex: "Como a Terapia Holística Trata Ansiedade" | ✅ Publicado |
| 10/02 (Seg) | Autoconhecimento | Ex: "7 Exercícios de Autoconhecimento" | 📝 Rascunho |
| 17/02 (Seg) | Cura Emocional | Ex: "Cura Emocional: Primeiros Passos" | ⏳ Agendado |
| 24/02 (Seg) | Desenvolvimento Pessoal | Ex: "Mindfulness para Desenvolvimento Pessoal" | ⏳ Agendado |

### Março 2026

| Data | Keyword Base | Tópico Esperado | Status |
|------|--------------|-----------------|--------|
| 03/03 (Seg) | Terapia Holística | - | ⏳ Agendado |
| 10/03 (Seg) | Autoconhecimento | - | ⏳ Agendado |
| 17/03 (Seg) | Cura Emocional | - | ⏳ Agendado |
| 24/03 (Seg) | Desenvolvimento Pessoal | - | ⏳ Agendado |
| 31/03 (Seg) | Espiritualidade | - | ⏳ Agendado |

*Nota: Março tem 5 segundas-feiras, então adicione uma 5ª keyword (Espiritualidade)*

---

## 🔄 Configuração de Múltiplos Workflows

Para implementar a rotação de keywords, você tem 2 opções:

### Opção 1: Workflow Único com Rotação Automática

Adicionar nó de código JavaScript antes do "Get Google Trends":

```javascript
// Calcular qual keyword usar baseado na semana do mês
const now = new Date();
const weekOfMonth = Math.ceil(now.getDate() / 7);

const keywords = [
  'terapia holística',      // Semana 1
  'autoconhecimento',       // Semana 2
  'cura emocional',         // Semana 3
  'desenvolvimento pessoal' // Semana 4
];

const currentKeyword = keywords[(weekOfMonth - 1) % keywords.length];

return [{ json: { keyword: currentKeyword } }];
```

Então, no nó "Get Google Trends", usar:
```
q: {{ $json.keyword }}
```

### Opção 2: 4 Workflows Separados (Recomendado)

Criar 4 workflows idênticos, cada um com:
- Nome diferente (ex: "Blog - Terapia Holística")
- Keyword base diferente
- Schedule diferente (cada um em uma segunda-feira do mês)

**Vantagens**:
- Mais controle individual
- Fácil de pausar/ajustar um tema específico
- Logs separados por keyword

**Schedule para cada workflow**:

```javascript
// Workflow 1: Terapia Holística (1ª segunda do mês)
"expression": "0 9 1-7 * 1"

// Workflow 2: Autoconhecimento (2ª segunda do mês)
"expression": "0 9 8-14 * 1"

// Workflow 3: Cura Emocional (3ª segunda do mês)
"expression": "0 9 15-21 * 1"

// Workflow 4: Desenvolvimento Pessoal (4ª segunda do mês)
"expression": "0 9 22-28 * 1"
```

---

## 📈 Planejamento Trimestral

### Q1 2026 (Jan-Mar): Estabelecimento
**Objetivo**: Criar base de conteúdo e testar workflow  
**Foco**: Tópicos fundamentais (o que é, como funciona, benefícios)  
**Meta**: 12 posts publicados

### Q2 2026 (Abr-Jun): Aprofundamento
**Objetivo**: Conteúdo mais específico e técnico  
**Foco**: Casos de uso, técnicas avançadas, estudos de caso  
**Meta**: 13 posts + análise de performance

### Q3 2026 (Jul-Set): Diversificação
**Objetivo**: Expandir temas e formatos  
**Foco**: Entrevistas, guias completos, séries temáticas  
**Meta**: 13 posts + otimização SEO

### Q4 2026 (Out-Dez): Consolidação
**Objetivo**: Fortalecer autoridade e conversão  
**Foco**: Conteúdo evergreen, FAQs, recursos gratuitos  
**Meta**: 13 posts + revisão de posts antigos

---

## 🎨 Temas Sazonais

### Janeiro - Recomeços
- Temas: Renovação, novos hábitos, propósitos
- Keywords: "começar terapia", "mudança de vida"

### Fevereiro - Amor Próprio
- Temas: Autocuidado, autoestima, relacionamentos
- Keywords: "amor próprio", "autocuidado emocional"

### Março - Equilíbrio
- Temas: Equilíbrio emocional, harmonia, paz interior
- Keywords: "equilíbrio emocional", "paz interior"

### Abril - Renovação
- Temas: Transformação, renascimento, novos ciclos
- Keywords: "transformação pessoal", "renovação espiritual"

### Maio - Gratidão
- Temas: Gratidão, abundância, positividade
- Keywords: "gratidão", "pensamento positivo"

### Junho - Conexão
- Temas: Conexão espiritual, intuição, propósito
- Keywords: "conexão espiritual", "encontrar propósito"

### Julho - Descanso
- Temas: Descanso mental, férias, recuperação
- Keywords: "saúde mental", "descanso emocional"

### Agosto - Motivação
- Temas: Motivação, superação, resiliência
- Keywords: "motivação pessoal", "superar desafios"

### Setembro - Foco
- Temas: Concentração, mindfulness, presença
- Keywords: "mindfulness", "viver o presente"

### Outubro - Cura
- Temas: Processos de cura, perdão, libertação
- Keywords: "cura emocional", "perdão"

### Novembro - Gratidão
- Temas: Gratidão, reflexão, balanço do ano
- Keywords: "gratidão", "reflexão pessoal"

### Dezembro - Encerramento
- Temas: Fechamento de ciclos, preparação para o novo
- Keywords: "fechar ciclos", "preparação para o ano novo"

---

## 📝 Checklist de Publicação

### Segunda-feira (Dia da Publicação)
- [ ] 9h00: Workflow executa automaticamente
- [ ] 9h30: Verificar se post foi criado no Payload CMS
- [ ] 10h00: Revisar conteúdo gerado (qualidade, tom, SEO)
- [ ] 11h00: Fazer ajustes manuais se necessário
- [ ] 14h00: Publicar (mudar status de "draft" para "published")
- [ ] 15h00: Compartilhar nas redes sociais
- [ ] 16h00: Atualizar planilha de controle

### Terça-feira (Dia Seguinte)
- [ ] Verificar indexação no Google Search Console
- [ ] Monitorar primeiras métricas (visualizações, tempo na página)
- [ ] Responder comentários se houver

### Sexta-feira (Fim da Semana)
- [ ] Analisar performance do post
- [ ] Identificar ajustes para próximo post
- [ ] Planejar tema da próxima semana (se manual)

---

## 🔍 Monitoramento de Performance

### Métricas Semanais
- Visualizações do post
- Tempo médio na página
- Taxa de rejeição
- Compartilhamentos sociais

### Métricas Mensais
- Total de visualizações do blog
- Posts mais populares
- Keywords com melhor ranking
- Taxa de conversão (leads gerados)

### Métricas Trimestrais
- Crescimento de tráfego orgânico
- Posicionamento no Google (keywords principais)
- ROI do blog (custo vs. leads gerados)
- Ajustes estratégicos necessários

---

## 🚀 Próximos Passos

1. **Semana 1**: Configurar workflow e executar primeiro teste
2. **Semana 2**: Publicar primeiro post e monitorar
3. **Semana 3**: Ajustar prompts baseado em feedback
4. **Semana 4**: Ativar automação completa
5. **Mês 2**: Analisar dados e otimizar
6. **Mês 3**: Escalar para múltiplas keywords

---

## 💡 Dicas de Otimização

### Para Aumentar Engajamento
- Adicionar CTAs claros ao final dos posts
- Incluir perguntas para reflexão
- Criar séries de posts relacionados
- Adicionar recursos gratuitos (PDFs, checklists)

### Para Melhorar SEO
- Atualizar posts antigos com novas informações
- Criar links internos entre posts relacionados
- Otimizar meta descriptions
- Adicionar imagens com alt text descritivo

### Para Gerar Leads
- Oferecer conteúdo exclusivo em troca de email
- Criar landing pages para temas específicos
- Adicionar formulários de contato estratégicos
- Promover cursos e serviços de forma natural

---

**Última atualização**: 05/02/2026  
**Próxima revisão**: 05/05/2026 (trimestral)
