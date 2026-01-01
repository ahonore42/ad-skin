import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/**
 * Sets up the core Three.js scene, camera, and renderer
 * Manages the animation loop and resize handling
 */
export function useThreeScene(
  containerRef: React.RefObject<HTMLDivElement | null>
) {
  const [scene, setScene] = useState<THREE.Scene | null>(null);
  const [camera, setCamera] = useState<THREE.PerspectiveCamera | null>(null);
  const [renderer, setRenderer] = useState<THREE.WebGLRenderer | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || initializedRef.current) return;

    initializedRef.current = true;

    // Scene setup
    const newScene = new THREE.Scene();

    // Camera setup
    const newCamera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    newCamera.position.z = 5;

    // Renderer setup with transparency and color accuracy
    const newRenderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    newRenderer.setClearColor(0x000000, 0); // Transparent background
    newRenderer.setSize(container.clientWidth, container.clientHeight);
    newRenderer.setPixelRatio(window.devicePixelRatio);

    // Color saturation fixes
    newRenderer.outputColorSpace = THREE.SRGBColorSpace;
    newRenderer.toneMapping = THREE.NoToneMapping;
    newRenderer.toneMappingExposure = 1.0;

    container.appendChild(newRenderer.domElement);

    // Set state in next tick to avoid synchronous setState warning
    Promise.resolve().then(() => {
      setScene(newScene);
      setCamera(newCamera);
      setRenderer(newRenderer);
    });

    // Handle window resize
    const handleResize = () => {
      if (!container) return;

      newCamera.aspect = container.clientWidth / container.clientHeight;
      newCamera.updateProjectionMatrix();
      newRenderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      newRenderer.dispose();
      if (container && container.contains(newRenderer.domElement)) {
        container.removeChild(newRenderer.domElement);
      }
      initializedRef.current = false;
    };
  }, [containerRef]);

  // Start animation loop
  const startAnimation = (callback: () => void) => {
    if (!scene || !camera || !renderer) return;

    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      callback();
      renderer.render(scene, camera);
    };
    animate();
  };

  return {
    scene,
    camera,
    renderer,
    startAnimation,
  };
}
