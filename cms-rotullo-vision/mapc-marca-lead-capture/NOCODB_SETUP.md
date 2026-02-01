# Configuração do NocoDB para MAPC

## Variáveis de Ambiente Necessárias

Para que a integração com NocoDB funcione corretamente, é necessário configurar as seguintes variáveis de ambiente no Netlify:

### Variáveis Obrigatórias

| Variável       | Descrição                    | Exemplo                                               |
| -------------- | ---------------------------- | ----------------------------------------------------- |
| `NOCODB_URL`       | URL base da instância NocoDB | `https://app.nocodb.com` ou `https://seu-dominio.com` |
| `NOCODB_TOKEN`     | Token de autenticação da API | `nc_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`                 |
| `NOCODB_TABLE_ID`  | ID da tabela de leads        | `mqe75g35dwbb4iw` (ID da sua tabela)                 |

## Como Obter as Credenciais

### 1. NOCODB_URL

- Se usando NocoDB Cloud: `https://app.nocodb.com`
- Se usando instância própria: URL da sua instância (ex: `https://nocodb.mapc.com.br`)

### 2. NOCODB_TOKEN

1. Acesse sua instância do NocoDB
2. Vá em **Settings** > **API Tokens**
3. Clique em **Generate New Token**
4. Dê um nome descritivo (ex: "MAPC Website Integration")
5. Copie o token gerado (formato: `nc_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`)

### 3. NOCODB_TABLE_ID

1. Acesse sua instância do NocoDB
2. Vá para a tabela onde deseja receber os leads
3. Copie a URL da tabela
4. O ID da tabela estará na URL (ex: `mqe75g35dwbb4iw`)
5. **Exemplo de URL**: `https://app.nocodb.com/dashboard/#/nc/project/abc123/table/mqe75g35dwbb4iw`

## Configuração no Netlify

1. **Acesse o painel do Netlify**

   - Faça login em [netlify.com](https://app.netlify.com/)
   - Selecione o site correspondente ao projeto MAPC

2. **Navegue até as configurações de variáveis de ambiente**

   - No menu lateral, clique em "Site settings"
   - Na seção "Build & deploy", clique em "Environment"
   - Clique no botão "Add a variable"

3. **Adicione as variáveis**

   - **Key**: `NOCODB_URL`
   - **Value**: Sua URL do NocoDB
   - **Sensitive**: Não (pode ser público)

   - **Key**: `NOCODB_TOKEN`
   - **Value**: Seu token de API
   - **Sensitive**: Sim (marcar como sensível)

4. **Salve e reconstrua**
   - Clique em "Save" para cada variável
   - Vá para "Deploys" e clique em "Trigger deploy"

## Estrutura da Tabela no NocoDB

A função espera uma tabela com os seguintes campos:

### Campos Obrigatórios

- `nome` (Text)
- `email` (Email)
- `telefone` (Text)
- `empresa` (Text)
- `servico_interesse` (Text)
- `mensagem_inicial` (LongText)

### Campos Automáticos

- `origem` (Text) - Preenchido automaticamente como "Website"
- `status_lead` (Text) - Preenchido automaticamente como "Novo Lead"
- `data_criacao` (DateTime) - Preenchido automaticamente
- `data_ultimo_contato` (DateTime) - Preenchido automaticamente

## Testando a Integração

1. **Verifique se as variáveis estão configuradas**

   - Acesse os logs da função no Netlify
   - Procure por mensagens de erro relacionadas a credenciais

2. **Teste o formulário**

   - Preencha o formulário no site
   - Verifique se o lead aparece na tabela do NocoDB

3. **Verifique os logs**
   - Em caso de erro, consulte os logs da função `nocodb-submit`
   - Os logs mostrarão detalhes sobre a comunicação com o NocoDB

## Resolução de Problemas

### Erro: "NocoDB credentials not configured"

- Verifique se as variáveis `NOCODB_URL` e `NOCODB_TOKEN` estão configuradas no Netlify
- Certifique-se de que os nomes das variáveis estão exatamente como mostrado

### Erro: "NocoDB submission failed: 401"

- Verifique se o token está correto e válido
- Gere um novo token se necessário

### Erro: "NocoDB submission failed: 404"

- Verifique se a URL está correta
- Certifique-se de que a tabela existe no NocoDB

### Erro: "NocoDB submission failed: 400"

- Verifique se a estrutura da tabela está correta
- Certifique-se de que todos os campos obrigatórios existem

## Monitoramento

Para monitorar a integração:

1. **Logs da Função**: Acesse Netlify > Functions > nocodb-submit > Logs
2. **Tabela NocoDB**: Verifique se os leads estão sendo criados
3. **Console do Browser**: Verifique se há erros no frontend

## Segurança

- **Nunca** commite as credenciais no código
- **Sempre** marque o token como sensível no Netlify
- **Rotacione** os tokens periodicamente
- **Monitore** o uso da API para detectar uso indevido
