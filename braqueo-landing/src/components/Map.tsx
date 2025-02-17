// src/components/Map.tsx
'use client'
import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix pour les icônes Leaflet
const DefaultIcon = L.icon({
  iconUrl: '/images/marker-icon.png',
  iconRetinaUrl: '/images/marker-icon-2x.png',
  shadowUrl: '/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

interface MapComponentProps {
  latitude: number
  longitude: number
  address: string
}

function MapUpdater({ latitude, longitude }: { latitude: number, longitude: number }) {
  const map = useMap();
  useEffect(() => {
    if (latitude && longitude) {
      map.setView([latitude, longitude], map.getZoom());
    }
  }, [map, latitude, longitude]);
  return null;
}

export default function Map({ latitude, longitude, address }: MapComponentProps) {
  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={13}
      style={{ height: '100%', width: '100%' }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker 
        position={[latitude, longitude]}
        draggable={true}
        eventHandlers={{
          dragend: (e) => {
            const marker = e.target;
            const position = marker.getLatLng();
            // Ici, vous pouvez mettre à jour l'adresse en fonction des nouvelles coordonnées
            // en utilisant un service de géocodage inverse
          },
        }}
      />
      <MapUpdater latitude={latitude} longitude={longitude} />
    </MapContainer>
  )
}