import { Calendar } from 'lucide-react';

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
              src="https://www.youtube.com/embed/SnQGjpL06pM?rel=0&controls=1&modestbranding=1&showinfo=0&playsinline=1"
              title="Vous y avez cru ?"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full aspect-video rounded-lg shadow-lg"
            ></iframe>
            </div>
            <p className="text-xl mb-6">
              Vous avez un projet qui inclut du dév ? 
            </p>
            
            <a  href="https://calendly.com/mehdi-aberkane-pro/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Prenons un créneau
            </a>
          </div>
          <div className="max-w-4xl mx-auto text-center pt-12 border-t border-gray-800 mt-12">
            <p className="text-gray-400 mb-4">Voici notre vrai site</p>
            <a 
              href="https://lyamapps.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors font-semibold text-lg"
            >
              lyamapps.com
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}