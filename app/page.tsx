"use client";

import SceneContainer from "@/components/three/SceneContainer";
import { useState } from "react";

export default function Home() {
  const [activeScene, setActiveScene] = useState<"sphere" | "face">("sphere");

  // Single evaluation of scene info
  const sceneInfo =
    activeScene === "sphere"
      ? {
          title: "Abstract Sphere",
          description:
            "Demonstrates the core concept with simple geometry and unified lighting.",
        }
      : {
          title: "Human Head",
          description:
            "Shows how advertisements become literal skin on human forms with portrait lighting.",
        };

  return (
    <main className="min-h-screen bg-black flex flex-col">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Ad Skin</h1>
          <p className="text-gray-400 mb-6">
            Consumerist 3D ad skin demo with dynamic canvas texture
          </p>

          {/* Scene Toggle */}
          <div className="flex justify-center gap-4 mb-4">
            <button
              onClick={() => setActiveScene("sphere")}
              className={`px-6 py-2 rounded ${
                activeScene === "sphere"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              Sphere Demo
            </button>
            <button
              onClick={() => setActiveScene("face")}
              className={`px-6 py-2 rounded ${
                activeScene === "face"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              Human Face Demo
            </button>
          </div>

          <p className="text-gray-500 text-sm">
            {activeScene === "sphere"
              ? "Abstract form with general lighting"
              : "Human head with portrait lighting"}
          </p>
        </header>
      </div>

      {/* Single canvas container */}
      <div className="flex-1 flex items-center justify-center px-4 pb-8">
        <div className="w-full max-w-7xl aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/9]">
          <SceneContainer sceneType={activeScene} />
        </div>
      </div>

      {/* Information Panel */}
      <div className="bg-gray-900 px-4 py-6">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-400">
            <div>
              <h3 className="text-white font-semibold mb-2">
                Current Scene: {sceneInfo.title}
              </h3>
              <p>{sceneInfo.description}</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">
                Interactive Controls
              </h3>
              <p>
                • Click and drag to rotate • Scroll to zoom • Auto-rotation
                enabled
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
