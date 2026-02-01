import { CheckCircle, ArrowRight } from 'lucide-react';

export const Process = () => {
  const steps = [
    {
      number: "01",
      title: "Consulta Inicial",
      description: "Análise gratuita da viabilidade do seu registro e orientação completa sobre o processo.",
      duration: "1-2 dias úteis"
    },
    {
      number: "02", 
      title: "Pesquisa de Anterioridade",
      description: "Verificação detalhada se já existe marca ou patente similar registrada no Brasil.",
      duration: "3-5 dias úteis"
    },
    {
      number: "03",
      title: "Preparação dos Documentos",
      description: "Elaboração de toda documentação técnica e jurídica necessária para o protocolo.",
      duration: "5-7 dias úteis"
    },
    {
      number: "04",
      title: "Protocolo no INPI",
      description: "Envio oficial do pedido ao Instituto Nacional da Propriedade Industrial.",
      duration: "1 dia útil"
    },
    {
      number: "05",
      title: "Acompanhamento Processual",
      description: "Monitoramento completo do andamento e resposta a exigências quando necessário.",
      duration: "6-18 meses"
    },
    {
      number: "06",
      title: "Concessão Final",
      description: "Recebimento do certificado oficial de registro da sua marca ou patente.",
      duration: "Após aprovação"
    }
  ];

  return (
    <section id="processo" className="section-padding">
      <div className="container mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            Como Funciona o <span className="gradient-text">Processo</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Um processo simples e transparente para garantir a proteção da sua propriedade intelectual
            com total segurança e acompanhamento profissional.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="flex items-start space-x-6 pb-12">
                {/* Step Number */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {step.number}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="bg-card rounded-xl p-6 shadow-md card-hover">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-bold text-foreground">
                        {step.title}
                      </h3>
                      <span className="bg-muted text-foreground/75 px-3 py-1 rounded-full text-sm font-medium">
                        {step.duration}
                      </span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                    
                    <div className="flex items-center mt-4 text-accent">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      <span className="text-sm font-medium">Incluído no serviço</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="absolute left-8 top-16 w-0.5 h-12 bg-gradient-to-b from-accent to-accent/30"></div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12 p-8 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl">
          <h3 className="text-2xl font-bold mb-4">
            Pronto para Proteger sua Marca ou Patente?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Nossa equipe está pronta para guiá-lo em cada etapa do processo. 
            Começe agora mesmo com uma consulta gratuita.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center text-accent">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span>Consulta 100% Gratuita</span>
            </div>
            <div className="flex items-center text-accent">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span>Sem Compromisso</span>
            </div>
            <div className="flex items-center text-accent">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span>Resposta em 24h</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};