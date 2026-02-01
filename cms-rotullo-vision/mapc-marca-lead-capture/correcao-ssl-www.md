# Correção do erro SSL no subdomínio www.registrese.mapc.com.br

O erro `ERR_SSL_VERSION_OR_CIPHER_MISMATCH` indica um problema de incompatibilidade SSL entre o Cloudflare e o domínio. Vamos resolver isso seguindo os passos abaixo:

## 1. Verificar a configuração de DNS no Cloudflare

1. Acesse o painel do Cloudflare
2. Selecione o domínio `mapc.com.br`
3. Vá para a seção "DNS"
4. Verifique se existem os seguintes registros:

   - Um registro `A` ou `CNAME` para `registrese.mapc.com.br` apontando para seu site no Netlify
   - Um registro `CNAME` para `www.registrese.mapc.com.br` apontando para `registrese.mapc.com.br`
   - Certifique-se que a nuvem (proxy do Cloudflare) esteja ativa (laranja) para ambos os registros

## 2. Corrigir a configuração SSL/TLS no Cloudflare

1. No painel do Cloudflare, vá para a seção "SSL/TLS"
2. Em "Modo SSL/TLS", selecione "Completo" ou "Flexível" (tente Flexível primeiro)
3. Em "Edge Certificates", certifique-se que "Always Use HTTPS" está ativado
4. Certifique-se que a opção "Automatic HTTPS Rewrites" está habilitada

## 3. Adicionar Página de Regras para Redirecionamento

1. No painel do Cloudflare, vá para "Rules" > "Page Rules"
2. Clique em "Create Page Rule"
3. Adicione a seguinte regra:
   - URL pattern: `www.registrese.mapc.com.br/*`
   - Configuração: "Forwarding URL" com status 301 e apontando para `https://registrese.mapc.com.br/$1`
4. Salve e aguarde alguns minutos para a regra ser aplicada

## 4. Limpar o cache do navegador

Após fazer essas alterações, limpe completamente o cache do navegador antes de tentar novamente:

1. Chrome/Edge: Pressione Ctrl+Shift+Delete > selecione "Cookies e dados do site" > "Limpar dados"
2. Firefox: Pressione Ctrl+Shift+Delete > selecione "Cookies e dados de sites" > "Limpar"

## 5. Verificar certificados SSL

Se o problema persistir, verifique os certificados SSL com uma ferramenta como [SSL Labs](https://www.ssllabs.com/ssltest/) para ambos os domínios:

1. Teste `registrese.mapc.com.br`
2. Teste `www.registrese.mapc.com.br`

Compare os resultados para identificar discrepâncias.

## 6. Configuração alternativa no Netlify

Se as soluções acima não funcionarem, você pode tentar configurar o redirecionamento diretamente no Netlify através do painel administrativo:

1. Acesse o painel do Netlify
2. Vá para o site da MAPC
3. Navegue até "Domain settings" > "Custom domains"
4. Adicione `www.registrese.mapc.com.br` como um domínio personalizado adicional
5. Configure o redirecionamento para o domínio principal nas configurações de "Domain management"
