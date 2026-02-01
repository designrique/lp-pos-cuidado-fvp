import { Button } from '@/components/ui/button';

interface HeroProps {
  onOpenModal: () => void;
}

export const Hero = ({ onOpenModal }: HeroProps) => {
  return (
    <section className="relative bg-gradient-to-br from-primary via-primary to-blue-800 text-white overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src="/src/assets/hero-background.jpg"
          alt="Serviços de registro de marcas e patentes"
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
                Proteja Sua <span className="text-accent">Marca</span> e 
                <span className="text-accent"> Patente</span> com Segurança
              </h1>
              <p className="text-xl text-blue-100 max-w-2xl">
                Especialistas em registro de marcas e patentes no Brasil. 
                Mais de <strong>19 anos de experiência</strong> protegendo 
                empresas e empreendedores como você.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={onOpenModal}
                size="lg"
                className="btn-hero text-lg px-8 py-4"
              >
                Solicitar Orçamento Gratuito
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
              <div className="text-center">
                <div className="bg-white/10 rounded-lg p-4 mb-2">
                  <span className="text-3xl">🛡️</span>
                </div>
                <div className="text-sm">
                  <div className="font-bold text-2xl">3320+</div>
                  <div className="text-blue-200">Marcas Registradas</div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white/10 rounded-lg p-4 mb-2">
                  <span className="text-3xl">✅</span>
                </div>
                <div className="text-sm">
                  <div className="font-bold text-2xl">98%</div>
                  <div className="text-blue-200">Taxa de Aprovação</div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white/10 rounded-lg p-4 mb-2">
                  <span className="text-3xl">🏆</span>
                </div>
                <div className="text-sm">
                  <div className="font-bold text-2xl">19+</div>
                  <div className="text-blue-200">Anos de Experiência</div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white/10 rounded-lg p-4 mb-2">
                  <span className="text-3xl">👥</span>
                </div>
                <div className="text-sm">
                  <div className="font-bold text-2xl">500+</div>
                  <div className="text-blue-200">Clientes Satisfeitos</div>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 space-y-6">
            <h2 className="text-2xl font-bold">Por que escolher a MAPC?</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <span className="text-lg text-accent mt-1 flex-shrink-0">✅</span>
                <div>
                  <div className="font-semibold">Consulta Gratuita</div>
                  <div className="text-sm text-blue-200">
                    Análise completa da viabilidade do seu registro
                  </div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-lg text-accent mt-1 flex-shrink-0">✅</span>
                <div>
                  <div className="font-semibold">Acompanhamento Total</div>
                  <div className="text-sm text-blue-200">
                    Do protocolo até a concessão final
                  </div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-lg text-accent mt-1 flex-shrink-0">✅</span>
                <div>
                  <div className="font-semibold">Valores Competitivos</div>
                  <div className="text-sm text-blue-200">
                    Melhor custo-benefício do mercado
                  </div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-lg text-accent mt-1 flex-shrink-0">✅</span>
                <div>
                  <div className="font-semibold">Equipe Especializada</div>
                  <div className="text-sm text-blue-200">
                    Profissionais certificados pelo INPI
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};