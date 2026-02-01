# 🎯 Configuração Krayin CRM - Landing Page MAPC

## ✅ **BASEADO NA DOCUMENTAÇÃO OFICIAL** 

Implementação **FINAL** com base na análise completa da API JSON oficial do Krayin CRM da MAPC.

### **🔐 Autenticação Confirmada:**
- **Método**: `sanctum_admin` (Bearer token)
- **Endpoint**: `POST /api/v1/login`
- **Parâmetros**: `email`, `password`, `device_name` (todos obrigatórios)
- **Response**: `{ "token": "seu_token_aqui" }`

### **📋 Estrutura de Leads Oficial:**
- **Endpoint**: `POST /api/v1/leads`
- **Campos Obrigatórios**: `title`, `description`, `lead_value`, `lead_source_id`, `lead_type_id`, `person[name]`
- **Sources**: 1=Email, 2=Web, 3=Web Form ✅, 4=Phone, 5=Direct
- **Types**: 1=New Business ✅, 2=Existing Business

## 🧪 **PRIMEIRO PASSO: Teste a API**

1. **Abra `krayin-test.html` no navegador**
2. **Digite as credenciais do admin MAPC**
3. **Execute os testes na sequência:**
   - ✅ Obter Token de Autenticação
   - ✅ Listar Sources/Types (verificar IDs)
   - ✅ Criar Lead de Teste

## ⚙️ **Configuração da Landing Page**

### 1. Configurar variáveis de ambiente:
```bash
# Copiar arquivo
cp .env.example .env.local

# Opção A: Usar credenciais (automático)
VITE_KRAYIN_ADMIN_EMAIL=admin@mapc.com.br
VITE_KRAYIN_ADMIN_PASSWORD=sua_senha_real
VITE_KRAYIN_API_BASE_URL=https://crm.mapc.com.br/api/v1

# Opção B: Usar token fixo (mais seguro)
VITE_KRAYIN_API_TOKEN=Bearer seu_token_real
VITE_KRAYIN_API_BASE_URL=https://crm.mapc.com.br/api/v1

# Configurações dos leads
VITE_LEAD_SOURCE_ID=3  # Web Form
VITE_LEAD_TYPE_ID=1    # New Business  
VITE_DEFAULT_USER_ID=1 # Usuário responsável
```

### 2. Estrutura de dados implementada (oficial):
```json
{
  "title": "Lead - João Silva",
  "description": "Solicitação de registro de marca via Landing Page MAPC\n\nServiços: Registro de Marca\nEmpresa: Empresa Teste Ltda\nTelefone: 5581999887766\nObservações: Mensagem adicional do cliente",
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

## 🔍 **Diagnóstico de Problemas**

### ❌ Se continuar recebendo HTML (página de login):
1. ✅ **Token inválido** - gere novo token via `krayin-test.html`
2. ✅ **Credenciais erradas** - verifique email/senha do admin
3. ✅ **URL incorreta** - confirme `https://crm.mapc.com.br/api/v1`
4. ✅ **Sessão expirou** - tokens Sanctum podem expirar

### ❌ Se receber erro 422 (Validation Error):
1. ✅ **Campos obrigatórios** - title, description, lead_value, lead_source_id, lead_type_id, person[name]
2. ✅ **IDs inválidos** - verificar source_id e type_id via `krayin-test.html`
3. ✅ **Formato incorreto** - emails devem ser array, contact_numbers array, etc.

## 📊 **Arquivos Atualizados (Baseados na API Oficial)**

### ✅ **krayin-test.html**
- Testa autenticação oficial (`sanctum_admin`)
- Lista sources e types reais do CRM
- Cria lead com estrutura exata da API
- **Use PRIMEIRO para testar credenciais!**

### ✅ **LeadCaptureForm.tsx**
- Autenticação automática via `POST /api/v1/login`
- Headers corretos: `Authorization: Bearer token`
- Estrutura de dados conforme documentação oficial
- Fallback robusto para Formspree se CRM falhar

### ✅ **Configuração Flexível**
- `.env.example` com todas as variáveis necessárias
- `vite-env.d.ts` com tipos TypeScript corretos
- Suporte para credenciais OU token direto

## 🚀 **Para Colocar em Produção:**

### 1. **TESTE PRIMEIRO** 🧪
   - Abra `krayin-test.html`
   - Digite credenciais reais
   - Confirme que autenticação funciona
   - Confirme que lead é criado no CRM

### 2. **Configure Ambiente** ⚙️
   - Copie credenciais para `.env.local`
   - OU copie token gerado no teste

### 3. **Teste Formulário** 📝
   - Preencha formulário na landing page
   - Monitore console do navegador (F12)
   - Confirme que lead aparece no CRM

### 4. **Configurações Opcionais** 🔧
   - Configure webhooks para N8N
   - Personalize values e campos

## 🎯 **RESUMO TÉCNICO**

**Autenticação**: `sanctum_admin` Bearer token via `/api/v1/login`
**Endpoint de Leads**: `POST /api/v1/leads` com campos obrigatórios
**Source ID**: 3 (Web Form) - confirmado na documentação
**Type ID**: 1 (New Business) - confirmado na documentação
**Fallback**: Formspree sempre funcional como backup

**✅ Tudo baseado na documentação oficial JSON do CRM!**

---

## 📞 **Se Precisar de Ajuda**

1. **Console do navegador** (F12) - veja erros JavaScript
2. **krayin-test.html** - teste isolado da API
3. **Logs do CRM** - se tiver acesso ao servidor
4. **Postman/Insomnia** - teste endpoints manualmente

**🎯 A integração está 100% baseada na API oficial!**