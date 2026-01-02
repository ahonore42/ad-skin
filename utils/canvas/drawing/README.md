# Canvas Drawing Utilities (`utils/canvas/drawing/`)

Pure canvas rendering functions for drawing the animated advertisement grid. These utilities have no Three.js dependencies and work with any `CanvasRenderingContext2D`.

## Files

### `drawGridPattern.ts`

**Main drawing orchestrator** - Renders the complete brick-pattern grid of animated ads.

**Function**: `drawGridPattern(ctx, width, height, time, mouseX, mouseY)`

**Responsibilities**:

- Clears canvas for fresh frame
- Calculates brick-pattern layout with row offsets
- Implements horizontal scrolling animation
- Handles edge wrapping for seamless loops
- Delegates individual ad drawing to `drawAdBanner`

**Parameters**:

- `ctx: CanvasRenderingContext2D` - Canvas rendering context
- `width: number` - Canvas width in pixels
- `height: number` - Canvas height in pixels
- `time: number` - Elapsed time in seconds (for animation)
- `mouseX: number` - Mouse X coordinate (for hover detection, -1 if none)
- `mouseY: number` - Mouse Y coordinate (for hover detection, -1 if none)

**Constants**:

```typescript
BANNER_WIDTH = 300; // Width of each ad banner
BANNER_HEIGHT = 50; // Height of each ad banner
ANIMATION_SPEED = 30; // Pixels per second scroll speed
```

**Animation Logic**:

```
totalOffset = time × ANIMATION_SPEED
offset = totalOffset % width (wraps at canvas width)

For each ad:
  x = col × spacingX + brickOffset - offset

Brick offset:
  row 0, 2, 4... → offset = 0
  row 1, 3, 5... → offset = spacingX × 0.5 (half banner width)
```

**Edge Wrapping**:

- If ad extends beyond right edge → draw wrapped portion on left
- If ad starts before left edge → draw wrapped portion on right
- Creates seamless horizontal scrolling effect

### `drawAdBanner.ts`

**Individual ad renderer** - Draws a single advertisement banner with hover effects.

**Function**: `drawAdBanner(ctx, x, y, adId, time, mouseX, mouseY, bannerWidth, bannerHeight)`

**Responsibilities**:

- Selects ad content based on `adId`
- Detects hover state from mouse coordinates
- Draws background with configured color
- Renders text with intelligent outline for maximum readability
- Adds ad ID number and emoji
- Applies visual hover effects

**Parameters**:

- `ctx: CanvasRenderingContext2D` - Canvas rendering context
- `x: number` - X position to draw banner
- `y: number` - Y position to draw banner
- `adId: number` - Unique identifier for this ad (determines content/color)
- `time: number` - Elapsed time (currently unused, kept for future animations)
- `mouseX: number` - Mouse X coordinate for hover detection
- `mouseY: number` - Mouse Y coordinate for hover detection
- `bannerWidth: number` - Banner width (default: 300)
- `bannerHeight: number` - Banner height (default: 50)

**Content Selection**:

```typescript
contentIndex = adId % adContent.length;
colorIndex = adId % adColors.length;
```

**Hover Effects**:

- Normal: opacity 0.9, 1px border, 12px font
- Hovered: opacity 1.0, 3px white border, 14px bold font

**Text Rendering Strategy**:

