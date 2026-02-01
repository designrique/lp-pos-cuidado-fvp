// Netlify Function para envio de dados para NocoDB
exports.handler = async (event, context) => {
  console.log('NocoDB Function called:', event.httpMethod, event.path);
  console.log('Event:', JSON.stringify(event, null, 2));
  
  // Configurar CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Lidar com preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Permitir apenas POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Método não permitido' }),
    };
  }

  try {
    console.log('Request body:', event.body);
    const { name, email, phone, company, interests, message, tableId, source } = JSON.parse(event.body);

    // Verificar se as variáveis de ambiente estão configuradas
    const nocodbUrl = process.env.NOCODB_URL;
    const nocodbToken = process.env.NOCODB_TOKEN;

    if (!nocodbUrl || !nocodbToken) {
      console.error('Variáveis de ambiente NocoDB não configuradas');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Configuração do NocoDB não encontrada',
          details: 'NOCODB_URL e NOCODB_TOKEN devem estar configuradas'
        }),
      };
    }

    console.log('Enviando para NocoDB:', { name, email, phone, company, interests, message, tableId, source });
    console.log('NocoDB URL:', nocodbUrl);
    console.log('Origem do lead:', source || 'formulario_principal');

    // Usar tableId da requisição, variável de ambiente ou padrão
    const targetTableId = tableId || process.env.NOCODB_TABLE_ID || 'leads';
    const fullUrl = `${nocodbUrl}/api/v2/tables/${targetTableId}/records`;
    
    console.log('Tentando POST para:', fullUrl);

    // Enviar para NocoDB
    const nocodbResponse = await fetch(fullUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xc-token': nocodbToken,
      },
      body: JSON.stringify({
        nome: name,
        email: email,
        telefone: phone,
        empresa: company,
        servico_interesse: interests,
        mensagem_inicial: message,
        origem: source === 'whatsapp_button' ? 'Botão WhatsApp' : 'Website',
        status_lead: 'Novo Lead',
        data_criacao: new Date().toISOString(),
        data_ultimo_contato: new Date().toISOString(),
        fonte_origem: source || 'formulario_principal',
      }),
    });

    if (!nocodbResponse.ok) {
      const errorText = await nocodbResponse.text();
      console.error('Erro do NocoDB:', errorText);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Erro ao enviar para NocoDB',
          details: `${nocodbResponse.status}: ${errorText}`
        }),
      };
    }

    const nocodbResult = await nocodbResponse.json();
    console.log('Sucesso no NocoDB:', nocodbResult);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        message: 'Lead enviado com sucesso!',
        id: nocodbResult.id 
      }),
    };

  } catch (error) {
    console.error('Erro na função nocodb-submit:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Erro interno do servidor',
        details: error.message 
      }),
    };
  }
};
