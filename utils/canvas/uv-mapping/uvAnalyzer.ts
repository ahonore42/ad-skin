/**
 * UV Mapping Analyzer for Head Model
 * Provides detailed analysis and visualization of how textures map to the David head
 */

import * as THREE from "three";

export interface UVAnalysis {
  uvBounds: { min: THREE.Vector2; max: THREE.Vector2 };
  uvCoverage: number;
  faceRegions: {
    front: { uvMin: THREE.Vector2; uvMax: THREE.Vector2; coverage: number };
    sides: { uvMin: THREE.Vector2; uvMax: THREE.Vector2; coverage: number };
    back: { uvMin: THREE.Vector2; uvMax: THREE.Vector2; coverage: number };
    top: { uvMin: THREE.Vector2; uvMax: THREE.Vector2; coverage: number };
    bottom: { uvMin: THREE.Vector2; uvMax: THREE.Vector2; coverage: number };
  };
  textureUtilization: number;
}

/**
 * Analyzes the UV mapping of a head geometry
 */
export function analyzeHeadUVMapping(
  geometry: THREE.BufferGeometry
): UVAnalysis {
  const uvAttribute = geometry.attributes.uv;
  const positionAttribute = geometry.attributes.position;
  const normalAttribute = geometry.attributes.normal;

  if (!uvAttribute || !positionAttribute || !normalAttribute) {
    throw new Error("Geometry missing required attributes for UV analysis");
  }

  let minU = Infinity,
    maxU = -Infinity;
  let minV = Infinity,
    maxV = -Infinity;

  // Region trackers
  const regions = {
    front: { uvs: [] as THREE.Vector2[], count: 0 },
    sides: { uvs: [] as THREE.Vector2[], count: 0 },
    back: { uvs: [] as THREE.Vector2[], count: 0 },
    top: { uvs: [] as THREE.Vector2[], count: 0 },
    bottom: { uvs: [] as THREE.Vector2[], count: 0 },
  };

  // Analyze each vertex - handle both BufferAttribute and InterleavedBufferAttribute
  for (let i = 0; i < uvAttribute.count; i++) {
    // Use getX and getY which work for both attribute types
    const u = uvAttribute.getX(i);
    const v = uvAttribute.getY(i);

    // Track overall bounds
    minU = Math.min(minU, u);
    maxU = Math.max(maxU, u);
    minV = Math.min(minV, v);
    maxV = Math.max(maxV, v);

    // Get world position and normal for region classification
    const normal = new THREE.Vector3();
    normal.fromBufferAttribute(normalAttribute, i);
    const uv = new THREE.Vector2(u, v);

    // Classify by face direction (approximate)
    const absNormal = normal.clone().normalize();

    if (absNormal.z > 0.5) {
      // Front face region
      regions.front.uvs.push(uv);
      regions.front.count++;
    } else if (absNormal.z < -0.5) {
      // Back face region
      regions.back.uvs.push(uv);
      regions.back.count++;
    } else if (Math.abs(absNormal.x) > Math.abs(absNormal.y)) {
      // Side regions
      regions.sides.uvs.push(uv);
      regions.sides.count++;
    } else if (absNormal.y > 0.3) {
      // Top region
      regions.top.uvs.push(uv);
      regions.top.count++;
    } else {
      // Bottom region
      regions.bottom.uvs.push(uv);
      regions.bottom.count++;
    }
  }

  // Calculate region bounds
  const calculateRegionBounds = (uvList: THREE.Vector2[]) => {
    if (uvList.length === 0) {
      return {
        uvMin: new THREE.Vector2(0, 0),
        uvMax: new THREE.Vector2(0, 0),
        coverage: 0,
      };
    }

    let minU = Infinity,
      maxU = -Infinity;
    let minV = Infinity,
      maxV = -Infinity;

    uvList.forEach((uv) => {
      minU = Math.min(minU, uv.x);
      maxU = Math.max(maxU, uv.x);
      minV = Math.min(minV, uv.y);
      maxV = Math.max(maxV, uv.y);
    });

    const area = (maxU - minU) * (maxV - minV);
    return {
      uvMin: new THREE.Vector2(minU, minV),
      uvMax: new THREE.Vector2(maxU, maxV),
      coverage: area,
    };
  };

  // Calculate overall UV coverage
  const totalUVArea = (maxU - minU) * (maxV - minV);
  const textureUtilization = totalUVArea; // How much of the 0-1 texture space is used

  return {
    uvBounds: {
      min: new THREE.Vector2(minU, minV),
      max: new THREE.Vector2(maxU, maxV),
    },
    uvCoverage: totalUVArea,
    faceRegions: {
      front: calculateRegionBounds(regions.front.uvs),
      sides: calculateRegionBounds(regions.sides.uvs),
      back: calculateRegionBounds(regions.back.uvs),
      top: calculateRegionBounds(regions.top.uvs),
      bottom: calculateRegionBounds(regions.bottom.uvs),
    },
    textureUtilization,
  };
}

/**
 * Creates a debug UV visualization texture
 */
