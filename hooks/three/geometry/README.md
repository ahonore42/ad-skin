# Geometry System (`hooks/three/geometry/`)

This directory contains hooks for creating and managing 3D geometry with texture mapping.

## Files

### `useGeometry.ts`

**Basic sphere geometry** - Creates a simple textured sphere.

- Generates high-quality sphere (64×64 segments)
- Applies PBR material with texture
- Configures material properties (roughness: 0.7, metalness: 0.3)
- Adds mesh to scene with cleanup
- **Parameters**:
  - `scene` - Three.js scene
  - `texture` - Canvas texture to apply
  - `sphereRadius` - Size of sphere (default: 2)
- **Returns**: Mesh instance

### `useHeadModel.ts`

**GLTF model loader** - Loads and analyzes Michelangelo's David head model.

- Loads GLTF file asynchronously
- Analyzes geometry (vertices, triangles, UV bounds, surface area)
- Auto-scales model based on dimensions
- Applies texture with material configuration
- Provides detailed model information
- **Parameters**:
  - `scene` - Three.js scene
  - `texture` - Canvas texture to apply
  - `modelPath` - Path to GLTF file (default: "/models/scene.gltf")
  - `scale` - Additional scale multiplier (default: 1.0)
- **Side effects**: Sets model info state with analysis data

## Model Analysis Output

`useHeadModel` provides detailed geometry information:

```typescript
{
  vertexCount: number,        // Total vertices (e.g., 24,011)
  triangleCount: number,      // Total triangles
  uvBounds: {                 // UV coordinate range
    min: Vector2,
    max: Vector2
  },
  surfaceArea: number,        // Total surface area
  boundingBox: Box3          // 3D dimensions
}
```

## Choosing the Right Hook

- **useGeometry**: Simple scenes, testing, sphere-specific effects
- **useHeadModel**: Production use, high-quality realistic head (David model)

## Usage Example

```typescript
// Simple sphere
useGeometry(scene, texture, 2);

// David head model (production)
useHeadModel(
  scene,
  texture,
  "/models/scene.gltf",
  2 // scale factor
);
```

## Material Configuration

All geometry hooks apply textures with carefully tuned materials:

| Geometry   | Roughness | Metalness | Color Tint |
| ---------- | --------- | --------- | ---------- |
| Sphere     | 0.7       | 0.3       | None       |
| Head Model | 0.6       | 0.02      | #ffe4d6    |

These values create realistic lighting responses appropriate for each geometry type.
