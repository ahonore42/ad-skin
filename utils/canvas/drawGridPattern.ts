/**
 * Draws animated banner ads in a brick pattern that continuously rotates around a 3D surface
 * Banners are clickable with hover effects
 */
export function drawGridPattern(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number = 0,
  mouseX: number = -1,
  mouseY: number = -1
) {
  // Clear canvas
  ctx.fillStyle = "#1a1a1a";
  ctx.fillRect(0, 0, width, height);

  // Banner dimensions (correct mobile banner size)
  const bannerWidth = 300;
  const bannerHeight = 50;

  // Grid spacing - no overlap, banners touch edge to edge
  const spacingX = bannerWidth; // 300px - no gaps
  const spacingY = bannerHeight; // 50px - no gaps

  // Animation - continuous horizontal movement that wraps around texture width
  const speed = 30;
  const totalOffset = time * speed;
  const offset = totalOffset % width; // Wrap at texture width for full rotation

  // Calculate how many full rotations have completed
  const rotationCount = Math.floor(totalOffset / width);

  // Vertical shuffle amount based on rotation count
  const shuffleOffset = (rotationCount * spacingY * 0.3) % (spacingY * 3); // Shuffle every rotation

  // Calculate grid dimensions
  const numCols = Math.ceil(width / spacingX) + 1; // Just enough to cover width
  const numRows = Math.ceil(height / spacingY) + 1;
  const totalAds = numRows * numCols;

  // Log surface and ad information (only log occasionally to avoid spam)
  if (Math.floor(time) % 5 === 0 && Math.floor(time * 10) % 10 === 0) {
    console.log(
      `Surface: ${width}x${height}px | Banner: ${bannerWidth}x${bannerHeight}px | Spacing: ${spacingX.toFixed(
        1
      )}x${spacingY.toFixed(
        1
      )}px | Grid: ${numCols}x${numRows} | Total Ads: ${totalAds}`
    );
  }

  // Draw grid
  for (let row = 0; row < numRows; row++) {
    // Brick pattern: offset every other row
    const brickOffset = (row % 2) * (spacingX * 0.5);

    for (let col = 0; col < numCols; col++) {
      // Calculate base position with vertical shuffle
      let x = col * spacingX + brickOffset - offset;
      const y = row * spacingY + shuffleOffset;

      // Use sequential ad ID based on actual grid position
      const displayAdId = row * numCols + col + 1;

      // Wrap horizontally - if ad goes off right edge, wrap to left
      if (x < -bannerWidth) {
        x += width + bannerWidth;
      }
      if (x > width) {
        x -= width + bannerWidth;
      }

      // Check if mouse is hovering over this banner
      const isHovered =
        mouseX >= x &&
        mouseX <= x + bannerWidth &&
        mouseY >= y &&
        mouseY <= y + bannerHeight;

      // Debug logging for hover detection (only for first few ads)
      if (isHovered && displayAdId <= 3) {
        console.log(
          `Hovering ad ${displayAdId}: mouse(${mouseX.toFixed(
            0
          )}, ${mouseY.toFixed(0)}) banner(${x.toFixed(0)}, ${y.toFixed(
            0
          )}) size(${bannerWidth}x${bannerHeight})`
        );
      }

      // Draw banner with hover effect
      ctx.fillStyle = isHovered ? "#3a3a3a" : "#2a2a2a"; // Lighter on hover
      ctx.fillRect(x, y, bannerWidth, bannerHeight);

      // Banner border - thicker and different color on hover
      ctx.strokeStyle = isHovered ? "#666" : "#444";
      ctx.lineWidth = isHovered ? 2 : 1;
      ctx.strokeRect(x, y, bannerWidth, bannerHeight);

      // Add hover outline and clickable indicator
      if (isHovered) {
        ctx.strokeStyle = "#888";
        ctx.lineWidth = 3;
        ctx.strokeRect(x - 1, y - 1, bannerWidth + 2, bannerHeight + 2);

        // Add small click icon indicator (simple arrow)
        ctx.fillStyle = "#fff";
        ctx.font = "12px Arial";
        ctx.textAlign = "right";
        ctx.textBaseline = "top";
        ctx.fillText("↗", x + bannerWidth - 5, y + 5);
      }

      // Banner text with shuffled ID
      ctx.fillStyle = "#666";
      ctx.font = "12px Arial";
      ctx.textAlign = "left";
      ctx.fillText(`Ad ${displayAdId}`, x + 8, y + 20);

      ctx.fillStyle = "#555";
      ctx.font = "10px Arial";
      ctx.fillText(`300x50`, x + 8, y + 35);
    }
  }
}
