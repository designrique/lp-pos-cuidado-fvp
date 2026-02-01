import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { WhatsAppForm } from './WhatsAppForm';

interface WhatsAppFloatingButtonProps {
  phoneNumber?: string;
}

export const WhatsAppFloatingButton = ({ 
  phoneNumber = "558130192222" 
}: WhatsAppFloatingButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<any>(null);

  const handleFormSuccess = (data: any) => {
    console.log('Formulário WhatsApp preenchido, redirecionando...', data);
    setFormData(data);
    setIsSuccess(true);
    
    // Fechar modal após 3 segundos e redirecionar
    setTimeout(() => {
      setIsModalOpen(false);
      setIsSuccess(false);
      redirectToWhatsApp(data);
    }, 3000);
  };

  const redirectToWhatsApp = (data: any) => {
    // Criar mensagem personalizada com os dados do formulário
    const message = `Olá! Meu nome é ${data.nome} e gostaria de saber mais sobre os serviços de ${data.servico_de_interesse || 'registro de marcas e patentes'}.

📧 Email: ${data.email}
📱 Telefone: ${data.telefonewhatsapp}
🏢 Empresa: ${data.empresa || 'Não informado'}

${data.mensagem ? `💬 Mensagem: ${data.mensagem}` : ''}

Aguardo seu contato!`;

    // Codificar a mensagem para URL
    const encodedMessage = encodeURIComponent(message);
    
    // URL do WhatsApp
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Abrir WhatsApp em nova aba
    window.open(whatsappUrl, '_blank');
  };

  const handleClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      {/* Botão Flutuante */}
      <button
        onClick={handleClick}
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 group"
        aria-label="Falar no WhatsApp"
        title="Falar no WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
        
        {/* Tooltip */}
        <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Falar no WhatsApp
          <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-800"></div>
        </div>
      </button>

      {/* Modal do Formulário WhatsApp */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent 
          className="max-w-2xl mx-auto max-h-[90vh] overflow-y-auto"
          aria-describedby="whatsapp-form-description"
        >
          <DialogDescription className="sr-only" id="whatsapp-form-description">
            Formulário de contato para redirecionamento ao WhatsApp
          </DialogDescription>
          
          {isSuccess ? (
            // Tela de Sucesso
            <div className="text-center py-8">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl">✓</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-green-600 mb-3">
                Sua solicitação foi enviada com sucesso!
              </h3>
              <p className="text-gray-600 mb-4">
                Aguarde, você está sendo redirecionado para o WhatsApp da MAPC
              </p>
              <div className="flex items-center justify-center gap-2">
                <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="h-2 w-2 bg-green-600 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>
          ) : (
            // Formulário
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl text-center">
                  Fale Conosco no <span className="text-green-600">WhatsApp</span>
                </DialogTitle>
                <p className="text-center text-muted-foreground">
                  Preencha o formulário e seja redirecionado diretamente para nosso WhatsApp
                </p>
              </DialogHeader>

              <div className="space-y-6">
                <div className="bg-green-50 p-6 rounded-lg shadow-sm border border-green-100">
                  <WhatsAppForm 
                    onSuccess={handleFormSuccess}
                    className="w-full" 
                  />
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  Ao enviar, você será redirecionado para o WhatsApp da MAPC.
                  Seus dados estão seguros e não serão compartilhados.
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
