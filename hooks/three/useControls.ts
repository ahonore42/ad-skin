import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Sets up OrbitControls for camera interaction
 * Enables rotation, zoom, and auto-rotation
 */
export function useControls(
  camera: THREE.Camera | null,
  renderer: THREE.WebGLRenderer | null,
  autoRotate: boolean = true,
  autoRotateSpeed: number = 0.5
) {
  const controlsRef = useRef<OrbitControls | null>(null)

  useEffect(() => {
    if (!camera || !renderer) return

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.autoRotate = autoRotate
    controls.autoRotateSpeed = autoRotateSpeed
    controlsRef.current = controls

    return () => {
      controls.dispose()
    }
  }, [camera, renderer, autoRotate, autoRotateSpeed])

  return controlsRef.current
}
