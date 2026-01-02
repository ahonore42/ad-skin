# Canvas System (`hooks/three/canvas/`)

This directory contains hooks and utilities for managing the canvas-based texture system that maps animated advertisements onto 3D geometry.

## Files

### `useCanvasTexture.ts`

**Main orchestrator hook** - Coordinates all canvas subsystems into a single interface.

- Creates HTML canvas element (SSR-safe)
- Generates Three.js `CanvasTexture` from canvas
- Orchestrates animation, raycasting, and click detection
- **Returns**: `{ canvas, texture }` - Canvas element and Three.js texture
- **Parameters**:
  - `width`, `height` - Canvas dimensions
  - `rendererCanvas` - WebGL canvas for raycasting
  - `scene`, `camera` - Three.js objects for 3D interaction

### `useCanvasAnimation.ts`

**Animation loop manager** - Drives continuous canvas updates.

- Manages `requestAnimationFrame` loop
- Calls drawing utilities (e.g., `drawGridPattern`)
- Tracks elapsed time for animations
- Updates texture's `needsUpdate` flag
- **Side effects only** - No return value

### `use3DMouseRaycaster.ts`

**3D interaction system** - Converts 2D mouse events to 3D texture coordinates.

- Listens to mouse events on renderer canvas
- Performs raycasting from camera through scene
- Calculates UV coordinates at intersection point
- Converts UV to texture pixel coordinates
- Distinguishes clicks from drags
- **Side effects only** - Calls provided callbacks

### `useAdPositionCalculator.ts`

**Ad grid logic** - Determines which ad occupies a given texture position.

- Calculates brick-pattern layout with vertical shifting
- Maps texture coordinates to ad IDs
- Handles time-based vertical scrolling
- Accounts for eye protection zones
- **Exports**: `findAdAtPosition(x, y, time, width, height)` function

### `useAdUrlManager.ts`

**Click handling** - Manages ad URLs and tracks clicks.

- Maps ad IDs to destination URLs
- Opens URLs in new tabs with security settings
- Logs clicks for analytics
- **Exports**:
  - `handleAdClick(adId, x, y)` - Main click handler
  - `getAdUrl(adId)` - URL lookup
  - `openAdUrl(url)` - Safe navigation

## Data Flow

```
User clicks canvas
  ↓
use3DMouseRaycaster converts to texture coordinates
  ↓
useAdPositionCalculator identifies which ad was clicked
  ↓
useAdUrlManager opens the ad's destination URL
  ↓
Click is logged for analytics
```

## Integration Example

```typescript
const { texture } = useCanvasTexture(
  3000, // width
  2300, // height
  renderer?.domElement,
  scene,
  camera
);

// Texture is automatically:
// - Animated via useCanvasAnimation
// - Interactive via use3DMouseRaycaster
// - Click-aware via useAdPositionCalculator + useAdUrlManager
```
