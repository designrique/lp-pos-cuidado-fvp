// Funções para rastreamento de eventos
export const trackEvent = (eventName: string, eventData?: Record<string, any>) => {
  try {
    // Se o Google Analytics estiver disponível
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, eventData);
      console.log(`Evento rastreado: ${eventName}`, eventData);
      return true;
    }
    
    // Se o Facebook Pixel estiver disponível
    if (typeof window.fbq === 'function') {
      window.fbq('trackCustom', eventName, eventData);
      console.log(`Evento FB rastreado: ${eventName}`, eventData);
      return true;
    }
    
    // Se nenhuma ferramenta de analytics estiver disponível
    console.log(`[Analytics] Evento: ${eventName}`, eventData);
    return false;
  } catch (error) {
    console.error('Erro ao rastrear evento:', error);
    return false;
  }
};

// Tipos globais para analytics
declare global {
  interface Window {
    gtag?: (command: string, action: string, params?: any) => void;
    fbq?: (command: string, action: string, params?: any) => void;
    dataLayer?: any[];
  }
}
