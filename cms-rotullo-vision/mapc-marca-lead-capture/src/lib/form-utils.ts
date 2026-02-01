// Mapeamento de serviços para nomes mais amigáveis
export const servicoMap: Record<string, string> = {
  'registro-marca': 'Registro de Marca',
  'registro-patente': 'Registro de Patente',
  'desenho-industrial': 'Desenho Industrial',
  'busca-anterioridade': 'Busca de Anterioridade',
  'monitoramento-marca': 'Monitoramento de Marca',
  'renovacao-marca': 'Renovação de Marca',
  'consultoria-geral': 'Consultoria Geral'
};

// Função para formatar o telefone brasileiro
export const formatarTelefone = (telefone: string): string => {
  // Remover todos os caracteres não numéricos
  const numeros = telefone.replace(/\D/g, '');
  
  // Formatar de acordo com o padrão brasileiro
  if (numeros.length === 11) {
    // Celular com 9 dígitos: (XX) 9XXXX-XXXX
    return `(${numeros.substring(0, 2)}) ${numeros.substring(2, 3)}${numeros.substring(3, 7)}-${numeros.substring(7)}`;
  } else if (numeros.length === 10) {
    // Telefone fixo: (XX) XXXX-XXXX
    return `(${numeros.substring(0, 2)}) ${numeros.substring(2, 6)}-${numeros.substring(6)}`;
  }
  
  // Se não conseguir formatar, retorna o original
  return telefone;
};

// Função para formatar a mensagem do WhatsApp
export const criarMensagemWhatsApp = (formData: Record<string, string>): string => {
  const nome = formData['nome'] || '';
  const servico = formData['servico_de_interesse'] || '';
  
  const servicoFormatado = servicoMap[servico] || servico || 'Informações gerais';
  
  return `Olá ${nome}, obrigado por entrar em contato com a MAPC!

Recebemos o seu contato sobre: ${servicoFormatado}

Um de nossos consultores entrará em contato com você em até 24 horas úteis para dar andamento ao seu processo.

Caso tenha alguma dúvida, não hesite em nos contatar pelo WhatsApp (81) 3019-2222.

Atenciosamente,
Equipe MAPC`;
};
