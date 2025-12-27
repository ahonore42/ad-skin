import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * Creates and manages 3D geometry with material
 * Currently creates a sphere, but can be extended for complex shapes
 */
export function useGeometry(
  scene: THREE.Scene | null,
  texture: THREE.Texture | null
) {
  const meshRef = useRef<THREE.Mesh | null>(null)

  useEffect(() => {
    if (!scene || !texture) return

    // Create sphere geometry
    const geometry = new THREE.SphereGeometry(2, 64, 64)
    
    // Create material with texture
    const material = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.7,
      metalness: 0.3,
    })

    // Create mesh and add to scene
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)
    meshRef.current = mesh

    // Cleanup
    return () => {
      scene.remove(mesh)
      geometry.dispose()
      material.dispose()
    }
  }, [scene, texture])

  return meshRef.current
}
