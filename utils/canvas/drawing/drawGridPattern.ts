/**
 * Static Grid Pattern Drawing Utility
 * Draws a static brick pattern with no animation
 */

import { drawAdBanner } from "./drawAdBanner";

const BANNER_WIDTH = 300;
const BANNER_HEIGHT = 50;
const ANIMATION_SPEED = 30;

export function drawGridPattern(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number = 0,
  mouseX: number = -1,
  mouseY: number = -1
): void {
  ctx.clearRect(0, 0, width, height);

  const spacingX = BANNER_WIDTH;
  const spacingY = BANNER_HEIGHT;
  const numCols = Math.floor(width / spacingX);
  const numRows = Math.floor(height / spacingY);

  // Calculate animation offset
  const totalOffset = time * ANIMATION_SPEED;
  const offset = totalOffset % width;

  let adIdCounter = 1;

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const brickOffset = (row % 2) * (spacingX * 0.5);
      const x = col * spacingX + brickOffset - offset;
      const y = row * spacingY;

      // Draw the primary ad
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

      // If ad extends beyond right edge, draw wrapped portion on left
      if (x + BANNER_WIDTH > width) {
        drawAdBanner(
          ctx,
          x - width,
          y,
          adIdCounter,
          time,
          mouseX,
          mouseY,
          BANNER_WIDTH,
          BANNER_HEIGHT
        );
      }

      // If ad starts before left edge, draw wrapped portion on right
      if (x < 0) {
        drawAdBanner(
          ctx,
          x + width,
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
}
