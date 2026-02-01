# Guia de Solução de Problemas para Redirecionamento WWW

O redirecionamento de `www.registrese.mapc.com.br` para `registrese.mapc.com.br` está configurado corretamente no Cloudflare, como confirmado pelos testes. Se ainda estiver enfrentando problemas, aqui estão algumas possíveis causas e soluções:

## 1. Problemas de Cache do Navegador

**Sintomas:**
- O redirecionamento funciona em um dispositivo, mas não em outro
- O redirecionamento funciona em modo anônimo/privado, mas não em sessão normal

**Soluções:**
- Limpe o cache do navegador (Ctrl+Shift+Delete)
- Teste em modo anônimo/privado
- Teste em um navegador diferente

## 2. Cache de DNS Local

**Sintomas:**
- Configuração alterada recentemente, mas mudanças não aparecem
- Diferentes resultados em diferentes redes

**Soluções:**
- Limpe o cache DNS do seu sistema:
  - Windows: `ipconfig /flushdns`
  - macOS: `sudo killall -HUP mDNSResponder`
  - Linux: `sudo systemd-resolve --flush-caches`
- Aguarde até 24 horas para propagação completa do DNS

## 3. Problemas com Regras de Página do Cloudflare

**Sintomas:**
- Redirecionamento funciona com `curl` mas não no navegador
- Resposta HTTP sem código 301

**Soluções:**
- Verifique se a regra de página está configurada corretamente:
  - URL padrão: `www.registrese.mapc.com.br/*`
  - Redirecionamento: 301 para `https://registrese.mapc.com.br/$1`
- Verifique se a regra está ativa e não em pausa
- Verifique a ordem das regras (as regras são avaliadas na ordem em que aparecem)

## 4. Configuração do Worker do Cloudflare

Se estiver usando um Worker do Cloudflare para gerenciar o redirecionamento:

**Sintomas:**
- Comportamento inconsistente do redirecionamento
- Erros no console do navegador

**Soluções:**
- Verifique o código do Worker
- Verifique os logs do Worker no painel do Cloudflare
- Considere usar Regras de Página em vez de Workers para casos simples

## 5. Configurações SSL/TLS

**Sintomas:**
- Redirecionamentos funcionam em HTTP mas falham em HTTPS
- Avisos de segurança no navegador

**Soluções:**
- Verifique se o modo SSL no Cloudflare está configurado como "Flexível" ou "Completo"
- Certifique-se de que o Netlify tem SSL ativado
- Verifique se há regras de redirecionamento SSL específicas no Cloudflare

## 6. Configuração Alternativa: Redirecionamento no Netlify

Se os problemas persistirem, você pode configurar o redirecionamento diretamente no Netlify:

1. Crie ou edite o arquivo `netlify.toml` na raiz do projeto:

```toml
[[redirects]]
  from = "https://www.registrese.mapc.com.br/*"
  to = "https://registrese.mapc.com.br/:splat"
  status = 301
  force = true
```

2. Implante as alterações no Netlify

## 7. Testes de Verificação

Use estas ferramentas para testar seu redirecionamento:

- [httpstatus.io](https://httpstatus.io/)
- [redirect-checker.org](https://redirect-checker.org/)
- [whatsmydns.net](https://www.whatsmydns.net/) para verificar a propagação do DNS

## Contato para Suporte

Se os problemas persistirem após tentar estas soluções, entre em contato com:

- Suporte do Cloudflare: https://support.cloudflare.com/
- Suporte do Netlify: https://www.netlify.com/support/
