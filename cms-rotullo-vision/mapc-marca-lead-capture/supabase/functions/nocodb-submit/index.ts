import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const nocodbUrl = Deno.env.get('NOCODB_URL');
    const nocodbToken = Deno.env.get('NOCODB_TOKEN');
    
    if (!nocodbUrl || !nocodbToken) {
      throw new Error('NocoDB credentials not configured');
    }

    const { name, email, phone, company, interests, message, tableId } = await req.json();

    console.log('Submitting to NocoDB:', { name, email, phone, company, interests, message, tableId });
    console.log('NocoDB URL:', nocodbUrl);

    // Use tableId from request or try common table identifiers
    const targetTableId = tableId || 'leads';
    const fullUrl = `${nocodbUrl}/api/v2/tables/${targetTableId}/records`;
    
    console.log('Attempting to POST to:', fullUrl);

    // Submit to NocoDB using field names that match the table structure
    const nocodbResponse = await fetch(`${nocodbUrl}/api/v2/tables/${targetTableId}/records`, {
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
        origem: 'Website',
        status_lead: 'Novo Lead',
        data_criacao: new Date().toISOString(),
        data_ultimo_contato: new Date().toISOString(),
      }),
    });

    if (!nocodbResponse.ok) {
      const errorText = await nocodbResponse.text();
      console.error('NocoDB error:', errorText);
      throw new Error(`NocoDB submission failed: ${nocodbResponse.status} ${errorText}`);
    }

    const nocodbResult = await nocodbResponse.json();
    console.log('NocoDB success:', nocodbResult);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Lead enviado com sucesso!',
        id: nocodbResult.id 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error in nocodb-submit function:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Erro ao enviar lead. Tente novamente.',
        details: error.message 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});