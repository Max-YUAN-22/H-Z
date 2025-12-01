import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, OrbitControls, Environment, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import Heart from './Heart';

interface ExperienceProps {
  isExploded: boolean;
}

function CameraRig({ isExploded }: { isExploded: boolean }) {
    useFrame((state) => {
        // Basic parallax on mouse move
        // When exploded, maybe move camera back a bit?
        const targetZ = isExploded ? 25 : 18;
        state.camera.position.lerp(new THREE.Vector3(
            state.pointer.x * 2, 
            state.pointer.y * 2, 
            targetZ
        ), 0.05);
        state.camera.lookAt(0, 0, 0);
    });
    return null;
}

export default function Experience({ isExploded }: ExperienceProps) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 0, 18], fov: 45 }}
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
    >
      {/* Atmosphere */}
      <color attach="background" args={['#050A30']} /> {/* Midnight Blue */}
      <fog attach="fog" args={['#050A30', 10, 40]} />
      
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Sparkles count={200} scale={12} size={4} speed={0.4} opacity={0.5} color="#ffb6c1" />

      {/* Lights */}
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="blue" />

      {/* Main Content */}
      <Heart isExploded={isExploded} />
      
      {/* Controls/Rig */}
      <CameraRig isExploded={isExploded} />
      {/* <OrbitControls enableZoom={false} /> */}
    </Canvas>
  );
}
