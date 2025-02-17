// src/app/post-item/components/AddressSearch.tsx
'use client'
import { useState, useEffect, useRef } from 'react'

interface Position {
  lat: number
  lng: number
}

interface SearchResult {
  display_name: string
  lat: string
  lon: string
}

interface AddressSearchProps {
  onSelectAddress: (position: Position) => void
}

// Fonction debounce simple
function debounce(func: Function, wait: number) {
  let timeout: NodeJS.Timeout | null = null;
  return function executedFunction(...args: any[]) {
    const later = () => {
      if (timeout) clearTimeout(timeout);
      func(...args);
    };
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default function AddressSearch({ onSelectAddress }: AddressSearchProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowResults(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const searchAddress = debounce(async (searchQuery: string) => {
    if (searchQuery.length < 3) {
      setResults([])
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=5`
      )
      const data = await response.json()
      setResults(data)
      setShowResults(true)
    } catch (error) {
      console.error('Erreur lors de la recherche d\'adresse:', error)
    } finally {
      setIsLoading(false)
    }
  }, 300)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    searchAddress(e.target.value)
  }

  const handleSelectResult = (result: SearchResult) => {
    setQuery(result.display_name)
    setShowResults(false)
    onSelectAddress({
      lat: parseFloat(result.lat),
      lng: parseFloat(result.lon)
    })
  }

  return (
    <div ref={wrapperRef} className="relative mb-4" style={{ zIndex: 1000 }}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Rechercher une adresse..."
          className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        {isLoading && (
          <div className="absolute right-3 top-2.5">
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>

      {showResults && results.length > 0 && (
        <div className="absolute w-full mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          {results.map((result, index) => (
            <button
              key={index}
              onClick={() => handleSelectResult(result)}
              className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
            >
              {result.display_name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}