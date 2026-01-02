# Three.js Hooks System (`hooks/three/`)

This directory contains the core Three.js integration hooks that power the Ad Skin project's 3D visualization system.

## Overview

The hooks system follows a modular architecture where each hook handles a specific aspect of the 3D scene:

- **Core**: Scene setup, camera, renderer, animation loop
- **Canvas**: Texture system with ad mapping and interaction
- **Geometry**: 3D models (sphere, David head)
- **Lighting**: Scene illumination configurations
- **Controls**: Camera interaction and orbit controls

## Root Level Files

### `useThreeScene.ts`

**Foundation hook** - Creates and manages the core Three.js infrastructure.

**Responsibilities**:

- Initializes `THREE.Scene`
- Creates `PerspectiveCamera` with 75° FOV
- Sets up `WebGLRenderer` with antialiasing and transparency
- Configures color space (SRGB) and tone mapping
- Handles window resize events
- Provides animation loop control

**Returns**:

```typescript
{
  scene: THREE.Scene | null,
  camera: THREE.PerspectiveCamera | null,
  renderer: THREE.WebGLRenderer | null,
  startAnimation: (callback: () => void) => void
}
```

**Key Features**:

- SSR-safe initialization
- Automatic cleanup on unmount
- Responsive viewport handling
- Transparent background support

### `useControls.ts`

**Camera interaction hook** - Manages orbit controls for user interaction.

**Responsibilities**:

- Creates `OrbitControls` instance
- Enables damping for smooth interaction
- Configurable auto-rotation
- Handles mouse/touch input for camera movement

**Parameters**:

- `camera` - Three.js camera to control
- `renderer` - WebGL renderer for canvas attachment
- `autoRotate` - Enable/disable auto-rotation (default: true)
- `autoRotateSpeed` - Rotation speed (default: 0.5)

**Returns**:

```typescript
{
  update: () => void,      // Call in animation loop
  isReady: boolean         // Controls initialization status
}
```

**Usage Pattern**:

```typescript
const controls = useControls(camera, renderer, true, 0.5);

// In animation loop:
startAnimation(() => {
  if (controls) {
    controls.update();
  }
});
```

## Subdirectories

### `/canvas/` - Texture & Interaction System

Manages canvas-based texture mapping and user interaction. See [canvas/README.md](./canvas/README.md) for details.

**Key files**:

- `useCanvasTexture.ts` - Main orchestrator
- `useCanvasAnimation.ts` - Animation loop
- `use3DMouseRaycaster.ts` - Click detection
- `useAdPositionCalculator.ts` - Ad grid logic
- `useAdUrlManager.ts` - Click handling

### `/geometry/` - 3D Models

Creates and manages 3D geometry with texture mapping. See [geometry/README.md](./geometry/README.md) for details.

**Key files**:

- `useGeometry.ts` - Simple sphere geometry
- `useHeadModel.ts` - GLTF model loader for David head

### `/lighting/` - Scene Illumination

Configures lighting setups optimized for different geometry types. See [lighting/README.md](./lighting/README.md) for details.

**Key files**:

- `useLighting.ts` - Basic camera-attached lighting
- `usePortraitLighting.ts` - Three-point portrait lighting

## Architecture Patterns

### Hook Composition

Components compose hooks to build complete 3D scenes:

```typescript
function SceneContainer() {
  // 1. Core scene setup
  const { scene, camera, renderer, startAnimation } =
    useThreeScene(containerRef);

  // 2. Texture system
  const { texture } = useCanvasTexture(
    3000,
    2300,
    renderer?.domElement,
    scene,
    camera
  );

  // 3. Camera controls
  const controls = useControls(camera, renderer, true, 0.3);

  // 4. Lighting
  usePortraitLighting(scene, camera);

  // 5. Geometry
  useHeadModel(scene, texture, "/models/scene.gltf", 2);

  // 6. Start animation
  useEffect(() => {
    if (!scene || !camera || !renderer) return;
    startAnimation(() => {
      controls.update();
      texture.needsUpdate = true;
    });
  }, [scene, camera, renderer]);
}
```

### Dependency Flow

