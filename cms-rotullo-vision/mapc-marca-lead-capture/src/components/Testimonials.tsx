import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from 'react';
import { api, TestimonialData } from '@/lib/api';

interface Testimonial {
  name: string;
  company: string;
  content: string;
  image: string;
  rating: number;
}

// Função para gerar avatar personalizado
const generateAvatarUrl = (name: string): string => {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2);
  const colors = [
    { bg: '3B82F6', fg: 'FFFFFF' }, // blue
    { bg: '10B981', fg: 'FFFFFF' }, // emerald
    { bg: '8B5CF6', fg: 'FFFFFF' }, // violet
    { bg: 'F59E0B', fg: 'FFFFFF' }, // amber
    { bg: 'EF4444', fg: 'FFFFFF' }, // red
    { bg: '06B6D4', fg: 'FFFFFF' }, // cyan
    { bg: '84CC16', fg: 'FFFFFF' }, // lime
    { bg: 'EC4899', fg: 'FFFFFF' }  // pink
  ];

  const colorIndex = name.length % colors.length;
  const { bg, fg } = colors[colorIndex];

  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${bg}&color=${fg}&size=128&bold=true&format=png`;
};

const testimonials: Testimonial[] = [
  {
    name: "João Castelo Branco",
    company: "JCB Public",
    content: "Registrar minha marca me deu a segurança de estar investindo em uma identidade própria no mercado. Quando registrei minha marca com a MAPC, os negócios decolaram! A MAPC tem seriedade, eficiência e me acompanha sempre que preciso.",
    image: "/images/testimonials/joao-castelo-branco.jpg",
    rating: 5
  },
  {
    name: "Jo Cestari",
    company: "Fracta",
    content: "A experiência com essa empresa (MAPC) é muito boa por conta do acompanhamento deles, que é intenso e sempre com muitos feedbacks, e tenho muito agradecimento pelo registro de nossa marca pelo impacto positivo no negócio.",
    image: "/images/testimonials/jo-cestari.jpg",
    rating: 5
  },
  {
    name: "Paulo Moura",
    company: "Cachaça Graduada",
    content: "Após procurar por várias empresas para registrar o nosso produto, a seriedade que Dilermar e Ana nos passaram fez com que ficássemos com eles nos últimos anos. Por isto, recomendo o serviço da MAPC.",
    image: "/images/testimonials/paulo-moura.png",
    rating: 5
  },
  {
    name: "Roberto Amorim",
    company: "Kampalla Café",
    content: "É com muita satisfação e com orgulho que posso falar que a MAPC conseguiu realizar o registro da nossa marca. Estou extremamente satisfeito com o serviço prestado e recomendo a todos que necessitem registrar suas marcas.",
    image: "/images/testimonials/roberto-amorim.jpg",
    rating: 5
  },
  {
    name: "Dr. Paulo Campos",
    company: "iAIDvr",
    content: "É com muita satisfação e com orgulho que posso falar que a MAPC conseguiu realizar o registro da nossa marca. Estou extremamente satisfeito com o serviço prestado e recomendo a todos que necessitem registrar suas marcas.",
    image: "/images/testimonials/paulo-campos.jpeg",
    rating: 5
  },
  {
    name: "Eric Rodrigues",
    company: "ASSERPU",
    content: "Registrei a marca com a MAPC e outro um diferencial incrível! Recomendo muito o trabalho da MAPC, principalmente pela dedicação e atenção que eles dão aos clientes.",
    image: "/images/testimonials/fotoeric.png",
    rating: 5
  },
  {
    name: "Sérgio Luiz",
    company: "SLOREP",
    content: "Registrei minha marca através da MAPC e me surpreendi com a agilidade do processo e acompanhamento. Super recomendo os serviços da MAPC para registro de marcas.",
    image: "/images/testimonials/slorep.png",
    rating: 5
  },
  {
    name: "Tatiana Costa",
    company: "Gaurê Artesanato",
    content: "A MAPC é uma empresa fantástica! Me ajudaram desde o início com muita paciência, dedicação e profissionalismo. Recomendo de olhos fechados!",
    image: "/images/testimonials/gaure.jpeg",
    rating: 5
  }
];

const Testimonials = () => {
  const [testimonialsData, setTestimonialsData] = useState<TestimonialData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<TestimonialData[]>('/public/testimonials');
        setTestimonialsData(response.data);
      } catch (error) {
        console.error('Error fetching testimonials data:', error);
      }
    };

    fetchData();
  }, []);

  const getTestimonials = () => {
    if (testimonialsData.length > 0) return testimonialsData;
    return testimonials; // Use the hardcoded array as fallback
  };

  const currentTestimonials = getTestimonials();

  // Force deploy - using real client images only
  return (
    <section className="py-20 bg-gray-50" id="depoimentos">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            O que nossos clientes dizem
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Veja como ajudamos empresas a crescer e se destacar no mercado
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentTestimonials.map((testimonial, index) => {
            const imageUrl = typeof testimonial.image === 'string'
              ? testimonial.image
              : testimonial.image?.url || generateAvatarUrl(testimonial.name);

            return (
              <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={imageUrl}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full mr-4 object-cover shadow-lg"
                      width={64}
                      height={64}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = generateAvatarUrl(testimonial.name);
                      }}
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                      <p className="text-gray-600 text-sm">{testimonial.company}</p>
                    </div>
                  </div>

                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-lg">⭐</span>
                    ))}
                  </div>                <blockquote className="text-gray-700 italic">
                    "{testimonial.content}"
                  </blockquote>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  );
};

export { Testimonials };
