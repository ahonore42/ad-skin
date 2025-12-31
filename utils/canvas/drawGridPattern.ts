/**
 * Grid Pattern Drawing Utility
 * Draws animated advertisement grid pattern on canvas
 */

import { drawAdBanner } from "./drawAdBanner";

// Banner ad constants
const BANNER_WIDTH = 300;
const BANNER_HEIGHT = 50;
const ANIMATION_SPEED = 30; // pixels per second

/**
 * Calculate grid dimensions based on surface size
 */
function calculateGridDimensions(surfaceWidth: number, surfaceHeight: number) {
  const spacingX = BANNER_WIDTH;
  const spacingY = BANNER_HEIGHT;
  const numCols = Math.ceil(surfaceWidth / spacingX) + 1;
  const numRows = Math.ceil(surfaceHeight / spacingY) + 1;
  return { numCols, numRows, spacingX, spacingY };
}

/**
 * Calculate animation offsets
 */
function calculateAnimationOffsets(time: number, surfaceWidth: number) {
  const totalOffset = time * ANIMATION_SPEED;
  const offset = totalOffset % surfaceWidth;
  const rotationCount = Math.floor(totalOffset / surfaceWidth);

  // Calculate controlled vertical shift that properly cycles
  // Each complete rotation shifts by one banner height, but we need to ensure proper wrapping
  const verticalShift = rotationCount * BANNER_HEIGHT;

  return { offset, verticalShift };
}

/**
 * Calculate banner position with brick-like offset
 */
function calculateBannerPosition(
  row: number,
  col: number,
  offset: number,
  verticalShift: number,
  spacingX: number,
  spacingY: number,
  surfaceWidth: number,
  surfaceHeight: number
) {
  const brickOffset = (row % 2) * (spacingX * 0.5);
  let x = col * spacingX + brickOffset - offset;

  // Apply controlled vertical shift with proper wrapping
  let y = row * spacingY - verticalShift;

  // Handle horizontal wrapping
  if (x < -BANNER_WIDTH) x += surfaceWidth + BANNER_WIDTH;
  if (x > surfaceWidth) x -= surfaceWidth + BANNER_WIDTH;

  // Handle vertical wrapping - this prevents ads from disappearing
  const totalGridHeight =
    Math.ceil(surfaceHeight / BANNER_HEIGHT) * BANNER_HEIGHT;
  while (y < -BANNER_HEIGHT) {
    y += totalGridHeight;
  }
  while (y > surfaceHeight) {
    y -= totalGridHeight;
  }

  return { x, y };
}

/**
 * Main grid pattern drawing function
 */
export function drawGridPattern(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number = 0,
  mouseX: number = -1,
  mouseY: number = -1
): void {
  // Clear canvas
  ctx.clearRect(0, 0, width, height);

  // Calculate grid dimensions and animation offsets
  const { numCols, numRows, spacingX, spacingY } = calculateGridDimensions(
    width,
    height
  );
  const { offset, verticalShift } = calculateAnimationOffsets(time, width);

  // Draw each banner using precise mathematical positioning
  let adIdCounter = 1;

  for (let row = -2; row < numRows + 2; row++) {
    for (let col = 0; col < numCols; col++) {
      const { x, y } = calculateBannerPosition(
        row,
        col,
        offset,
        verticalShift,
        spacingX,
        spacingY,
        width,
        height
      );

      // Only draw if banner is visible within canvas bounds
      if (
        x + BANNER_WIDTH > 0 &&
        x < width &&
        y + BANNER_HEIGHT > 0 &&
        y < height
      ) {
        drawAdBanner(
          ctx,
          x,
          y,
          adIdCounter,
          time,
          mouseX,
          mouseY,
          BANNER_WIDTH,
          BANNER_HEIGHT
        );
      }

      adIdCounter++;
    }
  }

  // Add subtle texture overlay
  ctx.globalAlpha = 0.03;
  ctx.fillStyle = "#000000";

  // Create noise pattern for texture
  for (let i = 0; i < width; i += 4) {
    for (let j = 0; j < height; j += 4) {
      if (Math.random() > 0.5) {
        ctx.fillRect(i, j, 2, 2);
      }
    }
  }

  ctx.globalAlpha = 1.0;
}
