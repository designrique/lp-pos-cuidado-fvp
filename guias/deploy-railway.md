# 🚀 Guia de Deploy no Railway (CMS Backend)

Este guia cobre o passo a passo para colocar o CMS (Backend) online usando a plataforma Railway.

## 1. Preparação Inicial

Certifique-se de que você tem uma conta no [Railway.app](https://railway.app/). Se não tiver, faça login com seu GitHub.

## 2. Criar Novo Projeto

1.  No Dashboard do Railway, clique em **"New Project"**.
2.  Selecione **"Deploy from GitHub repo"**.
3.  Escolha o repositório: `designrique/site-ariana-borges`.
4.  **IMPORTANTE:** Quando perguntado se quer adicionar variáveis agora, clique em **"Add Variables"** ou pause o deploy se possível, pois precisamos configurar o diretório correto antes do primeiro build com sucesso.

## 3. Configurar o Diretório Raiz (Root Directory)

Como o CMS não está na raiz do repositório, precisamos dizer ao Railway onde ele está.

1.  Clique no serviço criado (que tem o nome do seu repo).
2.  Vá na aba **Settings**.
3.  Role até encontrar **Root Directory**.
4.  Defina como: `cms-rotullo-vision/backend`
5.  O Railway vai tentar fazer um novo deploy automaticamente. Se falhar por falta de variáveis, siga para o próximo passo.

## 4. Adicionar Banco de Dados (PostgreSQL)

O Payload CMS precisa de um banco de dados.

1.  No mesmo projeto, clique no botão **"+ New"** (ou botão direito na área vazia).
2.  Escolha **Database** -> **PostgreSQL**.
3.  Aguarde o banco ser criado.

## 5. Configurar Variáveis de Ambiente

Agora vamos conectar o CMS ao Banco.

1.  Volte para o serviço do **CMS (site-ariana-borges)**.
2.  Vá na aba **Variables**.
3.  Adicione as seguintes variáveis:

| Variável | Valor | Descrição |
| :--- | :--- | :--- |
| `DATABASE_URI` | `${{PostgreSQL.DATABASE_URL}}` | O Railway preenche isso automaticamente se você digitar `${{` e selecionar o serviço Postgres. |
| `PAYLOAD_SECRET` | (Gere uma string aleatória longa) | Senha interna para criptografia de sessões. Ex: `b3c...` |
| `PAYLOAD_PUBLIC_SERVER_URL` | `https://SEU-APP.up.railway.app` | A URL pública que o Railway gerou para seu serviço (veja na aba Settings > Networking). |
| `NODE_ENV` | `production` | Define o modo de produção. |

## 6. Domínio Público (Networking)

1.  Vá na aba **Settings** do serviço CMS.
2.  Em **Networking**, clique em **"Generate Domain"** (se ainda não tiver um).
3.  Copie esse domínio (ex: `web-production-1234.up.railway.app`).
4.  **Volte nas Variáveis** e atualize `PAYLOAD_PUBLIC_SERVER_URL` com esse valor exato (incluindo `https://`).
5.  O serviço deve reiniciar automaticamente.

## 7. Verificação

1.  Aguarde o deploy ficar verde ("Active").
2.  Acesse a URL gerada pelo Railway + `/admin`.
    *   Exemplo: `https://web-production-1234.up.railway.app/admin`
3.  Se aparecer a tela de login/criação de usuário do Payload, **SUCESSO!** 🎉

## 8. Conectando com o Frontend (Vercel)

Agora que o backend existe:

1.  Vá no seu projeto na **Vercel**.
2.  Settings -> Environment Variables.
3.  Adicione/Edite `VITE_CMS_URL` com o valor da URL do Railway (ex: `https://web-production-1234.up.railway.app`).
4.  Faça um Redeploy no Vercel para ele pegar a nova variável.
