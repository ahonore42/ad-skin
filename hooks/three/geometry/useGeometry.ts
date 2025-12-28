import { useEffect } from "react";
import * as THREE from "three";

/**
 * Creates and manages 3D geometry with material
 * Currently creates a sphere, but can be extended for complex shapes
 */
export function useGeometry(
  scene: THREE.Scene | null,
  texture: THREE.Texture | null,
  sphereRadius: number = 2
) {
  useEffect(() => {
    if (!scene || !texture) return;

    // Create sphere geometry with configurable radius
    const geometry = new THREE.SphereGeometry(sphereRadius, 64, 64);

    // Create material with texture
    const material = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.7,
      metalness: 0.3,
    });

    // Create mesh and add to scene
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Cleanup
    return () => {
      scene.remove(mesh);
      geometry.dispose();
      material.dispose();
    };
  }, [scene, texture, sphereRadius]);

  // This hook manages the geometry but doesn't need to return anything
  // The mesh is added directly to the scene
}
