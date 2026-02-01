# Arquivos essenciais para a Landing Page MAPC

Este documento lista os arquivos necessários para o funcionamento da landing page e explica como manter o site.

## Arquivos essenciais para o funcionamento

### Arquivos de código fonte
- `/src/` - Pasta contendo todo o código fonte React/TypeScript
  - `/src/main.tsx` - Ponto de entrada da aplicação
  - `/src/App.tsx` - Componente principal
  - `/src/pages/Index.tsx` - Página principal da landing page
  - `/src/components/` - Componentes reutilizáveis (Header, Footer, etc.)
  - `/src/assets/` - Imagens e recursos estáticos

### Arquivos de configuração
- `package.json` - Dependências e scripts
- `vite.config.ts` - Configuração do Vite
- `tsconfig.json` - Configuração do TypeScript
- `tailwind.config.ts` - Configuração do Tailwind CSS
- `postcss.config.js` - Configuração do PostCSS
- `netlify.toml` - Configuração do Netlify (para deploy)

### Arquivos de build (gerados)
- `/dist/` - Pasta gerada pelo processo de build, contém os arquivos otimizados para produção

## Arquivos de documentação
- `README-NETLIFY.md` - Instruções para deploy no Netlify
- `netlify-deploy-guide.md` - Guia detalhado sobre o processo de deploy

## Como manter a landing page

### Desenvolvimento local

1. **Instalar dependências**:
```bash
npm install
```

2. **Iniciar servidor de desenvolvimento**:
```bash
npm run dev
```

3. **Gerar build para produção**:
```bash
npm run build
```

### Deploy para produção

#### Via Netlify (recomendado)

1. **Build local e deploy**:
```bash
npm run build
npx netlify deploy --prod
```

2. **Ou via Git**:
- Faça push para o repositório conectado ao Netlify
- O Netlify detectará as mudanças e fará o deploy automaticamente

### Atualização de conteúdo

Para atualizar o conteúdo da landing page:

1. Edite os arquivos relevantes em `/src/components/` ou `/src/pages/`
2. Teste localmente com `npm run dev`
3. Faça o build com `npm run build`
4. Faça o deploy conforme instruções acima

### Atualização de imagens

1. Adicione novas imagens na pasta `/src/assets/`
2. Importe e use as imagens nos componentes React
3. Para otimização, considere comprimir as imagens antes de adicionar

### Domínio e DNS

O site está configurado para usar:
- `registrese.mapc.com.br` (principal)
- `www.registrese.mapc.com.br` (redirecionamento)

A configuração DNS é feita via Cloudflare, e o site é hospedado no Netlify.

## Integração com Mautic CRM

A landing page está integrada com o Mautic para captura de leads através do formulário de contato.

### Configuração do OAuth no Mautic

Para configurar ou atualizar as credenciais OAuth no Mautic:

1. Acesse o painel administrativo do Mautic em `https://crm.mapc.com.br`
2. Navegue até "Configurações" > "API Credentials" ou "Credenciais da API"
3. Use o cliente OAuth existente chamado "lpmapc" ou crie um novo com as seguintes configurações:
   - **Nome**: lpmapc
   - **Redirect URI**: `https://crm.mapc.com.br/oauth/callback` (mesmo não sendo utilizado no fluxo client_credentials)
   - **Grant Types**: Marque "Client Credentials"
   - **Permissões**: Garantir acesso a "api" e "contacts"

4. Após criar o cliente, você receberá um Client ID (Public Key) e Client Secret (Secret Key)
5. Atualize estas credenciais no arquivo `.env.local` da landing page:
   ```
   VITE_MAUTIC_OAUTH_CLIENT_ID=seu_client_id_aqui
   VITE_MAUTIC_OAUTH_CLIENT_SECRET=seu_client_secret_aqui
   VITE_MAUTIC_REDIRECT_URI=https://crm.mapc.com.br/oauth/callback
   ```

### Testando a integração com Mautic

Para testar se a integração está funcionando:

1. Execute o script de teste OAuth:
   ```bash
   npx vite-node src/lib/mautic-oauth.test.ts
   ```

2. Verifique os resultados dos testes:
   - **Teste 1**: Verificação da obtenção do token de acesso
   - **Teste 2**: Verificação da conexão com a API 
   - **Teste 3**: Teste de busca de contatos

3. Todos os testes devem mostrar um símbolo de verificação (✅)

4. Teste o formulário de contato na landing page preenchendo e enviando um formulário

5. Confirme no Mautic se o contato foi registrado acessando:
   - Painel do Mautic > Contatos > Recentemente adicionados

### Manutenção periódica recomendada

1. **Mensalmente**:
   - Verificar se há atualizações de dependências (`npm outdated`)
   - Testar o site em diferentes dispositivos e navegadores

2. **Trimestralmente**:
   - Atualizar dependências (`npm update`)
   - Verificar e otimizar o desempenho do site

3. **Anualmente**:
   - Renovar certificados SSL (automático se usando Netlify/Cloudflare)
   - Revisar conteúdo para atualizações maiores
