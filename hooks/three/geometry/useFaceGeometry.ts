import { useEffect } from "react";
import * as THREE from "three";

/**
 * Creates human head geometry using a simplified approach
 * For now, uses an elongated sphere while we set up proper GLB model loading
 * This serves as a stable foundation that won't crash Three.js
 */
export function useFaceGeometry(
  scene: THREE.Scene | null,
  texture: THREE.Texture | null,
  headScale: number = 1.5
) {
  useEffect(() => {
    if (!scene || !texture) return;

    // Start with a simple, stable approach - elongated sphere for head shape
    const headGeometry = new THREE.SphereGeometry(headScale, 64, 64);

    // Simple, safe vertex modification for basic head proportions
    const positions = headGeometry.attributes.position.array;
    const vertexCount = positions.length / 3;

    for (let i = 0; i < vertexCount; i++) {
      const i3 = i * 3;
      const x = positions[i3];
      const y = positions[i3 + 1];
      const z = positions[i3 + 2];

      // Normalize to get direction
      const length = Math.sqrt(x * x + y * y + z * z);
      const nx = x / length;
      const ny = y / length;
      const nz = z / length;

      let radius = headScale;

      // Basic head shape - make it more oval and less spherical
      radius *= 1.0 + 0.1 * ny; // Slightly taller
      radius *= 1.0 - 0.1 * Math.abs(nx); // Slightly narrower on sides

      // Flatten back of head
      if (nz < -0.2) {
        radius *= 0.85;
      }

      // Basic face flattening
      if (nz > 0.3 && Math.abs(nx) < 0.7) {
        radius *= 0.95;
      }

      // Apply the radius
      positions[i3] = nx * radius;
      positions[i3 + 1] = ny * radius;
      positions[i3 + 2] = nz * radius;
    }

    // Update geometry
    headGeometry.attributes.position.needsUpdate = true;
    headGeometry.computeVertexNormals();

    // Create material optimized for skin-like appearance
    const headMaterial = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.6,
      metalness: 0.02,
      color: 0xffe4d6, // Subtle skin tone tint
    });

    const headMesh = new THREE.Mesh(headGeometry, headMaterial);
    scene.add(headMesh);

    // Cleanup
    return () => {
      scene.remove(headMesh);
      headGeometry.dispose();
      headMaterial.dispose();
    };
  }, [scene, texture, headScale]);
}
