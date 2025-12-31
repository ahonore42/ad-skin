"use client";

import { useRef, useEffect } from "react";
import { useThreeScene } from "@/hooks/three/useThreeScene";
import { useCanvasTexture } from "@/hooks/three/canvas/useCanvasTexture";
import { useControls } from "@/hooks/three/useControls";
import { usePortraitLighting } from "@/hooks/three/lighting/usePortraitLighting";
import { useHeadModel } from "@/hooks/three/geometry/useHeadModel";

/**
 * Scene container focused exclusively on human head visualization
 * Features portrait lighting and human-specific geometry with ad texture mapping
 */
export default function SceneContainer() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Set up core Three.js scene
  const { scene, camera, renderer, startAnimation } =
    useThreeScene(containerRef);

  // Create canvas texture system for ad mapping
  const { texture } = useCanvasTexture(
    3000,
    2300,
    renderer?.domElement,
    scene,
    camera
  );

  // Set up camera controls optimized for portrait viewing
  const controls = useControls(
    camera,
    renderer,
    true,
    0.3 // Slower auto-rotation for better portrait viewing
  );

  // Apply portrait-style lighting optimized for facial geometry
  usePortraitLighting(scene, camera);

  // Load and display human head model with ad texture
  useHeadModel(
    scene,
    texture,
    "/models/scene.gltf", // Head model path
    2 // Head scale factor
  );

  // Start animation loop
  useEffect(() => {
    if (!scene || !camera || !renderer) return;

    console.log("Starting head animation with portrait lighting");
    startAnimation(() => {
      // Update camera controls
      if (controls) {
        controls.update();
      }

      // Update texture for ad animation
      if (texture) {
        texture.needsUpdate = true;
      }
    });
  }, [scene, camera, renderer, controls, texture, startAnimation]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full cursor-pointer"
      style={{
        background: "transparent",
      }}
    />
  );
}
