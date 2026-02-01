# Guia de Configuração OAuth para Mautic

Este guia explica como configurar corretamente a autenticação OAuth 2.0 para a integração da landing page com o Mautic CRM.

## Problema Atual

A integração OAuth está encontrando o seguinte erro:
```
The client credentials are invalid
```

Isso geralmente indica um dos seguintes problemas:

1. As credenciais OAuth (client_id/client_secret) estão incorretas
2. O cliente OAuth não está ativado no Mautic
3. O grant_type "client_credentials" não está habilitado para este cliente
4. O endpoint OAuth do Mautic está em um caminho diferente do esperado

## Soluções Recomendadas

### 1. Verificar a Configuração OAuth no Mautic

1. Acesse o painel administrativo do Mautic em `https://crm.mapc.com.br`
2. Navegue até "Configurações" > "API Credentials" ou "Credenciais da API"
3. Verifique se o cliente OAuth usado para a landing page está:
   - **Ativo**: O status deve estar como "Ativo" ou "Enabled"
   - **Grant Types**: Deve ter "client_credentials" habilitado
   - **Permissões**: Deve incluir "api" e "contacts"

### 2. Criar Novo Cliente OAuth

Se o cliente existente não funcionar, crie um novo:

1. No painel do Mautic, vá para "Configurações" > "API Credentials"
2. Clique em "Novo Cliente" ou "New Client"
3. Configure:
   - **Nome**: Landing Page MAPC
   - **Redirect URI**: `https://crm.mapc.com.br/oauth/callback`
   - **Grant Types**: Marque "Client Credentials"
   - **Permissões**: Selecione "api" e "contacts"

4. Anote o Client ID e Client Secret gerados
5. Atualize o arquivo `.env.local` com esses novos valores

### 3. Verificar a Versão do Mautic

Diferentes versões do Mautic podem ter configurações OAuth ligeiramente diferentes:

1. Verifique a versão do Mautic em uso (geralmente exibida no rodapé do painel)
2. Consulte a documentação específica para essa versão sobre configuração OAuth
3. Confirme se o endpoint OAuth está no caminho esperado (/oauth/v2/token)

### 4. Solução Temporária

Se a autenticação OAuth continuar apresentando problemas, você pode:

1. Retornar temporariamente à autenticação básica (username/password)
2. Implementar um sistema de proxy para chamadas da API do Mautic
3. Considerar o uso de webhooks em vez de chamadas diretas à API

## Testando a Configuração

Após fazer alterações, teste novamente com:

```bash
npx vite-node src/lib/mautic-oauth.test.ts
```

O resultado esperado é obter um token de acesso válido e conseguir fazer chamadas à API do Mautic.
