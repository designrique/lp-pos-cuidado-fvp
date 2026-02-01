# Configuração de integração com Mautic no Netlify

Para configurar corretamente a integração com o Mautic usando Netlify Functions, siga os passos abaixo:

## 1. Configuração das variáveis de ambiente no Netlify

Acesse as configurações do seu site no Netlify e adicione as seguintes variáveis de ambiente:

- `MAUTIC_BASE_URL`: https://crm.mapc.com.br
- `MAUTIC_OAUTH_CLIENT_ID`: [seu client id do OAuth]
- `MAUTIC_OAUTH_CLIENT_SECRET`: [seu client secret do OAuth]

## 2. Configuração local para desenvolvimento

Crie um arquivo `.env.local` na raiz do projeto com as mesmas variáveis para desenvolvimento local:

```
VITE_MAUTIC_BASE_URL=https://crm.mapc.com.br
VITE_MAUTIC_OAUTH_CLIENT_ID=[seu client id do OAuth]
VITE_MAUTIC_OAUTH_CLIENT_SECRET=[seu client secret do OAuth]
```

## 3. Como funciona

A solução implementa um fluxo seguro para comunicação com o Mautic:

1. O formulário na landing page envia os dados para uma Netlify Function
2. A Netlify Function se autentica no Mautic usando OAuth2
3. As credenciais OAuth2 ficam seguras no servidor, nunca expostas no frontend
4. A resposta é retornada para o frontend de forma segura

## 4. Arquivos importantes

- `netlify/functions/mautic-auth.js`: Função para autenticação OAuth2
- `netlify/functions/mautic-contact.js`: Função para criar contatos no Mautic
- `src/components/ContactModal.tsx`: Componente do formulário que usa as funções

## 5. Deploy

Para fazer deploy desta solução:

1. Certifique-se de que o diretório `netlify/functions/` está incluído no seu repositório
2. Configure as variáveis de ambiente no Netlify
3. Faça push das alterações para o repositório conectado ao Netlify

O Netlify detectará automaticamente as funções serverless e as implantará.

## 6. Testes

Para testar localmente, execute:

```
npm run dev
```

O servidor de desenvolvimento do Netlify CLI permitirá testar as funções localmente.
