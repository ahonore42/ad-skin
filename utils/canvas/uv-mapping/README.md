# UV Mapping Utilities (`utils/canvas/uv-mapping/`)

Three.js geometry analysis functions for understanding how textures map to 3D models. These utilities require Three.js and work with `BufferGeometry` structures.

## Files

### `uvAnalyzer.ts`
**UV coordinate analysis** - Analyzes UV mapping characteristics of 3D geometries.

**Main Functions**:

#### `analyzeHeadUVMapping(geometry: THREE.BufferGeometry): UVAnalysis`
Performs comprehensive UV coordinate analysis on a geometry.

**Parameters**:
- `geometry: THREE.BufferGeometry` - Geometry with UV attributes to analyze

**Returns**:
```typescript
{
  uvBounds: {
    min: THREE.Vector2,  // Minimum U and V coordinates
    max: THREE.Vector2   // Maximum U and V coordinates
  },
  uvCoverage: number,    // Percentage of texture space used (0-1)
  faceRegions: {
    front: { uvMin: Vector2, uvMax: Vector2, coverage: number },
    sides: { uvMin: Vector2, uvMax: Vector2, coverage: number },
    back: { uvMin: Vector2, uvMax: Vector2, coverage: number },
    top: { uvMin: Vector2, uvMax: Vector2, coverage: number },
    bottom: { uvMin: Vector2, uvMax: Vector2, coverage: number }
  },
  textureUtilization: number  // Overall efficiency (0-1)
}
```

**Analyzes**:
- Overall UV bounds (min/max U and V coordinates)
- Coverage percentage of texture space
- Regional UV mapping (front, sides, back, top, bottom)
- Texture utilization efficiency

**Usage**:
```typescript
import { analyzeHeadUVMapping } from "@/utils/canvas/uv-mapping/uvAnalyzer";

const geometry = mesh.geometry;
const analysis = analyzeHeadUVMapping(geometry);

console.log(`UV Coverage: ${(analysis.uvCoverage * 100).toFixed(1)}%`);
console.log(`Front face: ${analysis.faceRegions.front.coverage}%`);
```

---

#### `createUVDebugTexture(width: number, height: number): THREE.CanvasTexture`
Creates a debug texture with UV coordinate grid for visual verification.

**Parameters**:
- `width: number` - Texture width in pixels
- `height: number` - Texture height in pixels

**Returns**: `THREE.CanvasTexture` with grid pattern

**Features**:
- White background with black grid lines
- 64-pixel grid spacing (16×16 divisions)
- UV coordinate labels at corners: (0,0), (1,0), (0,1), (1,1)
- Red center cross for reference
- Useful for verifying UV mapping accuracy

**Usage**:
```typescript
import { createUVDebugTexture } from "@/utils/canvas/uv-mapping/uvAnalyzer";

// Create debug texture
const debugTexture = createUVDebugTexture(2048, 1024);

// Apply to material
material.map = debugTexture;
material.needsUpdate = true;
```

---

#### `mapScreenToUV(intersectionPoint, geometry, face, barycoord): THREE.Vector2`
Converts 3D intersection point to UV texture coordinates.

**Parameters**:
- `intersectionPoint: THREE.Vector3` - 3D point where ray hits geometry
- `geometry: THREE.BufferGeometry` - Geometry with UV attributes
- `face: {a: number, b: number, c: number}` - Triangle vertex indices
- `barycoord: THREE.Vector3` - Barycentric coordinates within triangle

**Returns**: `THREE.Vector2` - UV coordinate (u, v) for texture lookup

**Use Case**: Converting mouse clicks on 3D model to texture coordinates

**Usage**:
```typescript
import { mapScreenToUV } from "@/utils/canvas/uv-mapping/uvAnalyzer";

// After raycasting
const intersects = raycaster.intersectObject(mesh);
if (intersects.length > 0) {
  const hit = intersects[0];
  const uv = mapScreenToUV(
    hit.point,
    mesh.geometry,
    hit.face,
    hit.barycentricCoord
  );
  
  console.log(`UV coordinates: (${uv.x}, ${uv.y})`);
}
```

---

#### `generateMappingReport(analysis: UVAnalysis): string`
Generates human-readable report of UV mapping analysis.

