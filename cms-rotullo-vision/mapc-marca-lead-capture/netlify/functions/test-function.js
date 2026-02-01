// Função de teste para verificar se as Netlify Functions estão funcionando
exports.handler = async (event, context) => {
  console.log('Test function called:', event.httpMethod, event.path);
  
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ 
      message: 'Netlify Function funcionando!',
      method: event.httpMethod,
      path: event.path,
      timestamp: new Date().toISOString()
    }),
  };
};
