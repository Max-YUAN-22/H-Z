"use client";

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Sparkles, Trail, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

function FloatingHeart() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Create heart shape
  const heartShape = useMemo(() => {
    const shape = new THREE.Shape();
    const x = 0, y = 0;
    shape.moveTo(x + 0.5, y + 0.5);
    shape.bezierCurveTo(x + 0.5, y + 0.5, x + 0.4, y, x, y);
    shape.bezierCurveTo(x - 0.6, y, x - 0.6, y + 0.7, x - 0.6, y + 0.7);
    shape.bezierCurveTo(x - 0.6, y + 1.1, x - 0.3, y + 1.54, x + 0.5, y + 1.9);
    shape.bezierCurveTo(x + 1.2, y + 1.54, x + 1.6, y + 1.1, x + 1.6, y + 0.7);
    shape.bezierCurveTo(x + 1.6, y + 0.7, x + 1.6, y, x + 1, y);
    shape.bezierCurveTo(x + 0.7, y, x + 0.5, y + 0.5, x + 0.5, y + 0.5);
    return shape;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  const extrudeSettings = {
    depth: 0.4,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 2,
    bevelSize: 0.1,
    bevelThickness: 0.1
  };

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh ref={meshRef} rotation={[0, 0, Math.PI]} scale={2} position={[-1, 1, 0]}>
            <extrudeGeometry args={[heartShape, extrudeSettings]} />
            <MeshTransmissionMaterial 
                backside
                backsideThickness={5}
                thickness={2}
                roughness={0.2}
                chromaticAberration={1}
                anisotropy={1}
                color="#ff4d6d"
            />
        </mesh>
    </Float>
  );
}

function FloatingParticles() {
    const count = 100;
    return (
        <Sparkles 
            count={count} 
            scale={12} 
            size={4} 
            speed={0.4} 
            opacity={0.6} 
            color="#ffb6c1" 
        />
    )
}

export default function LandingScene() {
  return (
    <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }} gl={{ alpha: true, antialias: true }}>
            {/* Lights */}
            <ambientLight intensity={0.8} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#fff0f5" />
            <pointLight position={[-10, -10, -5]} intensity={1} color="#ff69b4" />
            
            {/* Background Elements */}
            <FloatingParticles />
            
            {/* Central Hero Object - Floating Crystal Heart */}
            <FloatingHeart />
            
            {/* Environment */}
            <fog attach="fog" args={['#fff0f5', 5, 20]} />
        </Canvas>
    </div>
  );
}
