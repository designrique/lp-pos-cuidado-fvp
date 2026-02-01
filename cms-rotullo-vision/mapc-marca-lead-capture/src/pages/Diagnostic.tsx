import { useEffect, useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { MAUTIC_CONFIG } from '../lib/mautic-config';

// Componente de diagnóstico para verificar configurações do Netlify Functions
export const DiagnosticPage = () => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [result, setResult] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Função para testar a conexão com Netlify Functions
  const testConnection = async () => {
    setStatus('loading');
    try {
      // Teste simples - verificar se a função de autenticação responde
      const response = await fetch(`${MAUTIC_CONFIG.apiPath}/mautic-auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      
      // Obter os resultados
      const results = {
        environment: import.meta.env.MODE,
        baseUrl: MAUTIC_CONFIG.baseUrl,
        functionResponded: response.ok,
        statusCode: response.status,
        functionResponse: data,
        timestamp: new Date().toISOString()
      };
      
      setResult(results);
      setStatus('success');
    } catch (error) {
      console.error('Erro no diagnóstico:', error);
      setErrorMsg(error instanceof Error ? error.message : 'Erro desconhecido');
      setStatus('error');
    }
  };

  useEffect(() => {
    // Testar automaticamente ao carregar a página
    testConnection();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Diagnóstico Netlify Functions</CardTitle>
          <CardDescription>Verifique se a integração com o Mautic via Netlify Functions está funcionando</CardDescription>
        </CardHeader>
        <CardContent>
          {status === 'loading' && (
            <div className="flex items-center justify-center p-6">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          )}
          
          {status === 'error' && (
            <div className="bg-destructive/20 text-destructive p-4 rounded-md">
              <h3 className="font-bold mb-2">Erro no diagnóstico</h3>
              <p className="text-sm">{errorMsg}</p>
            </div>
          )}
          
          {status === 'success' && result && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="font-semibold">Ambiente</div>
                <div>{result.environment}</div>
                
                <div className="font-semibold">URL do Mautic</div>
                <div>{result.baseUrl}</div>
                
                <div className="font-semibold">Função Netlify</div>
                <div className={result.functionResponded ? "text-green-600" : "text-red-600"}>
                  {result.functionResponded ? "✅ Respondeu" : "❌ Falhou"}
                </div>
                
                <div className="font-semibold">Status Code</div>
                <div className={result.statusCode === 200 ? "text-green-600" : "text-amber-600"}>
                  {result.statusCode}
                </div>
                
                <div className="font-semibold">Resposta</div>
                <div className="font-mono text-xs overflow-auto max-h-24">
                  {JSON.stringify(result.functionResponse, null, 2)}
                </div>
                
                <div className="font-semibold">Timestamp</div>
                <div>{new Date(result.timestamp).toLocaleString()}</div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={testConnection} className="mr-2">
            Testar Novamente
          </Button>
          <Button variant="outline" onClick={() => window.history.back()}>
            Voltar
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DiagnosticPage;
