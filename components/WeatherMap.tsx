'use client';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Create custom icon
const createCustomIcon = () => {
  return L.icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
  });
};

export default function WeatherMap({ lat, lon }: { lat: number; lon: number }) {
  return (
    <div className="mt-8 bg-white rounded-xl shadow-md p-6 h-[500px] text-gray-500 ">
      <h3 className="text-xl font-bold mb-4">Interactive Map</h3>
      <MapContainer 
        center={[lat, lon]} 
        zoom={10} 
        className="h-full rounded-lg"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[lat, lon]} icon={createCustomIcon()}>
          <Popup>
            Your selected location
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}