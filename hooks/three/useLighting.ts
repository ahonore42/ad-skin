import { useEffect } from 'react'
import * as THREE from 'three'

/**
 * Sets up scene lighting
 * Includes ambient light, main directional light, and accent back light
 */
export function useLighting(scene: THREE.Scene | null) {
  useEffect(() => {
    if (!scene) return

    // Ambient light for overall illumination
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    // Main directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    // Back light for depth
    const backLight = new THREE.DirectionalLight(0x4444ff, 0.3)
    backLight.position.set(-5, -5, -5)
    scene.add(backLight)

    // Cleanup
    return () => {
      scene.remove(ambientLight)
      scene.remove(directionalLight)
      scene.remove(backLight)
    }
  }, [scene])
}
