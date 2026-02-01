# Solução para Redirecionamento WWW no Cloudflare

## Configuração Recomendada para Regra de Página (Page Rule)

Para redirecionar corretamente `www.registrese.mapc.com.br` para `registrese.mapc.com.br`, você precisa configurar uma Page Rule no Cloudflare com os seguintes parâmetros:

1. **URL:** `www.registrese.mapc.com.br/*`
2. **Configurações:**
   - **Tipo de Redirecionamento:** 301 (Permanente)
   - **URL de Destino:** `https://registrese.mapc.com.br/$1`
   - **Preservar caminho da consulta:** Ativado

## Passos para Configurar:

1. Acesse o painel do Cloudflare
2. Selecione o domínio `mapc.com.br`
3. Navegue até **Regras** > **Regras de Página**
4. Clique em **Criar regra de página**
5. Configure com os parâmetros acima
6. Clique em **Salvar e Implantar**

## Verificação da Configuração DNS

Certifique-se de que ambos os registros DNS estão configurados corretamente:

1. Registro A para `registrese.mapc.com.br` apontando para o Netlify (proxy ativado)
2. Registro CNAME para `www.registrese.mapc.com.br` apontando para `registrese.mapc.com.br` (proxy ativado)

## Alternativas

Se as Page Rules não estiverem funcionando corretamente, você pode:

1. Usar a configuração de redirecionamento do Netlify em vez do Cloudflare
2. Configurar o redirecionamento diretamente no código HTML (meta refresh)
3. Usar Workers do Cloudflare para um controle mais granular

## Teste de Redirecionamento

Após configurar, teste o redirecionamento usando:

1. Navegador em modo anônimo/privado
2. Ferramentas como curl ou wget
3. Serviços online de verificação de redirecionamento

Exemplo de teste com curl:
```
curl -I http://www.registrese.mapc.com.br
```

O resultado deve mostrar um código de status 301 e um cabeçalho `Location` apontando para `https://registrese.mapc.com.br`.
