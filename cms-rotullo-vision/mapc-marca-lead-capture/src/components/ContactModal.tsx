import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { LeadCaptureForm } from './LeadCaptureForm';
import { trackEvent } from '@/lib/analytics';

interface ContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onFormSuccess?: (data: any) => void;
}

export const ContactModal = ({ open, onOpenChange, onFormSuccess }: ContactModalProps) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  
  // Reset success state when modal is closed
  useEffect(() => {
    if (!open) {
      setIsSuccess(false);
    }
  }, [open]);

  // Função chamada quando o formulário é enviado com sucesso
  const handleFormSuccess = (data?: any) => {
    console.log("Form submitted successfully! Showing success message.");
    setIsSuccess(true);
    
    // Rastrear evento de submissão de formulário
    trackEvent('form_submitted', {
      form: 'mautic_contact_form',
      source: 'website'
    });
    
    toast({
      title: "Contato Enviado!",
      description: "Recebemos seu contato. Retornaremos em breve!",
    });
    
    // Chamar callback se fornecido
    if (onFormSuccess) {
      onFormSuccess(data);
    }
    
    // Don't close automatically, let the user close the success message
    // They might want to read the message carefully
  };

  if (isSuccess) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent 
          className="max-w-md mx-auto" 
          aria-describedby="success-message"
          aria-labelledby="success-title"
        >
          <DialogDescription id="success-message" className="sr-only">
            Confirmação de envio de formulário
          </DialogDescription>
          <div className="text-center py-8">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce shadow-md" style={{animationDuration: '2s'}}>
              <div className="flex items-center justify-center w-full h-full overflow-hidden">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 640 512"
                  className="w-14 h-14"
                  fill="#22c55e" /* Cor verde de sucesso */
                >
                  {/* Font Awesome Free v7.0.1 by @fontawesome - https://fontawesome.com 
                      License - https://fontawesome.com/license/free 
                      Copyright 2025 Fonticons, Inc. */}
                  <path d="M64 176C64 149.5 85.5 128 112 128L528 128C554.5 128 576 149.5 576 176L576 257.4C551.6 246.2 524.6 240 496 240C408.3 240 334.3 298.8 311.3 379.2C304.2 377.9 297.2 375 291.2 370.4L83.2 214.4C71.1 205.3 64 191.1 64 176zM304 432C304 460.6 310.2 487.6 321.4 512L128 512C92.7 512 64 483.3 64 448L64 260L262.4 408.8C275 418.2 289.3 424.2 304.1 426.7C304.1 428.5 304 430.2 304 432zM352 432C352 352.5 416.5 288 496 288C575.5 288 640 352.5 640 432C640 511.5 575.5 576 496 576C416.5 576 352 511.5 352 432zM553.4 371.1C546.3 365.9 536.2 367.5 531 374.6L478 447.5L451.2 420.7C445 414.5 434.8 414.5 428.6 420.7C422.4 426.9 422.4 437.1 428.6 443.3L468.6 483.3C471.9 486.6 476.5 488.3 481.2 487.9C485.9 487.5 490.1 485.1 492.9 481.4L556.9 393.4C562.1 386.3 560.5 376.2 553.4 371.1z"/>
                </svg>
              </div>
            </div>
            <h3 id="success-title" className="text-2xl font-bold text-primary mb-3">Mensagem enviada com sucesso</h3>
            <p id="success-message" className="text-muted-foreground mb-6">
              Em até 24h úteis um vendedor da MAPC entrará em contato.
            </p>
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-2 w-2 bg-gray-300 rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
              <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></div>
              <div className="h-2 w-2 bg-gray-500 rounded-full animate-pulse" style={{ animationDelay: '600ms' }}></div>
            </div>
            <button 
              onClick={() => onOpenChange(false)}
              className="mt-4 px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              Fechar
            </button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="max-w-2xl mx-auto max-h-[90vh] overflow-y-auto"
        aria-describedby="contact-form-description"
      >
        <DialogDescription className="sr-only" id="contact-form-description">
          Formulário de contato para solicitação de orçamento
        </DialogDescription>
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">
            Solicite seu <span className="gradient-text">Orçamento Gratuito</span>
          </DialogTitle>
          <p className="text-center text-muted-foreground">
            Preencha o formulário e nossa equipe entrará em contato em até 24 horas
          </p>
        </DialogHeader>

        {/* Novo formulário com validação de telefone melhorada */}
        <div className="space-y-6">
          <div className="bg-slate-50 p-6 rounded-lg shadow-sm border border-slate-100">
            <LeadCaptureForm 
              onSuccess={handleFormSuccess}
              className="w-full" 
            />
          </div>
          <p className="text-xs text-muted-foreground text-center mt-4">
            Ao enviar, você concorda em receber contato da MAPC para apresentação de proposta.
            Seus dados estão seguros e não serão compartilhados.
          </p>
        </div>

        {/* Contact Info */}
        <div className="border-t pt-6 mt-6">
          <h4 className="font-semibold mb-4 text-center">Ou entre em contato diretamente:</h4>
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div className="flex items-center justify-center space-x-2 text-muted-foreground">
              <Phone className="h-4 w-4 text-accent" />
              <span className="text-sm">(81) 3019-2222</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-muted-foreground">
              <Mail className="h-4 w-4 text-accent" />
              <span className="text-sm">mapc@mapc.com.br</span>
            </div>
            <div className="col-span-full flex flex-col items-center justify-center space-y-1 text-muted-foreground">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-accent" />
                <span className="text-sm">Rua Capitão Zuzinha, 22, loja 07</span>
              </div>
              <span className="text-sm">Boa Viagem, Recife-PE, CEP: 51130-420</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
