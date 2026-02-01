# Importação de Dados para NocoDB - CRM MAPC

## Tabelas Criadas

### 1. leads_funil.csv
Tabela principal para gerenciamento do funil de vendas com os seguintes campos:

**Campos Principais:**
- `id`: ID único do lead
- `nome`: Nome completo do cliente
- `email`: Email de contato
- `telefone`: Telefone formatado brasileiro
- `empresa`: Nome da empresa do cliente
- `servico_interesse`: Tipo de serviço (registro-marca, registro-patente, etc.)
- `origem`: Canal de aquisição (Website, Google Ads, LinkedIn, etc.)

**Campos do Funil:**
- `status_lead`: Status no funil (Novo Lead, Qualificado, Proposta Enviada, Negociação, Fechado-Ganho, Fechado-Perdido)
- `data_criacao`: Data de criação do lead
- `data_ultimo_contato`: Última interação
- `responsavel`: Consultor responsável
- `probabilidade_fechamento`: Porcentagem de chance de fechamento (0-100%)
- `data_previsao_fechamento`: Data estimada para fechamento
- `valor_estimado`: Valor estimado do negócio

**Campos Adicionais:**
- `observacoes`: Notas sobre o lead
- `mensagem_inicial`: Primeira mensagem/interesse do cliente

### 2. financeiro.csv
Tabela para controle financeiro e faturamento:

**Relacionamento:**
- `lead_id`: FK para tabela de leads (para sincronização)
- `cliente_nome`: Nome do cliente (duplicado para facilitar consultas)

**Dados Financeiros:**
- `servico`: Serviço contratado
- `valor_total`: Valor total do contrato
- `valor_entrada`: Valor da entrada
- `valor_parcelado`: Valor das parcelas
- `num_parcelas`: Número de parcelas
- `desconto_aplicado`: Desconto dado
- `valor_liquido`: Valor final após desconto
- `comissao_vendedor`: Comissão do vendedor

**Controle de Pagamentos:**
- `data_venda`: Data do fechamento
- `data_vencimento_entrada`: Vencimento da entrada
- `status_pagamento`: Status (Pendente, Entrada Paga, Quitado, Atrasado)
- `metodo_pagamento`: Forma de pagamento
- `data_ultimo_pagamento`: Data do último pagamento recebido

## Como Importar no NocoDB

1. **Criar novo projeto** no NocoDB
2. **Importar leads_funil.csv** primeiro (tabela principal)
3. **Importar financeiro.csv** como segunda tabela
4. **Configurar relacionamento** entre as tabelas usando `lead_id`

## Configurações Recomendadas no NocoDB

### Tabela Leads:
- **Campo `status_lead`**: Configurar como Select com opções: Novo Lead, Qualificado, Proposta Enviada, Negociação, Fechado-Ganho, Fechado-Perdido
- **Campo `origem`**: Select com: Website, Google Ads, LinkedIn, Indicação, Facebook, Instagram
- **Campo `servico_interesse`**: Select com os serviços da MAPC
- **Campo `probabilidade_fechamento`**: Number com range 0-100
- **Campos de data**: Configurar como DateTime

### Tabela Financeiro:
- **Campo `status_pagamento`**: Select com: Pendente, Entrada Paga, Quitado, Atrasado
- **Campo `metodo_pagamento`**: Select com: PIX, Boleto, Cartão, Transferência
- **Campos monetários**: Configurar como Currency (R$)
- **Relacionamento**: Link para tabela Leads usando `lead_id`

## Fórmulas Úteis para Sincronização

### Na Tabela Leads:
- **Status baseado no financeiro**: Se há registro financeiro, status deve ser "Fechado-Ganho"
- **Valor realizado**: Buscar valor_liquido da tabela financeiro

### Na Tabela Financeiro:
- **Nome do cliente**: Lookup do campo nome da tabela leads
- **Valor em aberto**: `valor_total - valor_entrada` (se entrada não paga) ou `valor_parcelado` (se entrada paga)

## Dashboards Sugeridos

1. **Funil de Vendas**: Gráfico de status dos leads
2. **Receita por Período**: Gráfico temporal das vendas
3. **Performance por Consultor**: Métricas de cada responsável
4. **Serviços Mais Vendidos**: Ranking dos serviços
5. **Inadimplência**: Controle de pagamentos em atraso

## Integração com o Site

Para integrar o formulário do site com o NocoDB:
1. Usar API do NocoDB para criar novos leads
2. Configurar webhook para notificações
3. Atualizar formulário para enviar dados diretamente ao NocoDB