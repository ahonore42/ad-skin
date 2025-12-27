"use client";

import { useRef, useEffect } from "react";
import { useThreeScene } from "@/hooks/three/useThreeScene";
import { useCanvasTexture } from "@/hooks/three/useCanvasTexture";
import { useControls } from "@/hooks/three/useControls";
import { useLighting } from "@/hooks/three/lighting/useLighting";
import { useGeometry } from "@/hooks/three/useGeometry";

/**
 * Main 3D scene component that orchestrates all Three.js hooks
 * Displays a sphere with a canvas texture mapped as its surface
 * Features interactive lighting that follows mouse cursor
 */
export default function SphereScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sphereRadius = 2; // Define sphere radius for consistent scaling

  // Set up core Three.js scene
  const { scene, camera, renderer, startAnimation } =
    useThreeScene(containerRef);

  // Create canvas texture system
  const { texture } = useCanvasTexture(2048, 1024);

  // Set up camera controls
  const controls = useControls(camera, renderer, true, 0.5);

  // Add camera-relative lighting to scene
  useLighting(scene, camera);

  // Create geometry with texture
  useGeometry(scene, texture, sphereRadius);

  // Debug logging (TODO: Remove in production)
  useEffect(() => {
    console.log("Debug:", {
      scene: !!scene,
      camera: !!camera,
      renderer: !!renderer,
      texture: !!texture,
      controls: !!controls,
    });
  }, [scene, camera, renderer, texture, controls]);

  // Start animation loop
  useEffect(() => {
    if (!scene || !camera || !renderer) {
      console.log("Missing dependencies for animation");
      return;
    }

    console.log("Starting animation loop with interactive lighting");
    startAnimation(() => {
      // Update controls
      if (controls) {
        controls.update();
      }

      // Update texture if needed
      if (texture) {
        texture.needsUpdate = true;
      }
    });
  }, [scene, camera, renderer, controls, texture, startAnimation]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full cursor-crosshair"
      style={{
        background: "transparent",
        userSelect: "none", // Prevent text selection while moving mouse
      }}
    />
  );
}
