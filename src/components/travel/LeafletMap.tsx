"use client";

import React from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Fix for default marker icon
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

// Places you might have been or want to go (Example data)
const places = [
  { name: "Our Meeting Place", position: [31.2304, 121.4737], description: "Where it all started." }, // Shanghai approx
  // Add more real coordinates here
];

export default function LeafletMap() {
  return (
     <div className="w-full h-full rounded-3xl overflow-hidden shadow-xl border-4 border-white">
        <MapContainer 
            center={[35.8617, 104.1954]} // Center of China approx
            zoom={4} 
            scrollWheelZoom={true} 
            className="w-full h-full"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {places.map((place, idx) => (
                <Marker key={idx} position={place.position as [number, number]} icon={icon}>
                    <Popup>
                        <div className="text-center">
                            <h3 className="font-bold text-rose-500">{place.name}</h3>
                            <p className="text-xs text-gray-600">{place.description}</p>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
     </div>
  );
}
