import { Calendar, Code, Smartphone, Globe } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section with Video */}
      <section className="bg-black text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Vous y avez cru ?
            </h1>
            <p className="text-xl mb-8">
              
            </p>
            {/* Remplacer src par le lien de votre vidéo */}
            <div className="aspect-video mb-8">
              <iframe 
                className="w-full h-full"
                src="VOTRE_LIEN_VIDEO"
                title="Présentation"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="text-xl font-bold mb-6">
              Vous avez un projet qui inclut du dév ? 
            </p>
            <a
              href="https://calendly.com/mehdi-aberkane-pro/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
            
              <Calendar className="w-5 h-5 mr-2" />
              Prenons un créneau
            </a>
          </div>
        </div>
      </section>



    </main>
  );
}