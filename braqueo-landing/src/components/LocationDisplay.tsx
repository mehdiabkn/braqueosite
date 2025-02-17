// src/components/LocationDisplay.tsx
'use client'
import { useState, useEffect } from 'react'
import { getAddressFromCoordinates } from '../lib/locationFormatter'
import { MapPin } from 'lucide-react'
import MapModal from './MapModal'

interface LocationDisplayProps {
  latitude: number
  longitude: number
}

export default function LocationDisplay({ latitude, longitude }: LocationDisplayProps) {
  const [address, setAddress] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [showMap, setShowMap] = useState(false)

  useEffect(() => {
    let mounted = true

    async function loadAddress() {
      try {
        const result = await getAddressFromCoordinates(latitude, longitude)
        if (mounted) {
          setAddress(result)
        }
      } catch (error) {
        if (mounted) {
          setAddress(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`)
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    loadAddress()

    return () => {
      mounted = false
    }
  }, [latitude, longitude])

  return (
    <div>
      <div className="flex items-center gap-3">
        <p className="text-gray-400">
          {loading ? 'Chargement de l\'adresse...' : address}
        </p>
        <button
          onClick={() => setShowMap(true)}
          className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200 border border-gray-700"
        >
          <MapPin size={30} />
          Lieu exact
        </button>
      </div>

      {showMap && (
        <MapModal 
          latitude={latitude}
          longitude={longitude}
          address={address}
          onClose={() => setShowMap(false)}
        />
      )}
    </div>
  )
}