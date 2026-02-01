# 🔧 SOLUÇÃO CORS - Proxy Reverso

## **PROBLEMA CORS IDENTIFICADO**

O Krayin CRM está bloqueando requisições CORS do navegador.

## **SOLUÇÃO TEMPORÁRIA - Netlify Functions:**

### 1. Criar function proxy:
```javascript
// netlify/functions/krayin-proxy.js
exports.handler = async (event, context) => {
  const { httpMethod, body, headers } = event;
  
  if (httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const response = await fetch('https://crm.mapc.com.br/api/v1/leads', {
      method: 'POST',
      headers: {
        'Authorization': process.env.KRAYIN_API_TOKEN,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: body
    });

    const data = await response.text();
    
    return {
      statusCode: response.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST'
      },
      body: data
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
```

### 2. Atualizar código para usar proxy:
```javascript
// Ao invés de chamar direto:
// https://crm.mapc.com.br/api/v1/leads

// Usar o proxy:
// /.netlify/functions/krayin-proxy
```

## **SOLUÇÃO DEFINITIVA:**

Pedir ao administrador do servidor Krayin para:

1. **Configurar CORS** no arquivo de configuração
2. **Adicionar domínios permitidos:**
   - localhost (desenvolvimento)
   - netlify.app (produção)
   - mapc.com.br (domínio principal)

3. **Testar endpoints** via Postman primeiro

## **STATUS ATUAL:**
- ✅ **Código:** Implementação correta
- ❌ **Servidor:** Bloqueando CORS
- ✅ **Formspree:** Funcionando normalmente

**Solução:** Configuração de servidor ou uso de proxy function.