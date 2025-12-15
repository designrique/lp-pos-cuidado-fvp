import React from 'react';
import { Star } from 'lucide-react';
import { PricingOption } from '../types';
import { useCheckout } from './CheckoutContext';

const plans: PricingOption[] = [
  {
    title: "Ciclo Individual",
    price: "R$333,00",
    features: [
      "Escolha entre 'Quebra' ou 'Abre Caminho'",
      "Acesso ao grupo de suporte do ciclo",
      "Gravações diárias do ciclo escolhido",
      "Materiais complementares básicos"
    ],
    recommended: false
  },
  {
    title: "Jornada Completa",
    price: "R$555,00",
    features: [
      "Acesso aos 21 dias completos",
      "Economia de R$111,00",
      "Grupo VIP de acompanhamento",
      "Gravações vitalícias de todos os dias",
      "Bônus: Ritual de Encerramento ao Vivo"
    ],
    recommended: true
  }
];

const Pricing: React.FC = () => {
  const { openCheckout } = useCheckout();

  return (
    <section className="py-24 bg-white" id="investimento">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl text-brand-dark mb-4">Investimento em Você</h2>
          <p className="font-sans text-gray-600">Escolha como deseja iniciar sua transformação.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative flex flex-col p-8 rounded-3xl transition-all duration-300 ${plan.recommended ? 'bg-brand-lilac/10 border-2 border-brand-gold shadow-xl scale-105 z-10' : 'bg-gray-50 border border-gray-100 hover:shadow-lg'}`}
            >
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-brand-gold text-white px-4 py-1 rounded-full text-sm font-bold font-sans tracking-wide shadow-md">
                  MAIS ESCOLHIDO
                </div>
              )}

              <h3 className="font-serif text-2xl text-brand-dark mb-2">{plan.title}</h3>
              <div className="my-6">
                <span className="text-4xl font-serif text-brand-gold font-bold">{plan.price}</span>
                {!plan.recommended && <span className="text-gray-400 text-sm ml-2">/ por ciclo</span>}
                {plan.recommended && <span className="text-gray-400 text-sm ml-2">/ total</span>}
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3 text-gray-600 font-sans text-sm">
                    <Star className={`w-4 h-4 mt-1 ${plan.recommended ? 'text-brand-gold fill-brand-gold' : 'text-gray-400'}`} />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={openCheckout}
                className={`w-full py-4 rounded-xl font-bold transition-colors ${plan.recommended ? 'bg-brand-gold text-white hover:bg-yellow-600' : 'bg-white border-2 border-gray-200 text-gray-600 hover:border-brand-gold hover:text-brand-gold'}`}
              >
                Garantir Minha Vaga
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