```
useThreeScene
    ↓
    ├─→ scene, camera, renderer
    │
    ├─→ useControls(camera, renderer)
    │
    ├─→ useLighting(scene, camera)
    │   or usePortraitLighting(scene, camera)
    │
    ├─→ useCanvasTexture(width, height, canvas, scene, camera)
    │       ↓
    │       ├─→ useCanvasAnimation
    │       ├─→ use3DMouseRaycaster
    │       ├─→ useAdPositionCalculator
    │       └─→ useAdUrlManager
    │
    └─→ useGeometry(scene, texture, radius)
        or useHeadModel(scene, texture, path, scale)
```

### State Management

**Initialization Pattern**:

- All hooks check for null dependencies
- Use `useRef` to prevent re-initialization
- Return stable objects via `useMemo`
- Clean up resources in `useEffect` return

**Example**:

```typescript
const initializedRef = useRef(false);

useEffect(() => {
  if (!dependencies || initializedRef.current) return;
  initializedRef.current = true;

  // Initialize resources

  return () => {
    // Cleanup resources
    initializedRef.current = false;
  };
}, [dependencies]);
```

## Common Patterns

### SSR Safety

All hooks handle server-side rendering:

```typescript
useEffect(() => {
  if (typeof window === "undefined") return;
  // Client-only code
}, []);
```

### Resource Cleanup

Every hook disposes of Three.js resources:

```typescript
return () => {
  geometry.dispose();
  material.dispose();
  texture.dispose();
  scene.remove(mesh);
};
```

### Null Safety

Hooks check dependencies before execution:

```typescript
if (!scene || !camera || !texture) return;
```

## Performance Considerations

### Animation Loop

- Single `requestAnimationFrame` loop per scene
- Controlled by `startAnimation()` from `useThreeScene`
- All updates happen in callbacks passed to animation loop

### Texture Updates

- Canvas textures marked with `needsUpdate = true`
- Updated once per frame in animation loop
- Efficient for real-time ad animations

### Geometry Complexity

- Sphere: ~8,192 vertices (64×64 segments)
- David head: ~24,011 vertices
- Materials use PBR for realistic rendering

## Extension Guide

### Adding New Geometry Types

1. Create new file in `/geometry/` directory
2. Follow existing pattern:

```typescript
export function useCustomGeometry(
  scene: THREE.Scene | null,
  texture: THREE.Texture | null,
  scale: number = 1.0
) {
  useEffect(() => {
    if (!scene || !texture) return;

    // Create geometry
    const geometry = new THREE.BoxGeometry(scale, scale, scale);

    // Create material
    const material = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.7,
      metalness: 0.3,
    });

    // Create and add mesh
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Cleanup
    return () => {
      scene.remove(mesh);
      geometry.dispose();
      material.dispose();
    };
  }, [scene, texture, scale]);
}
```

3. Use in component:

```typescript
useCustomGeometry(scene, texture, 2);
```

### Adding New Lighting Setups

1. Create new file in `/lighting/` directory
2. Follow lighting pattern with camera attachment
3. Document light positions and purposes

### Modifying Animation Behavior

Animation callbacks can include any per-frame logic:

```typescript
startAnimation(() => {
  // Update controls
  controls.update();

  // Update texture
  texture.needsUpdate = true;

  // Custom animations
  mesh.rotation.y += 0.01;

  // Update uniforms
  material.uniforms.time.value = performance.now();
});
```

## Debugging

### Common Issues

**Scene not rendering:**

- Check that all dependencies (scene, camera, renderer) are not null
- Verify `startAnimation()` is called
- Ensure geometry is added to scene

**Texture not updating:**

- Set `texture.needsUpdate = true` in animation loop
- Verify canvas is drawing content
- Check texture dimensions are power of 2 or use appropriate filters

**Controls not working:**

- Ensure `controls.update()` is called in animation loop
- Verify renderer canvas is receiving mouse events
- Check that camera and renderer are initialized

### Debug Logging

Enable detailed logging by adding console statements:

```typescript
useEffect(() => {
  console.log("Debug:", {
    scene: !!scene,
    camera: !!camera,
    renderer: !!renderer,
    texture: !!texture,
  });
}, [scene, camera, renderer, texture]);
```

## Best Practices

1. **Always check for null dependencies** before using Three.js objects
2. **Clean up resources** in useEffect return functions
3. **Use refs for mutable values** that shouldn't trigger re-renders
4. **Memoize stable objects** to prevent unnecessary re-renders
5. **Keep hooks focused** on single responsibilities
6. **Document parameters** and return values clearly
7. **Handle SSR** with client-side checks
8. **Dispose of Three.js objects** to prevent memory leaks
