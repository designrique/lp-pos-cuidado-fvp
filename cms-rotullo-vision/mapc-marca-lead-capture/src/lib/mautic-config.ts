// Configurações da API do Mautic
// Usando variáveis de ambiente (.env.local)

// Definição do tipo para suportar import.meta.env no TypeScript com Vite
// Remove global env declaration to avoid conflicts

// Helper para acessar as variáveis de ambiente com segurança
const getEnvVar = (key: string, defaultValue: string): string => {
  try {
    const envVar = import.meta.env[key];
    return typeof envVar === 'string' ? envVar : defaultValue;
  } catch (e) {
    return defaultValue;
  }
};

export const MAUTIC_CONFIG = {
  // URL base do Mautic
  baseUrl: getEnvVar('VITE_MAUTIC_BASE_URL', 'https://crm.mapc.com.br'),
  
  // Não armazenamos mais credenciais no frontend - tudo via Netlify Functions
  apiPath: '/.netlify/functions',
  
  // IDs de segmentos/listas no Mautic
  lists: {
    siteLeads: parseInt(getEnvVar('VITE_MAUTIC_SITE_LEADS_LIST', '1')),
    potencialClientes: parseInt(getEnvVar('VITE_MAUTIC_POTENTIAL_CLIENTS_LIST', '2'))
  },
  
  // Mapeamento de serviços para tags ou campos personalizados
  serviceMappings: {
    'registro-marca': 'Registro de Marca',
    'registro-patente': 'Registro de Patente',
    'desenho-industrial': 'Desenho Industrial',
    'busca-anterioridade': 'Busca de Anterioridade',
    'monitoramento': 'Monitoramento de Marca',
    'renovacao': 'Renovação de Marca',
    'consultoria': 'Consultoria Geral'
  }
};

// Autenticação agora é gerenciada inteiramente pelas Netlify Functions
// Não precisamos mais de tokens no frontend

// Função para formatar dados do formulário para o formato Mautic
export const formatContactData = (formData: {
  name: string;
  email: string;
  phone: string;
  service: string;
  company: string;
  message: string;
}) => {
  // Dividir nome completo em primeiro nome e sobrenome
  const nameParts = formData.name.split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ');

  // O formato correto para a API do Mautic
  return {
    firstname: firstName,
    lastname: lastName || '',
    email: formData.email,
    phone: formData.phone, // Corrigido de 'mobile' para 'phone'
    company: formData.company || 'Não informado',
    // Campos personalizados
    servicointeresse: MAUTIC_CONFIG.serviceMappings[formData.service as keyof typeof MAUTIC_CONFIG.serviceMappings] || formData.service,
    message: formData.message, // Campo padrão do Mautic para mensagens
    // Tags como string com vírgulas conforme documentação
    tags: ['website', 'formulario-contato', formData.service].join(','),
    // Precisa-se verificar se este é o formato correto para listas no Mautic
    // De acordo com a documentação, depende do formato da API
    ipAddress: '', // Será preenchido pelo servidor
    overwriteWithBlank: false // Não sobrescrever campos vazios
  };
};

// Não precisamos mais desta função no frontend,
// já que a formatação dos dados é feita no servidor

// Comunicação com o Mautic agora é feita inteiramente através das Netlify Functions
// Não precisamos mais dessas funções no frontend

/**
 * Envia dados de contato para o Mautic via Netlify Function
 */
export const sendContactToMautic = async (formData: {
  name: string;
  email: string;
  phone: string;
  service: string;
  company: string;
  message: string;
}): Promise<{success: boolean, message: string, data?: any}> => {
  try {
    // Manter tanto o código como o texto formatado do serviço
    const serviceCode = formData.service; // Código original (ex: registro-marca)
    const formattedService = MAUTIC_CONFIG.serviceMappings[formData.service as keyof typeof MAUTIC_CONFIG.serviceMappings] || formData.service;
    
    // Verificação adicional para debug
    console.log('Código do serviço selecionado:', serviceCode);
    console.log('Nome do serviço formatado:', formattedService);
    
    // Preparar payload explicitamente para garantir que todos os campos estejam presentes
    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company || '',
      // Enviar tanto o código quanto o texto formatado para garantir que um deles funcione
      service: formattedService,
      serviceCode: serviceCode,
      message: formData.message || ''
    };
    
    console.log('Enviando dados para Netlify Function:', payload);
    
    // Enviar para a função Netlify básica que sabemos que funciona
    const response = await fetch(`${MAUTIC_CONFIG.apiPath}/mautic-contact-basic`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });
    
    const responseData = await response.json();
    
    if (response.ok) {
      return {
        success: true,
        message: 'Contato criado com sucesso',
        data: responseData
      };
    } else {
      return {
        success: false,
        message: responseData.error || `Erro ${response.status}`,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Erro desconhecido',
    };
  }
};
