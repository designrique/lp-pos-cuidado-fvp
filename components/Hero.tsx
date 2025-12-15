import React, { useEffect, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useCheckout } from './CheckoutContext';

const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const { openCheckout } = useCheckout();

  useEffect(() => {
    setLoaded(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-brand-beige">
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="https://picsum.photos/1920/1080?grayscale&blur=2"
          alt="Natureza Espiritual"
          className="w-full h-[120%] object-cover opacity-30 transition-transform duration-75 ease-out"
          style={{ transform: `translateY(${scrollY * 0.4}px)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-beige/80 via-brand-beige/50 to-brand-beige"></div>
      </div>

      <div className={`relative z-10 max-w-4xl mx-auto px-6 text-center transition-all duration-1000 transform ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="mb-6 flex justify-center">
          <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-brand-lilac/30 text-brand-lilacDark text-sm font-sans tracking-widest uppercase animate-pulse">
            <Sparkles size={14} /> Jornada de 21 Dias
          </span>
        </div>

        <h1 className="font-serif text-5xl md:text-7xl text-brand-dark mb-6 leading-tight">
          Pare de Repetir Ciclos de Sofrimento e <span className="text-brand-gold italic">Abra seus Caminhos em 21 Dias</span>
        </h1>

        <p className="font-sans text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          21 dias de limpeza profunda e abertura energética para transformar sua realidade.
          Desperte, cure e transforme sua vida.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={openCheckout}
            className="group bg-brand-lilac hover:bg-brand-gold hover:scale-105 transition-all duration-300 text-brand-dark font-sans font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            Inscreva-se Agora
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <a href="#estrutura" className="text-brand-dark hover:text-brand-gold font-sans font-semibold py-4 px-8 underline decoration-brand-gold/30 hover:decoration-brand-gold transition-all">
            Saiba mais sobre a jornada
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
