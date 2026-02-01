# 🚨 FORMSPREE ERRO 404 - SOLUÇÕES

## **PROBLEMA:**
O endpoint `https://formspree.io/f/xrbgdvzd` retorna erro 404 "Form not found".

## ✅ **SOLUÇÃO 1: Criar novo Formspree (RECOMENDADO)**

### Passos:
1. **Acesse:** https://formspree.io
2. **Crie conta gratuita** (50 submissões/mês)
3. **Crie formulário:** "MAPC Lead Capture"
4. **Email destino:** contato@mapc.com.br (ou email da MAPC)
5. **Copie novo endpoint:** `https://formspree.io/f/ABC123XYZ`
6. **Configure no .env.local:**
   ```
   VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/ABC123XYZ
   ```

## ✅ **SOLUÇÃO 2: EmailJS (Alternativa)**

### Vantagens:
- ✅ Não precisa de servidor
- ✅ Envia email diretamente do frontend
- ✅ Grátis até 200 emails/mês

### Configuração:
1. **Conta:** https://emailjs.com
2. **Configure serviço de email** (Gmail/Outlook)
3. **Template personalizado**
4. **Integração via JavaScript**

## ✅ **SOLUÇÃO 3: Netlify Forms**

### Para usar no Netlify:
```html
<form name="lead-capture" method="POST" data-netlify="true">
  <input type="hidden" name="form-name" value="lead-capture" />
  <!-- campos do formulário -->
</form>
```

### Vantagens:
- ✅ Integração automática
- ✅ 100 submissões/mês grátis
- ✅ Dashboard no Netlify

## 🎯 **RECOMENDAÇÃO:**

**IMEDIATO:** Usar **Formspree novo** (mais simples)
**FUTURO:** Quando Krayin CRM for corrigido, retornar ao sistema dual

---

**Status atual:** Landing page SEM captura de leads até nova configuração
**Urgência:** ALTA - configurar novo endpoint imediatamente