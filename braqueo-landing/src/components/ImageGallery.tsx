// src/components/ImageGallery.tsx
'use client'
import { useState, useCallback, useEffect } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

interface ImageGalleryProps {
  images: string[]
  apiUrl: string
  onClose: () => void
}

export default function ImageGallery({ images, apiUrl, onClose }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
      onClick={onClose}
    >
      <div className="relative w-full h-full flex items-center justify-center" onClick={e => e.stopPropagation()}>
        {/* Bouton fermer */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-white hover:text-gray-300 transition-colors z-50 bg-black/50 rounded-full"
        >
          <X size={32} />
        </button>

        {/* Boutons de navigation */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-4 z-50 p-4 text-white hover:text-gray-300 transition-colors bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70"
            >
              <ChevronLeft size={40} strokeWidth={3} />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 z-50 p-4 text-white hover:text-gray-300 transition-colors bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70"
            >
              <ChevronRight size={40} strokeWidth={3} />
            </button>
          </>
        )}

        {/* Image courante */}
        <div className="relative max-w-[90vw] max-h-[90vh]">
          <img
            src={`${apiUrl}${images[currentIndex]}`}
            alt={`Image ${currentIndex + 1}`}
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
          
          {/* Indicateur de position */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 
                  ${index === currentIndex 
                    ? 'w-8 bg-white' 
                    : 'bg-gray-500 hover:bg-gray-400'
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}