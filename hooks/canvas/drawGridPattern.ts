/**
 * Draws a grid pattern on a canvas context
 * This represents placeholder ad slots that will be mapped onto 3D geometry
 */
export function drawGridPattern(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) {
  // Background
  ctx.fillStyle = '#1a1a1a'
  ctx.fillRect(0, 0, width, height)

  // Grid configuration for ad slots
  const cols = 8
  const rows = 4
  const cellWidth = width / cols
  const cellHeight = height / rows
  const padding = 10

  // Draw grid cells (these will become ad slots)
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * cellWidth
      const y = row * cellHeight

      // Cell background
      ctx.fillStyle = '#2a2a2a'
      ctx.fillRect(x + padding, y + padding, cellWidth - padding * 2, cellHeight - padding * 2)

      // Cell border
      ctx.strokeStyle = '#444'
      ctx.lineWidth = 2
      ctx.strokeRect(x + padding, y + padding, cellWidth - padding * 2, cellHeight - padding * 2)

      // Placeholder text
      ctx.fillStyle = '#666'
      ctx.font = '24px Arial'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(
        `AD ${row * cols + col + 1}`,
        x + cellWidth / 2,
        y + cellHeight / 2
      )
    }
  }
}
