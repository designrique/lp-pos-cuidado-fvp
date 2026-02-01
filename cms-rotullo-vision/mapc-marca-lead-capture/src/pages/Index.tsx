import { useState, lazy, Suspense } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { Process } from '@/components/Process';
import { Benefits } from '@/components/Benefits';
import { ContactModal } from '@/components/ContactModal';
import { WhatsAppFloatingButton } from '@/components/WhatsAppFloatingButton';

// Lazy load componentes abaixo da dobra para melhor performance
const Testimonials = lazy(() => import('@/components/Testimonials').then(m => ({ default: m.Testimonials })));
const VideoTestimonial = lazy(() => import('@/components/VideoTestimonial').then(m => ({ default: m.VideoTestimonial })));
const Footer = lazy(() => import('@/components/Footer'));

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Header onOpenModal={() => setIsModalOpen(true)} />
      <Hero onOpenModal={() => setIsModalOpen(true)} />
      <Services onOpenModal={() => setIsModalOpen(true)} />
      <Process />
      <Benefits />
      <Suspense fallback={<div className="min-h-[400px]" />}>
        <Testimonials />
      </Suspense>
      <Suspense fallback={<div className="min-h-[400px]" />}>
        <VideoTestimonial onOpenModal={() => setIsModalOpen(true)} />
      </Suspense>
      <Suspense fallback={<div className="min-h-[400px]" />}>
        <Footer onOpenModal={() => setIsModalOpen(true)} />
      </Suspense>
      
      <ContactModal 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen} 
      />
      
      {/* Botão Flutuante do WhatsApp */}
      <WhatsAppFloatingButton phoneNumber="558130192222" />
    </div>
  );
};

export default Index;
