"use client";

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
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

export default function TravelPage() {
  return (
    <div className="h-screen w-full relative bg-[#fff0f5]">
      {/* Header Overlay */}
      <div className="absolute top-0 left-0 right-0 z-[1000] p-6 bg-white/80 backdrop-blur-md shadow-sm flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-rose-500 hover:text-rose-600 transition-colors font-medium">
             <ArrowLeft size={20} /> Back to Love Station
        </Link>
        <h1 className="text-2xl font-serif font-bold text-gray-800">Our Footprints</h1>
        <div className="w-20"></div> {/* Spacer */}
      </div>

      <div className="absolute inset-0 z-0 pt-20 pb-8 px-4">
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
      </div>
    </div>
  );
}