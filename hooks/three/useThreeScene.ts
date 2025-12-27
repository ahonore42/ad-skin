import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

/**
 * Sets up the core Three.js scene, camera, and renderer
 * Manages the animation loop and resize handling
 */
export function useThreeScene(containerRef: React.RefObject<HTMLDivElement | null>) {
  const [scene, setScene] = useState<THREE.Scene | null>(null)
  const [camera, setCamera] = useState<THREE.PerspectiveCamera | null>(null)
  const [renderer, setRenderer] = useState<THREE.WebGLRenderer | null>(null)
  const animationIdRef = useRef<number | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const newScene = new THREE.Scene()
    // Remove background color - let it be transparent
    setScene(newScene)

    // Camera setup
    const newCamera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    )
    newCamera.position.z = 5
    setCamera(newCamera)

    // Renderer setup with transparency
    const newRenderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true // Enable transparency
    })
    newRenderer.setClearColor(0x000000, 0) // Transparent background
    newRenderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    newRenderer.setPixelRatio(window.devicePixelRatio)
    containerRef.current.appendChild(newRenderer.domElement)
    setRenderer(newRenderer)

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return

      newCamera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
      newCamera.updateProjectionMatrix()
      newRenderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    }
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
      newRenderer.dispose()
      if (containerRef.current && containerRef.current.contains(newRenderer.domElement)) {
        containerRef.current.removeChild(newRenderer.domElement)
      }
    }
  }, [containerRef])

  // Start animation loop
  const startAnimation = (callback: () => void) => {
    if (!scene || !camera || !renderer) return

    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate)
      callback()
      renderer.render(scene, camera)
    }
    animate()
  }

  return {
    scene,
    camera,
    renderer,
    startAnimation,
  }
}
