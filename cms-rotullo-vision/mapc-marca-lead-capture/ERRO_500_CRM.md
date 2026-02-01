# 🚨 ERRO 500 - Krayin CRM Indisponível

## **SITUAÇÃO ATUAL:**
O servidor do Krayin CRM da MAPC está retornando **erro 500** (erro interno do servidor).

## ✅ **SOLUÇÃO IMEDIATA:**

### **1. Usar Formspree como Principal (Já Configurado)**
```bash
# Configure apenas isto no .env.local:
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/xrbgdvzd

# Comente/desabilite o Krayin temporariamente:
# VITE_KRAYIN_API_BASE_URL=https://crm.mapc.com.br/api/v1
# VITE_KRAYIN_ADMIN_EMAIL=admin@mapc.com.br
# VITE_KRAYIN_ADMIN_PASSWORD=sua_senha_admin
```

### **2. A Landing Page Continuará Funcionando!**
- ✅ Formspree receberá todos os leads
- ✅ Email será enviado automaticamente para MAPC
- ✅ Dados ficam salvos no Formspree dashboard
- ✅ Zero interrupção no serviço

## 🔧 **Para Corrigir o CRM:**

### **Possíveis Causas do Erro 500:**
1. **Banco de dados offline/corrupto**
2. **Problema de configuração no servidor**
3. **Falta de permissões de arquivo**
4. **Erro no código do Krayin**
5. **Servidor sobrecarregado**

### **Checklist Técnico:**
- [ ] Verificar logs do servidor (`/var/log/apache2/error.log` ou `/var/log/nginx/error.log`)
- [ ] Verificar conexão com banco de dados
- [ ] Verificar permissões de pastas (`storage/` e `bootstrap/cache/`)
- [ ] Limpar cache: `php artisan cache:clear`
- [ ] Verificar .env do Krayin
- [ ] Reiniciar servidor web

## 📧 **Configuração Atual (Funcionando):**

**Formspree já está configurado e ativo:**
- URL: https://formspree.io/f/xrbgdvzd
- Recebe: Nome, email, telefone, empresa, serviços
- Envia: Email automático para MAPC
- Dashboard: https://formspree.io (para ver leads)

## 🎯 **Ação Recomendada:**

### **IMEDIATO:**
1. Configure `.env.local` só com Formspree
2. Landing page continua funcionando 100%
3. Leads são salvos e enviados por email

### **PRÓXIMOS PASSOS:**
1. Contactar administrador do servidor MAPC
2. Corrigir erro 500 no Krayin
3. Reativar integração quando CRM voltar

**🚀 A landing page NÃO precisa parar! Formspree está funcionando perfeitamente!**

---

**Status: Landing page OPERACIONAL via Formspree ✅**