"use client";

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Stars, Html } from '@react-three/drei';
import * as THREE from 'three';
import { MapPin } from 'lucide-react';

export default function Globe() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.0005;
    }
  });

  const markers = [
    { name: "Paris", position: [1.8, 1.2, 0.8] }, // Approx coords on sphere
    { name: "Tokyo", position: [-1.8, 0.8, 1.5] },
    { name: "New York", position: [1.2, 1.0, 1.8] },
    { name: "Shanghai", position: [-2.0, 0.9, 0.5] },
  ];

  return (
    <group>
        <Stars radius={300} depth={60} count={20000} factor={7} saturation={0} fade speed={1} />
        <Sphere ref={meshRef} args={[1, 64, 64]} scale={2.5}>
            <meshStandardMaterial 
                color="#1e293b" 
                wireframe={true}
                emissive="#0f172a"
                emissiveIntensity={0.5}
            />
             {markers.map((marker, i) => (
                <Html key={i} position={marker.position as any} center distanceFactor={10}>
                    <div className="group flex flex-col items-center cursor-pointer">
                        <MapPin size={24} className="text-rose-500 drop-shadow-[0_0_10px_rgba(244,63,94,0.8)] animate-bounce" />
                        <span className="mt-1 text-xs font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 px-2 py-1 rounded backdrop-blur-sm">
                            {marker.name}
                        </span>
                    </div>
                </Html>
             ))}
        </Sphere>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
    </group>
  );
}
