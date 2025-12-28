import { useEffect, useRef, useMemo } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/**
 * Sets up OrbitControls for camera interaction
 * Enables rotation, zoom, and auto-rotation
 */
export function useControls(
  camera: THREE.Camera | null,
  renderer: THREE.WebGLRenderer | null,
  autoRotate: boolean = true,
  autoRotateSpeed: number = 0.5
) {
  const controlsRef = useRef<OrbitControls | null>(null);

  useEffect(() => {
    if (!camera || !renderer) {
      controlsRef.current = null;
      return;
    }

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = autoRotateSpeed;
    controlsRef.current = controls;

    return () => {
      controls.dispose();
      controlsRef.current = null;
    };
  }, [camera, renderer, autoRotate, autoRotateSpeed]);

  // Derive isReady from dependencies without accessing ref during render
  const isReady = useMemo(() => {
    return !!(camera && renderer);
  }, [camera, renderer]);

  // Return an object with methods that can be called safely
  return {
    update: () => {
      if (controlsRef.current) {
        controlsRef.current.update();
      }
    },
    isReady,
  };
}
