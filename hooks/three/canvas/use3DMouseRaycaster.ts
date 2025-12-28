/**
 * 3D Mouse Raycaster
 * Handles 3D mouse interaction with raycasting
 */

import { useRef, useEffect } from "react";
import * as THREE from "three";

/**
 * Mouse position tracking
 */
interface MousePosition {
  x: number;
  y: number;
}

/**
 * NDC coordinate conversion
 */
function convertToNDC(
  clientX: number,
  clientY: number,
  rect: DOMRect
): { x: number; y: number } {
  return {
    x: ((clientX - rect.left) / rect.width) * 2 - 1,
    y: -((clientY - rect.top) / rect.height) * 2 + 1,
  };
}

/**
 * UV coordinate mapping
 */
function uvToTexture(
  uv: THREE.Vector2,
  width: number,
  height: number
): MousePosition {
  return {
    x: uv.x * width,
    y: (1 - uv.y) * height, // Flip Y coordinate
  };
}

/**
 * Raycasting logic
 */
function performRaycast(
  mouseNDC: { x: number; y: number },
  camera: THREE.Camera,
  scene: THREE.Scene,
  raycaster: THREE.Raycaster,
  width: number,
  height: number
): MousePosition | null {
  raycaster.setFromCamera(
    new THREE.Vector2(mouseNDC.x, mouseNDC.y),
    camera as THREE.PerspectiveCamera
  );
  const intersects = raycaster.intersectObjects(scene.children, true);

  if (intersects.length > 0 && intersects[0].uv) {
    return uvToTexture(intersects[0].uv, width, height);
  }
  return null;
}

/**
 * Hook for 3D mouse raycasting
 */
export function use3DMouseRaycaster(
  canvas: HTMLCanvasElement | null,
  scene: THREE.Scene | null,
  camera: THREE.Camera | null,
  width: number,
  height: number,
  mouseRef: React.MutableRefObject<MousePosition>,
  onMouseMove?: (position: MousePosition | null) => void,
  onMouseLeave?: () => void,
  onClick?: (position: MousePosition | null) => void
) {
  const raycaster = useRef<THREE.Raycaster>(new THREE.Raycaster());

  useEffect(() => {
    if (!canvas || !scene || !camera) return;

    // Mouse event handlers
    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseNDC = convertToNDC(event.clientX, event.clientY, rect);
      const texturePos = performRaycast(
        mouseNDC,
        camera,
        scene,
        raycaster.current,
        width,
        height
      );

      if (texturePos) {
        mouseRef.current = texturePos;
        onMouseMove?.(texturePos);
      } else {
        mouseRef.current = { x: -1, y: -1 };
        onMouseMove?.(null);
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1, y: -1 };
      onMouseLeave?.();
    };

    const handleClick = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseNDC = convertToNDC(event.clientX, event.clientY, rect);
      const texturePos = performRaycast(
        mouseNDC,
        camera,
        scene,
        raycaster.current,
        width,
        height
      );

      onClick?.(texturePos);
    };

    // Add event listeners
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("click", handleClick);

    // Cleanup
    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("click", handleClick);
    };
  }, [
    canvas,
    scene,
    camera,
    width,
    height,
    mouseRef,
    onMouseMove,
    onMouseLeave,
    onClick,
  ]);

  // No return needed - this hook manages mouse events internally
}
