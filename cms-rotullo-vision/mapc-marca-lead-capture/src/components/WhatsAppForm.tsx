import { useState, FormEvent } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import PhoneInput from './ui/phone-input';
import { Spinner } from './Spinner';
import { normalizePhoneForSubmission, isValidPhone } from '@/lib/phone-formatter';
import { useFailsafeForm } from '@/hooks/useFailsafeForm';
import { FormStatusAlert, ConnectivityStatus, RetryInfo } from '@/components/ui/FormStatusAlert';

interface FormData {
  nome: string;
  email: string;
  telefonewhatsapp: string;
  empresa: string;
  servico_de_interesse: string;
  mensagem: string;
  termos: boolean;
}

interface FormErrors {
  nome?: boolean;
  email?: boolean;
  telefonewhatsapp?: boolean;
  termos?: boolean;
}

interface WhatsAppFormProps {
  onSuccess: (data: FormData) => void;
  className?: string;
}

export function WhatsAppForm({ onSuccess, className = '' }: WhatsAppFormProps) {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    telefonewhatsapp: '55',
    empresa: '',
    servico_de_interesse: '',
    mensagem: '',
    termos: false
  });
  
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  // Hook para sistema à prova de falhas
  const {
    loading,
    error,
    success,
    isOffline,
    retryCount,
    showRetryOption,
    submitForm,
    handleRetrySubmission,
    handleFallbackSubmission,
    resetState
  } = useFailsafeForm({
    retryConfig: {
      maxRetries: 3,
      baseDelay: 1000,
      maxDelay: 8000,
      backoffMultiplier: 2
    },
    timeoutMs: 15000,
    autoRetryOnReconnect: true,
    enableOfflineMode: true
  });

  // Validar email
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Manipular mudanças no telefone
  const handlePhoneChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      telefonewhatsapp: value
    }));
  };

  // Validar o formulário
  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    
    // Validar nome
    if (!formData.nome.trim()) {
      errors.nome = true;
    }
    
    // Validar email
    if (!formData.email.trim() || !validateEmail(formData.email)) {
      errors.email = true;
    }
    
    // Validar telefone
    if (!isValidPhone(formData.telefonewhatsapp)) {
      errors.telefonewhatsapp = true;
    }
    
    // Atualizar estado de erros
    setFormErrors(errors);
    
    // Retorna true se não tiver erros
    return Object.keys(errors).length === 0;
  };

  // Função para enviar dados para NocoDB via Netlify Function (SEM webhook)
  const submitToNocoDB = async (formData: FormData) => {
    const nocodbData = {
      name: formData.nome,
      email: formData.email,
      phone: normalizePhoneForSubmission(formData.telefonewhatsapp),
      company: formData.empresa,
      interests: formData.servico_de_interesse,
      message: formData.mensagem,
      tableId: import.meta.env.VITE_NOCODB_TABLE_ID || 'mqe75g35dwbb4iw',
      // Flag para indicar que é do WhatsApp (não disparar webhook)
      source: 'whatsapp_button'
    };
    
    console.log('Enviando para NocoDB via WhatsApp Form...', nocodbData);
    
    const response = await fetch('/.netlify/functions/nocodb-submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nocodbData)
    });
    
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (parseError) {
        errorData = { error: `Erro ${response.status}: ${response.statusText}` };
      }
      console.error('Erro na Netlify Function:', errorData);
      throw new Error(`Falha ao enviar dados: ${errorData.error || 'Erro desconhecido'}`);
    }
    
    let data;
    try {
      data = await response.json();
    } catch (parseError) {
      throw new Error('Resposta inválida do servidor');
    }
    return data;
  };

  // Enviar formulário usando sistema à prova de falhas
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Validar formulário
    if (!validateForm()) {
      return;
    }

    // Resetar estado de erro anterior
    if (error) {
      resetState();
    }

    // Usar sistema failsafe para envio
    const result = await submitForm(formData, submitToNocoDB);
    
    if (result.success) {
      // Chamar callback de sucesso com os dados
      onSuccess(formData);
    }
  };

  // Handler para retry manual
  const handleRetry = async () => {
    await handleRetrySubmission();
  };

  // Handler para fallback (email)
  const handleFallback = async () => {
    await handleFallbackSubmission(formData);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Status de conectividade */}
      <ConnectivityStatus isOnline={!isOffline} />
      
      {/* Status do formulário */}
      {(loading || error || success || isOffline) && (
        <FormStatusAlert
          status={
            loading ? 'loading' :
            success ? 'success' :
            isOffline ? 'offline' : 'error'
          }
          message={error}
          onRetry={showRetryOption ? handleRetry : undefined}
          onFallback={handleFallback}
          showRetryOption={showRetryOption}
          retryCount={retryCount}
        />
      )}

      {retryCount > 0 && <RetryInfo retryCount={retryCount} maxRetries={3} />}

    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Nome */}
      <div className="space-y-2">
        <Label 
          htmlFor="nome" 
          className={formErrors.nome ? 'text-red-500' : ''}
        >
          Nome Completo*
        </Label>
        <Input
          id="nome"
          name="nome"
          type="text"
          value={formData.nome}
          onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
          className={formErrors.nome ? 'border-red-500' : ''}
          placeholder="Seu nome completo"
        />
        {formErrors.nome && (
          <p className="text-sm text-red-500">
            Por favor, informe seu nome
          </p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label 
          htmlFor="email" 
          className={formErrors.email ? 'text-red-500' : ''}
        >
          Email*
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          className={formErrors.email ? 'border-red-500' : ''}
          placeholder="seu@email.com"
        />
        {formErrors.email && (
          <p className="text-sm text-red-500">
            Por favor, informe um email válido
          </p>
        )}
      </div>

      {/* Telefone */}
      <div className="space-y-2">
        <Label 
          htmlFor="telefonewhatsapp" 
          className={formErrors.telefonewhatsapp ? 'text-red-500' : ''}
        >
          Telefone / WhatsApp*
        </Label>
        <PhoneInput
          value={formData.telefonewhatsapp.startsWith('55') 
            ? formData.telefonewhatsapp.substring(2) 
            : formData.telefonewhatsapp}
          onValueChange={handlePhoneChange}
          error={!!formErrors.telefonewhatsapp}
        />
        {formErrors.telefonewhatsapp && (
          <p className="text-sm text-red-500">
            Por favor, informe um telefone válido com DDD
          </p>
        )}
      </div>

      {/* Empresa */}
      <div className="space-y-2">
        <Label htmlFor="empresa">Empresa</Label>
        <Input
          id="empresa"
          name="empresa"
          type="text"
          value={formData.empresa}
          onChange={(e) => setFormData(prev => ({ ...prev, empresa: e.target.value }))}
          placeholder="Nome da sua empresa"
        />
      </div>

      {/* Serviço de Interesse */}
      <div className="space-y-2">
        <Label htmlFor="servico_de_interesse">Serviço de Interesse</Label>
        <select
          id="servico_de_interesse"
          name="servico_de_interesse"
          value={formData.servico_de_interesse}
          onChange={(e) => setFormData(prev => ({ ...prev, servico_de_interesse: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Selecione um serviço</option>
          <option value="registro-marca">Registro de Marca</option>
          <option value="registro-patente">Registro de Patente</option>
          <option value="consulta-marca">Consulta de Marca</option>
          <option value="consulta-patente">Consulta de Patente</option>
          <option value="outros">Outros</option>
        </select>
      </div>

      {/* Mensagem */}
      <div className="space-y-2">
        <Label htmlFor="mensagem">Mensagem</Label>
        <textarea
          id="mensagem"
          name="mensagem"
          value={formData.mensagem}
          onChange={(e) => setFormData(prev => ({ ...prev, mensagem: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
          placeholder="Conte-nos mais sobre sua necessidade..."
        />
      </div>

      {/* Botão de Envio */}
      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
      >
        {loading ? (
          <>
            <Spinner className="w-4 h-4" />
            <span>Enviando...</span>
          </>
        ) : (
          <>
            <span>📱</span>
            <span>Enviar e Ir para WhatsApp</span>
          </>
        )}
      </Button>
    </form>
    </div>
  );
}
