import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle, RefreshCw, Wifi, WifiOff, Mail } from 'lucide-react';

interface FormStatusAlertProps {
  status: 'loading' | 'error' | 'success' | 'offline';
  message?: string;
  onRetry?: () => void;
  onFallback?: () => void;
  showRetryOption?: boolean;
  retryCount?: number;
}

export const FormStatusAlert: React.FC<FormStatusAlertProps> = ({
  status,
  message,
  onRetry,
  onFallback,
  showRetryOption = false,
  retryCount = 0
}) => {
  if (status === 'loading') {
    return (
      <Alert className="border-blue-200 bg-blue-50">
        <RefreshCw className="h-4 w-4 animate-spin text-blue-600" />
        <AlertTitle className="text-blue-800">Enviando dados...</AlertTitle>
        <AlertDescription className="text-blue-700">
          {retryCount > 0 
            ? `Tentativa ${retryCount + 1} de envio...`
            : 'Aguarde enquanto processamos sua solicitação.'
          }
        </AlertDescription>
      </Alert>
    );
  }

  if (status === 'success') {
    return (
      <Alert className="border-green-200 bg-green-50">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertTitle className="text-green-800">Enviado com sucesso!</AlertTitle>
        <AlertDescription className="text-green-700">
          {message || 'Seus dados foram recebidos. Em breve nossa equipe entrará em contato.'}
        </AlertDescription>
      </Alert>
    );
  }

  if (status === 'offline') {
    return (
      <Alert className="border-yellow-200 bg-yellow-50">
        <WifiOff className="h-4 w-4 text-yellow-600" />
        <AlertTitle className="text-yellow-800">Você está offline</AlertTitle>
        <AlertDescription className="text-yellow-700">
          {message || 'Seus dados foram salvos localmente e serão enviados quando você voltar online.'}
        </AlertDescription>
      </Alert>
    );
  }

  if (status === 'error') {
    return (
      <Alert className="border-red-200 bg-red-50">
        <AlertCircle className="h-4 w-4 text-red-600" />
        <AlertTitle className="text-red-800">Ocorreu um problema</AlertTitle>
        <AlertDescription className="text-red-700">
          <div className="space-y-3">
            <p>{message}</p>
            
            {showRetryOption && onRetry && (
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  onClick={onRetry}
                  size="sm"
                  variant="outline"
                  className="border-red-300 text-red-700 hover:bg-red-100"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Tentar Novamente
                </Button>
              </div>
            )}
            
            {onFallback && (
              <Button
                onClick={onFallback}
                size="sm"
                variant="outline"
                className="border-red-300 text-red-700 hover:bg-red-100"
              >
                <Mail className="h-4 w-4 mr-2" />
                Enviar por Email
              </Button>
            )}
          </div>
        </AlertDescription>
      </Alert>
    );
  }

  return null;
};

// Componente para mostrar status de conectividade
export const ConnectivityStatus: React.FC<{ isOnline: boolean }> = ({ isOnline }) => {
  if (isOnline) return null;

  return (
    <Alert className="border-orange-200 bg-orange-50 mb-4">
      <WifiOff className="h-4 w-4 text-orange-600" />
      <AlertTitle className="text-orange-800">Sem conexão</AlertTitle>
      <AlertDescription className="text-orange-700">
        Você está offline. Os dados serão salvos localmente e enviados quando a conexão for restabelecida.
      </AlertDescription>
    </Alert>
  );
};

// Componente para mostrar informações de retry
export const RetryInfo: React.FC<{ 
  retryCount: number; 
  maxRetries: number; 
}> = ({ retryCount, maxRetries }) => {
  if (retryCount === 0) return null;

  return (
    <div className="text-sm text-gray-600 mt-2">
      <Wifi className="h-4 w-4 inline mr-1" />
      Tentativa {retryCount + 1} de {maxRetries + 1}
    </div>
  );
};
