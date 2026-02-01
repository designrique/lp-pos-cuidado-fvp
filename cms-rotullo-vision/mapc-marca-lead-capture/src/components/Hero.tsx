import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { api, HeroData } from '@/lib/api';

interface HeroProps {
  onOpenModal: () => void;
}

export const Hero = ({ onOpenModal }: HeroProps) => {
  const [heroData, setHeroData] = useState<HeroData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<HeroData>('/public/hero');
        setHeroData(response.data);
      } catch (error) {
        console.error('Error fetching hero data:', error);
      }
    };

    fetchData();
  }, []);

  const getBgImage = () => {
    if (!heroData?.backgroundImage) return "/src/assets/hero-background.jpg";
    if (typeof heroData.backgroundImage === 'string') return heroData.backgroundImage;
    return heroData.backgroundImage.url;
  };

  const getStats = () => {
    if (heroData?.stats && heroData.stats.length > 0) return heroData.stats;
    return [
      { icon: "🛡️", value: "3320+", label: "Marcas Registradas" },
      { icon: "✅", value: "98%", label: "Taxa de Aprovação" },
      { icon: "🏆", value: "19+", label: "Anos de Experiência" },
      { icon: "👥", value: "500+", label: "Clientes Satisfeitos" }
    ];
  };

  const getBenefits = () => {
    if (heroData?.benefits && heroData.benefits.length > 0) return heroData.benefits;
    return [
      { title: "Consulta Gratuita", description: "Análise completa da viabilidade do seu registro" },
      { title: "Acompanhamento Total", description: "Do protocolo até a concessão final" },
      { title: "Valores Competitivos", description: "Melhor custo-benefício do mercado" },
      { title: "Equipe Especializada", description: "Profissionais certificados pelo INPI" }
    ];
  };

  const stats = getStats();
  const benefits = getBenefits();

  return (
    <section className="relative bg-gradient-to-br from-primary via-primary to-blue-800 text-white overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={getBgImage()}
          alt={heroData?.title || "Serviços de registro de marcas e patentes"}
          className="w-full h-full object-cover opacity-20"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-blue-800/90"></div>
      </div>

      <div className="relative container mx-auto section-padding">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {heroData?.title || <>Proteja Sua <span className="text-accent">Marca</span> e <span className="text-accent"> Patente</span> com Segurança</>}
              </h1>
              <p className="text-xl text-blue-100 max-w-2xl">
                {heroData?.subtitle || <>Especialistas em registro de marcas e patentes no Brasil. Mais de <strong>19 anos de experiência</strong> protegendo empresas e empreendedores como você.</>}
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button
                onClick={onOpenModal}
                size="lg"
                className="btn-hero text-lg px-8 py-4"
              >
                {heroData?.ctaButtonText || "Solicitar Orçamento Gratuito"}
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="bg-white/10 rounded-lg p-4 mb-2">
                    <span className="text-3xl">{stat.icon}</span>
                  </div>
                  <div className="text-sm">
                    <div className="font-bold text-2xl">{stat.value}</div>
                    <div className="text-blue-200">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits Card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 space-y-6">
            <h2 className="text-2xl font-bold">Por que escolher a MAPC?</h2>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <span className="text-lg text-accent mt-1 flex-shrink-0">✅</span>
                  <div>
                    <div className="font-semibold">{benefit.title}</div>
                    <div className="text-sm text-blue-200">
                      {benefit.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};