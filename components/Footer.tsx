import React from 'react';
import { Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-beige py-8 md:py-12 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
        <div className="text-center md:text-left">
          <h3 className="font-serif text-xl md:text-2xl text-brand-dark mb-1 md:mb-2">Mesa de Salomão</h3>
          <p className="font-sans text-gray-500 text-xs md:text-sm">
            © {new Date().getFullYear()} Ariana Borges. Todos os direitos reservados.
          </p>
        </div>

        <div className="flex gap-4 md:gap-6">
          <a href="https://instagram.com/institutoarianaborges" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-gold transition-colors">
            <Instagram size={20} className="md:w-6 md:h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;