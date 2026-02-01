# Como atualizar a logo com solução anti-cache

Implementei uma solução que garante que a logo será atualizada corretamente no site, evitando problemas com cache do navegador ou CDN. Siga estas instruções:

## 1. A nova estrutura de arquivos

Foi criado um novo arquivo:
- `src/assets/logoImport.ts`: Este arquivo centraliza a importação da logo e adiciona um parâmetro de versão para evitar cache

## 2. Como trocar a logo

1. **Substitua o arquivo físico da logo**:
   - Substitua o arquivo `src/assets/mapc-logo-new.png` pela sua nova logo
   - Mantenha o mesmo nome de arquivo

2. **Atualize a versão no arquivo de importação**:
   - Abra o arquivo `src/assets/logoImport.ts`
   - Encontre a linha `export const VERSION = 1;`
   - Aumente o número da versão (por exemplo, para `export const VERSION = 2;`)

3. **Build e deploy**:
   - Execute `npm run build`
   - Faça o deploy para o Netlify com `npx netlify deploy --prod`

## 3. Como isso funciona

A solução implementada:

1. Centraliza a importação da logo em um único arquivo
2. Adiciona um parâmetro de versão à URL da imagem (`?v=1`)
3. Quando você atualiza a versão, a URL muda, forçando navegadores e CDNs a baixarem a nova imagem

## 4. Se ainda houver problemas

Se mesmo assim a logo não atualizar:

1. **Verifique o Cloudflare**:
   - Entre no painel do Cloudflare
   - Vá para "Caching" > "Purge Cache"
   - Selecione "Purge Everything"

2. **Verifique no Netlify**:
   - Acesse o painel do Netlify
   - Confirme que o último deploy foi bem-sucedido
   - Verifique se o arquivo da logo está incluído nos arquivos implantados

3. **Último recurso**:
   Se nada funcionar, renomeie o arquivo da logo para um nome completamente novo (ex: `mapc-logo-2025-v2.png`) e atualize as referências no `logoImport.ts`
