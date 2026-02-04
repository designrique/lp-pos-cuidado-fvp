import React from 'react';

const AboutIntro: React.FC = () => {
    return (
        <section className="py-20 bg-white overflow-hidden">
            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
                <div className="md:w-1/2 relative">
                    <div className="aspect-[4/5] rounded-2xl relative overflow-hidden shadow-xl">
                        <img
                            src="/Ariana-Borges-profile-photo.jpeg"
                            alt="Ariana Borges"
                            className="w-full h-full object-cover object-top"
                        />
                    </div>
                    {/* Decorative element */}
                    <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-brand-gold/20 rounded-full blur-2xl -z-10"></div>
                </div>

                <div className="md:w-1/2">
                    <div className="inline-block px-4 py-1 rounded-full bg-brand-lilac/30 text-brand-lilacDark text-xs font-bold tracking-widest uppercase mb-6">
                        Sobre Mim
                    </div>
                    <h2 className="font-serif text-4xl md:text-5xl text-brand-dark mb-6 leading-tight">
                        Olá! Sou Ariana Borges
                    </h2>
                    <p className="font-sans text-gray-600 text-lg leading-relaxed mb-6">
                        É um imenso privilégio dedicar minha vida à espiritualidade com um foco profundo na cura holística e no desenvolvimento pessoal.
                    </p>
                    <p className="font-sans text-gray-600 leading-relaxed mb-8">
                        Minha missão é guiar pessoas em jornadas de cura profunda e reconexão com sua essência, unindo espiritualidade, ciência e técnicas integrativas.
                    </p>
                    <a
                        href="/sobre"
                        className="inline-block bg-brand-dark text-white font-sans px-8 py-3 rounded-full font-bold hover:bg-brand-gold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                        Conheça minha história
                    </a>
                </div>
            </div>
        </section>
    );
};

export default AboutIntro;
