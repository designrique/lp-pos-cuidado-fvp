// Sistema de formulários à prova de falhas
export interface RetryConfig {
  maxRetries: number;
  baseDelay: number;
  maxDelay: number;
  backoffMultiplier: number;
}

export interface FormSubmissionResult {
  success: boolean;
  data?: any;
  error?: string;
  retryCount?: number;
  fromFallback?: boolean;
}

export interface StoredFormData {
  data: any;
  timestamp: number;
  id: string;
  attempts: number;
}

export const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxRetries: 3,
  baseDelay: 1000,
  maxDelay: 10000,
  backoffMultiplier: 2
};

// Verificar se está online
export const isOnline = (): boolean => {
  return navigator.onLine && !navigator.serviceWorker?.controller;
};

// Gerar ID único para formulário
export const generateFormId = (): string => {
  return `form_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Armazenar dados do formulário localmente
export const storeFormData = (data: any, formId: string): void => {
  try {
    const storedData: StoredFormData = {
      data,
      timestamp: Date.now(),
      id: formId,
      attempts: 0
    };
    localStorage.setItem(`pending_form_${formId}`, JSON.stringify(storedData));
  } catch (error) {
    console.error('Erro ao armazenar dados do formulário:', error);
  }
};

// Recuperar dados armazenados
export const getStoredFormData = (formId: string): StoredFormData | null => {
  try {
    const stored = localStorage.getItem(`pending_form_${formId}`);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Erro ao recuperar dados do formulário:', error);
    return null;
  }
};

// Remover dados armazenados após sucesso
export const clearStoredFormData = (formId: string): void => {
  try {
    localStorage.removeItem(`pending_form_${formId}`);
  } catch (error) {
    console.error('Erro ao limpar dados do formulário:', error);
  }
};

// Listar todos os formulários pendentes
export const getPendingForms = (): StoredFormData[] => {
  const pending: StoredFormData[] = [];
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('pending_form_')) {
        const data = getStoredFormData(key.replace('pending_form_', ''));
        if (data) {
          pending.push(data);
        }
      }
    }
  } catch (error) {
    console.error('Erro ao listar formulários pendentes:', error);
  }
  return pending.sort((a, b) => a.timestamp - b.timestamp);
};

// Incrementar tentativas
export const incrementAttempts = (formId: string): void => {
  try {
    const stored = getStoredFormData(formId);
    if (stored) {
      stored.attempts++;
      localStorage.setItem(`pending_form_${formId}`, JSON.stringify(stored));
    }
  } catch (error) {
    console.error('Erro ao incrementar tentativas:', error);
  }
};

// Calcular delay para retry com backoff exponencial
export const calculateRetryDelay = (
  attempt: number, 
  config: RetryConfig = DEFAULT_RETRY_CONFIG
): number => {
  const delay = config.baseDelay * Math.pow(config.backoffMultiplier, attempt);
  return Math.min(delay, config.maxDelay) + Math.random() * 1000; // Jitter
};

// Aguardar um tempo específico
export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Executar requisição com retry automático
export const executeWithRetry = async <T>(
  requestFn: () => Promise<T>,
  config: RetryConfig = DEFAULT_RETRY_CONFIG,
  onRetry?: (attempt: number, error: Error) => void
): Promise<T> => {
  let lastError: Error;
  
  for (let attempt = 0; attempt <= config.maxRetries; attempt++) {
    try {
      return await requestFn();
    } catch (error) {
      lastError = error as Error;
      
      if (attempt === config.maxRetries) {
        break;
      }
      
      if (onRetry) {
        onRetry(attempt + 1, lastError);
      }
      
      const delay = calculateRetryDelay(attempt, config);
      console.log(`Tentativa ${attempt + 1} falhou, tentando novamente em ${delay}ms...`);
      await sleep(delay);
    }
  }
  
  throw lastError!;
};

// Executar requisição com timeout
export const executeWithTimeout = async <T>(
  requestFn: () => Promise<T>,
  timeoutMs: number = 10000
): Promise<T> => {
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error('Timeout da requisição')), timeoutMs);
  });
  
  return Promise.race([requestFn(), timeoutPromise]);
};

// Validar conectividade antes de enviar
export const validateConnectivity = async (): Promise<boolean> => {
  if (!isOnline()) {
    return false;
  }
  
  try {
    // Teste simples de conectividade usando um endpoint público confiável
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    
    // Usar um endpoint público para teste de conectividade
    const response = await fetch('https://httpbin.org/status/200', {
      method: 'HEAD',
      signal: controller.signal,
      mode: 'no-cors' // Evitar problemas de CORS
    });
    
    clearTimeout(timeoutId);
    return true; // Se chegou até aqui, tem conectividade
  } catch {
    // Fallback: tentar o health-check local se disponível
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);
      
      const response = await fetch('/.netlify/functions/health-check', {
        method: 'HEAD',
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      return response.ok;
    } catch {
      return false;
    }
  }
};

// Fallback: enviar dados via email (se disponível)
export const sendFallbackEmail = async (formData: any): Promise<boolean> => {
  try {
    // Usar mailto como fallback
    const subject = encodeURIComponent('Lead do Website - Falha no Sistema');
    const body = encodeURIComponent(`
      Formulário falhou de ser enviado via sistema normal.
      
      Dados do Lead:
      Nome: ${formData.name || formData.nome}
      Email: ${formData.email}
      Telefone: ${formData.phone || formData.telefonewhatsapp}
      Empresa: ${formData.company || formData.empresa}
      Interesse: ${formData.interests || formData.servico_de_interesse}
      Mensagem: ${formData.message || formData.mensagem}
      
      Data: ${new Date().toLocaleString()}
    `);
    
    const mailtoUrl = `mailto:mapc@mapc.com.br?subject=${subject}&body=${body}`;
    window.open(mailtoUrl);
    return true;
  } catch (error) {
    console.error('Erro no fallback de email:', error);
    return false;
  }
};