**Parameters**:
- `analysis: UVAnalysis` - Analysis result from `analyzeHeadUVMapping`

**Returns**: Formatted string report

**Output Example**:
```
HEAD MODEL UV MAPPING ANALYSIS
=============================

Overall UV Coverage:
- UV Bounds: (0.000, 0.000) to (1.000, 1.000)
- Total Coverage Area: 98.5% of texture space
- Texture Utilization: 95.2%

Regional Mapping:
- Front Face: UV (0.250, 0.300) to (0.750, 0.800)
  Coverage: 35.2%
- Side Areas: UV (0.000, 0.200) to (1.000, 0.900)
  Coverage: 28.7%
- Back of Head: UV (0.100, 0.400) to (0.900, 0.850)
  Coverage: 22.1%
...
```

**Usage**:
```typescript
import { analyzeHeadUVMapping, generateMappingReport } from "@/utils/canvas/uv-mapping/uvAnalyzer";

const analysis = analyzeHeadUVMapping(geometry);
const report = generateMappingReport(analysis);
console.log(report);
```

---

### `headSurfaceMapper.ts`
**Surface zone mapping** - High-level mapping analysis specifically for head models.

**Main Hook**: `useHeadSurfaceMapper(modelPath: string)`

**Parameters**:
- `modelPath: string` - Path to GLTF model file (default: "/models/scene.gltf")

**Returns**:
```typescript
{
  mapping: HeadSurfaceMapping | null,
  isLoading: boolean,
  error: string | null,
  debugTexture: THREE.CanvasTexture | null
}
```

**HeadSurfaceMapping Structure**:
```typescript
{
  totalVertices: number,
  totalTriangles: number,
  uvAnalysis: UVAnalysis,
  surfaceRegions: {
    face: { vertices: number, uvCoverage: number },
    leftSide: { vertices: number, uvCoverage: number },
    rightSide: { vertices: number, uvCoverage: number },
    back: { vertices: number, uvCoverage: number },
    top: { vertices: number, uvCoverage: number },
    neck: { vertices: number, uvCoverage: number }
  },
  adMappingZones: {
    forehead: { 
      uvBounds: { min: Vector2, max: Vector2 },
      adCapacity: number 
    },
    cheeks: { uvBounds, adCapacity },
    chin: { uvBounds, adCapacity },
    temples: { uvBounds, adCapacity },
    scalp: { uvBounds, adCapacity },
    neck: { uvBounds, adCapacity }
  },
  mappingQuality: "excellent" | "good" | "fair" | "poor",
  recommendations: string[]
}
```

**Features**:
- Loads GLTF model asynchronously
- Analyzes surface regions by vertex count
- Identifies optimal ad placement zones
- Calculates ad capacity per zone
- Provides quality assessment
- Generates placement recommendations

**Ad Mapping Zones**:
| Zone | U Range | V Range | Visibility | Ad Capacity |
|------|---------|---------|------------|-------------|
| Forehead | 0.3-0.7 | 0.7-0.9 | High | ~6 banners |
| Cheeks | 0.2-0.8 | 0.3-0.6 | High | ~8 banners |
| Chin | 0.3-0.7 | 0.0-0.2 | Medium | ~4 banners |
| Temples | 0.0-0.3, 0.7-1.0 | 0.5-0.7 | Medium | ~4 banners |
| Scalp | 0.2-0.8 | 0.85-1.0 | Medium | ~6 banners |
| Neck | 0.25-0.75 | 0.0-0.15 | Low | ~3 banners |

**Placement Recommendations**:
- **High-impact ads**: Forehead and cheek zones for maximum visibility
- **Secondary messaging**: Temple and side areas
- **Brand logos**: Neck area for subtle branding
- **Continuous scrolling**: Scalp area for dynamic content

**Usage**:
```typescript
import { useHeadSurfaceMapper } from "@/utils/canvas/uv-mapping/headSurfaceMapper";

function MyComponent() {
  const { mapping, isLoading, error, debugTexture } = useHeadSurfaceMapper("/models/scene.gltf");
  
  if (isLoading) return <div>Analyzing head surface...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!mapping) return null;
  
  return (
    <div>
      <h2>Head Model Analysis</h2>
      <p>Total Vertices: {mapping.totalVertices.toLocaleString()}</p>
      <p>Mapping Quality: {mapping.mappingQuality}</p>
      <p>Forehead Capacity: {mapping.adMappingZones.forehead.adCapacity} ads</p>
      
      <h3>Recommendations:</h3>
      <ul>
        {mapping.recommendations.map((rec, i) => (
          <li key={i}>{rec}</li>
        ))}
      </ul>
    </div>
  );
}
```

