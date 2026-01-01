"use client";

import SceneContainer from "@/components/three/SceneContainer";

export default function Home() {
  return (
    <div className="h-screen flex flex-col px-6 sm:px-12 lg:px-20 xl:px-32 py-10">
      {/* Header - Floating Top */}
      <header className="flex flex-col lg:flex-row lg:items-baseline lg:justify-between gap-2 shrink-0">
        <div>
          <h1 className="text-4xl sm:text-5xl font-extralight tracking-tighter text-neutral-100">
            Ad Skin
          </h1>
          <p className="text-sm sm:text-base text-neutral-500 font-light tracking-wide uppercase mt-1">
            Digital consumerism as 3D visualization
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-1 h-1 bg-emerald-500 rounded-full" />
          <span className="text-xs uppercase tracking-[0.3em] text-neutral-500">
            Live Demo
          </span>
        </div>
      </header>

      {/* Main Scene - Fills available vertical space */}
      <main className="flex-grow flex items-center justify-center min-h-0 py-8">
        <div className="w-full h-full">
          <SceneContainer />
        </div>
      </main>

      {/* Bottom Info - Floating Bottom */}
      <footer className="grid grid-cols-1 md:grid-cols-3 gap-12 shrink-0">
        <section>
          <h3 className="text-[10px] uppercase tracking-[0.4em] text-neutral-600 mb-3">
            Concept
          </h3>
          <p className="text-sm text-neutral-400 font-light leading-relaxed">
            Advertisements become literal skin on human forms, visualizing how
            digital marketing permeates our identity.
          </p>
        </section>

        <section>
          <h3 className="text-[10px] uppercase tracking-[0.4em] text-neutral-600 mb-3">
            Interaction
          </h3>
          <div className="text-sm text-neutral-400 font-light space-y-1">
            <p>Drag / Rotate</p>
            <p>Scroll / Zoom</p>
            <p>Click / Engage</p>
          </div>
        </section>

        <section>
          <h3 className="text-[10px] uppercase tracking-[0.4em] text-neutral-600 mb-3">
            Technology
          </h3>
          <p className="text-sm text-neutral-400 font-light leading-relaxed">
            WebGL via Three.js. Dynamic canvas mapping and real-time raycasting.
          </p>
        </section>
      </footer>
    </div>
  );
}
