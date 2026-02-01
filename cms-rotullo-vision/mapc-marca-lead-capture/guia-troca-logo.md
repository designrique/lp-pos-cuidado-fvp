# Guia para Trocar a Logo do Site

Este documento explica como trocar a logo do site da MAPC de forma adequada.

## Arquivos Atuais da Logo

A logo atual é armazenada em:
- `src/assets/mapc-logo-new.png` (logo principal em uso)
- `src/assets/mapc-logo.png` (versão antiga da logo)

## Onde a Logo é Usada

A logo é usada em dois componentes principais:

1. **Header (Cabeçalho)**: `src/components/Header.tsx`
   - A logo aparece no cabeçalho do site, no canto superior esquerdo
   - Tamanho: altura de 12px (h-12) mantendo a proporção original

2. **Footer (Rodapé)**: `src/components/Footer.tsx`
   - A logo aparece no rodapé do site
   - Tamanho: altura de 12px (h-12) mantendo a proporção original
   - **Importante**: A logo no rodapé usa efeitos CSS adicionais:
     - `brightness-0 invert` - Isso deixa a logo branca para o fundo escuro do rodapé

## Passos para Trocar a Logo

### 1. Preparar a Nova Logo

1. Prepare a nova logo em formato PNG com fundo transparente
2. Dimensões recomendadas: pelo menos 300px de largura para boa qualidade
3. Nome do arquivo: mantenha o mesmo nome `mapc-logo-new.png` para consistência

### 2. Substituir o Arquivo da Logo

1. Navegue até a pasta `src/assets/`
2. Faça backup da logo atual (renomeie ou salve em outro lugar)
3. Copie a nova logo para esta pasta com o nome `mapc-logo-new.png`

### 3. Verificar a Responsividade

A logo é exibida em diferentes tamanhos dependendo do dispositivo. Verifique se a nova logo:

- Se adapta bem em dispositivos móveis (menor tamanho)
- É legível em tamanhos pequenos
- Mantém uma boa proporção de altura/largura

### 4. Ajustar o CSS se Necessário

Se a nova logo tiver proporções diferentes da atual, você pode precisar ajustar o CSS:

**No arquivo Header.tsx**:
```tsx
<img 
  src={mapcLogo} 
  alt="MAPC - Marcas e Patentes" 
  className="h-12 w-auto object-contain"
/>
```

**No arquivo Footer.tsx**:
```tsx
<img 
  src={mapcLogo} 
  alt="MAPC - Marcas e Patentes" 
  className="h-12 w-auto object-contain brightness-0 invert"
/>
```

Você pode ajustar:
- `h-12`: Controla a altura (12 unidades do Tailwind, aproximadamente 48px)
- `w-auto`: Mantém a largura proporcional à altura
- `object-contain`: Garante que a logo seja exibida por completo, preservando a proporção

### 5. Testar no Navegador

1. Execute `npm run dev` para iniciar o servidor de desenvolvimento
2. Verifique se a logo aparece corretamente no cabeçalho e no rodapé
3. Teste em diferentes tamanhos de tela (desktop, tablet, mobile)

### 6. Build e Deploy

1. Execute `npm run build` para criar a versão de produção
2. Faça o deploy para o Netlify com `npx netlify deploy --prod`
