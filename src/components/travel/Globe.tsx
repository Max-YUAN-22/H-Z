"use client";

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Stars } from '@react-three/drei';
import * as THREE from 'three';

export default function Globe() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
    }
  });

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
        </Sphere>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
    </group>
  );
}
