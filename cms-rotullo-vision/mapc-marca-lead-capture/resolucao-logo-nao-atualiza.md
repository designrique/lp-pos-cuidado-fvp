# Resolução de problemas: Logo não atualiza no site

Se você substituiu o arquivo da logo em `src/assets/mapc-logo-new.png`, mas ela não está aparecendo atualizada no site, siga estas etapas para resolver o problema:

## 1. Verificação do cache do navegador

O problema mais comum é o cache do navegador mantendo a imagem antiga:

1. Abra o site em uma janela anônima/privativa para testar sem cache
2. Force a atualização completa da página com Ctrl+F5 ou Cmd+Shift+R (Mac)
3. Limpe o cache do navegador:
   - Chrome/Edge: Configurações > Privacidade e segurança > Limpar dados de navegação
   - Firefox: Configurações > Privacidade e segurança > Cookies e dados de sites > Limpar dados

## 2. Verificar se o build foi executado corretamente

Após substituir a logo, você precisa gerar um novo build:

```bash
npm run build
```

## 3. Verificar se o deploy foi feito corretamente

Após o build, você precisa fazer o deploy para o Netlify:

```bash
npx netlify deploy --prod
```

## 4. Verificar o versionamento do arquivo

Os navegadores e o Netlify podem aplicar cache baseado em nome de arquivo. Tente:

1. Renomear a logo para algo como `mapc-logo-new-v2.png`
2. Atualizar as referências nos arquivos:
   - `src/components/Header.tsx`
   - `src/components/Footer.tsx`
3. Fazer build e deploy novamente

## 5. Verificar no Netlify se o arquivo foi atualizado

1. Acesse o painel do Netlify
2. Vá para o seu site > Deploys > último deploy
3. Navegue até `src/assets/` para confirmar que a nova logo está lá
4. Se não estiver, verifique o log de deploy para ver se houve algum erro

## 6. Purgar o cache do Cloudflare

Se o domínio usa Cloudflare como proxy, o cache pode estar mantendo a versão antiga:

1. Acesse o painel do Cloudflare
2. Selecione o domínio `mapc.com.br`
3. Vá para a seção "Caching"
4. Clique em "Purge Everything" ou "Configuration" > "Purge Cache"
5. Selecione "Purge Everything" para limpar todo o cache

## 7. Teste com parâmetros de query

Adicione um parâmetro de query à URL para forçar o navegador a ignorar o cache:
```
https://registrese.mapc.com.br/?nocache=123456
```

## 8. Solução alternativa: usar Import com hash

Se nada funcionar, você pode usar uma abordagem que força a atualização da imagem:

1. Renomeie a logo para um nome totalmente novo (por exemplo: `mapc-logo-2025.png`)
2. Atualize as importações nos componentes Header.tsx e Footer.tsx:

```tsx
// De:
import mapcLogo from '@/assets/mapc-logo-new.png';

// Para:
import mapcLogo from '@/assets/mapc-logo-2025.png';
```

3. Faça build e deploy novamente
