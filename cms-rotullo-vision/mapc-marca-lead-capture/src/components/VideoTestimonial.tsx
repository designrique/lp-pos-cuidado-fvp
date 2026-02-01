interface VideoTestimonialProps {
  onOpenModal: () => void;
}

const VideoTestimonial = ({ onOpenModal }: VideoTestimonialProps) => {
  // Converter URL do YouTube para embed - começando em 23:22 (1402 segundos)
  const youtubeEmbedUrl = "https://www.youtube.com/embed/wPERv2_3yt8?si=bXkFq9BU--0FvAqx&start=1402";

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            + Depoimentos
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Veja o que nossos clientes falam sobre nossos serviços de registro de marcas
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">
                Marcos Bernart - Podcast Legião do Rock
              </h3>
              <p className="text-gray-300">
                Experiência completa com o registro de marcas pela MAPC
              </p>
            </div>
            
            {/* Video Container - Inspirado no player da Apple */}
            <div className="section-video">
              <div className="video-wrapper relative rounded-xl overflow-hidden shadow-2xl bg-black">
                <div className="aspect-w-16 aspect-h-9" style={{ aspectRatio: '16/9' }}>
                  <iframe
                    className="video absolute inset-0 w-full h-full"
                    src={youtubeEmbedUrl}
                    title="Depoimento Marcos Bernart - Podcast Legião do Rock - MAPC"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    loading="lazy"
                    sandbox="allow-scripts allow-same-origin allow-presentation"
                    fetchpriority="low"
                  />
                </div>
                
                {/* Overlay decorativo */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-4 left-4 flex items-center space-x-2 opacity-75">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Informações adicionais */}
            <div className="mt-6 p-6 bg-white/5 rounded-xl border border-white/10">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h4 className="font-semibold text-lg mb-1">
                    🎙️ Podcast Legião do Rock
                  </h4>
                  <p className="text-gray-300 text-sm">
                    Depoimento sobre a experiência de registro de marca
                  </p>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <span className="flex items-center space-x-1">
                    <span>⭐</span>
                    <span>Experiência 5 estrelas</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span>🛡️</span>
                    <span>Marca Protegida</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Call to Action */}
          <div className="text-center mt-12">
            <p className="text-gray-300 text-lg mb-6">
              Assim como o Marcos, você também pode proteger sua marca com segurança
            </p>
            <button
              onClick={onOpenModal}
              className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 transition-colors duration-300 px-8 py-4 rounded-xl text-white font-semibold shadow-lg cursor-pointer"
            >
              <span>📞</span>
              <span>Fale Conosco Agora</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export { VideoTestimonial };