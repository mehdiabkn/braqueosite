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
              Transformez votre vision en applications et sites web performants
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
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <Smartphone className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-2">Applications Mobiles</h3>
              <p className="text-gray-600">iOS, Android, React Native</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <Globe className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-2">Sites Web</h3>
              <p className="text-gray-600">Next.js, React, Vue.js</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <Code className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-2">Solutions Sur Mesure</h3>
              <p className="text-gray-600">API, Backend, Base de données</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Prêt à concrétiser votre projet ?
            </h2>
            <p className="text-xl mb-8">
              Réservez un appel de 30 minutes pour discuter de votre projet
            </p>
            <a
              href="VOTRE_LIEN_CALENDLY"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Réserver un appel
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}