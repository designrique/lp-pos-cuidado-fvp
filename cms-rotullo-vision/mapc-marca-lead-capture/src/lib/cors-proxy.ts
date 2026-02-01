// Função para criar proxy CORS
export const corsProxy = async (url: string, options: RequestInit): Promise<Response> => {
  // Estamos usando nossa própria função serverless em vez de proxy de terceiros
  // Isso garante melhor controle e confiabilidade
  
  try {
    // Verificar se a URL é para o formulário Mautic
    if (url.includes('crm.mapc.com.br/form/submit')) {
      // Extrair o body como FormData ou URLSearchParams
      let formData: Record<string, string> = {};
      
      if (options.body instanceof FormData) {
        options.body.forEach((value, key) => {
          if (typeof value === 'string') {
            // Remover o prefixo 'mauticform[' e o sufixo ']' da chave
            const cleanKey = key.replace(/^mauticform\[|\]$/g, '');
            formData[cleanKey] = value;
          }
        });
      } else if (options.body instanceof URLSearchParams) {
        options.body.forEach((value, key) => {
          // Remover o prefixo 'mauticform[' e o sufixo ']' da chave
          const cleanKey = key.replace(/^mauticform\[|\]$/g, '');
          formData[cleanKey] = value;
        });
      } else if (typeof options.body === 'string') {
        // Tentar parsear como URLSearchParams
        const params = new URLSearchParams(options.body);
        params.forEach((value, key) => {
          // Remover o prefixo 'mauticform[' e o sufixo ']' da chave
          const cleanKey = key.replace(/^mauticform\[|\]$/g, '');
          formData[cleanKey] = value;
        });
      }
      
      // Usar nossa função serverless
      const response = await fetch('/.netlify/functions/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      return response;
    } else {
      // Para outras URLs, vamos manter o proxy tradicional como fallback
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
      
      // Adicionar headers específicos para o proxy
      const headersWithProxy = {
        ...options.headers,
        'X-Requested-With': 'XMLHttpRequest',
      };
      
      // Enviar a requisição através do proxy
      const response = await fetch(proxyUrl, {
        ...options,
        headers: headersWithProxy
      });
      
      return response;
    }
  } catch (error) {
    console.error('Erro ao usar proxy CORS:', error);
    throw error;
  }
};
