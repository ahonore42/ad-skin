/**
 * Banner Advertisement Drawing Utility
 * Draws a single animated advertisement to fit within a canvas grid pattern
 */
import { adContent, adColors } from "../adContent";

/**
 * Draw a single advertisement banner
 */
export function drawAdBanner(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  adId: number,
  time: number,
  mouseX: number,
  mouseY: number,
  bannerWidth: number = 300,
  bannerHeight: number = 50
) {
  // Check if mouse is hovering over this ad
  const isHovered =
    mouseX >= x &&
    mouseX <= x + bannerWidth &&
    mouseY >= y &&
    mouseY <= y + bannerHeight;

  // Select content and colors based on ad ID only (no time-based rotation)
  const contentIndex = adId % adContent.length;
  const colorIndex = adId % adColors.length;
  const adText = adContent[contentIndex];
  const colors = adColors[colorIndex];

  // Apply hover effect - only visual enhancements, no size change
  const opacity = isHovered ? 1.0 : 0.9;

  ctx.save();

  // Move to position (no scaling)
  ctx.translate(x, y);

  // Set opacity
  ctx.globalAlpha = opacity;

  // Draw banner background
  ctx.fillStyle = colors.bg;
  ctx.fillRect(0, 0, bannerWidth, bannerHeight);

  // Draw border
  ctx.strokeStyle = isHovered ? "#ffffff" : colors.text + "40";
  ctx.lineWidth = isHovered ? 3 : 1;
  ctx.strokeRect(0, 0, bannerWidth, bannerHeight);

  // Draw text with enhanced visibility
  ctx.fillStyle = colors.text;
  ctx.font = isHovered ? "bold 14px system-ui" : "bold 12px system-ui";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Use miter limit and round joins to prevent outline spikes
  ctx.miterLimit = 2;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  // Add refined text shadow for most combinations (toned down)
  ctx.shadowColor =
    colors.bg === "#ffffff" ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.4)";
  ctx.shadowBlur = 1.5; // Reduced from 3
  ctx.shadowOffsetX = 1; // Reduced from 2
  ctx.shadowOffsetY = 1; // Reduced from 2

  // Draw refined text outline for better contrast (toned down)
  ctx.strokeStyle =
    colors.bg === "#ffffff"
      ? "rgba(0, 0, 0, 0.8)"
      : colors.text === "#ffffff"
      ? "rgba(0, 0, 0, 0.8)"
      : colors.text === "#ffff00"
      ? "rgba(0, 0, 0, 0.8)"
      : colors.text === "#00ff00"
      ? "rgba(0, 0, 0, 0.8)"
      : "rgba(255, 255, 255, 0.8)";
  ctx.lineWidth = 1; // Reduced from 2, but kept for visibility
  ctx.strokeText(adText, bannerWidth / 2, bannerHeight / 2);

  // Fill text on top of outline
  ctx.fillText(adText, bannerWidth / 2, bannerHeight / 2);

  // Add small ad ID number in corner with subtle effects
  ctx.shadowColor = "rgba(0, 0, 0, 0.3)"; // Subtle shadow
  ctx.shadowBlur = 1;
  ctx.shadowOffsetX = 0.5;
  ctx.shadowOffsetY = 0.5;
  ctx.font = "bold 10px system-ui";
  ctx.textAlign = "left";
  ctx.fillStyle = colors.text;
  ctx.strokeStyle =
    colors.bg === "#ffffff" ? "rgba(0, 0, 0, 0.6)" : "rgba(255, 255, 255, 0.6)";
  ctx.lineWidth = 0.5; // Thin outline for ID
  ctx.strokeText(`#${adId}`, 8, 15);
  ctx.fillText(`#${adId}`, 8, 15);

  ctx.restore();
}
