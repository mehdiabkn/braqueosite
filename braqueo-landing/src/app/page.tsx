'use client'

import { useState, useRef } from 'react'
import dynamic from 'next/dynamic'
import { categories } from '../lib/categories'
import AddressSearch from '../components/AddressSearch'
import { useRouter } from 'next/navigation'
import { register } from '../lib/api'
import { Search, MapPin, Calendar, DollarSign, X, ChevronDown, Eye, EyeOff } from 'lucide-react'

const Map = dynamic(() => import('./components/Map'), {
  loading: () => <p>Chargement de la carte...</p>,
  ssr: false
})

export default function HomePage() {
  const router = useRouter()
  const mapRef = useRef(null)
  
  // Form states
  const [position, setPosition] = useState({ lat: 48.8566, lng: 2.3522 })
  const [category, setCategory] = useState('')
  const [foundAt, setFoundAt] = useState('')
  const [address, setAddress] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  // Modal states
  const [showModal, setShowModal] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState<'SEEKER' | 'FINDER'>('SEEKER')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleMarkerChange = (lat: number, lng: number) => {
    setPosition({ lat, lng });
  };

  const handleAddressSelect = (newPosition: { lat: number; lng: number }) => {
    setPosition(newPosition);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!category || !foundAt) {
      setError('Veuillez remplir tous les champs');
      return;
    }
    setShowModal(true);
  };

// Dans le composant HomePage
const handleSignup = async (e: React.FormEvent) => {
  e.preventDefault()
  setLoading(true)
  setError('')

  if (password !== confirmPassword) {
    setError('Les mots de passe ne correspondent pas')
    setLoading(false)
    return
  }

  try {
    const data = await register(username, password, role)
    console.log("✅ Réponse API après inscription :", data)
    setShowModal(false);
    if (!data.user || !data.token) {
      throw new Error("❌ Les données de l'utilisateur sont incomplètes !")
    }

    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))
    console.log("📌 Vérification après stockage :", localStorage.getItem('user'))

    // Rediriger vers la recherche avec les paramètres
    const searchParams = new URLSearchParams({
      category,
      radius: '5',
      lat: position.lat.toString(),
      lng: position.lng.toString(),
      address: address,
      lostAt: new Date(foundAt).toISOString()
    })

    router.push(`/results?${searchParams.toString()}`)
  } catch (error) {
    setError((error as Error).message || 'Erreur lors de l\'inscription')
  } finally {
    setLoading(false)
  }
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700">
      <div className="relative h-screen">
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center mt-10">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
            Je te revends ce que je t'ai volé
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl">
            La première plateforme collaborative entre 
            <span className="text-blue-400"> voleurs fair-play </span>
            et <span className="text-blue-400">victimes désespérées.</span>
          </p>

          <div className="w-full max-w-4xl bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-2xl">
            <form onSubmit={handleSearch} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Type d'objet
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Sélectionner</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-10 text-gray-400" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Date et heure estimée
                  </label>
                  <input
                    type="datetime-local"
                    value={foundAt}
                    onChange={(e) => setFoundAt(e.target.value)}
                    className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-4">
                <AddressSearch onSelectAddress={handleAddressSelect} />
                <div className="h-64 mt-4 rounded-lg overflow-hidden">
                  <Map 
                    latitude={position.lat}
                    longitude={position.lng}
                    address={address}
                    setAddress={setAddress}
                    onMarkerChange={handleMarkerChange}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg text-lg font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <MapPin />
                Localiser mon bien
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Section Comment ça marche */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Comment ça marche ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Totalement anonymisé</h3>
              <p className="text-gray-400">
                On ne récolte aucune information sur vos connexions
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Trouvez</h3>
              <p className="text-gray-400">
                Identifiez votre bien parmi les objets déclarés
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Récupérez</h3>
              <p className="text-gray-400">
                Contactez le voleur anonymisé et récupérez votre bien
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-75"></div>
          <div className="relative bg-gray-800 bg-opacity-90 rounded-lg p-8 max-w-md w-full text-white">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
              onClick={() => setShowModal(false)}
            >
              <X className="w-6 h-6" />
            </button>
            <div className="flex justify-center mb-6">
              <img src="/braqueo.png" alt="Logo" className="h-12" />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-center">Créez votre compte pour rechercher</h2>
            
            {error && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded text-red-500">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Je suis...
                </label>
                <div className="mt-2 space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio" 
                      value="SEEKER" 
                      checked={role === 'SEEKER'}
                      onChange={(e) => setRole(e.target.value as 'SEEKER' | 'FINDER')}
                      className="h-4 w-4 text-blue-500 border-gray-300"
                    />
                    <span className="text-gray-300">À la recherche d'un objet perdu</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio" 
                      value="FINDER" 
                      checked={role === 'FINDER'}
                      onChange={(e) => setRole(e.target.value as 'SEEKER' | 'FINDER')}
                      className="h-4 w-4 text-blue-500 border-gray-300"
                    />
                    <span className="text-gray-300">Un voleur professionnel</span>
                  </label>
                </div>
              </div>

              <div>
                <label htmlFor="username" className="block mb-2">
                  Nom d'utilisateur
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Votre nom d'utilisateur"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block mb-2">
                  Mot de passe
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Votre mot de passe"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block mb-2">
                  Confirmer le mot de passe
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Confirmez votre mot de passe"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-blue-600 py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 font-semibold focus:ring-blue-500 ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Création en cours...' : 'Créer mon compte'}
              </button>
                <div className="text-center">
                    <a 
                      href="/signin" 
                      className="text-gray-400 hover:text-gray-200 text-sm"
                    >
                      J'ai déjà un compte
                    </a>
                  </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}