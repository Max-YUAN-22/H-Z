import * as THREE from 'three';

export function generateHeartPositions(count: number, scale: number = 1): THREE.Vector3[] {
  const positions: THREE.Vector3[] = [];
  // Use a larger number of points to sample from to find good distribution, 
  // or just deterministically place them.
  // Parametric equation for a heart:
  // x = 16sin^3(t)
  // y = 13cos(t) - 5cos(2t) - 2cos(3t) - cos(4t)
  // z = varying depth to make it 3D
  
  // To make it a "volumetric" heart (丰满的), we can add some noise/layers in Z.
  
  for (let i = 0; i < count; i++) {
    // Distribute t from 0 to 2PI
    const t = (i / count) * Math.PI * 2;
    
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    // Simple Z extrusion based on distance from center to give volume
    const z = (Math.random() - 0.5) * 4; // Slight thickness
    
    positions.push(new THREE.Vector3(x * scale, y * scale, z * scale));
  }
  
  return positions;
}

export function generateSpherePositions(count: number, radius: number): THREE.Vector3[] {
    const positions: THREE.Vector3[] = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle

    for (let i = 0; i < count; i++) {
        const y = 1 - (i / (count - 1)) * 2; // y goes from 1 to -1
        const radiusAtY = Math.sqrt(1 - y * y); // radius at y
        const theta = phi * i; // golden angle increment

        const x = Math.cos(theta) * radiusAtY;
        const z = Math.sin(theta) * radiusAtY;

        positions.push(new THREE.Vector3(x * radius, y * radius, z * radius));
    }
    return positions;
}