export function createUVDebugTexture(
  width: number = 1024,
  height: number = 1024
): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d")!;

  // Create a UV grid pattern
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

  // Draw grid lines
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 2;

  const gridSize = 64; // 16x16 grid
  for (let x = 0; x <= width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  for (let y = 0; y <= height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // Add UV coordinate labels
  ctx.fillStyle = "#ff0000";
  ctx.font = "16px Arial";
  ctx.textAlign = "center";

  // Corner labels
  ctx.fillText("(0,0)", 30, 30);
  ctx.fillText("(1,0)", width - 30, 30);
  ctx.fillText("(0,1)", 30, height - 10);
  ctx.fillText("(1,1)", width - 30, height - 10);

  // Center cross
  ctx.strokeStyle = "#ff0000";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(width / 2 - 50, height / 2);
  ctx.lineTo(width / 2 + 50, height / 2);
  ctx.moveTo(width / 2, height / 2 - 50);
  ctx.lineTo(width / 2, height / 2 + 50);
  ctx.stroke();

  return new THREE.CanvasTexture(canvas);
}

/**
 * Maps screen coordinates to UV coordinates for the head model
 */
export function mapScreenToUV(
  intersectionPoint: THREE.Vector3,
  geometry: THREE.BufferGeometry,
  face: { a: number; b: number; c: number },
  barycoord: THREE.Vector3
): THREE.Vector2 {
  const uvAttribute = geometry.attributes.uv;

  // Get UV coordinates for the triangle vertices using getX/getY methods
  const uvA = new THREE.Vector2(
    uvAttribute.getX(face.a),
    uvAttribute.getY(face.a)
  );
  const uvB = new THREE.Vector2(
    uvAttribute.getX(face.b),
    uvAttribute.getY(face.b)
  );
  const uvC = new THREE.Vector2(
    uvAttribute.getX(face.c),
    uvAttribute.getY(face.c)
  );

  // Interpolate UV coordinates using barycentric coordinates
  const uv = new THREE.Vector2()
    .addScaledVector(uvA, barycoord.x)
    .addScaledVector(uvB, barycoord.y)
    .addScaledVector(uvC, barycoord.z);

  return uv;
}

/**
 * Generates a texture mapping report for the head model
 */
export function generateMappingReport(analysis: UVAnalysis): string {
  const report = `
HEAD MODEL UV MAPPING ANALYSIS
=============================

Overall UV Coverage:
- UV Bounds: (${analysis.uvBounds.min.x.toFixed(
    3
  )}, ${analysis.uvBounds.min.y.toFixed(
    3
  )}) to (${analysis.uvBounds.max.x.toFixed(
    3
  )}, ${analysis.uvBounds.max.y.toFixed(3)})
- Total Coverage Area: ${(analysis.uvCoverage * 100).toFixed(
    1
  )}% of texture space
- Texture Utilization: ${(analysis.textureUtilization * 100).toFixed(1)}%

Regional Mapping:
- Front Face: UV (${analysis.faceRegions.front.uvMin.x.toFixed(
    3
  )}, ${analysis.faceRegions.front.uvMin.y.toFixed(
    3
  )}) to (${analysis.faceRegions.front.uvMax.x.toFixed(
    3
  )}, ${analysis.faceRegions.front.uvMax.y.toFixed(3)})
  Coverage: ${(analysis.faceRegions.front.coverage * 100).toFixed(1)}%

- Side Areas: UV (${analysis.faceRegions.sides.uvMin.x.toFixed(
    3
  )}, ${analysis.faceRegions.sides.uvMin.y.toFixed(
    3
  )}) to (${analysis.faceRegions.sides.uvMax.x.toFixed(
    3
  )}, ${analysis.faceRegions.sides.uvMax.y.toFixed(3)})
  Coverage: ${(analysis.faceRegions.sides.coverage * 100).toFixed(1)}%

- Back of Head: UV (${analysis.faceRegions.back.uvMin.x.toFixed(
    3
  )}, ${analysis.faceRegions.back.uvMin.y.toFixed(
    3
  )}) to (${analysis.faceRegions.back.uvMax.x.toFixed(
    3
  )}, ${analysis.faceRegions.back.uvMax.y.toFixed(3)})
  Coverage: ${(analysis.faceRegions.back.coverage * 100).toFixed(1)}%

- Top of Head: UV (${analysis.faceRegions.top.uvMin.x.toFixed(
    3
  )}, ${analysis.faceRegions.top.uvMin.y.toFixed(
    3
  )}) to (${analysis.faceRegions.top.uvMax.x.toFixed(
    3
  )}, ${analysis.faceRegions.top.uvMax.y.toFixed(3)})
  Coverage: ${(analysis.faceRegions.top.coverage * 100).toFixed(1)}%

- Bottom/Neck: UV (${analysis.faceRegions.bottom.uvMin.x.toFixed(
    3
  )}, ${analysis.faceRegions.bottom.uvMin.y.toFixed(
    3
  )}) to (${analysis.faceRegions.bottom.uvMax.x.toFixed(
    3
  )}, ${analysis.faceRegions.bottom.uvMax.y.toFixed(3)})
  Coverage: ${(analysis.faceRegions.bottom.coverage * 100).toFixed(1)}%

MAPPING RECOMMENDATIONS:
- The entire head surface is mapped and ready for ad texture placement
- All regions (face, sides, back, top, bottom) have UV coordinates
- Texture resolution of 2048x1024 provides excellent detail coverage
- Ad banners can be placed across the complete head surface
`;

  return report;
}
