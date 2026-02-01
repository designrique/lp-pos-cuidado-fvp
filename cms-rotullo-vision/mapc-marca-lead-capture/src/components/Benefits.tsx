import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const Benefits = () => {
  const benefits = [
    {
      icon: "🛡️",
      title: "Proteção Jurídica Total",
      description: "Sua marca e patente ficam protegidas por lei contra uso indevido e plágio.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: "📈",
      title: "Valorização do Negócio",
      description: "Marcas registradas aumentam significativamente o valor da sua empresa.",
      color: "from-green-500 to-green-600"
    },
    {
      icon: "💰",
      title: "Geração de Receita",
      description: "Licencie sua marca/patente para terceiros e crie novas fontes de renda.",
      color: "from-yellow-500 to-yellow-600"
    },
    {
      icon: "👥",
      title: "Credibilidade no Mercado",
      description: "Clientes confiam mais em empresas com marcas oficialmente registradas.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: "🎯",
      title: "Exclusividade Nacional",
      description: "Uso exclusivo da sua marca em todo território brasileiro por 10 anos.",
      color: "from-red-500 to-red-600"
    },
    {
      icon: "🏆",
      title: "Vantagem Competitiva",
      description: "Diferenciação única no mercado com proteção legal garantida.",
      color: "from-indigo-500 to-indigo-600"
    }
  ];

  const stats = [
    { number: "87%", label: "das empresas aumentam vendas após registro" },
    { number: "65%", label: "de aumento médio no valor da empresa" },
    { number: "92%", label: "de proteção contra concorrência desleal" },
    { number: "10 anos", label: "de proteção renovável" }
  ];

  return (
    <section id="beneficios" className="section-padding bg-gradient-to-br from-muted/30 to-accent/5">
      <div className="container mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            Por que Registrar sua <span className="gradient-text">Marca ou Patente</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Descubra os benefícios exclusivos que só quem possui registro de marca e patente 
            pode aproveitar no mercado brasileiro.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-xl shadow-md">
              <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => {
            return (
              <Card key={index} className="card-hover group border-0 shadow-md bg-white/80 backdrop-blur-sm">
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${benefit.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-2xl">{benefit.icon}</span>
                  </div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action Box */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Não Deixe sua Marca Desprotegida
          </h3>
          <p className="text-muted-foreground text-lg mb-8 max-w-3xl mx-auto">
            A cada dia que passa sem registrar sua marca, você corre o risco de perdê-la para um concorrente. 
            Proteja seu patrimônio agora mesmo com a MAPC.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center justify-center space-x-2 text-accent">
              <span className="text-lg">✅</span>
              <span className="font-medium">Processo 100% Online</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-accent">
              <span className="text-lg">✅</span>
              <span className="font-medium">Resultado Garantido</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-accent">
              <span className="text-lg">✅</span>
              <span className="font-medium">Suporte Especializado</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-6">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <span className="text-2xl">⏰</span>
              <span className="text-lg font-semibold">Oferta Limitada</span>
            </div>
            <p className="text-2xl font-bold text-primary mb-2">
              Consulta Gratuita + Desconto de 10%
            </p>
            <p className="text-muted-foreground">
              Válido apenas para os primeiros 20 clientes deste mês
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};