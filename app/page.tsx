import SphereScene from '@/components/three/SphereScene'

export default function Home() {
  return (
    <main className="min-h-screen bg-black flex flex-col">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Ad Skin
          </h1>
          <p className="text-gray-400">
            Consumerist 3D ad skin demo with dynamic canvas texture
          </p>
        </header>
      </div>
      
      {/* Centered, responsive canvas container */}
      <div className="flex-1 flex items-center justify-center px-4 pb-8">
        <div className="w-full max-w-7xl aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/9]">
          <SphereScene />
        </div>
      </div>
    </main>
  )
}
