import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ShieldCheck, 
  Lightbulb, 
  FileText, 
  Search, 
  Users, 
  Clock,
  ArrowRight
} from 'lucide-react';

interface ServicesProps {
  onOpenModal: () => void;
}

export const Services = ({ onOpenModal }: ServicesProps) => {
  const services = [
    {
      icon: ShieldCheck,
      title: "Registro de Marca",
      description: "Proteja sua marca com registro no INPI. Processo completo com acompanhamento total.",
      features: [
        "Consulta de viabilidade",
        "Protocolo no INPI",
        "Acompanhamento processual",
        "Certificado de registro"
      ]
    },
    {
      icon: Lightbulb,
      title: "Registro de Patente",
      description: "Registre sua invenção e garanta exclusividade comercial por até 20 anos.",
      features: [
        "Análise de patenteabilidade",
        "Redação técnica",
        "Depósito no INPI",
        "Exame técnico"
      ]
    },
    {
      icon: FileText,
      title: "Desenho Industrial",
      description: "Proteja a forma ornamental dos seus produtos com registro de desenho industrial.",
      features: [
        "Análise de novidade",
        "Preparação do pedido",
        "Depósito oficial",
        "Acompanhamento"
      ]
    },
    {
      icon: Search,
      title: "Busca de Anterioridade",
      description: "Verifique se sua marca ou invenção já existe antes do registro.",
      features: [
        "Busca nacional",
        "Busca internacional",
        "Relatório detalhado",
        "Recomendações"
      ]
    },
    {
      icon: Users,
      title: "Monitoramento de Marca",
      description: "Acompanhe e proteja sua marca contra uso indevido por terceiros.",
      features: [
        "Monitoramento mensal",
        "Alertas automáticos",
        "Relatório de infrações",
        "Ações de proteção"
      ]
    },
    {
      icon: Clock,
      title: "Renovação de Marca",
      description: "Mantenha sua marca sempre protegida com nosso serviço de renovação.",
      features: [
        "Lembretes automáticos",
        "Processo simplificado",
        "Acompanhamento total",
        "Certificado atualizado"
      ]
    }
  ];

  return (
    <section id="servicos" className="section-padding bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            Nossos <span className="gradient-text">Serviços</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Oferecemos uma gama completa de serviços para proteger sua propriedade intelectual
            com excelência e agilidade.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card key={index} className="card-hover group border-0 shadow-md">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-4">
                    <div className="text-center">
                      <Button 
                        onClick={onOpenModal}
                        className="w-full group"
                        variant="outline"
                      >
                        Solicitar Orçamento
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button 
            onClick={onOpenModal}
            size="lg"
            className="btn-hero"
          >
            Fale Conosco - Orçamento Gratuito
          </Button>
        </div>
      </div>
    </section>
  );
};