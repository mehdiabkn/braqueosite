// src/components/ItemCard.tsx
'use client'
import { useState } from 'react'
import LocationDisplay from './LocationDisplay'
import ImageGallery from './ImageGallery'
import { MessageCircle, MessageSquareText } from 'lucide-react'

// src/components/ItemCard.tsx
interface ItemCardProps {
  item: {
    id: string
    category: string
    subcategory: string
    description: string
    images: string[]
    latitude: number
    longitude: number
    views: number
    seekerId: boolean
    status: 'AVAILABLE' | 'MATCHED' | 'COMPLETED'
    finder?: {
      id: string
      username: string
    }
  }
  apiUrl: string
}

export default function ItemCard({ item, apiUrl }: ItemCardProps) {
  const [showGallery, setShowGallery] = useState(false)

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      {/* Image principale avec overlay si non disponible */}
      <div 
        className="relative w-full h-48 cursor-pointer group"
        onClick={() => setShowGallery(true)}
      >
        <img
          src={`${apiUrl}${item.images[0]}`}
          alt={item.description}
          className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 
            ${item.status !== 'AVAILABLE' ? 'opacity-75' : ''}`}
        />
        {item.images.length > 1 && (
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
            +{item.images.length - 1} photos
          </div>
        )}
        
        {/* Overlay pour objet réclamé */}
        {item.status !== 'AVAILABLE' && (
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent" />
        )}
      </div>

      <div className="p-4">
        <h2 className="text-xl font-semibold">
          {item.category} - {item.subcategory}
        </h2>
        <LocationDisplay latitude={item.latitude} longitude={item.longitude} />
        <p className="text-gray-300 mt-2">{item.description}</p>
        
        {/* Informations et actions */}
        <div className="mt-4">
          {item.seekerId !== null ? (
            <button
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-medium shadow-lg hover:from-blue-700 hover:to-blue-600 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <MessageSquareText className="h-5 w-5" />
              Objet réclamé, chattez avec votre victime
            </button>
          ) : (
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">
                Vues: {item.images ?? 0}
              </span>

              {item.seekerId && (
                <span className="text-green-400">
                  <MessageCircle className="h-6 w-6" />
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Galerie modale */}
      {showGallery && (
        <ImageGallery
          images={item.images}
          apiUrl={apiUrl}
          onClose={() => setShowGallery(false)}
        />
      )}
    </div>
  )
}