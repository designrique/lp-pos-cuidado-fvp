# 🔗 SOLUÇÃO WEBHOOK: Formspree → Krayin CRM

## 🎯 **COMO FUNCIONA:**

```
Usuario preenche formulário 
    ↓
Formspree recebe e salva 
    ↓
Webhook do Formspree chama Netlify Function 
    ↓
Netlify Function faz login no Krayin 
    ↓ 
Netlify Function cria lead no Krayin
    ✅ SUCESSO!
```

## ⚙️ **CONFIGURAÇÃO:**

### **1. Configurar Netlify Environment Variables:**
```bash
KRAYIN_API_BASE_URL=https://crm.mapc.com.br/api/v1
KRAYIN_ADMIN_EMAIL=admin@mapc.com.br
KRAYIN_ADMIN_PASSWORD=sua_senha_real_admin
```

### **2. Configurar Webhook no Formspree:**
1. **Acesse:** https://formspree.io/forms/xrbyzrog/settings
2. **Vá em "Webhooks"**
3. **Adicione URL:** `https://seu-site.netlify.app/.netlify/functions/formspree-to-krayin`
4. **Evento:** "Form Submission"
5. **Ativar webhook**

### **3. Deploy no Netlify:**
- **Code:** Push para repositório
- **Variables:** Configurar as 3 variáveis do Krayin
- **Build:** Deploy automático

## 🚀 **VANTAGENS DESTA SOLUÇÃO:**

### ✅ **Resolve TODOS os problemas:**
- **CORS:** Netlify Function executa no servidor (sem CORS)
- **Autenticação:** Login automático a cada webhook
- **Token:** Sempre renovado e válido
- **Backup:** Se Krayin falhar, dados ficam no Formspree

### ✅ **Fluxo robusto:**
1. **Formspree sempre funciona** (dados salvos)
2. **Webhook tenta enviar para Krayin**
3. **Se Krayin falhar:** dados ficam no Formspree
4. **Se Krayin funcionar:** dados vão para ambos

## 📊 **ARQUIVOS CRIADOS:**

### **netlify/functions/formspree-to-krayin.js**
- Recebe webhook do Formspree
- Faz login automático no Krayin
- Cria lead com estrutura oficial
- Log completo de debugging

## 🧪 **PARA TESTAR:**

### **1. Deploy da function:**
```bash
# Push para repositório
git add .
git commit -m "Add Formspree to Krayin webhook"
git push origin main
```

### **2. Configurar variables no Netlify:**
Site Settings → Environment Variables → Add variables

### **3. Testar webhook:**
- Preencher formulário na landing page
- Verificar logs da function no Netlify
- Verificar se lead aparece no Krayin

### **4. Monitorar:**
- **Netlify Functions logs:** Ver execução
- **Formspree dashboard:** Ver submissões
- **Krayin CRM:** Ver leads criados

## ✅ **RESULTADO:**

**DUPLA INTEGRAÇÃO AUTOMÁTICA:**
- ✅ **Formspree:** Recebe e armazena (sempre funciona)
- ✅ **Krayin CRM:** Recebe via webhook (quando servidor ok)
- ✅ **Zero perda de leads:** Dados sempre salvos
- ✅ **Zero problemas CORS:** Function executa no servidor

**Status: SOLUÇÃO COMPLETA IMPLEMENTADA!** 🎯