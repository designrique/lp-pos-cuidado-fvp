/**
 * Formatador de números de telefone para o padrão brasileiro (XX) XXXXX-XXXX
 */

/**
 * Formata um número de telefone para exibição visual no formato (XX) XXXXX-XXXX
 * @param value String contendo o número de telefone (pode conter caracteres não numéricos)
 * @returns String formatada para exibição
 */
export const formatPhoneNumber = (value: string): string => {
  // Remove todos os caracteres não numéricos
  const numbers = value.replace(/\D/g, '');
  
  // Aplicar formatação com base no número de dígitos
  if (numbers.length <= 2) {
    return numbers;
  } else if (numbers.length <= 7) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  } else if (numbers.length <= 11) {
    // Verifica se é celular (começa com 9 após o DDD)
    if (numbers.length > 2 && numbers.charAt(2) === '9') {
      // Formato celular: (XX) 9XXXX-XXXX
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
    } else {
      // Formato fixo: (XX) XXXX-XXXX
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6, 10)}`;
    }
  } else {
    // Para números internacionais ou números com mais dígitos
    // Tenta extrair o DDD e formatar o resto
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  }
};

/**
 * Normaliza um número de telefone para envio com prefixo 55 (Brasil)
 * @param phoneInput String contendo o número de telefone a ser normalizado
 * @returns String contendo apenas números com o prefixo 55
 */
export const normalizePhoneForSubmission = (phoneInput: string): string => {
  // Remove todos os caracteres não numéricos
  const digits = phoneInput.replace(/\D/g, '');
  
  // Garante que tenha o prefixo do Brasil (55)
  if (digits.length <= 2) {
    return `55${digits}`;
  } else if (digits.startsWith('55')) {
    return digits;
  } else if (digits.startsWith('0')) {
    // Remove o 0 inicial e adiciona 55
    return `55${digits.slice(1)}`;
  } else {
    return `55${digits}`;
  }
};

/**
 * Verifica se um número de telefone é válido segundo regras básicas
 * @param phone String contendo o número de telefone
 * @returns boolean indicando se o telefone é válido
 */
export const isValidPhone = (phone: string): boolean => {
  // Remove todos os caracteres não numéricos
  const digits = phone.replace(/\D/g, '');
  
  // Verifica se o número tem pelo menos 10 dígitos (2 DDD + 8 número)
  // ou se já começar com 55, pelo menos 12 dígitos (55 + DDD + número)
  if (digits.startsWith('55')) {
    return digits.length >= 12;
  }
  
  return digits.length >= 10;
};

/**
 * Aplica máscara de telefone brasileiro enquanto o usuário digita
 * @param event Evento de input do React
 * @param setValue Função para atualizar o estado do componente
 */
export const handlePhoneInput = (
  event: React.ChangeEvent<HTMLInputElement>,
  setValue: (value: string) => void
): void => {
  const input = event.target;
  let value = input.value.replace(/\D/g, '');
  
  // Garante que tenha o prefixo 55 (Brasil)
  if (!value.startsWith('55')) {
    value = '55' + value;
  }
  
  // Limita o tamanho máximo (55 + DDD + número = 13 caracteres)
  if (value.length > 13) {
    value = value.substring(0, 13);
  }
  
  // Atualiza o valor formatado para a UI
  setValue(value);
  
  // Atualiza o atributo visual para exibir o formato
  const formatted = formatPhoneNumber(value.substring(2)); // Remove o 55 para formatação visual
  input.setAttribute('data-formatted', `+55 ${formatted}`);
};

/**
 * Formata um telefone com o prefixo +55 para exibição visual
 * @param phone Número de telefone incluindo o prefixo 55
 * @returns String formatada para exibição, ex: "+55 (11) 98765-4321"
 */
export const formatPhoneWithCountryCode = (phone: string): string => {
  const digits = phone.replace(/\D/g, '');
  
  // Se o número já começa com 55 (Brasil), remove para formatação
  const phoneWithoutCountry = digits.startsWith('55') 
    ? digits.substring(2) 
    : digits;
  
  return `+55 ${formatPhoneNumber(phoneWithoutCountry)}`;
};