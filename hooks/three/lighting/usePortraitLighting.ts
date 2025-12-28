import { useEffect } from "react";
import * as THREE from "three";

/**
 * Portrait lighting setup optimized for facial geometry
 * Uses a classic three-point lighting setup:
 * - Key light: Main illumination from upper-left
 * - Fill light: Softer light to reduce harsh shadows
 * - Rim light: Subtle backlighting for depth
 *
 * All lights are attached to camera for consistent illumination during rotation
 */
export function usePortraitLighting(
  scene: THREE.Scene | null,
  camera: THREE.Camera | null
) {
  useEffect(() => {
    if (!scene || !camera) return;

    // Store references to lights for cleanup
    let ambientLight: THREE.AmbientLight | null = null;
    let keyLight: THREE.DirectionalLight | null = null;
    let fillLight: THREE.DirectionalLight | null = null;
    let rimLight: THREE.DirectionalLight | null = null;

    // Ambient light for base illumination (softer than sphere lighting)
    ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    // Key light - Main light from upper-left (classic portrait position)
    keyLight = new THREE.DirectionalLight(0xffffff, 0.8);
    camera.add(keyLight);
    keyLight.position.set(-2, 3, 2); // Upper-left-forward position
    keyLight.target.position.set(0, 0, 0);

    // Fill light - Softer light from opposite side to reduce harsh shadows
    fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
    camera.add(fillLight);
    fillLight.position.set(2, 1, 1); // Upper-right position, less intense
    fillLight.target.position.set(0, 0, 0);

    // Rim light - Subtle backlighting for depth and separation
    rimLight = new THREE.DirectionalLight(0xffffff, 0.2);
    camera.add(rimLight);
    rimLight.position.set(0, 1, -3); // Behind the subject, slightly above
    rimLight.target.position.set(0, 0, 0);

    // Ensure camera is part of scene graph so lights render
    if (!scene.children.includes(camera)) {
      scene.add(camera);
    }

    // Cleanup
    return () => {
      if (ambientLight) {
        scene.remove(ambientLight);
      }
      if (keyLight && camera) {
        camera.remove(keyLight);
      }
      if (fillLight && camera) {
        camera.remove(fillLight);
      }
      if (rimLight && camera) {
        camera.remove(rimLight);
      }
    };
  }, [scene, camera]);
}
