import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import Authority from './components/Authority';
import Cycles from './components/Cycles';
import Experience from './components/Experience';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import ScrollReveal from './components/ScrollReveal';
import ThankYou from './components/ThankYou';
import { CheckoutProvider, useCheckout } from './components/CheckoutContext';
import CheckoutModal from './components/CheckoutModal';

const HomePage = () => {
  const { openCheckout } = useCheckout();

  return (
    <>
      <nav className="fixed top-0 w-full z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 h-16 flex items-center transition-all duration-300">
        <div className="max-w-6xl mx-auto px-6 w-full flex justify-between items-center">
          <span className="font-serif font-bold text-xl tracking-wider text-brand-dark hover:text-brand-gold transition-colors cursor-pointer">ARIANA BORGES</span>
          <button
            onClick={openCheckout}
            className="hidden md:block bg-brand-dark text-white font-sans px-5 py-2 rounded-full text-xs font-bold hover:bg-brand-gold hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            INSCRICOES ABERTAS
          </button>
        </div>
      </nav>

      <Hero />

      <ScrollReveal>
        <Authority />
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <Cycles />
      </ScrollReveal>

      <ScrollReveal>
        <Experience />
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <Pricing />
      </ScrollReveal>

      <ScrollReveal>
        <Testimonials />
      </ScrollReveal>

      {/* Final CTA Section */}
      <ScrollReveal>
        <section className="py-24 bg-brand-lilac/30 text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-white/40 rounded-full blur-3xl -z-10"></div>
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="font-serif text-4xl md:text-5xl text-brand-dark mb-6">
              Este é o momento de libertar-se e expandir sua vida
            </h2>
            <p className="font-sans text-gray-600 text-lg mb-10">
              Não deixe para depois a transformação que você pode iniciar agora.
            </p>
            <button
              onClick={openCheckout}
              className="bg-brand-lilacDark hover:bg-brand-gold text-white font-sans font-bold py-5 px-10 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 text-lg transform hover:-translate-y-1 hover:scale-105"
            >
              Garanta sua vaga na Mesa de Salomão
            </button>
          </div>
        </section>
      </ScrollReveal>

      <Footer />
      <ChatWidget />
      <CheckoutModal />
    </>
  );
};

const App: React.FC = () => {
  return (
    <CheckoutProvider>
      <main className="min-h-screen bg-brand-beige overflow-x-hidden selection:bg-brand-lilac selection:text-brand-dark">
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/obrigado" element={<ThankYou />} />
          </Routes>
        </Router>
      </main>
    </CheckoutProvider>
  );
};

export default App;
