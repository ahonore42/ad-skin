import { useEffect, useState } from 'react'
import * as THREE from 'three'
import { drawGridPattern } from '@/hooks/canvas/drawGridPattern'

/**
 * Creates and manages a canvas-based texture for Three.js
 * The canvas can be updated dynamically to change the texture content
 */
export function useCanvasTexture(width: number = 2048, height: number = 1024) {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null)

  useEffect(() => {
    // Create canvas
    const newCanvas = document.createElement('canvas')
    newCanvas.width = width
    newCanvas.height = height
    setCanvas(newCanvas)

    // Initialize canvas with grid pattern
    const ctx = newCanvas.getContext('2d')
    if (ctx) {
      drawGridPattern(ctx, width, height)
    }

    // Create Three.js texture from canvas
    const newTexture = new THREE.CanvasTexture(newCanvas)
    newTexture.needsUpdate = true
    setTexture(newTexture)

    // Cleanup
    return () => {
      newTexture.dispose()
    }
  }, [width, height])

  return {
    canvas,
    texture,
  }
}
