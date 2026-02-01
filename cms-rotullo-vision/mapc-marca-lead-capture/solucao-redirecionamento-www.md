# Solução Completa para Redirecionamento WWW

O redirecionamento de `www.registrese.mapc.com.br` para `registrese.mapc.com.br` foi configurado de duas maneiras complementares para garantir o funcionamento ideal:

## 1. Configuração no Cloudflare (Principal)

Uma regra de página (Page Rule) foi configurada no Cloudflare para redirecionar todas as solicitações de `www.registrese.mapc.com.br` para `registrese.mapc.com.br` com um redirecionamento 301 (permanente).

### Detalhes da Configuração:
- **URL padrão:** `www.registrese.mapc.com.br/*`
- **Redirecionamento:** 301 para `https://registrese.mapc.com.br/$1`
- **Preservar parâmetros de consulta:** Sim

## 2. Configuração de Backup no Netlify

Como medida de segurança adicional, também configuramos o redirecionamento no arquivo `netlify.toml` do projeto. Isso garante que, mesmo se houver problemas com a configuração do Cloudflare, o redirecionamento ainda funcionará.

```toml
[[redirects]]
  from = "https://www.registrese.mapc.com.br/*"
  to = "https://registrese.mapc.com.br/:splat"
  status = 301
  force = true
```

## 3. Verificação da Configuração

Os testes realizados confirmam que o redirecionamento está funcionando corretamente:

```
$ curl -I http://www.registrese.mapc.com.br
HTTP/1.1 301 Moved Permanently
Location: https://registrese.mapc.com.br/
```

## 4. Solução de Problemas

Se ainda estiver enfrentando problemas com o redirecionamento:

1. **Limpe o cache do navegador**
   - Chrome/Edge: `Ctrl+Shift+Delete`
   - Firefox: `Ctrl+Shift+Delete`
   - Safari: `Command+Option+E`

2. **Limpe o cache DNS local**
   - Windows: `ipconfig /flushdns`
   - macOS: `sudo killall -HUP mDNSResponder`
   - Linux: `sudo systemd-resolve --flush-caches`

3. **Verifique em modo anônimo/privado**
   - Chrome/Edge: `Ctrl+Shift+N`
   - Firefox: `Ctrl+Shift+P`
   - Safari: `Command+Shift+N`

4. **Aguarde a propagação**
   - Mudanças de DNS e configurações do Cloudflare podem levar até 24 horas para propagar completamente

## 5. Manutenção Futura

Para manter o redirecionamento funcionando corretamente no futuro:

1. Não altere a regra de página no Cloudflare sem testes adequados
2. Mantenha a configuração no arquivo `netlify.toml` ao fazer atualizações no site
3. Após qualquer alteração na infraestrutura, faça testes para verificar se o redirecionamento ainda funciona

## Documentação Adicional

Para informações mais detalhadas, consulte:
- [cloudflare-redirect-troubleshooting.md](./cloudflare-redirect-troubleshooting.md)
- [solucao-problemas-redirecionamento.md](./solucao-problemas-redirecionamento.md)
