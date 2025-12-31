/**
 * Ad Position Calculator
 * Handles all calculations related to banner ad positioning, animation, and hit detection
 */

// Banner ad constants
export const BANNER_WIDTH = 300;
export const BANNER_HEIGHT = 50;
export const ANIMATION_SPEED = 30; // pixels per second

/**
 * Calculates grid dimensions based on surface size
 */
export function calculateGridDimensions(
  surfaceWidth: number,
  surfaceHeight: number
) {
  const spacingX = BANNER_WIDTH;
  const spacingY = BANNER_HEIGHT;

  const numCols = Math.floor(surfaceWidth / spacingX);
  const numRows = Math.ceil(surfaceHeight / spacingY) + 1;
  const totalAds = numCols * numRows;

  return {
    numCols,
    numRows,
    totalAds,
    spacingX,
    spacingY,
  };
}

/**
 * Calculates animation offsets based on current time
 */
export function calculateAnimationOffsets(time: number, surfaceWidth: number) {
  const totalOffset = time * ANIMATION_SPEED;
  const offset = totalOffset % surfaceWidth;
  const rotationCount = Math.floor(totalOffset / surfaceWidth);
  const verticalShift = rotationCount * BANNER_HEIGHT;

  return {
    offset,
    rotationCount,
    verticalShift,
  };
}

/**
 * Calculates the position of a specific banner ad
 */
export function calculateBannerPosition(
  row: number,
  col: number,
  offset: number,
  verticalShift: number,
  spacingX: number,
  spacingY: number,
  surfaceWidth: number,
  surfaceHeight?: number
) {
  const brickOffset = (row % 2) * (spacingX * 0.5);
  let x = col * spacingX + brickOffset - offset;
  let y = row * spacingY - verticalShift;

  // Handle horizontal wrapping
  if (x < -BANNER_WIDTH) x += surfaceWidth + BANNER_WIDTH;
  if (x > surfaceWidth) x -= surfaceWidth + BANNER_WIDTH;

  // Handle vertical wrapping
  if (surfaceHeight) {
    const totalGridHeight =
      Math.ceil(surfaceHeight / BANNER_HEIGHT) * BANNER_HEIGHT;
    while (y < -BANNER_HEIGHT) {
      y += totalGridHeight;
    }
    while (y > surfaceHeight) {
      y -= totalGridHeight;
    }
  }

  return { x, y };
}

/**
 * Finds which ad (if any) is at the given texture coordinates
 */
export function findAdAtPosition(
  textureX: number,
  textureY: number,
  time: number,
  surfaceWidth: number,
  surfaceHeight: number
): number | null {
  const { numCols, numRows, spacingX, spacingY } = calculateGridDimensions(
    surfaceWidth,
    surfaceHeight
  );
  const { offset, verticalShift } = calculateAnimationOffsets(
    time,
    surfaceWidth
  );

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const { x, y } = calculateBannerPosition(
        row,
        col,
        offset,
        verticalShift,
        spacingX,
        spacingY,
        surfaceWidth,
        surfaceHeight
      );

      // Check if click is within this banner
      if (
        textureX >= x &&
        textureX <= x + BANNER_WIDTH &&
        textureY >= y &&
        textureY <= y + BANNER_HEIGHT
      ) {
        return row * numCols + col + 1; // Return ad ID
      }
    }
  }
  return null;
}

/**
 * Hook for ad position calculations
 */
export function useAdPositionCalculator(
  surfaceWidth: number,
  surfaceHeight: number
) {
  const gridDimensions = calculateGridDimensions(surfaceWidth, surfaceHeight);

  const findAd = (textureX: number, textureY: number, time: number) =>
    findAdAtPosition(textureX, textureY, time, surfaceWidth, surfaceHeight);

  const getAnimationOffsets = (time: number) =>
    calculateAnimationOffsets(time, surfaceWidth);

  const getBannerPosition = (row: number, col: number, time: number) => {
    const { offset, verticalShift } = getAnimationOffsets(time);
    return calculateBannerPosition(
      row,
      col,
      offset,
      verticalShift,
      gridDimensions.spacingX,
      gridDimensions.spacingY,
      surfaceWidth
    );
  };

  return {
    ...gridDimensions,
    findAd,
    getAnimationOffsets,
    getBannerPosition,
    constants: {
      BANNER_WIDTH,
      BANNER_HEIGHT,
      ANIMATION_SPEED,
    },
  };
}
