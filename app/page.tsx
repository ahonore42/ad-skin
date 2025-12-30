"use client";

import SceneContainer from "@/components/three/SceneContainer";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-50 p-4">
      {/* Simple header */}
      <div className="px-4 sm:px-8 lg:px-16 xl:px-24 py-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-neutral-900">
              Ad Skin
            </h1>
            <p className="text-lg sm:text-xl text-neutral-600 mt-2">
              Digital consumerism as 3D visualization
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-lg sm:text-xl text-neutral-600">
              Interactive Demo
            </span>
          </div>
        </div>
      </div>

      {/* Full viewport 3D scene */}
      <div className="px-4 sm:px-8 lg:px-16 xl:px-24">
        <div className="h-[60vh] sm:h-[70vh] lg:h-[75vh] xl:h-[80vh] w-full">
          <SceneContainer/>
        </div>
      </div>

      {/* Bottom info */}
      <div className="px-4 sm:px-8 lg:px-16 xl:px-24 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-16">
          <div>
            <h3 className="text-lg font-medium text-neutral-900 mb-4">
              Concept
            </h3>
            <p className="text-neutral-600 leading-relaxed">
              Advertisements become literal skin on human forms, visualizing how
              digital marketing permeates our identity and self-perception.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-neutral-900 mb-4">
              Controls
            </h3>
            <div className="text-neutral-600 space-y-2">
              <p>Drag to rotate</p>
              <p>Scroll to zoom</p>
              <p>Click advertisements</p>
              <p>Auto-rotation enabled</p>
            </div>
          </div>

          <div className="md:col-span-2 lg:col-span-1">
            <h3 className="text-lg font-medium text-neutral-900 mb-4">
              Technology
            </h3>
            <div className="text-neutral-600 space-y-2">
              <p>WebGL with Three.js</p>
              <p>Dynamic canvas textures</p>
              <p>Portrait lighting</p>
              <p>Mouse raycasting</p>
            </div>
          </div>
        </div>

        {/* Artistic statement */}
        <div className="mt-12 max-w-3xl">
          <h3 className="text-lg font-medium text-neutral-900 mb-4">
            Artistic Statement
          </h3>
          <p className="text-neutral-600 leading-relaxed">
            This interactive artwork explores the invasive nature of digital
            advertising by literally mapping banner ads onto human forms. The
            moving advertisements represent the constant bombardment of
            commercial messages that shape our digital identity, making visible
            the ways consumerism becomes part of our virtual skin.
          </p>
        </div>
      </div>
    </div>
  );
}
