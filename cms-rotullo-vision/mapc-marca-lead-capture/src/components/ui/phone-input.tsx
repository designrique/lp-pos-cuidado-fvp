import React, { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { 
  formatPhoneNumber, 
  normalizePhoneForSubmission,
  handlePhoneInput,
  isValidPhone
} from '@/lib/phone-formatter';

interface PhoneInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  onValueChange?: (value: string) => void;
}

export function PhoneInput({
  name,
  id,
  value,
  onChange,
  onBlur,
  className = '',
  placeholder = "(00) 00000-0000",
  error = false,
  onValueChange,
  ...props
}: PhoneInputProps) {
  const [inputValue, setInputValue] = useState(value as string || '55');
  const [isFocused, setIsFocused] = useState(false);
  
  // Sincronizar o valor interno quando o valor da prop muda
  useEffect(() => {
    if (value !== undefined && value !== inputValue) {
      setInputValue(value as string);
    }
  }, [value]);
  
  // Garantir que sempre temos o prefixo 55
  useEffect(() => {
    if (!inputValue || inputValue === '') {
      setInputValue('55');
    } else if (!inputValue.startsWith('55')) {
      setInputValue('55' + inputValue.replace(/\D/g, ''));
    }
  }, [inputValue]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Atualizar nosso estado interno
    const newValue = e.target.value.replace(/\D/g, '');
    
    // Garantir que temos o prefixo 55
    const valueWithPrefix = !newValue.startsWith('55') ? '55' + newValue : newValue;
    
    // Atualizar o valor no estado
    setInputValue(valueWithPrefix);
    
    // Propagar o evento para o onChange original se existir
    if (onChange) {
      // Precisamos modificar o valor no evento
      const newEvent = {
        ...e,
        target: {
          ...e.target,
          value: valueWithPrefix
        }
      } as React.ChangeEvent<HTMLInputElement>;
      
      onChange(newEvent);
    }
    
    // Notificar sobre a mudança através da callback opcional
    if (onValueChange) {
      onValueChange(valueWithPrefix);
    }
  };
  
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    
    // Propagamos o evento de focus original
    if (props.onFocus) {
      props.onFocus(e);
    }
  };
  
  const handleBlurEvent = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    
    // Validar o formato do telefone quando o usuário sai do campo
    const isValid = isValidPhone(inputValue);
    
    // Propagar o evento de blur original
    if (onBlur) {
      // Podemos adicionar informação de validação ao evento
      const newEvent = {
        ...e,
        target: {
          ...e.target,
          validity: {
            valid: isValid
          }
        }
      } as unknown as React.FocusEvent<HTMLInputElement>;
      
      onBlur(newEvent);
    }
  };
  
  // Formatar para exibição visual (sem o prefixo 55)
  const displayValue = inputValue.startsWith('55') 
    ? inputValue.substring(2) 
    : inputValue;
    
  // Formatação visual mais amigável
  const formattedVisual = formatPhoneNumber(displayValue);
  
  return (
    <div className="phone-input-wrapper">
      <div className={`phone-input-container ${isFocused ? 'focused' : ''} ${error ? 'has-error' : ''}`}>
        <span className="phone-country-code">+55</span>
        <Input
          type="tel"
          name={name}
          id={id}
          value={displayValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlurEvent}
          className={`phone-input ${className}`}
          placeholder={placeholder}
          inputMode="numeric"
          autoComplete="tel"
          {...props}
        />
        {formattedVisual !== displayValue && displayValue.length > 2 && (
          <span className="phone-format-preview">
            {formattedVisual}
          </span>
        )}
      </div>
      <span className="phone-format-hint">
        Digite apenas os números com DDD
      </span>
    </div>
  );
}

export default PhoneInput;