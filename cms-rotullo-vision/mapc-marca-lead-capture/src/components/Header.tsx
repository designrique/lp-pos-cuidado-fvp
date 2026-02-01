import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { OptimizedLogo } from '@/components/OptimizedLogo';

interface HeaderProps {
  onOpenModal: () => void;
}

export const Header = ({ onOpenModal }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <OptimizedLogo
              className="h-12 w-auto object-contain"
              width={120}
              height={48}
              loading="eager"
              fetchPriority="high"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('servicos')}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Serviços
            </button>
            <button 
              onClick={() => scrollToSection('processo')}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Processo
            </button>
            <button 
              onClick={() => scrollToSection('beneficios')}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Benefícios
            </button>
            <button 
              onClick={() => scrollToSection('depoimentos')}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Depoimentos
            </button>
          </nav>

          {/* Contact Info & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Phone className="h-4 w-4" />
                <span>(81) 3019-2222</span>
              </div>
              <div className="flex items-center space-x-1">
                <Mail className="h-4 w-4" />
                <span>mapc@mapc.com.br</span>
              </div>
            </div>
            <Button 
              onClick={onOpenModal}
              className="btn-hero"
            >
              Solicitar Orçamento
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border">
            <nav className="flex flex-col space-y-4 pt-4">
              <button 
                onClick={() => scrollToSection('servicos')}
                className="text-left text-muted-foreground hover:text-primary transition-colors"
              >
                Serviços
              </button>
              <button 
                onClick={() => scrollToSection('processo')}
                className="text-left text-muted-foreground hover:text-primary transition-colors"
              >
                Processo
              </button>
              <button 
                onClick={() => scrollToSection('beneficios')}
                className="text-left text-muted-foreground hover:text-primary transition-colors"
              >
                Benefícios
              </button>
              <button 
                onClick={() => scrollToSection('depoimentos')}
                className="text-left text-muted-foreground hover:text-primary transition-colors"
              >
                Depoimentos
              </button>
              <Button 
                onClick={onOpenModal}
                className="btn-hero w-full mt-4"
              >
                Solicitar Orçamento
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};