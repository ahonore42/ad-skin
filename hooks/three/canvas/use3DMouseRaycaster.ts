/**
 * 3D Mouse Raycaster with Drag Detection
 * Handles 3D mouse interaction with raycasting and prevents ad clicks during drag operations
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
 * Calculate distance between two positions
 */
function calculateDistance(
  pos1: MousePosition | null,
  pos2: MousePosition | null
): number {
  if (!pos1 || !pos2) return Infinity;
  const dx = pos2.x - pos1.x;
  const dy = pos2.y - pos1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Hook for 3D mouse raycasting with drag detection
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
  onClick?: (position: MousePosition | null) => void,
  onHoverChange?: (isOverAd: boolean) => void, // callback for hover state changes
  dragThreshold: number = 5 // pixels - movement threshold to consider it a drag
) {
  const raycaster = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const mouseDownPositionRef = useRef<MousePosition | null>(null);

  useEffect(() => {
    if (!canvas || !scene || !camera) return;

    // Track mousedown position
    const handleMouseDown = (event: MouseEvent) => {
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

      // Store the position where mouse was pressed down
      mouseDownPositionRef.current = texturePos;
    };

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

        // Notify hover state change if callback provided
        if (onHoverChange) {
          // Check if mouse is over an ad (callback will handle cursor)
          onHoverChange(true);
        }
      } else {
        mouseRef.current = { x: -1, y: -1 };
        onMouseMove?.(null);

        // Notify hover state change if callback provided
        if (onHoverChange) {
          onHoverChange(false);
        }
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1, y: -1 };
      mouseDownPositionRef.current = null;
      onMouseLeave?.();
    };

    const handleClick = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseNDC = convertToNDC(event.clientX, event.clientY, rect);
      const mouseUpPosition = performRaycast(
        mouseNDC,
        camera,
        scene,
        raycaster.current,
        width,
        height
      );

      // Calculate distance between mousedown and mouseup positions
      const dragDistance = calculateDistance(
        mouseDownPositionRef.current,
        mouseUpPosition
      );

      // Only trigger click if movement was below threshold (not a drag)
      if (dragDistance <= dragThreshold) {
        onClick?.(mouseUpPosition);
      }

      // Reset mousedown position after click
      mouseDownPositionRef.current = null;
    };

    // Add event listeners
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("click", handleClick);

    // Cleanup
    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
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
    onHoverChange,
    dragThreshold,
  ]);

  // No return needed - this hook manages mouse events internally
}
