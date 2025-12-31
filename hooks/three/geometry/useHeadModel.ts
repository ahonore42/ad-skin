import { useEffect, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

/**
 * Enhanced head model loader with complete surface mapping analysis
 * Provides detailed UV coordinate mapping and geometry analysis
 */
export function useHeadModel(
  scene: THREE.Scene | null,
  texture: THREE.Texture | null,
  modelPath: string = "/models/scene.gltf",
  scale: number = 1.0
) {
  const [modelInfo, setModelInfo] = useState<{
    vertexCount: number;
    triangleCount: number;
    uvBounds: { min: THREE.Vector2; max: THREE.Vector2 };
    surfaceArea: number;
    boundingBox: THREE.Box3;
  } | null>(null);

  useEffect(() => {
    if (!scene || !texture) return;

    let headMesh: THREE.Mesh | null = null;
    const loader = new GLTFLoader();

    const analyzeGeometry = (geometry: THREE.BufferGeometry) => {
      // Get UV coordinates
      const uvAttribute = geometry.attributes.uv;
      const positionAttribute = geometry.attributes.position;

      // Analyze UV bounds
      let minU = Infinity,
        maxU = -Infinity;
      let minV = Infinity,
        maxV = -Infinity;

      for (let i = 0; i < uvAttribute.count; i++) {
        const u = uvAttribute.getX(i);
        const v = uvAttribute.getY(i);

        minU = Math.min(minU, u);
        maxU = Math.max(maxU, u);
        minV = Math.min(minV, v);
        maxV = Math.max(maxV, v);
      }

      // Calculate surface area (approximate)
      let surfaceArea = 0;
      const indexAttribute = geometry.index;
      if (indexAttribute) {
        for (let i = 0; i < indexAttribute.count; i += 3) {
          const a = indexAttribute.getX(i);
          const b = indexAttribute.getX(i + 1);
          const c = indexAttribute.getX(i + 2);

          const vA = new THREE.Vector3().fromBufferAttribute(
            positionAttribute,
            a
          );
          const vB = new THREE.Vector3().fromBufferAttribute(
            positionAttribute,
            b
          );
          const vC = new THREE.Vector3().fromBufferAttribute(
            positionAttribute,
            c
          );

          const area = new THREE.Triangle(vA, vB, vC).getArea();
          surfaceArea += area;
        }
      }

      // Calculate bounding box
      geometry.computeBoundingBox();

      return {
        vertexCount: positionAttribute.count,
        triangleCount: indexAttribute ? indexAttribute.count / 3 : 0,
        uvBounds: {
          min: new THREE.Vector2(minU, minV),
          max: new THREE.Vector2(maxU, maxV),
        },
        surfaceArea,
        boundingBox: geometry.boundingBox!.clone(),
      };
    };

    const loadHeadModel = async () => {
      try {
        console.log("Loading David head model from:", modelPath);

        const gltf = await loader.loadAsync(modelPath);
        console.log("GLTF loaded successfully. Analyzing geometry...");

        // Find the mesh
        let mesh: THREE.Mesh | undefined;
        gltf.scene.traverse((child) => {
          if (child instanceof THREE.Mesh && !mesh) {
            mesh = child;
            console.log("Found mesh:", child.name || "unnamed");
          }
        });

        if (!mesh) {
          throw new Error("No mesh found in GLTF model");
        }

        // Analyze the original geometry
        const originalGeometry = mesh.geometry;
        const analysis = analyzeGeometry(originalGeometry);
        setModelInfo(analysis);

        console.log("Head Model Analysis:", {
          vertices: analysis.vertexCount,
          triangles: analysis.triangleCount,
          uvRange: `U: ${analysis.uvBounds.min.x.toFixed(
            3
          )} to ${analysis.uvBounds.max.x.toFixed(
            3
          )}, V: ${analysis.uvBounds.min.y.toFixed(
            3
          )} to ${analysis.uvBounds.max.y.toFixed(3)}`,
          surfaceArea: analysis.surfaceArea.toFixed(2),
          dimensions: {
            width: analysis.boundingBox.max.x - analysis.boundingBox.min.x,
            height: analysis.boundingBox.max.y - analysis.boundingBox.min.y,
            depth: analysis.boundingBox.max.z - analysis.boundingBox.min.z,
          },
        });

        // Clone and prepare the geometry
        const geometry = originalGeometry.clone();

        // Calculate proper scaling based on model dimensions
        const size = new THREE.Vector3();
        analysis.boundingBox.getSize(size);
        const maxDimension = Math.max(size.x, size.y, size.z);
        const targetSize = 3.0; // Target size for camera view
        const autoScale = targetSize / maxDimension;
        const finalScale = scale * autoScale;

        // Apply scaling
        geometry.scale(finalScale, finalScale, finalScale);

        // Ensure UV coordinates are properly set up for complete surface mapping
        const uvAttribute = geometry.attributes.uv;
        console.log("UV Coordinates Info:", {
          count: uvAttribute.count,
          itemSize: uvAttribute.itemSize,
          array: uvAttribute.array.constructor.name,
          length: uvAttribute.array.length,
        });

        // Create material optimized for ad texture mapping
        const material = new THREE.MeshStandardMaterial({
          map: texture,
          roughness: 0.6,
          metalness: 0.02,
          color: 0xffe4d6, // Skin tone tint
          side: THREE.DoubleSide, // Ensure both sides are rendered
          transparent: false,
          alphaTest: 0.1,
        });

        // Create the final mesh
        headMesh = new THREE.Mesh(geometry, material);
        headMesh.name = "DavidHead";
        headMesh.castShadow = true;
        headMesh.receiveShadow = true;

        // Apply rotation to orient the head properly
        // The model comes face-down, rotate to face forward
        headMesh.rotation.x = -Math.PI / 2; // 90 degrees around X-axis

        // Add to scene
        scene.add(headMesh);

        console.log(
          "David head model successfully loaded and mapped with complete UV coverage"
        );
        console.log("Model ready for ad texture mapping across entire surface");
      } catch (error) {
        console.error("Failed to load head model:", error);
        console.log(
          "Using enhanced sphere fallback with head-like proportions"
        );

        // Enhanced fallback with better head proportions
        const headGeometry = new THREE.SphereGeometry(1.5, 128, 128); // Higher resolution

        // Modify vertices for more head-like shape
        const positions = headGeometry.attributes.position.array;

        for (let i = 0; i < positions.length; i += 3) {
          const x = positions[i];
          const y = positions[i + 1];
          const z = positions[i + 2];

          // Normalize to get direction
          const length = Math.sqrt(x * x + y * y + z * z);
          const nx = x / length;
          const ny = y / length;
          const nz = z / length;

          let radius = 1.5;

          // Head shape modifications
          radius *= 1.0 + 0.15 * ny; // Taller head
          radius *= 1.0 - 0.12 * Math.abs(nx); // Narrower sides

          // Flatten back and face
          if (nz < -0.3) radius *= 0.8; // Flatten back of head
          if (nz > 0.4 && Math.abs(nx) < 0.6) radius *= 0.95; // Slight face flattening

          positions[i] = nx * radius;
          positions[i + 1] = ny * radius;
          positions[i + 2] = nz * radius;
        }

        headGeometry.attributes.position.needsUpdate = true;
        headGeometry.computeVertexNormals();

        // Analyze fallback geometry
        const fallbackAnalysis = analyzeGeometry(headGeometry);
        setModelInfo(fallbackAnalysis);

        const material = new THREE.MeshStandardMaterial({
          map: texture,
          roughness: 0.6,
          metalness: 0.02,
          color: 0xffe4d6,
          side: THREE.DoubleSide,
        });

        headMesh = new THREE.Mesh(headGeometry, material);
        headMesh.name = "EnhancedSphereHead";
        headMesh.castShadow = true;
        headMesh.receiveShadow = true;

        scene.add(headMesh);
        console.log("Enhanced sphere head with complete UV mapping ready");
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

  return modelInfo;
}
