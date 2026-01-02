/**
 * Banner Advertisement Drawing Utility - Updated
 * Draws a single animated advertisement with intelligent color handling
 */
import { adContent, adColors } from "../../adContent";

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
  const adText = adContent[contentIndex].text;
  const admoji = adContent[contentIndex].emoji;
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

  // Intelligent text outline logic based on text color
  const textColor = colors.text.toLowerCase();
  let outlineColor: string;

  // Determine optimal outline color based on text color
  if (textColor === "#ffffff" || textColor === "#fff") {
    // White text gets black outline
    outlineColor = "rgba(0, 0, 0, 0.8)";
  } else if (textColor === "#000000" || textColor === "#000") {
    // Black text gets white outline
    outlineColor = "rgba(255, 255, 255, 0.8)";
  } else if (
    textColor === "#ffeb00" ||
    (textColor.includes("ff") && textColor.includes("eb"))
  ) {
    // Yellow text (Middle Yellow) gets dark outline
    outlineColor = "rgba(0, 0, 0, 0.8)";
  } else if (textColor === "#d92121" || textColor === "#da291c") {
    // Red text gets white outline for maximum visibility
    outlineColor = "rgba(255, 255, 255, 0.8)";
  } else if (textColor === "#614051") {
    // Eggplant purple gets white outline
    outlineColor = "rgba(255, 255, 255, 0.8)";
  } else if (textColor === "#2d383a" || textColor === "#00468c") {
    // Dark colors get white outline
    outlineColor = "rgba(255, 255, 255, 0.8)";
  } else {
    // Default: use opposing color based on luminance
    // Light text colors get dark outline, dark text colors get light outline
    const isLightText =
      textColor.includes("ff") ||
      (textColor.includes("f") && textColor.length <= 4);
    outlineColor = isLightText
      ? "rgba(0, 0, 0, 0.8)"
      : "rgba(255, 255, 255, 0.8)";
  }

  // Add subtle shadow (no shadow for white backgrounds to keep it clean)
  if (colors.bg !== "#ffffff") {
    ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
    ctx.shadowBlur = 1.5;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;
  } else {
    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
  }

  // Draw text outline for better contrast
  ctx.strokeStyle = outlineColor;
  ctx.lineWidth = 1;
  ctx.strokeText(adText, bannerWidth / 2, bannerHeight / 2);

  // Fill text on top of outline
  ctx.fillText(adText, bannerWidth / 2, bannerHeight / 2);

  // Add small ad ID number in corner with subtle effects
  ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
  ctx.shadowBlur = 1;
  ctx.shadowOffsetX = 0.5;
  ctx.shadowOffsetY = 0.5;
  ctx.font = "bold 10px system-ui";
  ctx.textAlign = "left";
  ctx.fillStyle = colors.text;

  // ID outline matches text outline logic
  ctx.strokeStyle = outlineColor;
  ctx.lineWidth = 0.5;
  ctx.strokeText(`#${adId}`, 8, 15);
  ctx.fillText(`#${adId}`, 8, 15);

  // Add emoji in top right corner (mirrored position)
  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;
  ctx.font = "bold 10px system-ui";
  ctx.textAlign = "right";
  ctx.strokeStyle = outlineColor;
  ctx.lineWidth = 0.3;
  ctx.strokeText(admoji, bannerWidth - 8, 15);
  ctx.fillText(admoji, bannerWidth - 8, 15);

  ctx.restore();
}
