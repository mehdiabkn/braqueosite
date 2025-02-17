// src/lib/locationFormatter.ts
export async function getAddressFromCoordinates(lat: number, lng: number): Promise<string> {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
      );
      const data = await response.json();
      
      if (data.error) {
        return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
      }
  
      // On peut personnaliser le format de l'adresse selon les besoins
      return data.display_name;
    } catch (error) {
      // En cas d'erreur, on retourne les coordonnées
      return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    }
  }