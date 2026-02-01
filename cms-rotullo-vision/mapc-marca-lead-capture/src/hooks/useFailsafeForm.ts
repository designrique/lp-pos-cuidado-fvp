import { useState, useCallback, useEffect } from 'react';
import {
  executeWithRetry,
  executeWithTimeout,
  validateConnectivity,
  storeFormData,
  getStoredFormData,
  clearStoredFormData,
  incrementAttempts,
  generateFormId,
  isOnline,
  sendFallbackEmail,
  FormSubmissionResult,
  RetryConfig,
  DEFAULT_RETRY_CONFIG
} from '@/lib/form-failsafe';

interface UseFailsafeFormOptions {
  retryConfig?: RetryConfig;
  timeoutMs?: number;
  autoRetryOnReconnect?: boolean;
  enableOfflineMode?: boolean;
}

interface FailsafeFormState {
  loading: boolean;
  error: string | null;
  success: boolean;
  isOffline: boolean;
  retryCount: number;
  showRetryOption: boolean;
}

export const useFailsafeForm = (options: UseFailsafeFormOptions = {}) => {
  const {
    retryConfig = DEFAULT_RETRY_CONFIG,
    timeoutMs = 2000,
    autoRetryOnReconnect = true,
    enableOfflineMode = true
  } = options;

  const [state, setState] = useState<FailsafeFormState>({
    loading: false,
    error: null,
    success: false,
    isOffline: !isOnline(),
    retryCount: 0,
    showRetryOption: false
  });

  const [formId, setFormId] = useState<string | null>(null);

  // Monitorar status de conectividade
  useEffect(() => {
    const handleOnline = () => {
      setState(prev => ({ ...prev, isOffline: false }));
      
      // Auto-retry pendentes quando voltar online
      if (autoRetryOnReconnect && formId) {
        const stored = getStoredFormData(formId);
        if (stored && !state.success) {
          console.log('Voltou online, tentando reenviar formulário pendente...');
          handleRetrySubmission(stored.data);
        }
      }
    };

    const handleOffline = () => {
      setState(prev => ({ ...prev, isOffline: true }));
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [autoRetryOnReconnect, formId, state.success]);

  const resetState = useCallback(() => {
    setState({
      loading: false,
      error: null,
      success: false,
      isOffline: !isOnline(),
      retryCount: 0,
      showRetryOption: false
    });
  }, []);

  const showError = useCallback((error: string, showRetry = false) => {
    setState(prev => ({
      ...prev,
      loading: false,
      error,
      showRetryOption: showRetry
    }));
  }, []);

  const showSuccess = useCallback(() => {
    setState(prev => ({
      ...prev,
      loading: false,
      success: true,
      error: null,
      showRetryOption: false
    }));
    
    // Limpar dados armazenados após sucesso
    if (formId) {
      clearStoredFormData(formId);
    }
  }, [formId]);

  const submitForm = useCallback(async (
    formData: any,
    submitFn: (data: any) => Promise<any>
  ): Promise<FormSubmissionResult> => {
    const currentFormId = formId || generateFormId();
    setFormId(currentFormId);

    // Validar conectividade antes de tentar
    if (!isOnline() && enableOfflineMode) {
      storeFormData(formData, currentFormId);
      showError(
        'Você está offline. Seus dados foram salvos e serão enviados quando a conexão for restabelecida.',
        true
      );
      return { success: false, error: 'Offline', fromFallback: false };
    }

    setState(prev => ({ 
      ...prev, 
      loading: true, 
      error: null, 
      showRetryOption: false 
    }));

    try {
      // Executar submissão com timeout e retry (sem checagem bloqueante)
      const result = await executeWithRetry(
        () => executeWithTimeout(() => submitFn(formData), timeoutMs),
        retryConfig,
        (attempt, error) => {
          console.log(`Tentativa ${attempt} falhou:`, error.message);
          setState(prev => ({ ...prev, retryCount: attempt }));
        }
      );

      setState(prev => ({ 
        ...prev, 
        retryCount: 0,
        loading: false 
      }));

      showSuccess();
      
      // Limpar dados armazenados em caso de sucesso
      clearStoredFormData(currentFormId);

      return { success: true, data: result };

    } catch (error: any) {
      console.error('Erro na submissão do formulário:', error);
      
      // Armazenar dados para retry posterior
      if (enableOfflineMode) {
        storeFormData(formData, currentFormId);
        incrementAttempts(currentFormId);
      }

      const errorMessage = getErrorMessage(error);
      const shouldRetry = shouldOfferRetry(error);
      
      showError(errorMessage, shouldRetry);

      return {
        success: false,
        error: errorMessage,
        retryCount: state.retryCount,
        fromFallback: false
      };
    }
  }, [formId, retryConfig, timeoutMs, enableOfflineMode, showError, showSuccess, state.retryCount]);

  const handleRetrySubmission = useCallback(async (data?: any) => {
    if (!formId) return;

    const storedData = data || getStoredFormData(formId);
    if (!storedData) {
      showError('Não foi possível recuperar os dados para reenvio.');
      return;
    }

    setState(prev => ({ 
      ...prev, 
      loading: true, 
      error: null,
      showRetryOption: false 
    }));

    try {
      // Nova tentativa de envio (será implementada pelo componente)
      incrementAttempts(formId);
    } catch (error) {
      console.error('Erro no retry:', error);
      showError('Falha ao reenviar. Tente novamente ou entre em contato diretamente.');
    }
  }, [formId, showError]);

  const handleFallbackSubmission = useCallback(async (formData: any) => {
    console.log('Usando método de fallback...');
    
    const fallbackSuccess = await sendFallbackEmail(formData);
    if (fallbackSuccess) {
      setState(prev => ({ 
        ...prev, 
        error: 'Sistema indisponível. Abrindo email como alternativa...',
        loading: false,
        showRetryOption: false
      }));
      
      setTimeout(() => {
        showSuccess();
      }, 2000);
    } else {
      showError('Sistema indisponível. Entre em contato diretamente pelo WhatsApp: (81) 3019-2222');
    }
  }, [showSuccess, showError]);

  return {
    ...state,
    submitForm,
    handleRetrySubmission,
    handleFallbackSubmission,
    resetState,
    formId
  };
};

// Utilitários para tratamento de erros
const getErrorMessage = (error: Error): string => {
  if (error.message.includes('Timeout')) {
    return 'A requisição demorou muito para responder. Verifique sua conexão e tente novamente.';
  }
  
  if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
    return 'Erro de conexão. Verifique sua internet e tente novamente.';
  }
  
  if (error.message.includes('503')) {
    return 'Servidor temporariamente indisponível. Tente novamente em alguns minutos.';
  }
  
  if (error.message.includes('500')) {
    return 'Erro interno do servidor. Nossa equipe foi notificada.';
  }
  
  if (error.message.includes('404')) {
    return 'Serviço não encontrado. Entre em contato diretamente.';
  }
  
  return `Erro inesperado: ${error.message}`;
};

const shouldOfferRetry = (error: Error): boolean => {
  const retryableErrors = ['Timeout', 'Failed to fetch', 'NetworkError', '503', '502'];
  return retryableErrors.some(errorType => error.message.includes(errorType));
};
