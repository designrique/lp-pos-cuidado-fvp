/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Removidas todas as variáveis do Krayin e Formspree
  // Projeto agora usa apenas NocoDB via Supabase
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
