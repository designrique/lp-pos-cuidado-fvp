# CMS Backend - Payload CMS

Backend do CMS para gerenciamento de conteúdo do site MAPC.

## Arquitetura

```
┌─────────────────────────────────────────────────┐
│                   Railway                       │
│  ┌────────────────┐    ┌─────────────────┐     │
│  │  Payload CMS   │───▶│  PostgreSQL     │     │
│  │  (Este App)    │    │  (Railway)      │     │
│  └───────┬────────┘    └─────────────────┘     │
└──────────┼──────────────────────────────────────┘
           │
           ▼
┌──────────────────────────────────────────────────┐
│                   Supabase                       │
│  ┌────────────────┐    ┌─────────────────┐      │
│  │     Auth       │    │    Storage      │      │
│  └────────────────┘    └─────────────────┘      │
└──────────────────────────────────────────────────┘
```

## Tecnologias
- Payload CMS v3
- PostgreSQL (Railway)
- Supabase (Auth + Storage)
- Express.js
- TypeScript

## Setup

1. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

2. Preencha as variáveis:
   - `DATABASE_URI`: Connection string do PostgreSQL (Railway)
   - `SUPABASE_URL`: URL do projeto Supabase
   - `SUPABASE_ANON_KEY`: Chave anon do Supabase
   - `SUPABASE_SERVICE_KEY`: Chave de serviço do Supabase
   - `PAYLOAD_SECRET`: Chave secreta para JWT

3. Instale as dependências:
```bash
npm install
```

4. Execute em modo desenvolvimento:
```bash
npm run dev
```

5. Acesse o admin em: http://localhost:3001/admin

## Deploy (Railway)

1. Crie um novo projeto no Railway
2. Adicione PostgreSQL como serviço
3. Conecte ao repositório GitHub (pasta `/backend`)
4. Configure as variáveis de ambiente

## Endpoints Públicos

| Endpoint | Descrição |
|----------|-----------|
| `GET /api/public/hero` | Conteúdo da seção Hero |
| `GET /api/public/services` | Lista de serviços |
| `GET /api/public/testimonials` | Depoimentos |

## Collections

| Collection | Descrição |
|------------|-----------|
| **Users** | Usuários do admin |
| **HeroSection** | Título, stats, benefícios |
| **Services** | Serviços oferecidos |
| **Testimonials** | Depoimentos de clientes |
| **Media** | Biblioteca de mídia (Supabase Storage) |
