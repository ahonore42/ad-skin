# Lighting System (`hooks/three/lighting/`)

This directory contains hooks for scene lighting configurations optimized for different geometry types.

## Files

### `useLighting.ts`

**Camera-attached lighting** - Basic lighting that follows the camera.

- Creates "headlight" effect where light always comes from viewer's perspective
- Light rotates with camera, keeping consistent illumination
- **Lights configured**:
  - Ambient light: 0.4 intensity, white (#ffffff)
  - Directional light: 0.8 intensity, attached to camera
- **Light position**: Slightly offset from camera (0, 2, 0) relative
- **Parameters**:
  - `scene` - Three.js scene
  - `camera` - Three.js camera (lights attach to this)
- **Side effects only** - No return value

## Position Coordinates Explained with Sphere Geometry

### `directionalLight.position.set(0, 2, 0)`

Sets the light's position **relative to the camera** (since the light is a child of the camera):

- **`0`** (X-axis) = **Same horizontal position** as the camera (no left/right offset)
- **`2`** (Y-axis) = **2 units above** the camera
- **`0`** (Z-axis) = **Same depth** as the camera (no forward/backward offset)

So the light is positioned **directly above** where the camera is looking.

### `directionalLight.target.position.set(0, 0, 0)`

Sets where the light is **pointing to** in **world space**:

- **`(0, 0, 0)`** = The **world origin** (center of the scene)
- This is where the sphere/geometry is located
- So the light always points at the geometry's center

## Visual Representation

```
         💡 (Light at 0,2,0 relative to camera)
         ┆
         ┆
    Camera/Viewer
         👁️
         ┆
         ┆
         ▼
         🌐  (Geometry at 0,0,0 - light target)
```

## What This Creates

- Light comes from **above** relative to the view
- Always points at the geometry center
- As you orbit around (with orbit controls), the light moves with the viewpoint
- The geometry always appears lit from the same screen direction

## Adjusting the Values

Values could be changed to:

- `(1, 1, 0)` = Light up and to the right of camera (upper-right lighting)
- `(-1, 1, 1)` = Light up-left-forward of camera
- `(0, 0, 1)` = Light directly in front of camera (like a flashlight)

The target `(0, 0, 0)` usually stays the same since that's where the geometry is positioned.

---

### `usePortraitLighting.ts`

**Three-point portrait lighting** - Professional lighting setup for facial geometry.

- Classic three-point lighting system optimized for human heads
- All lights attached to camera for consistent illumination during rotation
- **Lights configured**:
  - Ambient: 0.3 intensity, white - Soft base illumination
  - Key light: 0.8 intensity, upper-left position (-2, 3, 2) - Main light source
  - Fill light: 0.3 intensity, upper-right position (2, 1, 1) - Reduces harsh shadows
  - Rim light: 0.2 intensity, back position (0, 1, -3) - Adds depth and separation
- **Parameters**:
  - `scene` - Three.js scene
  - `camera` - Three.js camera (lights attach to this)
- **Side effects only** - No return value

---

### `usePortraitLighting.ts`

**Three-point portrait lighting** - Professional lighting setup for facial geometry.

- Classic three-point lighting system optimized for human heads
- All lights attached to camera for consistent illumination during rotation
- **Lights configured**:
  - Ambient: 0.3 intensity, white - Soft base illumination
  - Key light: 0.8 intensity, upper-left position (-2, 3, 2) - Main light source
  - Fill light: 0.3 intensity, upper-right position (2, 1, 1) - Reduces harsh shadows
  - Rim light: 0.2 intensity, back position (0, 1, -3) - Adds depth and separation
- **Parameters**:
  - `scene` - Three.js scene
  - `camera` - Three.js camera (lights attach to this)
- **Side effects only** - No return value

## Lighting Comparison

| Feature           | useLighting               | usePortraitLighting         |
| ----------------- | ------------------------- | --------------------------- |
| Purpose           | General geometry          | Facial/organic forms        |
| Light count       | 2 (ambient + directional) | 4 (ambient + 3 directional) |
| Ambient intensity | 0.4                       | 0.3                         |
| Setup complexity  | Simple                    | Three-point system          |
| Best for          | Spheres, abstract shapes  | Human heads, portraits      |
| Shadow quality    | Basic                     | Professional depth          |

## Technical Details

### Camera Attachment Strategy

Both hooks attach lights to the camera rather than the scene directly:

```typescript
camera.add(directionalLight); // Light becomes camera's child
scene.add(camera); // Ensure camera is in scene graph
```

**Benefits**:

- Lighting remains consistent during object rotation
- No need to manually update light positions
- Viewer always sees well-lit surface
- Simplifies animation loop

### Light Positioning

Positions are relative to camera coordinate system:

- **X-axis**: Left (-) to Right (+)
- **Y-axis**: Down (-) to Up (+)
- **Z-axis**: Behind (-) to Forward (+)

Portrait lighting positions create classic photography angles:

- Key light: Upper-left-forward (main modeling)
- Fill light: Upper-right-forward (shadow softening)
- Rim light: Behind-slightly-up (edge definition)

## Usage Example

```typescript
// For sphere geometry
useLighting(scene, camera);

// For David head model
usePortraitLighting(scene, camera);
```

## Cleanup

Both hooks automatically clean up lights when components unmount:

- Lights removed from camera
- Lights removed from scene
- No memory leaks from orphaned lights

## Customization

To modify lighting characteristics, edit the hooks directly:

```typescript
// Adjust intensities
ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Brighter ambient

// Adjust colors
keyLight = new THREE.DirectionalLight(0xffd700, 0.8); // Warm golden key light

// Adjust positions
keyLight.position.set(-3, 4, 3); // Higher, further key light
```
