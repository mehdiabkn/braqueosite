// src/components/MapModal.tsx
'use client'
import { X } from 'lucide-react'
import dynamic from 'next/dynamic'

const DynamicMap = dynamic(() => import('./Map'), {
  loading: () => <p>Chargement de la carte...</p>,
  ssr: false
})

interface MapModalProps {
  latitude: number
  longitude: number
  address: string
  onClose: () => void
}

export default function MapModal({ latitude, longitude, address, onClose }: MapModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black bg-opacity-50">
      <div className="relative w-full max-w-2xl bg-gray-900 rounded-lg shadow-xl">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h3 className="text-lg font-medium text-white">
            Localisation
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="h-96">
          <DynamicMap 
            latitude={latitude} 
            longitude={longitude} 
            address={address} 
          />
        </div>
      </div>
    </div>
  )
}