/**
 * Canvas Texture Manager (main hook)
 * Orchestrates everything together - SSR SAFE VERSION
 */

import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import { findAdAtPosition } from "./useAdPositionCalculator";
import { handleAdClick } from "./useAdUrlManager";
import { use3DMouseRaycaster } from "./use3DMouseRaycaster";
import { useCanvasAnimation } from "./useCanvasAnimation";

/**
 * Main hook that coordinates all the other hooks
 * Returns the final canvas/texture object with cleanup management
 */
export function useCanvasTexture(
  width: number = 3000,
  height: number = 2300,
  rendererCanvas?: HTMLCanvasElement | null,
  scene?: THREE.Scene | null,
  camera?: THREE.Camera | null
) {
  // Canvas/texture creation
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const textureRef = useRef<THREE.CanvasTexture | null>(null);
  const mouseRef = useRef({ x: -1, y: -1 });
  const currentTimeRef = useRef<number>(0);

  // Initialize canvas and texture (CLIENT-SIDE ONLY - SSR SAFE)
  useEffect(() => {
    if (typeof window === "undefined") return; // SSR safety check

    if (!canvasRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const texture = new THREE.CanvasTexture(canvas);
      canvasRef.current = canvas;
      textureRef.current = texture;
    }

    // Cleanup
    return () => {
      if (textureRef.current) {
        textureRef.current.dispose();
      }
    };
  }, [width, height]);

  // Mouse event handlers
  const handleClick = (position: { x: number; y: number } | null) => {
    if (position) {
      const adId = findAdAtPosition(
        position.x,
        position.y,
        currentTimeRef.current,
        width,
        height
      );
      if (adId) {
        handleAdClick(adId, position.x, position.y);
      } else {
        console.log(
          `Clicked at texture position: ${position.x.toFixed(
            0
          )}, ${position.y.toFixed(0)} - no ad found`
        );
      }
    } else {
      console.log("Clicked outside of 3D object");
    }
  };

  // Coordinates the other hooks (only after canvas is created)
  use3DMouseRaycaster(
    rendererCanvas || null,
    scene || null,
    camera || null,
    width,
    height,
    mouseRef,
    undefined, // onMouseMove
    undefined, // onMouseLeave
    handleClick // onClick
  );

  useCanvasAnimation(
    canvasRef.current,
    textureRef.current,
    mouseRef,
    width,
    height
  );

  // Update current time for ad detection (CLIENT-SIDE ONLY)
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (currentTimeRef.current === 0) {
      const startTime = Date.now();
      const animate = () => {
        currentTimeRef.current = (Date.now() - startTime) / 1000;
        requestAnimationFrame(animate);
      };
      animate();
    }
  }, []);

  // Return stable object - refs will be populated after first render
  return useMemo(
    () => ({
      get canvas() {
        return canvasRef.current;
      },
      get texture() {
        return textureRef.current;
      },
    }),
    []
  );
}
