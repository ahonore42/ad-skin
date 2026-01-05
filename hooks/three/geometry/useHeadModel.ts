import { useEffect, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

/**
 * Enhanced head model loader with complete surface mapping analysis
 * Positions model at exact scene center (0, 0, 0)
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
      const uvAttribute = geometry.attributes.uv;
      const positionAttribute = geometry.attributes.position;

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

        const geometry = originalGeometry.clone();

        // Calculate proper scaling
        const size = new THREE.Vector3();
        analysis.boundingBox.getSize(size);
        const maxDimension = Math.max(size.x, size.y, size.z);
        const targetSize = 3.0;
        const autoScale = targetSize / maxDimension;
        const finalScale = scale * autoScale;

        geometry.scale(finalScale, finalScale, finalScale);

        const material = new THREE.MeshStandardMaterial({
          map: texture,
          roughness: 0.6,
          metalness: 0.02,
          color: 0xffe4d6,
          side: THREE.DoubleSide,
          transparent: false,
          alphaTest: 0.1,
        });

        headMesh = new THREE.Mesh(geometry, material);
        headMesh.name = "DavidHead";
        headMesh.castShadow = true;
        headMesh.receiveShadow = true;

        // Apply rotation to orient the head properly
        headMesh.rotation.x = -Math.PI / 2;

        // CENTER THE MODEL AT SCENE ORIGIN (X and Z only, preserve Y)
        // Calculate the bounding box of the scaled geometry
        geometry.computeBoundingBox();
        const box = geometry.boundingBox!;
        const center = new THREE.Vector3();
        box.getCenter(center);

        // Position mesh so its center is at scene origin on X and Z axes only
        headMesh.position.set(-center.x, 0, -center.z);

        console.log("Model center:", center);
        console.log("Mesh position offset (X, Z only):", headMesh.position);

        scene.add(headMesh);

        console.log(
          "David head model successfully loaded and centered at scene origin"
        );
      } catch (error) {
        console.error("Failed to load head model:", error);
      }
    };

    loadHeadModel();

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
