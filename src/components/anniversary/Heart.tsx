import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Text, useTexture } from '@react-three/drei';
import { generateHeartPositions } from '../../lib/utils/geometry';

const COUNT = 34;
const LERP_SPEED = 0.05; // Adjust for smoothness

interface HeartProps {
  isExploded: boolean;
}

// Rose Gold Material definition
const ROSE_GOLD_MATERIAL = new THREE.MeshPhysicalMaterial({
  color: '#B76E79', // Rose gold hex
  metalness: 0.8,
  roughness: 0.2,
  clearcoat: 1.0,
  clearcoatRoughness: 0.1,
});

function PhotoFrame({ position, rotation, index, targetPosition, targetRotation, mode }: any) {
  const mesh = useRef<THREE.Group>(null);
  
  // Random floating offset for exploded mode
  const floatSpeed = useMemo(() => (Math.random() - 0.5) * 0.5, []);
  const rotateSpeed = useMemo(() => (Math.random() - 0.5) * 0.5, []);

  useFrame((state, delta) => {
    if (!mesh.current) return;

    // Lerp position
    mesh.current.position.lerp(targetPosition, LERP_SPEED);
    
    // Lerp rotation
    // For rotation, simple lerp might spin wildly, but Quaternion slerp is better.
    // For simplicity in this 'effect', we just interpolate Euler angles or let it float.
    
    if (mode === 'heart') {
        // Breathing effect in heart mode
        const time = state.clock.getElapsedTime();
        const breath = 1 + Math.sin(time * 2) * 0.02; // 2Hz heartbeatish
        mesh.current.scale.lerp(new THREE.Vector3(breath, breath, breath), 0.1);
        
        mesh.current.quaternion.slerp(new THREE.Quaternion().setFromEuler(new THREE.Euler(0,0,0)), 0.1);
    } else {
        // Floating/Tumbling in exploded mode
        mesh.current.position.y += Math.sin(state.clock.getElapsedTime() + index) * 0.005;
        mesh.current.rotation.x += rotateSpeed * delta;
        mesh.current.rotation.y += rotateSpeed * delta;
    }
  });

  return (
    <group ref={mesh} position={position}>
       {/* Frame Border (Rose Gold) */}
      <mesh material={ROSE_GOLD_MATERIAL}>
        <boxGeometry args={[1.2, 1.5, 0.1]} />
      </mesh>
      {/* Photo Placeholder (White/Image) */}
      <mesh position={[0, 0, 0.06]}>
        <planeGeometry args={[1.0, 1.3]} />
        <meshBasicMaterial color="#eee" side={THREE.DoubleSide} />
      </mesh>
      {/* Text number for debugging/visuals */}
      <Text position={[0, 0, 0.07]} fontSize={0.5} color="#B76E79">
        {index + 1}
      </Text>
    </group>
  );
}

export default function Heart({ isExploded }: HeartProps) {
  const heartPositions = useMemo(() => generateHeartPositions(COUNT, 0.15), []);
  
  // State to hold current target positions
  const [targets, setTargets] = useState<{pos: THREE.Vector3, rot: THREE.Euler}[]>([]);

  // Initialize targets
  useEffect(() => {
    setTargets(heartPositions.map(pos => ({
      pos: pos,
      rot: new THREE.Euler(0, 0, 0)
    })));
  }, [heartPositions]);

  // Handle mode change
  useEffect(() => {
    if (isExploded) {
      // Generate random explosion targets
      const newTargets = heartPositions.map(() => {
        // Random sphere distribution
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        const radius = 10 + Math.random() * 10; // 10 to 20 units out
        
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);
        
        return {
          pos: new THREE.Vector3(x, y, z),
          rot: new THREE.Euler(Math.random() * Math.PI, Math.random() * Math.PI, 0)
        };
      });
      setTargets(newTargets);
    } else {
      // Return to heart positions
      setTargets(heartPositions.map(pos => ({
        pos: pos,
        rot: new THREE.Euler(0, 0, 0)
      })));
    }
  }, [isExploded, heartPositions]);

  return (
    <group>
      {heartPositions.map((_, i) => (
        <PhotoFrame
          key={i}
          index={i}
          targetPosition={targets[i]?.pos || new THREE.Vector3()}
          targetRotation={targets[i]?.rot || new THREE.Euler()}
          mode={isExploded ? 'exploded' : 'heart'}
          // Initial position can be 0,0,0 or the heart pos
          position={heartPositions[i]} 
        />
      ))}
      
      {/* Core Pulse Light */}
       <pointLight position={[0, 0, 0]} intensity={isExploded ? 0 : 2} color="#ff007f" distance={10} decay={2} />
    </group>
  );
}
