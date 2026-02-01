import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Linkedin } from 'lucide-react';
import { OptimizedLogo } from '@/components/OptimizedLogo';

interface FooterProps {
  onOpenModal: () => void;
}

const Footer = ({ onOpenModal }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-6">
            <OptimizedLogo
              alt="MAPC - Marcas e Patentes"
              className="h-12 w-auto object-contain brightness-0 invert"
              width={120}
              height={48}
              loading="lazy"
              fetchPriority="low"
            />
            <p className="text-blue-100 leading-relaxed max-w-md">
              Especialistas em propriedade intelectual com mais de 15 anos de experiência. 
              Protegemos sua marca e patente com excelência e agilidade.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-colors" aria-label="Facebook" title="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-colors" aria-label="Instagram" title="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-colors" aria-label="LinkedIn" title="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold">Nossos Serviços</h3>
            <ul className="space-y-3 text-blue-100">
              <li>
                <a href="#" className="hover:text-white transition-colors">Registro de Marca</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Registro de Patente</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Desenho Industrial</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Busca de Anterioridade</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Monitoramento</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Renovação de Marca</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold">Contato</h3>
            <div className="space-y-4 text-blue-100">
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 mt-1 text-accent" />
                <div>
                  <div>(81) 3019-2222</div>
                  <div className="text-sm">WhatsApp e Ligações</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 mt-1 text-accent" />
                <div>
                  <div>mapc@mapc.com.br</div>
                  <div className="text-sm">E-mail principal</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 mt-1 text-accent" />
                <div>
                  <div>Rua Capitão Zuzinha, 22, loja 07</div>
                  <div className="text-sm">Boa Viagem, Recife-PE, CEP: 51130-420</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 mt-1 text-accent" />
                <div>
                  <div>Seg à Sex: 8h às 18h</div>
                  <div className="text-sm">Sáb: 8h às 12h</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-accent/20 border-t border-white/10">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold">
              Pronto para Proteger sua Marca?
            </h3>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Não perca mais tempo. Registre sua marca hoje e garanta proteção jurídica total para seu negócio.
            </p>
            <Button 
              onClick={onOpenModal}
              size="lg"
              className="bg-accent hover:bg-accent/90 text-white font-semibold px-8 py-3"
            >
              Começar Agora - Orçamento Gratuito
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black/20 border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-blue-200">
              © {currentYear} MAPC - Marcas e Patentes. Todos os direitos reservados.
            </div>
            <div className="flex space-x-6 text-sm text-blue-200">
              <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
              <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
              <a href="#" className="hover:text-white transition-colors">LGPD</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;