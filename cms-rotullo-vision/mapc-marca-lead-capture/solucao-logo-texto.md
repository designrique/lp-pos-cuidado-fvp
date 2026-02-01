# Solução para o problema da logo como texto

## Problema Identificado

O problema ocorreu porque:

1. O arquivo `logoImport.ts` estava usando um caminho URL absoluto (`/src/assets/mapc-logo-new.png`) que não funciona corretamente em produção
2. O Vite (e ferramentas de build similares) exigem que imagens sejam importadas diretamente para serem processadas corretamente

## Solução Aplicada

Fizemos as seguintes alterações:

1. Removemos a abordagem complexa de importação no arquivo `logoImport.ts`
2. Modificamos os componentes `Header.tsx` e `Footer.tsx` para importar a imagem diretamente:
   ```tsx
   import logoImage from '@/assets/mapc-logo-new.png';
   ```

3. Atualizamos as referências nas tags `<img>`:
   ```tsx
   <img 
     src={logoImage} 
     alt="MAPC - Marcas e Patentes" 
     className="h-12 w-auto object-contain"
   />
   ```

## Como Atualizar a Logo no Futuro

Para trocar a logo no futuro, siga estes passos simples:

1. **Substitua o arquivo físico**:
   - Prepare a nova logo em formato PNG com fundo transparente
   - Substitua o arquivo em `src/assets/mapc-logo-new.png` pela nova imagem

2. **Compile e faça o deploy**:
   ```bash
   npm run build
   npx netlify deploy --prod
   ```

3. **Se a logo não atualizar**:
   - Tente limpar o cache do navegador (Ctrl+F5)
   - Limpe o cache do Cloudflare no painel de controle
   - Se necessário, renomeie o arquivo da logo (ex: `mapc-logo-v2.png`) e atualize as importações no Header.tsx e Footer.tsx

## Por Que a Solução Funciona

Quando você importa uma imagem diretamente em um arquivo JavaScript/TypeScript:

1. O Vite processa essa imagem durante o build
2. Gera um hash único para o nome do arquivo no build final (ex: `logo-a1b2c3d4.png`)
3. Esse hash muda sempre que a imagem é alterada, evitando problemas de cache

Esta abordagem é mais simples e confiável do que tentar manipular parâmetros de URL manualmente.
