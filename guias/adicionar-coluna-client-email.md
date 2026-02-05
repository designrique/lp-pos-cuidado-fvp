# Guia: Adicionar Coluna client_email via Railway Dashboard

## Método 1: Via Railway Dashboard (Recomendado)

### Passo a Passo:

1. **Acessar Railway Dashboard**
   - Ir para: https://railway.app/
   - Fazer login
   - Selecionar projeto: `site-ariana-borges-final`

2. **Acessar o Banco de Dados**
   - No projeto, clicar no serviço do PostgreSQL (ícone de banco de dados)
   - Ir na aba "Data" ou "Query"

3. **Executar SQL**
   - Colar o seguinte comando SQL:
   ```sql
   ALTER TABLE appointments 
   ADD COLUMN IF NOT EXISTS client_email VARCHAR(255);
   ```
   - Clicar em "Run" ou "Execute"

4. **Verificar**
   - Executar para confirmar:
   ```sql
   SELECT column_name, data_type, character_maximum_length
   FROM information_schema.columns 
   WHERE table_name = 'appointments' 
   AND column_name = 'client_email';
   ```
   - Deve retornar: `client_email | character varying | 255`

---

## Método 2: Via Payload Admin (Alternativa)

### Passo a Passo:

1. **Acessar Payload Admin**
   - Ir para: https://site-ariana-borges-final-production.up.railway.app/admin
   - Fazer login

2. **Criar um Agendamento de Teste**
   - Ir em "Vendas" → "Agendamentos"
   - Clicar em "Create New"
   - Preencher apenas os campos obrigatórios
   - **NÃO salvar ainda**

3. **Verificar se o campo aparece**
   - Se o campo "Email do Cliente" aparecer no formulário, significa que a migração já foi aplicada automaticamente
   - Se não aparecer, usar Método 1

---

## Método 3: Via Script Node.js Local (Requer URL Pública)

Se o Railway expuser uma URL pública do banco (não o hostname interno), você pode executar:

```bash
# Obter URL pública do banco
railway variables | grep DATABASE_PUBLIC_URL

# Executar script (se tiver URL pública)
DATABASE_URI="postgresql://user:pass@host:port/db" node scripts/migrate-add-client-email.js
```

---

## Após Adicionar a Coluna

### Testar o Sistema:

1. **Executar script de teste**:
   ```bash
   cd /media/henrique/443CC9553CC942A22/apps-projects/site-instituto-ariana-borges/guias
   ./teste-agendamento.sh
   ```

2. **Verificar emails**:
   - Ariana: institutoarianaborges@gmail.com
   - Cliente: hdgpimentel@gmail.com
   - Verificar também pasta de spam

3. **Verificar logs**:
   ```bash
   cd /media/henrique/443CC9553CC942A22/apps-projects/site-instituto-ariana-borges/cms-rotullo-vision/backend
   railway logs --tail 50 | grep -i "email"
   ```

   Procurar por:
   - `Email de notificação enviado para Ariana`
   - `Email de confirmação enviado para hdgpimentel@gmail.com`

---

## Troubleshooting

### Erro: "column already exists"
✅ Isso é bom! Significa que a coluna já foi criada. Pode prosseguir com o teste.

### Erro: "permission denied"
❌ Verificar se está usando usuário com permissões de ALTER TABLE.

### Coluna não aparece no Payload Admin
🔄 Fazer rebuild do projeto:
```bash
npm run build
git add -A && git commit -m "rebuild" && git push
```

---

**Recomendação**: Use o **Método 1** (Railway Dashboard) por ser o mais direto e seguro.
