# Guia Completo: Atualização da Logo e Repositório

Este guia explica o processo completo para atualizar a logo do site e garantir que todas as alterações sejam refletidas corretamente no repositório Git e no site em produção.

## 1. Atualizar a Logo Localmente

### 1.1 Substituir o arquivo físico
- Prepare sua nova logo em formato PNG com fundo transparente
- Substitua o arquivo em `src/assets/mapc-logo-new.png` pela nova imagem

### 1.2 Atualizar a versão para evitar problemas de cache
- Abra o arquivo `src/assets/logoImport.ts`
- Aumente o número da versão (por exemplo, de `VERSION = 2` para `VERSION = 3`)
- Salve o arquivo

## 2. Testar Localmente

```bash
# Instalar dependências (se necessário)
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

- Verifique no navegador se a nova logo aparece corretamente
- Teste em diferentes dispositivos/tamanhos de tela
- Verifique tanto o cabeçalho quanto o rodapé

## 3. Build do Projeto

```bash
# Gerar build de produção
npm run build
```

## 4. Atualizar o Repositório Git

```bash
# Verificar quais arquivos foram modificados
git status

# Adicionar os arquivos modificados
git add src/assets/mapc-logo-new.png src/assets/logoImport.ts

# Criar commit com mensagem descritiva
git commit -m "Atualiza logo do site e incrementa versão para limpar cache"

# Enviar para o repositório remoto
git push origin main
```

## 5. Deploy para Produção (Netlify)

### 5.1 Via CLI do Netlify
```bash
# Deploy para produção
npx netlify deploy --prod
```

### 5.2 Ou via CI/CD Automático
- Se o Netlify estiver configurado para deploy automático, ele detectará as mudanças no repositório
- Aguarde alguns minutos para o deploy ser concluído

## 6. Verificar e Limpar Cache

### 6.1 Limpar Cache do Cloudflare
1. Acesse o painel do Cloudflare
2. Selecione o domínio `mapc.com.br`
3. Vá para a seção "Caching" > "Configuration"
4. Clique em "Purge Cache" > "Purge Everything"

### 6.2 Testar em Produção
- Acesse `registrese.mapc.com.br` em uma janela anônima/privativa
- Verifique se a nova logo está aparecendo corretamente
- Se necessário, force a atualização com Ctrl+F5

## Solução de Problemas

Se a logo ainda não aparecer atualizada:

1. **Verifique a Versão**: Confirme que a versão no arquivo `logoImport.ts` foi aumentada
2. **Verifique o Build**: Certifique-se de que o build foi gerado após a alteração
3. **Verifique o Deploy**: Confirme que o último deploy no Netlify inclui as alterações
4. **Teste em Outro Navegador**: Diferentes navegadores podem ter políticas de cache distintas
