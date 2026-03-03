"use client";

import { useState, useEffect } from "react";
import Chatbot from "@/components/chat/Chatbot";
import SceneContainer from "@/components/three/SceneContainer";

export default function Home() {
  const [isChatExpanded, setIsChatExpanded] = useState(false);
  const [slideLeft, setSlideLeft] = useState(false);

  useEffect(() => {
    if (isChatExpanded) {
      const timer = setTimeout(() => {
        setSlideLeft(true);
        window.dispatchEvent(new Event("resize"));
      }, 350);

      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setSlideLeft(false);
        window.dispatchEvent(new Event("resize"));
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isChatExpanded]);

  return (
    <div className="h-screen flex flex-col px-6 sm:px-12 lg:px-20 xl:px-32 py-4 sm:py-6 lg:py-10">
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
      <main
        className={`flex-grow flex items-center min-h-0 py-4 sm:py-6 lg:py-8 ${
          slideLeft
            ? "transition-all duration-300 lg:justify-start"
            : "justify-center"
        }`}
      >
        <div
          className={`h-full ${
            isChatExpanded ? "w-full lg:w-[calc(50vw-6rem)]" : "w-full"
          }`}
        >
          <SceneContainer />
        </div>
      </main>

      {/* Bottom Info - Floating Bottom */}
      <footer className="flex flex-col md:flex-row md:justify-start gap-6 sm:gap-8 lg:gap-12 shrink-0 transition-all duration-300">
        <div
          className={`flex flex-col md:flex-row md:justify-start gap-6 sm:gap-8 lg:gap-12 transition-all duration-300 ${
            isChatExpanded ? "lg:w-[calc(50vw-6rem)]" : "w-full"
          }`}
        >
          <section className="lg:max-w-96">
            <h3 className="text-[10px] uppercase tracking-[0.4em] text-neutral-600 mb-3">
              Concept
            </h3>
            <p className="text-sm text-neutral-400 font-light leading-relaxed">
              Advertisements become literal skin on human forms, visualizing how
              digital marketing permeates our identity.
            </p>
          </section>

          <section className="lg:max-w-96">
            <h3 className="text-[10px] uppercase tracking-[0.4em] text-neutral-600 mb-3">
              Interaction
            </h3>
            <div className="text-sm text-neutral-400 font-light space-y-1">
              <p>Drag / Rotate</p>
              <p>Scroll / Zoom</p>
              <p>Click / Engage</p>
            </div>
          </section>

          <section className="lg:max-w-96">
            <h3 className="text-[10px] uppercase tracking-[0.4em] text-neutral-600 mb-3">
              Technology
            </h3>
            <p className="text-sm text-neutral-400 font-light leading-relaxed">
              WebGL via Three.js. Dynamic canvas mapping and real-time
              raycasting.
            </p>
          </section>
        </div>
      </footer>

      {/* Chatbot */}
      <Chatbot isExpanded={isChatExpanded} setIsExpanded={setIsChatExpanded} />
    </div>
  );
}
