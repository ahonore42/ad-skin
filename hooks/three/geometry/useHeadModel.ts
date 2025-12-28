import { useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

/**
 * Loads GLB head model and applies ad texture
 * Falls back to sphere if model loading fails
 */
export function useHeadModel(
  scene: THREE.Scene | null,
  texture: THREE.Texture | null,
  modelPath: string = "/models/scene.gltf",
  scale: number = 1.0
) {
  useEffect(() => {
    if (!scene || !texture) return;

    let headMesh: THREE.Mesh | null = null;
    const loader = new GLTFLoader();

    const loadHeadModel = async () => {
      try {
        console.log("Loading head model from:", modelPath);

        const gltf = await loader.loadAsync(modelPath);
        console.log("GLB loaded successfully");

        // Find first mesh in the model
        let mesh: THREE.Mesh | undefined;

        gltf.scene.traverse((child) => {
          if (child instanceof THREE.Mesh && !mesh) {
            mesh = child;
            console.log("Found mesh:", child.name || "unnamed");
          }
        });

        if (!mesh) {
          throw new Error("No mesh found in GLB model");
        }

        // Create new mesh with our material
        const geometry = mesh.geometry.clone();

        // Calculate bounding box to auto-scale model to fit camera
        geometry.computeBoundingBox();
        const boundingBox = geometry.boundingBox!;
        const size = new THREE.Vector3();
        boundingBox.getSize(size);

        // Calculate scale to fit model in camera view
        // Camera is at z=5, we want model to fit comfortably (about 60% of view)
        const maxDimension = Math.max(size.x, size.y, size.z);
        const targetSize = 3.0; // Target size that fits well in camera view
        const autoScale = targetSize / maxDimension;
        const finalScale = scale * autoScale;

        geometry.scale(finalScale, finalScale, finalScale);

        console.log("Model auto-sizing:", {
          originalSize: size,
          maxDimension,
          autoScale,
          finalScale,
        });

        const material = new THREE.MeshStandardMaterial({
          map: texture,
          roughness: 0.6,
          metalness: 0.02,
          color: 0xffe4d6,
        });

        headMesh = new THREE.Mesh(geometry, material);
        headMesh.name = "HeadModel";
        headMesh.castShadow = true;
        headMesh.receiveShadow = true;

        // Rotate face to proper orientation (90 degrees around X-axis)
        // This rotates from face-down to face-forward
        headMesh.rotation.x = -Math.PI / 2; // 90 degrees in radians

        scene.add(headMesh);
        console.log("Head model added to scene with rotation fix");
      } catch (error) {
        console.error("Failed to load GLB model:", error);
        console.log("Using sphere fallback");

        // Fallback sphere
        const geometry = new THREE.SphereGeometry(1.5, 64, 64);
        const material = new THREE.MeshStandardMaterial({
          map: texture,
          roughness: 0.6,
          metalness: 0.02,
          color: 0xffe4d6,
        });

        headMesh = new THREE.Mesh(geometry, material);
        headMesh.name = "SphereHeadFallback";
        headMesh.castShadow = true;
        headMesh.receiveShadow = true;

        scene.add(headMesh);
      }
    };

    loadHeadModel();

    // Cleanup
    return () => {
      if (headMesh) {
        scene.remove(headMesh);
        headMesh.geometry.dispose();
        (headMesh.material as THREE.Material).dispose();
      }
    };
  }, [scene, texture, modelPath, scale]);
}
