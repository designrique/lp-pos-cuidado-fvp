import { EVOLUTION_API } from './config';
import { trackEvent } from './analytics';

interface SendMessageParams {
  phone: string;
  message: string;
}

export const sendWhatsAppMessage = async (params: SendMessageParams, retryCount = 0): Promise<boolean> => {
  const { phone, message } = params;
  const MAX_RETRIES = 2; // Número máximo de tentativas
  
  // Verificar se o telefone está preenchido
  if (!phone || phone.trim() === '') {
    console.error('Telefone não fornecido para envio de mensagem');
    return false;
  }

  console.log('Telefone original:', phone);
  console.log('Mensagem:', message);
  
  try {
    // Usar a função serverless para enviar a mensagem
    console.log('Enviando mensagem via função serverless');
    
    const response = await fetch('/.netlify/functions/send-whatsapp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone,
        message
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Erro na função serverless (${response.status}): ${errorText}`);
      
      // Rastrear evento de falha
      trackEvent('whatsapp_api_error', { 
        status: response.status,
        error: errorText.substring(0, 100), // Limitar tamanho
        serverless: true
      });
      
      // Tentar novamente se for um erro de servidor
      if (response.status >= 500 && retryCount < MAX_RETRIES) {
        console.log(`Erro de servidor, tentando novamente (${retryCount + 1}/${MAX_RETRIES})...`);
        const waitTime = Math.pow(2, retryCount) * 1000;
        await new Promise(resolve => setTimeout(resolve, waitTime));
        return sendWhatsAppMessage(params, retryCount + 1);
      }
      
      return false;
    }

    const data = await response.json();
    console.log('Resposta da função serverless:', data);
    
    if (data.success) {
      // Rastrear evento de sucesso
      trackEvent('whatsapp_message_sent', { 
        success: true,
        serverless: true
      });
      return true;
    } else {
      console.error('Falha no envio via função serverless:', data.error);
      trackEvent('whatsapp_message_failed', { 
        reason: data.error || 'unknown_error',
        serverless: true
      });
      return false;
    }

  } catch (error) {
    console.error('Erro ao enviar mensagem WhatsApp via função serverless:', error);
    
    // Implementar lógica de retry
    if (retryCount < MAX_RETRIES) {
      console.log(`Tentando novamente (${retryCount + 1}/${MAX_RETRIES})...`);
      // Esperar um tempo antes de tentar novamente (exponential backoff)
      const waitTime = Math.pow(2, retryCount) * 1000; // 1s, 2s, 4s, ...
      await new Promise(resolve => setTimeout(resolve, waitTime));
      return sendWhatsAppMessage(params, retryCount + 1);
    }
    
    // Rastrear evento de falha
    trackEvent('whatsapp_message_failed', { 
      reason: error instanceof Error ? error.message : 'unknown_error',
      retries: retryCount,
      serverless: true
    });
    
    return false;
  }
};
