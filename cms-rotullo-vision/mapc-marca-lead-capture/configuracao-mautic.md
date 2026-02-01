# Configuração da Integração Mautic para a Landing Page

## O que preencher na tela de credenciais do Mautic

Conforme mostrado na sua imagem, você está na tela de configuração de Credenciais OAuth 2 no Mautic. Aqui estão os valores que você deve preencher:

### 1. Authorization Protocol
- **Valor a selecionar**: `OAuth 2` (já está selecionado corretamente)

### 2. Name
- **Valor a preencher**: `lpmapc` (ou qualquer nome descritivo para identificar esta integração, como "Landing Page MAPC")

### 3. Redirect URI
- **Valor a preencher**: `https://registrese.mapc.com.br/callback` 

   Este é o endpoint para onde o Mautic redirecionará depois que um usuário autorizar a aplicação. Como o seu site está hospedado em `registrese.mapc.com.br`, você pode usar esta URL, embora o callback real dependa de como você configurou a integração no seu código.

## Informações Importantes

Após criar esta credencial no Mautic, você receberá:

1. **Client ID** (ID do Cliente)
2. **Client Secret** (Segredo do Cliente)

Você precisará adicionar estes valores ao seu arquivo `.env.local` no projeto:

```
VITE_MAUTIC_BASE_URL=https://crm.mapc.com.br
VITE_MAUTIC_CLIENT_ID=seu_client_id_aqui
VITE_MAUTIC_CLIENT_SECRET=seu_client_secret_aqui
```

## Configuração Atual no Código

Atualmente, seu código está configurado para usar autenticação básica (username/password) em vez de OAuth 2. Se você deseja continuar usando OAuth 2 conforme está configurando na interface do Mautic, precisaremos modificar o arquivo `mautic-config.ts` para usar esse método de autenticação.

## Próximos Passos

1. Complete a criação da credencial no Mautic
2. Anote o Client ID e Client Secret
3. Entre em contato para ajustarmos o código para usar OAuth 2 em vez de autenticação básica

## Observações sobre o Formulário

O formulário no seu site coleta os seguintes campos:
- Nome completo
- E-mail
- Telefone/WhatsApp
- Empresa (opcional)
- Serviço de Interesse
- Mensagem (opcional)

Esses campos estão sendo enviados para o Mautic através da API, então certifique-se de que os campos correspondentes existam no seu Mautic para receber estes dados corretamente.