1. **Intelligent outline color** based on text color:

   - White text (#ffffff) → Black outline
   - Black text (#000000) → White outline
   - Yellow text (#ffeb00) → Black outline
   - Red text → White outline
   - Dark colors → White outline
   - Light colors → Black outline

2. **Shadow effects** (only for non-white backgrounds):

   - `shadowColor: rgba(0, 0, 0, 0.4)`
   - `shadowBlur: 1.5`
   - `shadowOffset: (1, 1)`

3. **Stroke then fill** for maximum visibility:
   ```typescript
   ctx.strokeText(adText, x, y); // Outline
   ctx.fillText(adText, x, y); // Fill
   ```

**Layout**:

- Main text: Centered horizontally and vertically
- Ad ID (#): Top-left corner (8px, 15px)
- Emoji: Top-right corner (bannerWidth - 8px, 15px)

## Data Dependencies

### `utils/adContent.ts`

Both functions reference ad content and color data:

```typescript
// Ad text and emojis
adContent: Array<{ text: string; emoji: string }>;

// Background and text color pairs
adColors: Array<{ bg: string; text: string }>;
```

**Content is shuffled** once at module load using Fisher-Yates algorithm for variety.

## Integration Flow

```
useCanvasAnimation (hook in hooks/three/canvas/)
    ↓
drawGridPattern (main orchestrator)
    ↓
drawAdBanner (for each ad in grid)
    ↓
adContent & adColors (data from utils/)
```

## Usage Example

```typescript
import { drawGridPattern } from "@/utils/canvas/drawing/drawGridPattern";

const canvas = document.createElement("canvas");
canvas.width = 3000;
canvas.height = 2300;
const ctx = canvas.getContext("2d");

// In animation loop
function animate(time: number) {
  drawGridPattern(
    ctx,
    3000, // canvas width
    2300, // canvas height
    time, // elapsed seconds
    mouseX, // mouse X (-1 if no hover)
    mouseY // mouse Y (-1 if no hover)
  );

  requestAnimationFrame(animate);
}
```

## Performance Considerations

### Drawing Optimization

- **Clear once**: Single `clearRect` at start of frame
- **Batch operations**: All ads drawn in single loop
- **Edge wrapping**: Only draws necessary wrapped portions
- **No overdraw**: Ads outside viewport are skipped implicitly

### Text Rendering

- **System fonts**: Uses `system-ui` for fast rendering
- **Minimal shadows**: Only applied when necessary
- **Efficient outlines**: Single stroke pass per text element

### Animation Smoothness

- **Time-based**: Uses elapsed time, not frame count
- **Modulo wrapping**: Prevents offset overflow
- **60 FPS target**: Designed for smooth `requestAnimationFrame` loop

## Customization

### Changing Ad Dimensions

```typescript
// In drawGridPattern.ts
const BANNER_WIDTH = 400; // Wider banners
const BANNER_HEIGHT = 60; // Taller banners
```

### Adjusting Scroll Speed

```typescript
// In drawGridPattern.ts
const ANIMATION_SPEED = 50; // Faster scrolling (pixels/second)
```

### Modifying Hover Effects

```typescript
// In drawAdBanner.ts
const opacity = isHovered ? 1.0 : 0.8; // More transparent when not hovered
ctx.lineWidth = isHovered ? 5 : 2; // Thicker border on hover
```

## Color Contrast Guidelines

For maximum ad visibility, the utilities follow these principles:

1. **High contrast pairs**: Light text on dark backgrounds, dark text on light
2. **Intelligent outlines**: Opposite luminance of text color
3. **Shadow when appropriate**: Adds depth without reducing readability
4. **Hover enhancement**: Increases visual weight without changing size

## Testing

### Testing Drawing Functions

```typescript
import { drawAdBanner } from "@/utils/canvas/drawing/drawAdBanner";
import { drawGridPattern } from "@/utils/canvas/drawing/drawGridPattern";

// Test specific ad ID
drawAdBanner(ctx, 0, 0, 42, 0, -1, -1, 300, 50);

// Test hover state
drawAdBanner(ctx, 0, 0, 42, 0, 150, 25, 300, 50); // Mouse at center

// Test grid with no animation
drawGridPattern(ctx, 3000, 2300, 0, -1, -1);
```

## Architecture Benefits

### Pure Canvas Operations

- **No Three.js dependency** - Works with any canvas context
- **Framework agnostic** - Can be used in any JavaScript environment
- **Testable in isolation** - Easy to unit test
- **Reusable** - Can be applied to non-3D contexts
- **Fast** - Optimized for 60 FPS rendering

### Separation of Concerns

- Drawing logic separate from 3D scene management
- Content data separate from rendering logic
- Animation timing separate from visual presentation

## Future Enhancements

- **Ad transitions**: Fade in/out effects when ads change
- **Click animations**: Visual feedback on click
- **Dynamic sizing**: Responsive banner dimensions based on canvas size
- **Performance monitoring**: FPS tracking and optimization
- **A/B testing**: Multiple layout algorithms
- **Particle effects**: Ad hover particle trails
- **Gradient backgrounds**: More sophisticated color schemes
- **Text animations**: Pulsing, sliding, or rotating text effects
