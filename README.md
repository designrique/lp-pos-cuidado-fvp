<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1GQAnway5-jMuvxqMn_3m5UTQ86wd42bg

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Integração InfinitePay

Informações para configuração e testes:

*   **Identificador (Handle):** `institutoarianaborges`
*   **NSU de Exemplo:** `order-nsu-123`
*   **URL de Redirecionamento:** `https://mesa-salomao.netlify.app/obrigado`
*   **Webhook URL:** `https://mesa-salomao.netlify.app/webhook-infinitepay`
*   **Meta CAPI Endpoint:** `/.netlify/functions/meta-capi` (para eventos manuais)
*   **Branch de Desenvolvimento:** `feat/infinitepay-integration`

> [!IMPORTANT]
> Para o Meta CAPI funcionar, lembre-se de configurar a variável de ambiente `META_ACCESS_TOKEN` no painel do Netlify. O `META_PIXEL_ID` já está configurado como `1414964383316703`.
