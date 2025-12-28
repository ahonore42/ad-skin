"use client";

import { useRef, useEffect } from "react";
import { useThreeScene } from "@/hooks/three/useThreeScene";
import { useCanvasTexture } from "@/hooks/three/canvas/useCanvasTexture";
import { useControls } from "@/hooks/three/useControls";
import { usePortraitLighting } from "@/hooks/three/lighting/usePortraitLighting";
import { useFaceGeometry } from "@/hooks/three/geometry/useFaceGeometry";

/**
 * Main 3D scene component that displays a human head with canvas texture
 * Features portrait-style lighting optimized for facial geometry
 * Uses the same texture system as SphereScene but with human-specific geometry and lighting
 */
export default function FaceScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headScale = 1.5; // Scale factor for the head geometry

  // Set up core Three.js scene
  const { scene, camera, renderer, startAnimation } =
    useThreeScene(containerRef);

  // Create canvas texture system (same as sphere - ads mapped onto face)
  const { texture } = useCanvasTexture(2048, 1024);

  // Set up camera controls with different defaults for portrait viewing
  const controls = useControls(camera, renderer, true, 0.3); // Slower auto-rotation for portraits

  // Add portrait-style lighting to scene
  usePortraitLighting(scene, camera);

  // Create face geometry with texture
  useFaceGeometry(scene, texture, headScale);

  // Debug logging (TODO: Remove in production)
  useEffect(() => {
    console.log("FaceScene Debug:", {
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
      console.log("Missing dependencies for face animation");
      return;
    }

    console.log("Starting face animation loop with portrait lighting");
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
      className="w-full h-full"
      style={{
        background: "transparent",
      }}
    />
  );
}
