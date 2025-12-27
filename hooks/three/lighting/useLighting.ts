import { useEffect } from "react";
import * as THREE from "three";

/**
 * Camera-attached lighting that always illuminates from the viewer's perspective
 * The light moves with the camera, ensuring consistent illumination regardless of sphere rotation
 * Creates a "headlight" effect where lighting is always from the viewer's direction
 */
export function useLighting(
  scene: THREE.Scene | null,
  camera: THREE.Camera | null
) {
  useEffect(() => {
    if (!scene || !camera) return;

    // Store references to lights for cleanup
    let ambientLight: THREE.AmbientLight | null = null;
    let directionalLight: THREE.DirectionalLight | null = null;

    // Ambient light for base illumination
    ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Directional light attached to camera
    directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);

    // Add light as child of camera so it moves with camera
    // This ensures light always comes from viewer's perspective
    camera.add(directionalLight);

    // Position light relative to camera (slightly offset for better lighting)
    directionalLight.position.set(0, 2, 0);
    directionalLight.target.position.set(0, 0, 0);

    // Important: Add the camera to scene if it's not already there
    // This ensures the light (as camera's child) is part of the scene graph
    if (!scene.children.includes(camera)) {
      scene.add(camera);
    }

    // Cleanup
    return () => {
      if (ambientLight) {
        scene.remove(ambientLight);
      }
      if (directionalLight && camera) {
        camera.remove(directionalLight);
      }
    };
  }, [scene, camera]);
}
