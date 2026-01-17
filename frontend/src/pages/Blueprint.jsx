export default function Blueprint() {
  return (
    <div class="bg-neskiBeige text-neskiBlack font-body p-8 md:p-16 min-h-screen">

      {/* HEADER */}
      <header class="max-w-6xl mx-auto mb-20 border-b border-black/10 pb-8 flex justify-between items-end">
        <div>
            <h1 class="text-5xl font-heading font-extrabold mb-2">Neski <span class="text-neskiGreen">Blueprint</span></h1>
            <p class="text-gray-500 font-medium">Official Design System & Brand Assets v1.0</p>
        </div>
        <div class="hidden md:block text-right">
            <p class="text-xs uppercase tracking-widest font-bold text-neskiGreen">Last Updated</p>
            <p class="text-sm">2026</p>
        </div>
      </header>

      <main class="max-w-6xl mx-auto space-y-24">

        {/* 1. COLOR PALETTE */}
        <section>
            <h2 class="text-2xl font-heading font-bold mb-8 flex items-center gap-3">
                <span class="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm">1</span>
                Color Palette
            </h2>

            <div class="grid grid-cols-2 md:grid-cols-5 gap-6">
                <div class="space-y-3">
                    <div class="h-32 rounded-2xl bg-neskiBeige border border-gray-200 shadow-sm"></div>
                    <div>
                        <p class="font-heading font-bold text-lg">Neski Beige</p>
                        <p class="text-xs font-mono text-gray-500 uppercase">#F7F5EB</p>
                        <p class="text-sm text-gray-600 mt-1">Backgrounds</p>
                    </div>
                </div>
                <div class="space-y-3">
                    <div class="h-32 rounded-2xl bg-neskiGreen shadow-lg"></div>
                    <div>
                        <p class="font-heading font-bold text-lg">Neski Green</p>
                        <p class="text-xs font-mono text-gray-500 uppercase">#1A4D2E</p>
                        <p class="text-sm text-gray-600 mt-1">Primary Actions</p>
                    </div>
                </div>
                <div class="space-y-3">
                    <div class="h-32 rounded-2xl bg-neskiLightGreen shadow-md"></div>
                    <div>
                        <p class="font-heading font-bold text-lg">Hover Green</p>
                        <p class="text-xs font-mono text-gray-500 uppercase">#4F772D</p>
                        <p class="text-sm text-gray-600 mt-1">Interactive States</p>
                    </div>
                </div>
                <div class="space-y-3">
                    <div class="h-32 rounded-2xl bg-neskiBlack shadow-xl"></div>
                    <div>
                        <p class="font-heading font-bold text-lg">Neski Black</p>
                        <p class="text-xs font-mono text-gray-500 uppercase">#121212</p>
                        <p class="text-sm text-gray-600 mt-1">Text & Dark UI</p>
                    </div>
                </div>
                <div class="space-y-3">
                    <div class="h-32 rounded-2xl bg-neskiAccent shadow-inner"></div>
                    <div>
                        <p class="font-heading font-bold text-lg">Accent Beige</p>
                        <p class="text-xs font-mono text-gray-500 uppercase">#D4C9A8</p>
                        <p class="text-sm text-gray-600 mt-1">Borders & Grids</p>
                    </div>
                </div>
            </div>
        </section>

        {/* 2. TYPOGRAPHY */}
        <section>
            <h2 class="text-2xl font-heading font-bold mb-8 flex items-center gap-3">
                <span class="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm">2</span>
                Typography
            </h2>

            <div class="grid md:grid-cols-2 gap-12 border border-black/10 rounded-3xl p-8 bg-white/50">
                {/* Headings */}
                <div>
                    <div class="mb-4">
                        <span class="text-xs font-bold uppercase text-neskiGreen tracking-widest">Headings / Outfit</span>
                    </div>
                    <div class="space-y-6">
                        <div>
                            <h1 class="text-6xl font-heading font-extrabold">Display H1</h1>
                            <p class="text-xs text-gray-400 font-mono mt-1">Outfit ExtraBold 800</p>
                        </div>
                        <div>
                            <h2 class="text-4xl font-heading font-bold">Section H2</h2>
                            <p class="text-xs text-gray-400 font-mono mt-1">Outfit Bold 700</p>
                        </div>
                        <div>
                            <h3 class="text-2xl font-heading font-medium">Card Title H3</h3>
                            <p class="text-xs text-gray-400 font-mono mt-1">Outfit Medium 500</p>
                        </div>
                    </div>
                </div>

                {/* Body */}
                <div>
                    <div class="mb-4">
                        <span class="text-xs font-bold uppercase text-neskiGreen tracking-widest">Body / Inter</span>
                    </div>
                    <div class="space-y-6">
                        <div>
                            <p class="text-lg leading-relaxed text-gray-800">
                                <strong>Large Body:</strong> Neski connects neighbors effortlessly. We believe modern services are too complex. Our purpose is to bring simplicity back.
                            </p>
                        </div>
                        <div>
                            <p class="text-base leading-relaxed text-gray-600">
                                <strong>Regular Body:</strong> This is the standard paragraph text. It is used for descriptions, features, and general content. The spacing is open to allow for easy reading on all devices.
                            </p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-500">
                                <strong>Caption / Small:</strong> Used for timestamps, legal text, or metadata.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* 3. UI COMPONENTS */}
        <section>
            <h2 class="text-2xl font-heading font-bold mb-8 flex items-center gap-3">
                <span class="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm">3</span>
                Components
            </h2>

            <div class="bg-white p-10 rounded-3xl border border-black/5 shadow-sm">
                <div class="mb-10">
                    <h4 class="text-sm font-bold uppercase text-gray-400 mb-6">Buttons</h4>
                    <div class="flex flex-wrap gap-4 items-center">
                        <button class="px-8 py-3 bg-neskiBlack text-white rounded-full font-bold hover:bg-gray-800 transition shadow-lg">
                            Primary Action
                        </button>
                        <button class="px-8 py-3 bg-neskiGreen text-white rounded-full font-bold hover:bg-neskiLightGreen transition shadow-lg">
                            Secondary Action
                        </button>
                        <button class="px-8 py-3 border border-neskiBlack rounded-full font-medium hover:bg-neskiBlack hover:text-white transition">
                            Outline Button
                        </button>
                    </div>
                </div>
                <div>
                    <h4 class="text-sm font-bold uppercase text-gray-400 mb-6">Card Style</h4>
                    <div class="max-w-sm p-8 rounded-2xl border border-neskiBlack/10 hover:border-neskiGreen bg-neskiBeige transition-all duration-300 group cursor-pointer">
                        <div class="w-12 h-12 bg-white border border-gray-100 rounded-xl flex items-center justify-center mb-6 text-neskiBlack group-hover:bg-neskiGreen group-hover:text-white transition-colors">
                            <i class="fa-solid fa-star text-xl"></i>
                        </div>
                        <h3 class="text-xl font-bold mb-2 font-heading">Hover Me</h3>
                        <p class="text-gray-600 text-sm">
                            Cards use a subtle border that turns Green on hover. Icons invert colors.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        {/* 4. CONFIG CODE */}
        <section class="pb-20">
            <h2 class="text-2xl font-heading font-bold mb-8 flex items-center gap-3">
                <span class="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm">4</span>
                Developer Config
            </h2>

            <div class="bg-gray-900 rounded-2xl p-6 overflow-x-auto shadow-2xl">
                <pre class="text-green-400 font-mono text-sm leading-relaxed">
{`// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        neskiBeige: '#F7F5EB',
        neskiGreen: '#1A4D2E',
        neskiLightGreen: '#4F772D',
        neskiBlack: '#121212',
        neskiAccent: '#D4C9A8',
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      }
    }
  }
}`}
                </pre>
            </div>
        </section>

      </main>

      <footer class="text-center text-gray-400 py-10 text-sm">
        &copy; 2025 Neski Inc. Internal Use Only.
      </footer>

    </div>
  );
}