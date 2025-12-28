"use client";

import { useRef, useEffect } from "react";
import { useThreeScene } from "@/hooks/three/useThreeScene";
import { useCanvasTexture } from "@/hooks/three/canvas/useCanvasTexture";
import { useControls } from "@/hooks/three/useControls";
import { useLighting } from "@/hooks/three/lighting/useLighting";
import { usePortraitLighting } from "@/hooks/three/lighting/usePortraitLighting";
import { useGeometry } from "@/hooks/three/geometry/useGeometry";
import { useHeadModel } from "@/hooks/three/geometry/useHeadModel";

type SceneType = "sphere" | "face";

interface SceneContainerProps {
  sceneType: SceneType;
}

/**
 * Unified scene container that manages a single Three.js canvas
 * Switches between sphere and face geometry/lighting within the same scene
 */
export default function SceneContainer({ sceneType }: SceneContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Set up core Three.js scene (single instance)
  const { scene, camera, renderer, startAnimation } =
    useThreeScene(containerRef);

  // Create canvas texture system (shared between scenes)
  const { texture } = useCanvasTexture(
    2048,
    1024,
    renderer?.domElement,
    scene,
    camera
  );

  // Set up camera controls (adapt speed based on scene type)
  const controls = useControls(
    camera,
    renderer,
    true,
    sceneType === "sphere" ? 0.5 : 0.3
  );

  // Apply appropriate lighting based on scene type
  useLighting(
    sceneType === "sphere" ? scene : null,
    sceneType === "sphere" ? camera : null
  );

  usePortraitLighting(
    sceneType === "face" ? scene : null,
    sceneType === "face" ? camera : null
  );

  // Apply appropriate geometry based on scene type
  useGeometry(
    sceneType === "sphere" ? scene : null,
    sceneType === "sphere" ? texture : null,
    2 // sphere radius
  );

  useHeadModel(
    sceneType === "face" ? scene : null,
    sceneType === "face" ? texture : null,
    "/models/scene.gltf", // model path
    1.0 // head scale
  );

  // Start animation loop
  useEffect(() => {
    if (!scene || !camera || !renderer) return;

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
      className="w-full h-full cursor-pointer"
      style={{
        background: "transparent",
      }}
    />
  );
}
