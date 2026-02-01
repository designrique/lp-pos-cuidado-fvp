# MAPC Landing Page

## Informações do Projeto

Landing Page para captura de leads da MAPC, integrando com o Mautic para gestão de contatos.

## Tecnologias Utilizadas

Este projeto foi construído com:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Mautic API Integration

## Arquivos Essenciais do Projeto

```
mapc-marca-lead-capture/
├── src/                    # Código fonte da aplicação
│   ├── assets/             # Imagens e recursos
│   ├── components/         # Componentes React reutilizáveis
│   ├── hooks/              # Hooks personalizados
│   ├── lib/                # Bibliotecas e utilidades
│   ├── pages/              # Páginas da aplicação
│   ├── App.tsx             # Componente principal
│   ├── main.tsx            # Ponto de entrada da aplicação
├── public/                 # Arquivos públicos
├── MANUTENCAO.md           # Guia de manutenção do site
├── package.json            # Dependências e scripts
├── netlify.toml            # Configuração do Netlify
├── tailwind.config.ts      # Configuração do Tailwind CSS
├── vite.config.ts          # Configuração do Vite
```

## Desenvolvimento Local

Para desenvolver localmente:

```sh
# Instalar dependências
npm install

# Iniciar o servidor de desenvolvimento
npm run dev

# Criar build de produção
npm run build
```

## Deploy no Netlify

O projeto está configurado para deploy no Netlify:

1. Faça o build do projeto: `npm run build`
2. Deploy via Netlify CLI: `npx netlify deploy --prod`
3. Ou configure a integração contínua via GitHub

## Estrutura do Domínio

A aplicação é acessível em:
- `registrese.mapc.com.br` (principal)
- `www.registrese.mapc.com.br` (redirecionamento)

O domínio é gerenciado via Cloudflare com proxy ativo para SSL.

## Integração com Mautic

O sistema integra com o Mautic CRM para gestão de leads capturados através do formulário de contato:

### Autenticação OAuth 2.0

A partir da versão atual, o sistema utiliza autenticação OAuth 2.0 para comunicação com a API do Mautic:

1. Configure as credenciais OAuth no arquivo `.env.local`:
   ```
   VITE_MAUTIC_OAUTH_CLIENT_ID=seu_client_id
   VITE_MAUTIC_OAUTH_CLIENT_SECRET=seu_client_secret
   ```

2. O sistema automaticamente obterá e renovará tokens de acesso.

3. Os formulários enviam dados diretamente para o Mautic usando esta autenticação segura.

## Integração com WhatsApp (Evolution API)

O sistema também envia mensagens automáticas via WhatsApp utilizando a Evolution API:

### Configuração das Variáveis de Ambiente no Netlify

Para configurar a integração com WhatsApp, é necessário adicionar as seguintes variáveis de ambiente no Netlify:

1. Acesse o painel do Netlify: Site settings > Build & deploy > Environment
2. Adicione as seguintes variáveis:
   - `EVOLUTION_API_INSTANCE`: Nome da instância na Evolution API (ex: "mapc")
   - `EVOLUTION_API_KEY`: Chave de API da Evolution API (valor sensível)
   - `EVOLUTION_API_BASE_URL`: URL base da API (ex: "https://api.digitalfisher.com.br")

Isso garante que as credenciais sensíveis não fiquem expostas no código e possam ser alteradas sem necessidade de atualizar o código.

### Fluxo de Envio de WhatsApp

1. Usuário preenche o formulário com telefone
2. Formulário é enviado para o Mautic
3. Após confirmação de sucesso, o sistema envia uma mensagem WhatsApp via função serverless
4. A função serverless se comunica com a Evolution API usando as variáveis de ambiente

### Testando a Autenticação OAuth

O projeto inclui um script de teste para verificar a autenticação OAuth:

```sh
# Instalar vite-node se ainda não estiver instalado
npm install -D vite-node

# Executar o teste de autenticação OAuth
npx vite-node src/lib/mautic-oauth.test.ts
```

O script irá:
1. Tentar obter um token de acesso
2. Testar a conexão com a API
3. Buscar um contato para validar as permissões

### Fluxo de Dados

1. O usuário preenche o formulário de contato
2. Os dados são validados no frontend
3. A aplicação obtém um token OAuth do Mautic
4. Os dados são enviados para a API do Mautic usando o token
5. O contato é criado/atualizado no Mautic CRM

## Manutenção

Para instruções detalhadas sobre manutenção, consulte o arquivo [MANUTENCAO.md](./MANUTENCAO.md).
