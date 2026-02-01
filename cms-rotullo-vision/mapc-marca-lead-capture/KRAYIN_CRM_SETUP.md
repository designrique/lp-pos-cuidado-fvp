# 🎯 Configuração Krayin CRM - Landing Page MAPC

## � **PROBLEMA IDENTIFICADO E SOLUÇÃO**

O CRM está retornando página HTML de login ao invés de JSON da API. Isso indica problema de autenticação.

### **Opção 1: Usar Credenciais (Mais Simples) ✅**

1. **Configure as credenciais no `.env.local`:**
   ```bash
   VITE_KRAYIN_ADMIN_EMAIL=admin@mapc.com.br
   VITE_KRAYIN_ADMIN_PASSWORD=sua_senha_admin
   VITE_KRAYIN_API_BASE_URL=https://crm.mapc.com.br/api/v1
   ```

2. **O sistema irá:**
   - Fazer login automático via API
   - Obter token dinâmico
   - Usar o token para criar leads

### **Opção 2: Usar Token Fixo (Mais Seguro)**

1. **Gere o token manualmente:**
   ```bash
   POST https://crm.mapc.com.br/api/v1/login
   Content-Type: application/json
   
   {
     "email": "admin@mapc.com.br",
     "password": "sua_senha_admin",
     "device_name": "landing-page-mapc"
   }
   ```

2. **Configure apenas o token:**
   ```bash
   VITE_KRAYIN_API_TOKEN=Bearer seu_token_aqui
   VITE_KRAYIN_API_BASE_URL=https://crm.mapc.com.br/api/v1
   ```

## 🧪 **Teste a API Antes de Usar**

1. **Abra o arquivo `krayin-test.html` no navegador**
2. **Preencha email e senha do admin**
3. **Teste a autenticação e criação de leads**
4. **Verifique se tudo funciona antes de usar na landing page**

## ⚙️ **Configuração Final**

### 1. Copie o arquivo de exemplo:
```bash
cp .env.example .env.local
```

### 2. Edite `.env.local` com uma das opções:

**Opção A (Credenciais):**
```bash
VITE_KRAYIN_ADMIN_EMAIL=admin@mapc.com.br
VITE_KRAYIN_ADMIN_PASSWORD=sua_senha_admin
VITE_KRAYIN_API_BASE_URL=https://crm.mapc.com.br/api/v1
```

**Opção B (Token fixo):**
```bash
VITE_KRAYIN_API_TOKEN=Bearer seu_token_real
VITE_KRAYIN_API_BASE_URL=https://crm.mapc.com.br/api/v1
```

### 3. Configure IDs conforme seu CRM:
```bash
VITE_LEAD_SOURCE_ID=3
VITE_LEAD_TYPE_ID=1  
VITE_DEFAULT_USER_ID=1
```

## 🔍 **Diagnóstico de Problemas**

### Se continuar recebendo HTML:
1. **Verifique credenciais** - email/senha corretos
2. **Teste manualmente** com krayin-test.html
3. **Verifique URLs** - sem barras extras
4. **Verifique CORS** - CRM pode bloquear origem

### Se receber erro 422:
1. **Verifique campos obrigatórios**
2. **Teste IDs** de source/type no krayin-test.html  
3. **Verifique formato de dados**

## 🎯 **Arquivos Criados**

- ✅ **krayin-test.html** - Teste manual da API
- ✅ **.env.example** - Template de configuração  
- ✅ **LeadCaptureForm.tsx** - Integração automática
- ✅ **Fallback Formspree** - Backup sempre funcional

## 🔗 **Passo 3: Configurar Webhooks (Opcional)**

### Para integração automática com N8N:

1. **Criar Webhook no Krayin**
   ```bash
   POST https://crm.mapc.com.br/api/v1/settings/webhooks
   Authorization: Bearer SEU_TOKEN
   Content-Type: application/json
   
   {
     "name": "N8N Lead Notification",
     "entity_type": "leads",
     "description": "Notify N8N when new lead is created",
     "method": "post",
     "end_point": "https://n8n-mapc.seu-servidor.com/webhook/novo-lead",
     "query_params": [],
     "headers": [
       {
         "key": "Content-Type",
         "value": "application/json"
       }
     ],
     "payload_type": "default",
     "payload": "{\"lead_id\": \"{%leads.id%}\", \"lead_title\": \"{%leads.title%}\", \"person_name\": \"{%leads.person.name%}\", \"person_email\": \"{%leads.person.emails[0].value%}\", \"person_phone\": \"{%leads.person.contact_numbers[0].value%}\"}"
   }
   ```

## 🎯 **Passo 4: Configurações do CRM**

### Verificar Sources e Types:
```bash
# Listar Sources
GET https://crm.mapc.com.br/api/v1/settings/sources

# Listar Types  
GET https://crm.mapc.com.br/api/v1/settings/types
```

### Sources recomendadas:
- `1`: Email
- `2`: Web  
- `3`: Web Form ✅ (usar este)
- `4`: Phone
- `5`: Direct

### Types recomendadas:
- `1`: New Business ✅ (usar este)
- `2`: Existing Business

## 📊 **Passo 5: Testar Integração**

### Estrutura de teste:
```json
{
  "title": "Lead - João Silva",
  "description": "Solicitação de registro de marca via Landing Page MAPC",
  "lead_value": "5000",
  "lead_source_id": 3,
  "lead_type_id": 1,
  "user_id": 1,
  "expected_close_date": "2025-01-22",
  "person": {
    "name": "João Silva",
    "emails": [{"value": "joao@empresa.com", "label": "work"}],
    "contact_numbers": [{"value": "5581999887766", "label": "work"}],
    "organization": {"name": "Empresa Teste Ltda"},
    "entity_type": "persons"
  },
  "entity_type": "leads"
}
```

## 🔧 **Resolução de Problemas**

### Erro 401 (Unauthorized):
- Verificar se o token está correto
- Verificar se o token não expirou
- Gerar novo token se necessário

### Erro 422 (Validation Error):
- Verificar campos obrigatórios: `title`, `description`, `lead_value`, `lead_source_id`, `lead_type_id`, `person[name]`
- Verificar formato dos dados (emails em array, etc.)

### Erro 500 (Server Error):
- Verificar logs do Krayin CRM
- Verificar conectividade de rede

## 🚀 **Após Configuração**

1. **Teste o formulário** na landing page
2. **Verifique no CRM** se os leads estão sendo criados
3. **Configure webhooks** se desejar automação
4. **Monitore logs** para identificar problemas

## 📞 **Suporte**

Se houver problemas:
1. Verificar logs do navegador (Console)
2. Verificar logs do Krayin CRM
3. Testar endpoints diretamente via Postman/Insomnia