## Dependencies

### Required Three.js Imports
```typescript
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
```

**Used Classes**:
- `THREE.BufferGeometry` - For geometry analysis
- `THREE.Vector2` - For UV coordinates
- `THREE.Vector3` - For 3D coordinates
- `THREE.CanvasTexture` - For debug texture generation
- `GLTFLoader` - For loading 3D models

## Integration Flow

```
geometry/useHeadModel (hook loads GLTF)
    ↓
headSurfaceMapper (high-level analysis)
    ↓
uvAnalyzer (low-level coordinate math)
    ↓
Analysis results & recommendations
```

## Use Cases

### Debugging UV Mapping
```typescript
// Create debug texture to verify UV layout
const debugTexture = createUVDebugTexture(2048, 1024);
material.map = debugTexture;

// Analyze the geometry
const analysis = analyzeHeadUVMapping(geometry);
console.log(generateMappingReport(analysis));
```

### Click Detection to Texture Coordinates
```typescript
// Convert 3D click to texture coordinates
const raycaster = new THREE.Raycaster();
raycaster.setFromCamera(mouse, camera);

const intersects = raycaster.intersectObject(headMesh);
if (intersects.length > 0) {
  const uv = mapScreenToUV(
    intersects[0].point,
    headMesh.geometry,
    intersects[0].face,
    intersects[0].barycentricCoord
  );
  
  // Now you have texture coordinates for the click
  console.log(`Clicked at texture position: (${uv.x}, ${uv.y})`);
}
```

### Optimal Ad Placement
```typescript
const { mapping } = useHeadSurfaceMapper("/models/scene.gltf");

// Find high-visibility zones
const highVisibilityZones = Object.entries(mapping.adMappingZones)
  .filter(([_, zone]) => zone.adCapacity >= 6)
  .map(([name, _]) => name);

console.log(`Best zones for ads: ${highVisibilityZones.join(", ")}`);
```

## Testing & Debugging

### Verifying UV Coordinates
```typescript
import { analyzeHeadUVMapping } from "@/utils/canvas/uv-mapping/uvAnalyzer";

const analysis = analyzeHeadUVMapping(geometry);

// Verify UV coordinates are in valid range
console.assert(
  analysis.uvBounds.min.x >= 0 && analysis.uvBounds.max.x <= 1,
  "U coordinates out of range"
);

console.assert(
  analysis.uvBounds.min.y >= 0 && analysis.uvBounds.max.y <= 1,
  "V coordinates out of range"
);

// Check coverage
if (analysis.uvCoverage < 0.8) {
  console.warn("Low UV coverage - texture space underutilized");
}
```

### Visual Verification
```typescript
// Apply debug texture to see UV layout
const debugTexture = createUVDebugTexture(2048, 1024);
mesh.material.map = debugTexture;
mesh.material.needsUpdate = true;

// You should see a grid pattern on the model
// Grid lines show UV coordinate boundaries
```

## Architecture Benefits

### Three.js Integration
- **Type-safe**: Full TypeScript definitions
- **BufferGeometry native**: Works with modern Three.js
- **Extensible**: Easy to add new analysis metrics
- **Reusable**: Works with any UV-mapped geometry

### Separation from Drawing
- UV mapping utilities have no canvas rendering logic
- Can analyze geometry without creating textures
- Drawing utilities can work without UV analysis
- Clean dependency boundaries

## Future Enhancements

- **Real-time UV editing**: Interactive UV unwrapping tools
- **Seam detection**: Identify and highlight texture seams
- **Distortion analysis**: Measure and visualize UV stretch
- **Automated placement**: Optimized ad positioning
- **Multi-model support**: Compare UV layouts across models
- **Export tools**: Generate UV layout diagrams
- **Heatmaps**: Visualize visibility and ad performance by zone
- **Batch analysis**: Process multiple models at once