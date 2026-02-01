// Proxy simples para submissão de formulário Mautic
// Coloque este arquivo em /api/submit.js para serviços como Netlify ou Vercel

export default async function handler(req, res) {
  // Permitir apenas método POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    // Obter dados do corpo da requisição
    const formData = req.body;
    
    // Validar dados necessários
    if (!formData.formId || !formData.formName) {
      return res.status(400).json({ error: 'Dados do formulário incompletos' });
    }

    // Criar FormData para enviar ao Mautic
    const body = new URLSearchParams();
    
    // Adicionar campos específicos do Mautic
    body.append('mauticform[formId]', formData.formId);
    body.append('mauticform[formName]', formData.formName);
    
    // Adicionar todos os campos do formulário
    for (const key in formData) {
      if (key !== 'formId' && key !== 'formName' && key !== 'return') {
        body.append(`mauticform[${key}]`, formData[key]);
      }
    }
    
    // Adicionar o campo de submissão
    body.append('mauticform[submit]', '1');

    // Enviar para o Mautic
    const mauticResponse = await fetch('https://crm.mapc.com.br/form/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(),
    });

    // Verificar se a submissão foi bem sucedida
    if (mauticResponse.ok) {
      return res.status(200).json({ success: true });
    } else {
      const errorText = await mauticResponse.text();
      console.error('Erro do Mautic:', errorText);
      return res.status(500).json({ error: 'Erro ao enviar para Mautic', details: errorText });
    }
  } catch (error) {
    console.error('Erro:', error);
    return res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
  }
}
