# Ad Skin

A digital art project where advertisements become the "skin" of 3D models.

## Concept

3D model of Michelangelo's David head with 108 advertisement phrases mapped as animated texture. The head rotates in one direction while the advertisements rotate in the opposite direction. Click detection on individual ads.

## Tech Stack

- **Next.js 14** with TypeScript
- **Three.js** for 3D rendering
- **Tailwind CSS v4** for styling
- Canvas texture mapping with UV coordinates

## Quick Start

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build
```

Open [http://localhost:3000](http://localhost:3000) to view the project.

## Project Structure

```
├── app/                    # Next.js app directory
├── components/three/       # 3D scene components
├── hooks/
│   ├── three/             # Three.js hooks (scene, geometry, lighting)
│   └── canvas/            # Canvas drawing utilities
└── public/                # Static assets including 3D models
```

## Features

- Interactive 3D model with orbit controls
- Canvas-based texture mapping with 108 advertisement phrases
- Counter-rotating animation (model vs. ads)
- Click detection for individual advertisements
- Responsive design with eye region protection
- Modular React hooks architecture

## Development Notes

- All advertisement phrases are embedded intrinsically in language structure
- Canvas dimensions: 3000×2300px
- Ad banner size: 300×50px
- David head model: 24,011 vertices with UV mapping
