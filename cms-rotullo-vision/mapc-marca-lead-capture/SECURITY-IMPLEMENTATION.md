# Implementação de segurança para API Mautic

Este documento explica as alterações feitas para implementar uma integração segura com o Mautic utilizando Netlify Functions como camada intermediária.

## Solução implementada

Foi criada uma solução server-side utilizando Netlify Functions para gerenciar a comunicação com o Mautic. Esta abordagem:

1. **Oculta as credenciais OAuth** - Client ID e Client Secret nunca ficam expostos no frontend
2. **Cria um proxy seguro** - Toda comunicação passa pelo servidor Netlify
3. **Simplifica a implementação** - Frontend não precisa lidar com OAuth ou tokens
4. **Reduz riscos de CORS** - As requisições são feitas server-to-server

## Arquivos criados

1. **Funções Netlify**:
   - `netlify/functions/mautic-auth.js` - Gerencia autenticação OAuth2
   - `netlify/functions/mautic-contact.js` - Cria contatos no Mautic

2. **Configuração**:
   - Atualizado `netlify.toml` para configurar as funções
   - Criado `.env.example` como modelo para variáveis de ambiente

3. **Documentação**:
   - `MAUTIC-INTEGRATION.md` - Instruções detalhadas de configuração

## Alterações no código existente

1. **Simplificação do ContactModal.tsx**:
   - Removida lógica complexa de autenticação e fallbacks
   - Requisições agora são feitas para `/.netlify/functions/mautic-contact`
   - Código mais limpo e fácil de manter

2. **Configuração do ambiente de desenvolvimento**:
   - Script `dev` alterado para usar `netlify dev`
   - Adicionado `netlify-cli` como dependência de desenvolvimento

## Próximos passos

1. **Configurar variáveis de ambiente no Netlify**:
   - MAUTIC_BASE_URL
   - MAUTIC_OAUTH_CLIENT_ID
   - MAUTIC_OAUTH_CLIENT_SECRET

2. **Testar localmente**:
   ```
   npm install  # Para instalar netlify-cli
   npm run dev  # Para rodar com Netlify Dev
   ```

3. **Deploy no Netlify**:
   - As funções serão automaticamente implantadas junto com o site

## Benefícios de segurança

- **Credenciais protegidas** - OAuth Client Secret nunca sai do servidor
- **Sem autenticação no navegador** - Elimina riscos de exposição de tokens
- **Controle de acesso centralizado** - Todas as requisições passam por um único ponto
- **Facilidade de manutenção** - Alterações na API são feitas apenas no servidor
