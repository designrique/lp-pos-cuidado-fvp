import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Award, Heart, BookOpen, Users, Star, Sparkles } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import { useScheduling } from '@/components/SchedulingContext';
import { Link } from 'react-router-dom';

const credentials = [
    { icon: <BookOpen size={24} />, title: 'Psicanálise Integrativa', description: 'Formação aprofundada em técnicas psicanalíticas' },
    { icon: <Star size={24} />, title: 'ThetaHealing®', description: 'Instrutora certificada internacionalmente' },
    { icon: <Heart size={24} />, title: 'Neurociência', description: 'Estudos em neurociência aplicada à cura' },
    { icon: <Award size={24} />, title: 'Mindfulness', description: 'Especialização em práticas meditativas' },
];

const stats = [
    { number: '12.000+', label: 'Atendimentos realizados' },
    { number: '1.500+', label: 'Alunos impactados' },
    { number: '10+', label: 'Anos de experiência' },
    { number: '20+', label: 'Técnicas integrativas' },
];

const Sobre: React.FC = () => {
    const { openScheduling } = useScheduling();

    return (
        <>
            <Helmet>
                <title>Quem sou - Instituto Ariana Borges</title>
                <meta name="description" content="Conheça Ariana Borges, terapeuta e mentora espiritual com mais de 12 mil atendimentos. Minha missão é guiar pessoas em jornadas de cura profunda." />
                <meta property="og:title" content="Quem sou - Instituto Ariana Borges" />
            </Helmet>

            {/* Hero Section */}
            <section className="relative py-20 bg-brand-beige overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-lilac/20 rounded-full blur-3xl -z-10"></div>
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="md:w-1/2 relative">
                            <div className="aspect-[4/5] rounded-2xl relative overflow-hidden shadow-2xl">
                                <img
                                    src="/Ariana-Borges-profile-photo.jpeg"
                                    alt="Ariana Borges"
                                    className="w-full h-full object-cover object-top"
                                />
                            </div>
                            <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-brand-gold/20 rounded-full blur-2xl -z-10"></div>
                            <div className="absolute -top-6 -left-6 w-32 h-32 bg-brand-lilac/30 rounded-full blur-2xl -z-10"></div>
                        </div>

                        <div className="md:w-1/2">
                            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-brand-lilac/30 text-brand-lilacDark text-xs font-bold tracking-widest uppercase mb-6">
                                <Sparkles size={14} /> Sobre Mim
                            </div>
                            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-dark mb-6 leading-tight">
                                Olá, sou <span className="text-brand-goldDark italic">Ariana Borges</span>
                            </h1>
                            <p className="font-sans text-gray-600 text-lg leading-relaxed mb-6">
                                É um imenso privilégio dedicar minha vida à espiritualidade com um foco profundo na cura holística e no desenvolvimento pessoal.
                            </p>
                            <p className="font-sans text-gray-600 leading-relaxed mb-8">
                                Sou terapeuta e mentora espiritual com mais de 12 mil atendimentos e 1.500 alunos impactados. Minha missão é guiar pessoas em jornadas de cura profunda e reconexão com sua essência, unindo espiritualidade, ciência e técnicas integrativas.
                            </p>
                            <button
                                onClick={openScheduling}
                                className="bg-brand-lilacDark hover:bg-brand-gold text-white font-sans font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                            >
                                Marque um Atendimento
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <ScrollReveal>
                <section className="py-16 bg-white">
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="font-serif text-4xl md:text-5xl text-brand-goldDark mb-2">{stat.number}</div>
                                    <div className="font-sans text-gray-600 text-sm">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </ScrollReveal>

            {/* About Text Section */}
            <ScrollReveal>
                <section className="py-20 bg-brand-beige">
                    <div className="max-w-4xl mx-auto px-6">
                        <h2 className="font-serif text-3xl md:text-4xl text-brand-dark text-center mb-12">
                            Minha Jornada
                        </h2>
                        <div className="prose prose-lg max-w-none">
                            <p className="font-sans text-gray-600 leading-relaxed mb-6">
                                Minha formação combina estudos em Psicanálise, Neurociência, Mindfulness e Terapias Vibracionais. Ao longo dos anos, desenvolvi uma abordagem única que integra conhecimentos científicos com sabedoria ancestral, sempre com o objetivo de promover transformações profundas e duradouras.
                            </p>
                            <p className="font-sans text-gray-600 leading-relaxed mb-6">
                                Acredito que cada pessoa carrega dentro de si a capacidade de se curar e se transformar. Meu papel é ser uma facilitadora desse processo, oferecendo ferramentas, técnicas e um espaço seguro para que você possa reconectar-se com sua verdadeira essência.
                            </p>
                            <p className="font-sans text-gray-600 leading-relaxed">
                                Através do Instituto Ariana Borges, ofereço terapias individuais, formações de terapeutas e grupos de autoconhecimento, sempre com o compromisso de promover cura, consciência e evolução espiritual.
                            </p>
                        </div>
                    </div>
                </section>
            </ScrollReveal>

            {/* Credentials Section */}
            <ScrollReveal>
                <section className="py-20 bg-white">
                    <div className="max-w-6xl mx-auto px-6">
                        <h2 className="font-serif text-3xl md:text-4xl text-brand-dark text-center mb-12">
                            Formação e Certificações
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {credentials.map((cred, index) => (
                                <div
                                    key={index}
                                    className="bg-brand-beige p-6 rounded-2xl text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                                >
                                    <div className="text-brand-gold mb-4 bg-white w-14 h-14 rounded-full flex items-center justify-center mx-auto shadow-sm">
                                        {cred.icon}
                                    </div>
                                    <h3 className="font-serif text-lg text-brand-dark mb-2">{cred.title}</h3>
                                    <p className="font-sans text-gray-600 text-sm">{cred.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </ScrollReveal>

            {/* Instituto Section */}
            <ScrollReveal>
                <section className="py-20 bg-brand-lilac/10">
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="text-center mb-12">
                            <h2 className="font-serif text-3xl md:text-4xl text-brand-dark mb-4">
                                O Instituto Ariana Borges
                            </h2>
                            <p className="font-sans text-gray-600 max-w-2xl mx-auto">
                                Um espaço dedicado à transformação interior e ao despertar espiritual.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <Link to="/terapia-individual" className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                                <div className="text-brand-gold mb-4">
                                    <Heart size={32} />
                                </div>
                                <h3 className="font-serif text-xl text-brand-dark mb-3">Terapia Individual</h3>
                                <p className="font-sans text-gray-600 text-sm mb-4">
                                    Sessões personalizadas para sua jornada de cura e autoconhecimento.
                                </p>
                                <span className="text-brand-lilacDark font-bold text-sm group-hover:text-brand-gold transition-colors">
                                    Saiba mais →
                                </span>
                            </Link>

                            <Link to="/formacao-de-terapeutas" className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                                <div className="text-brand-gold mb-4">
                                    <Award size={32} />
                                </div>
                                <h3 className="font-serif text-xl text-brand-dark mb-3">Formação de Terapeutas</h3>
                                <p className="font-sans text-gray-600 text-sm mb-4">
                                    Torne-se um agente de transformação com nossas formações certificadas.
                                </p>
                                <span className="text-brand-lilacDark font-bold text-sm group-hover:text-brand-gold transition-colors">
                                    Saiba mais →
                                </span>
                            </Link>

                            <Link to="/autoconhecimento-em-grupo" className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                                <div className="text-brand-gold mb-4">
                                    <Users size={32} />
                                </div>
                                <h3 className="font-serif text-xl text-brand-dark mb-3">Autoconhecimento em Grupo</h3>
                                <p className="font-sans text-gray-600 text-sm mb-4">
                                    Jornadas coletivas de transformação e despertar espiritual.
                                </p>
                                <span className="text-brand-lilacDark font-bold text-sm group-hover:text-brand-gold transition-colors">
                                    Saiba mais →
                                </span>
                            </Link>
                        </div>
                    </div>
                </section>
            </ScrollReveal>

            {/* CTA Section */}
            <ScrollReveal>
                <section className="py-24 bg-white text-center relative overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-brand-lilac/20 rounded-full blur-3xl -z-10"></div>
                    <div className="max-w-4xl mx-auto px-6">
                        <h2 className="font-serif text-4xl md:text-5xl text-brand-dark mb-6">
                            Olá, Ser de Luz
                        </h2>
                        <p className="font-sans text-gray-600 text-lg mb-10 max-w-2xl mx-auto">
                            Sua jornada de transformação começa com um primeiro passo. Estou aqui para guiá-lo nessa caminhada de cura e autoconhecimento.
                        </p>
                        <button
                            onClick={openScheduling}
                            className="bg-brand-lilacDark hover:bg-brand-gold text-white font-sans font-bold py-4 px-10 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 text-lg transform hover:-translate-y-1 hover:scale-105"
                        >
                            Agendar Atendimento
                        </button>
                    </div>
                </section>
            </ScrollReveal>
        </>
    );
};

export default Sobre;
