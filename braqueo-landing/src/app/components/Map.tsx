'use client';

import { useEffect, useState, forwardRef } from 'react';
import { MapContainer, TileLayer, Marker, useMap, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface NominatimResponse {
  display_name: string;
  error?: string;
}

// Configuration de l'icône par défaut
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
  latitude: number;
  longitude: number;
  address: string;
  setAddress: (address: string) => void;
  onMarkerChange?: (lat: number, lng: number) => void;
}

async function reverseGeocode(lat: number, lng: number): Promise<string> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
      {
        headers: {
          'User-Agent': 'YourAppName/1.0'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: NominatimResponse = await response.json();
    
    if (data.error) {
      throw new Error(data.error);
    }
    
    return data.display_name || "Adresse inconnue";
  } catch (error) {
    console.error("Erreur de géocodage inverse :", error);
    return "Adresse inconnue";
  }
}

function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  
  return null;
}

const Map = forwardRef<any, MapComponentProps>(({ 
  latitude, 
  longitude, 
  address, 
  setAddress, 
  onMarkerChange 
}, ref) => {
  const [markerPosition, setMarkerPosition] = useState<[number, number]>([latitude, longitude]);

  useEffect(() => {
    setMarkerPosition([latitude, longitude]);
  }, [latitude, longitude]);

  const handleDragEnd = async (e: L.DragEndEvent) => {
    const marker = e.target;
    const position = marker.getLatLng();
    const newPosition: [number, number] = [position.lat, position.lng];
    
    setMarkerPosition(newPosition);

    if (onMarkerChange) {
      onMarkerChange(position.lat, position.lng);
    }

    const newAddress = await reverseGeocode(position.lat, position.lng);
    setAddress(newAddress);
  };

  return (
    <MapContainer 
      center={markerPosition} 
      zoom={13} 
      style={{ height: '100%', width: '100%' }} 
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <MapUpdater center={markerPosition} />
      
      <Marker 
        position={markerPosition} 
        draggable={true}
        eventHandlers={{ dragend: handleDragEnd }}
      >
        <Popup>{address}</Popup>
      </Marker>
    </MapContainer>
  );
});

Map.displayName = 'Map';

export default Map;