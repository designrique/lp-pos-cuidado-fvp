# Guia de Configuração das Variáveis de Ambiente no Netlify

Este documento explica como configurar as variáveis de ambiente necessárias para o funcionamento da integração com WhatsApp na plataforma Netlify.

## Importância das Variáveis de Ambiente

As variáveis de ambiente são usadas para armazenar informações sensíveis como chaves de API, senhas e outros dados de configuração que:

1. Não devem ser expostos no código-fonte
2. Podem precisar ser alterados sem modificar o código
3. Podem ter valores diferentes em ambientes de desenvolvimento e produção

## Variáveis Necessárias para a Integração com WhatsApp

Para a integração com a Evolution API (WhatsApp), são necessárias as seguintes variáveis:

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `EVOLUTION_API_INSTANCE` | Nome da instância na Evolution API | `mapc` |
| `EVOLUTION_API_KEY` | Chave de autenticação da API | `5A64F88E9D5F43AC9E1A7285AE4F8D0C` |
| `EVOLUTION_API_BASE_URL` | URL base da API | `https://api.digitalfisher.com.br` |

**Nota sobre o formato da URL**: A Evolution API versão 2.2.0 espera requisições no formato:
```
{{baseUrl}}/message/sendText/{{instance}}
```

Portanto, se sua URL base for `https://api.digitalfisher.com.br` e sua instância for `mapc`, a URL completa será:
```
https://api.digitalfisher.com.br/message/sendText/mapc
```

## Como Configurar no Netlify

1. **Acesse o painel do Netlify**
   - Faça login em [netlify.com](https://app.netlify.com/)
   - Selecione o site correspondente ao projeto MAPC

2. **Navegue até as configurações de variáveis de ambiente**
   - No menu lateral, clique em "Site settings"
   - Na seção "Build & deploy", clique em "Environment"
   - Clique no botão "Add a variable"

3. **Adicione cada variável**
   - Em "Key", insira o nome da variável (ex: `EVOLUTION_API_KEY`)
   - Em "Value", insira o valor correspondente
   - Opcionalmente, marque "Sensitive" para valores que não devem ser exibidos nos logs
   
   ![Exemplo de configuração](https://i.imgur.com/7hDVDhV.png)

4. **Salve as alterações**
   - Clique em "Save" para cada variável

5. **Reconstrua o site**
   - Após adicionar todas as variáveis, vá para a seção "Deploys"
   - Clique em "Trigger deploy" e selecione "Clear cache and deploy site"

## Verificação

Para verificar se as variáveis estão configuradas corretamente:

1. Acesse o site após a reconstrução
2. Teste o formulário de contato com um número de telefone válido
3. Verifique se a mensagem de WhatsApp é recebida
4. Consulte os logs de funções no Netlify para identificar possíveis erros

## Alterando Valores

Se for necessário alterar alguma variável (por exemplo, uma nova chave de API):

1. Navegue até as configurações de variáveis de ambiente
2. Localize a variável a ser alterada
3. Clique em "Edit" e atualize o valor
4. Salve e reconstrua o site

## Resolução de Problemas Comuns

### Erro: "instance requires property 'text'"

Este erro ocorre quando o formato do payload enviado para a Evolution API está incorreto. A API espera que a mensagem esteja no campo `text` e não dentro de `textMessage.text`.

**Formato correto do payload para Evolution API v2.2.0:**
```json
{
  "number": "5581999999999",
  "options": {
    "delay": 1200,
    "presence": "composing"
  },
  "text": "Sua mensagem aqui"
}
```

### Erro de URL incorreta

Se você receber erros 404 (Not Found), verifique se a URL está no formato correto para a versão 2.2.0 da Evolution API:
```
{{baseUrl}}/message/sendText/{{instance}}
```

Exemplo completo:
```
https://api.digitalfisher.com.br/message/sendText/mapc
```

### Outros Problemas

Se você encontrar outros problemas ao configurar ou utilizar a integração com WhatsApp:

1. Verifique os logs das funções serverless no Netlify
2. Confirme se as variáveis de ambiente estão configuradas corretamente
3. Teste a API diretamente usando uma ferramenta como Postman ou cURL
4. Entre em contato com o suporte da Evolution API para confirmar o formato correto do payload
