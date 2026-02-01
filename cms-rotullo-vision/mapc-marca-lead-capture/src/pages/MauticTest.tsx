import { useState, useEffect } from 'react';
import { MAUTIC_CONFIG } from '@/lib/mautic-config';

export const MauticTest = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<any>(null);

  const testConnection = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Teste de conexão usando Netlify Function
      const apiResponse = await fetch(`${MAUTIC_CONFIG.apiPath}/mautic-auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      // Armazenar a resposta para exibição
      const data = await apiResponse.json();
      setResponse(data);
      
      // Verificar se a conexão foi bem-sucedida
      setIsConnected(apiResponse.ok);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      setIsConnected(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    testConnection();
  }, []);

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Teste de Conexão Mautic</h1>
      
      <div className="mb-4">
        <div className="flex items-center space-x-2">
          <span className="font-semibold">Status:</span>
          {isLoading ? (
            <span className="text-blue-500">Testando conexão...</span>
          ) : isConnected === null ? (
            <span className="text-gray-500">Não testado</span>
          ) : isConnected ? (
            <span className="text-green-500">Conectado!</span>
          ) : (
            <span className="text-red-500">Falha na conexão</span>
          )}
        </div>
      </div>

      {response && (
        <div className="mb-4 p-3 bg-gray-100 rounded">
          <h3 className="font-semibold mb-1">Resposta da API:</h3>
          <pre className="text-xs overflow-auto max-h-32">{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          <strong>Erro:</strong> {error}
        </div>
      )}

      <button
        onClick={testConnection}
        disabled={isLoading}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {isLoading ? 'Testando...' : 'Testar Novamente'}
      </button>
    </div>
  );
};

export default MauticTest;
