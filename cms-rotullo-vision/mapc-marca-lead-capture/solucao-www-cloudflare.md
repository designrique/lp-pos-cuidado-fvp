# Solução para o problema de SSL no www.registrese.mapc.com.br

Com base nos testes realizados via SSL Labs, confirmamos que:
- O domínio principal `registrese.mapc.com.br` está funcionando corretamente (SSL Grade B)
- O subdomínio `www.registrese.mapc.com.br` está falhando completamente na comunicação SSL

## Solução recomendada

### 1. Corrigir a configuração no Cloudflare

O problema está ocorrendo porque o Cloudflare não está provisionando corretamente o certificado SSL para o subdomínio `www`. Aqui está a solução passo a passo:

1. **Acesse o painel do Cloudflare** e entre na conta que gerencia o domínio `mapc.com.br`

2. **Verifique o registro DNS para o subdomínio www**:
   - Vá para a seção "DNS"
   - Localize o registro para `www.registrese.mapc.com.br`
   - Certifique-se que seja um registro CNAME apontando para `registrese.mapc.com.br`
   - **IMPORTANTE**: A nuvem laranja (proxy do Cloudflare) deve estar ATIVADA para este registro

3. **Altere o modo SSL/TLS**:
   - Vá para a seção "SSL/TLS" > "Overview"
   - Mude o modo de "Full (Strict)" para "Full" ou "Flexible"
   - Salve a alteração

4. **Configure o Edge Certificate**:
   - Ainda na seção SSL/TLS, vá para "Edge Certificates"
   - Ative a opção "Always Use HTTPS"
   - Ative "Automatic HTTPS Rewrites"

5. **Crie uma regra de página específica**:
   - Vá para "Rules" > "Page Rules"
   - Clique em "Create Page Rule"
   - Em URL pattern, insira: `www.registrese.mapc.com.br/*`
   - Adicione a configuração "Forwarding URL"
   - Selecione status 301 (redirecionamento permanente)
   - URL de destino: `https://registrese.mapc.com.br/$1`
   - Salve a regra
   - **IMPORTANTE**: Coloque esta regra como prioridade máxima (arraste para o topo da lista)

### 2. Purgar o cache do Cloudflare

Após fazer todas as alterações acima:

1. Vá para a seção "Caching" no painel do Cloudflare
2. Clique em "Purge Cache" ou "Configuration"
3. Selecione "Purge Everything" para limpar todo o cache
4. Confirme a operação

### 3. Testar novamente

Após fazer estas alterações:

1. Aguarde cerca de 5-10 minutos para as mudanças se propagarem
2. Limpe o cache do seu navegador (Ctrl+Shift+Delete)
3. Tente acessar `https://www.registrese.mapc.com.br` novamente
4. Use o SSL Labs novamente para verificar se o problema foi resolvido

## Por que isso funciona?

O problema ocorre porque o Cloudflare está tentando estabelecer uma conexão SSL segura com o servidor de origem para o subdomínio `www`, mas esse subdomínio específico não tem um certificado SSL válido no servidor de origem.

Ao mudar para o modo "Flexible" ou "Full" (não estrito), o Cloudflare permite que o subdomínio `www` funcione mesmo sem um certificado válido no servidor de origem, enquanto ainda fornece uma conexão segura (HTTPS) para os visitantes do site.

A regra de página garantirá que qualquer tentativa de acesso ao subdomínio `www` será redirecionada para o domínio principal, que já está funcionando corretamente.
