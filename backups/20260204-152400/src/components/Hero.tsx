import React, { useEffect, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getHero } from '@/lib/cms';
import { useScheduling } from './SchedulingContext';

const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const { openScheduling } = useScheduling();

  const { data: heroData } = useQuery({
    queryKey: ['hero'],
    queryFn: getHero
  });

  useEffect(() => {
    setLoaded(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const title = heroData?.title || (
    <>Terapia Individual, Formação de Terapeutas e <span className="text-brand-goldDark italic">Grupo de Autoconhecimento</span></>
  );

  const subtitle = heroData?.subtitle || "Liberte-se: Desperte, Cure e Transforme sua Vida. Sua jornada de expansão começa aqui.";
  const ctaText = heroData?.ctaButtonText || "Marque um Atendimento";
  const bgImage = heroData?.backgroundImage?.url || "https://picsum.photos/1920/1080?grayscale&blur=2";

  return (
    <section className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden bg-brand-beige">
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={bgImage}
          alt="Natureza Espiritual"
          className="w-full h-[120%] object-cover opacity-30 transition-transform duration-75 ease-out"
          style={{ transform: `translateY(${scrollY * 0.4}px)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-beige/80 via-brand-beige/50 to-brand-beige"></div>
      </div>

      <div className={`relative z-10 max-w-5xl mx-auto px-4 md:px-6 text-center transition-all duration-1000 transform ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="mb-4 md:mb-6 flex justify-center">
          <span className="inline-flex items-center gap-2 px-3 md:px-4 py-1 rounded-full bg-brand-lilac/30 text-brand-lilacDark text-xs md:text-sm font-sans tracking-widest uppercase animate-pulse">
            <Sparkles size={14} /> Instituto Ariana Borges
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-brand-dark mb-6 leading-tight">
          {typeof title === 'string' ? title : title}
        </h1>

        <p className="font-sans text-base md:text-lg lg:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed whitespace-pre-line">
          {subtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center">
          <button
            onClick={openScheduling}
            className="group bg-brand-lilac hover:bg-brand-gold hover:scale-105 transition-all duration-300 text-brand-dark font-sans font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            {ctaText}
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
