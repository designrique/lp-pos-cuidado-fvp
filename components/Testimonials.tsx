import React, { useState, useEffect } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Maria Silva",
    role: "Jornada Completa",
    text: "A Mesa de Salomão mudou completamente minha perspectiva sobre prosperidade. Senti os bloqueios se dissolvendo dia após dia e oportunidades surgindo do nada.",
    image: "https://picsum.photos/100/100?random=1"
  },
  {
    id: 2,
    name: "João Pereira",
    role: "Jornada Completa",
    text: "A energia da Ariana é indescritível. O acompanhamento diário fez toda a diferença para eu não desistir. Hoje me sinto leve e com caminhos abertos.",
    image: "https://picsum.photos/100/100?random=2"
  },
  {
    id: 3,
    name: "Ana Costa",
    role: "Jornada Completa",
    text: "Eu estava estagnada profissionalmente há anos. Após os 12 dias de abertura de caminhos, recebi uma proposta que esperava há muito tempo. Gratidão!",
    image: "https://picsum.photos/100/100?random=3"
  },
  {
    id: 4,
    name: "Carlos Mendes",
    role: "Jornada Completa",
    text: "Nunca tinha participado de algo tão profundo. As limpezas energéticas realmente funcionam. Recomendo para todos que buscam paz interior.",
    image: "https://picsum.photos/100/100?random=4"
  }
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    let interval: any;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        handleNext();
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    setIsAutoPlaying(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className="py-24 bg-brand-dark text-brand-beige relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-lilac/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <h2 className="font-serif text-3xl md:text-5xl text-center mb-16">
          Histórias de <span className="text-brand-gold">Libertação</span>
        </h2>

        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
            <Quote className="absolute top-8 left-8 text-brand-gold opacity-30 w-12 h-12 md:w-16 md:h-16" />

            <div className="relative overflow-hidden min-h-[300px] flex items-center">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`absolute w-full transition-all duration-700 ease-in-out transform ${index === currentIndex
                      ? 'opacity-100 translate-x-0'
                      : index < currentIndex
                        ? 'opacity-0 -translate-x-full'
                        : 'opacity-0 translate-x-full'
                    }`}
                >
                  <div className="flex flex-col items-center text-center">
                    <p className="font-sans text-xl md:text-2xl text-gray-200 italic mb-8 leading-relaxed max-w-2xl">
                      "{testimonial.text}"
                    </p>

                    <div className="flex flex-col items-center gap-4">
                      <div className="relative">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-16 h-16 rounded-full border-2 border-brand-gold object-cover shadow-lg"
                        />
                        <div className="absolute -bottom-2 -right-2 bg-brand-gold rounded-full p-1">
                          <Star size={12} className="text-white fill-white" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-serif text-2xl text-brand-gold">{testimonial.name}</h4>
                        <p className="text-sm text-gray-400 font-sans uppercase tracking-wider">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={handlePrev}
              className="absolute top-1/2 -left-4 md:-left-12 transform -translate-y-1/2 bg-white/10 hover:bg-brand-gold hover:text-white text-gray-300 p-3 rounded-full backdrop-blur-md transition-all duration-300 group"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => { handleNext(); setIsAutoPlaying(false); }}
              className="absolute top-1/2 -right-4 md:-right-12 transform -translate-y-1/2 bg-white/10 hover:bg-brand-gold hover:text-white text-gray-300 p-3 rounded-full backdrop-blur-md transition-all duration-300 group"
              aria-label="Próximo"
            >
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Dots Pagination */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-brand-gold w-8' : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                aria-label={`Ir para depoimento ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;