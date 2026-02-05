# Teste de Notificações de Agendamento

## 📧 Sistema de Emails Implementado

Quando um agendamento é criado no Payload CMS com status "paid", o sistema envia automaticamente:

1. **Email para Ariana Borges** (`institutoarianaborges@gmail.com`)
2. **Email para o Cliente** (se `clientEmail` estiver preenchido)

---

## 🧪 Como Testar

### Opção 1: Via Admin Panel (Recomendado)

1. Acessar o Payload Admin: https://site-ariana-borges-final-production.up.railway.app/admin
2. Ir em "Vendas" → "Agendamentos"
3. Clicar em "Create New"
4. Preencher os campos:
   - **Data da Compra**: Escolher data/hora
   - **Nome do Cliente**: Seu nome de teste
   - **Email do Cliente**: Seu email pessoal (para receber confirmação)
   - **Serviço Contratado**: Ex: "Terapia Individual"
   - **Valor (R$)**: Ex: 150
   - **Status do Pagamento**: Selecionar "Pago"
   - **ID da Transação**: (opcional) Ex: "TEST123"
5. Clicar em "Save"

**Resultado Esperado:**
- ✅ Ariana recebe email de notificação
- ✅ Cliente recebe email de confirmação
- ✅ Logs no console do backend confirmam envio

### Opção 2: Via API (Simular Infinity Pay)

```bash
curl -X POST https://site-ariana-borges-final-production.up.railway.app/api/appointments \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2026-02-10T14:00:00-03:00",
    "clientName": "João Silva",
    "clientEmail": "joao@example.com",
    "serviceName": "Terapia Individual - 1h",
    "amount": 150,
    "status": "paid",
    "transactionId": "INF_TEST_12345"
  }'
```

**Resultado Esperado:**
- Status 201 Created
- Emails enviados automaticamente

---

## 📋 Checklist de Verificação

### Email para Ariana
- [ ] Assunto: "🎉 Novo Agendamento: [Nome do Serviço]"
- [ ] Remetente: Instituto Ariana Borges
- [ ] Destinatário: institutoarianaborges@gmail.com
- [ ] Contém: Nome do cliente, serviço, data, valor
- [ ] Design: Header roxo com gradiente
- [ ] Seção "Próximos Passos" presente

### Email para Cliente
- [ ] Assunto: "✨ Confirmação de Agendamento - [Nome do Serviço]"
- [ ] Remetente: Instituto Ariana Borges
- [ ] Destinatário: Email do cliente
- [ ] Contém: Detalhes do agendamento
- [ ] Design: Header roxo com mensagem inspiradora
- [ ] Seção "Próximos Passos" com instruções
- [ ] Mensagem de boas-vindas acolhedora

---

## 🔍 Logs para Monitorar

No console do backend (Railway ou local), você verá:

```
[INFO] Email de notificação enviado para Ariana sobre agendamento de João Silva
[INFO] Email de confirmação enviado para joao@example.com
```

Se houver erro:
```
[ERROR] Erro ao enviar email de notificação de agendamento: [detalhes do erro]
```

---

## 🛠️ Troubleshooting

### Emails não estão sendo enviados

1. **Verificar variáveis de ambiente** (`.env`):
   ```
   SMTP_HOST=smtp-relay.brevo.com
   SMTP_PORT=587
   SMTP_USER=seu_email@brevo.com
   SMTP_PASS=sua_senha_smtp
   SMTP_FROM_EMAIL=noreply@institutoarianaborges.com
   ```

2. **Verificar logs do Payload**:
   - Acessar Railway → Logs
   - Procurar por erros relacionados a SMTP

3. **Testar SMTP manualmente**:
   ```bash
   telnet smtp-relay.brevo.com 587
   ```

### Email vai para spam

- Configurar SPF, DKIM e DMARC no domínio
- Usar domínio verificado no Brevo
- Evitar palavras spam no assunto

### Cliente não recebe email

- Verificar se `clientEmail` está preenchido
- Confirmar que email é válido
- Checar pasta de spam do cliente

---

## 📊 Campos da Collection Appointments

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `date` | Date | Sim | Data/hora da compra |
| `clientName` | Text | Sim | Nome do cliente |
| `clientEmail` | Email | Não | Email do cliente (para confirmação) |
| `serviceName` | Text | Sim | Nome do serviço contratado |
| `amount` | Number | Sim | Valor em reais |
| `status` | Select | Sim | paid / pending / failed |
| `transactionId` | Text | Não | ID da transação Infinity Pay |
| `paymentLink` | Text | Não | Link original de pagamento |

---

## 🎨 Preview dos Emails

### Email para Ariana

**Header:** Gradiente roxo com "🎉 Novo Agendamento Confirmado!"

**Conteúdo:**
- Saudação personalizada
- Tabela com detalhes (Cliente, Serviço, Data, Valor)
- ID da transação (se disponível)
- Box azul com próximos passos

**Footer:** Informações do sistema

### Email para Cliente

**Header:** Gradiente roxo com "✨ Agendamento Confirmado!" + subtítulo inspirador

**Conteúdo:**
- Saudação calorosa e personalizada
- Box com gradiente contendo detalhes do agendamento
- Box amarelo com próximos passos
- Box roxo com mensagem inspiradora
- Assinatura da Ariana e equipe

**Footer:** Informações do Instituto + link para WhatsApp

---

## 🚀 Próximos Passos (Melhorias Futuras)

1. **Lembrete Automático**: Enviar email 24h antes do agendamento
2. **Feedback Pós-Atendimento**: Email solicitando avaliação
3. **Cancelamento**: Permitir cancelamento via link no email
4. **Reagendamento**: Opção de reagendar diretamente
5. **WhatsApp Integration**: Enviar confirmação também via WhatsApp

---

**Última atualização**: 05/02/2026  
**Status**: ✅ Implementado e pronto para teste
