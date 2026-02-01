// Health check para testar conectividade
exports.handler = async (event, context) => {
  console.log('Health check called:', event.httpMethod);
  
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Lidar com OPTIONS (preflight)
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Verificar variáveis essenciais
  const hasNocoDB = !!(process.env.NOCODB_URL && process.env.NOCODB_TOKEN);
  
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      status: 'ok',
      timestamp: new Date().toISOString(),
      nocodb_configured: hasNocoDB,
      environment: process.env.NODE_ENV || 'development'
    }),
  };
};
