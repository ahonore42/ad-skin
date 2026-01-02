/**
 * Canvas Animation Engine
 * Manages the canvas animation loop
 */

import { useRef, useEffect } from "react";
import * as THREE from "three";
import { drawGridPattern } from "../../../utils/canvas/drawing/drawGridPattern";

/**
 * Animation loop with requestAnimationFrame
 */
export function useCanvasAnimation(
  canvas: HTMLCanvasElement | null,
  texture: THREE.CanvasTexture | null,
  mouseRef: React.RefObject<{ x: number; y: number }>,
  width: number,
  height: number
) {
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    if (!canvas || !texture) return;

    // Time tracking
    startTimeRef.current = Date.now();

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Animation loop
    const animate = () => {
      const currentTime = Date.now();
      const elapsedTime = (currentTime - startTimeRef.current) / 1000; // Convert to seconds

      // Canvas context management & drawGridPattern calls
      drawGridPattern(
        ctx,
        width,
        height,
        elapsedTime,
        mouseRef.current.x,
        mouseRef.current.y
      );

      // Texture update logic
      texture.needsUpdate = true;

      // Continue animation
      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [canvas, texture, mouseRef, width, height]);

  return {
    isRunning: () => animationRef.current !== null,
  };
}
