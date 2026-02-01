import React, { useState, FormEvent } from 'react';
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import PhoneInput from "./ui/phone-input";
import { Spinner } from "./Spinner";
import { normalizePhoneForSubmission, isValidPhone } from '@/lib/phone-formatter';
import { useFailsafeForm } from '@/hooks/useFailsafeForm';
import { FormStatusAlert, ConnectivityStatus, RetryInfo } from '@/components/ui/FormStatusAlert';
import '@/components/ui/phone-input.css';

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

interface LeadCaptureFormProps {
  onSuccess?: (data?: FormData) => void;
  className?: string;
}

export function LeadCaptureForm({ onSuccess, className = '' }: LeadCaptureFormProps) {
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
  
  // Validar email com regex
  const validateEmail = (email: string): boolean => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };
  
  // Handler para inputs de texto
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    // Para checkbox, pegamos o checked
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
      
      // Limpar erro se marcado
      if (checked && formErrors[name as keyof FormErrors]) {
        setFormErrors(prev => ({ ...prev, [name]: false }));
      }
      return;
    }
    
    // Para outros inputs
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Limpar erro se tiver valor
    if (value && formErrors[name as keyof FormErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: false }));
    }
  };
  
  // Handler específico para o telefone
  const handlePhoneChange = (value: string) => {
    setFormData(prev => ({ ...prev, telefonewhatsapp: value }));
    
    // Limpar erro se o telefone for válido
    if (isValidPhone(value) && formErrors.telefonewhatsapp) {
      setFormErrors(prev => ({ ...prev, telefonewhatsapp: false }));
    }
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
    
    // Validar termos (se obrigatório)
    // Descomente se os termos forem obrigatórios
    /*
    if (!formData.termos) {
      errors.termos = true;
    }
    */
    
    // Atualizar estado de erros
    setFormErrors(errors);
    
    // Retorna true se não tiver erros
    return Object.keys(errors).length === 0;
  };
  
  // Função para enviar dados para NocoDB via Netlify Function
  const submitToNocoDB = async (formData: FormData) => {
    const nocodbData = {
      name: formData.nome,
      email: formData.email,
      phone: normalizePhoneForSubmission(formData.telefonewhatsapp),
      company: formData.empresa,
      interests: formData.servico_de_interesse,
      message: formData.mensagem,
      tableId: import.meta.env.VITE_NOCODB_TABLE_ID || 'mqe75g35dwbb4iw' // ID da tabela Leads no NocoDB
    };
    
    console.log('Enviando para NocoDB via Netlify Function...', nocodbData);
    
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
      // Resetar formulário apenas em caso de sucesso
      setFormData({
        nome: '',
        email: '',
        telefonewhatsapp: '55',
        empresa: '',
        servico_de_interesse: '',
        mensagem: '',
        termos: false
      });
      
      // Chamar callback de sucesso
      if (onSuccess) {
        onSuccess(formData);
      }
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
    <div className={`space-y-4 ${className}`}>
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

    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Nome */}
      <div className="space-y-2">
        <Label htmlFor="nome" className={formErrors.nome ? 'text-red-500' : ''}>
          Nome completo*
        </Label>
        <Input 
          id="nome" 
          name="nome" 
          value={formData.nome}
          onChange={handleInputChange}
          placeholder="Seu nome completo" 
          className={formErrors.nome ? 'border-red-500' : ''}
        />
        {formErrors.nome && (
          <p className="text-sm text-red-500">Campo obrigatório</p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email" className={formErrors.email ? 'text-red-500' : ''}>
          Email*
        </Label>
        <Input 
          id="email" 
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          type="email" 
          placeholder="seu@email.com" 
          className={formErrors.email ? 'border-red-500' : ''}
        />
        {formErrors.email && (
          <p className="text-sm text-red-500">
            {!formData.email.trim() 
              ? 'Campo obrigatório' 
              : 'Por favor, informe um email válido'}
          </p>
        )}
      </div>

      {/* Telefone / WhatsApp */}
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
        <Label htmlFor="empresa">
          Empresa
        </Label>
        <Input 
          id="empresa" 
          name="empresa"
          value={formData.empresa}
          onChange={handleInputChange}
          placeholder="Nome da sua empresa" 
        />
      </div>
      
      {/* Serviço de Interesse */}
      <div className="space-y-2">
        <Label htmlFor="servico_de_interesse">
          Serviço de Interesse
        </Label>
        <select
          id="servico_de_interesse"
          name="servico_de_interesse"
          value={formData.servico_de_interesse}
          onChange={handleInputChange}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="">Selecione um serviço</option>
          <option value="registro-marca">Registro de Marca</option>
          <option value="registro-patente">Registro de Patente</option>
          <option value="desenho-industrial">Desenho Industrial</option>
          <option value="busca-anterioridade">Busca de Anterioridade</option>
          <option value="monitoramento-marca">Monitoramento de Marca</option>
          <option value="renovacao-marca">Renovação de Marca</option>
          <option value="consultoria-geral">Consultoria Geral</option>
        </select>
      </div>
      
      {/* Mensagem */}
      <div className="space-y-2">
        <Label htmlFor="mensagem">
          Mensagem
        </Label>
        <textarea
          id="mensagem"
          name="mensagem"
          value={formData.mensagem}
          onChange={handleInputChange}
          placeholder="Descreva sua necessidade (opcional)"
          className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>

      {/* Termos */}
      <div className="items-top flex space-x-2">
        <Checkbox 
          id="termos" 
          name="termos"
          checked={formData.termos}
          onCheckedChange={(checked) => {
            setFormData(prev => ({ ...prev, termos: checked === true }));
            if (checked && formErrors.termos) {
              setFormErrors(prev => ({ ...prev, termos: false }));
            }
          }}
        />
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor="termos"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Aceito receber informações sobre a MAPC
          </label>
          {formErrors.termos && (
            <p className="text-sm text-red-500">Você precisa aceitar os termos</p>
          )}
        </div>
      </div>

      {/* Botão de Envio */}
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <>
            <Spinner className="mr-2 h-4 w-4" />
            Enviando...
          </>
        ) : (
          'Solicitar avaliação gratuita'
        )}
      </Button>
    </form>
    </div>
  );
}