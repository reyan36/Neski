import { A } from "@solidjs/router";

export default function Team() {
  return (
    <div class="bg-neskiBeige text-neskiBlack font-body min-h-screen">

      {/* NAVBAR */}
      <nav class="w-full px-6 py-6 flex justify-between items-center max-w-7xl mx-auto">
        <div class="flex items-center gap-2">
            <A href="/" class="text-2xl font-heading font-extrabold tracking-tight">Neski</A>
        </div>
        <A href="/" class="text-sm font-bold text-gray-500 hover:text-neskiGreen transition">
            Back to Home <i class="fa-solid fa-arrow-right ml-1"></i>
        </A>
      </nav>

      {/* HEADER */}
      <section class="text-center py-16 px-4">
        <span class="text-neskiLightGreen font-bold tracking-widest uppercase text-xs mb-2 block">NESKI Team</span>
        <h1 class="text-5xl md:text-6xl font-heading font-extrabold text-neskiGreen mb-6">Meet the Team</h1>
      </section>

      {/* TEAM GRID */}
      <section class="max-w-7xl mx-auto px-6 pb-24">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

            {/* TEAM MEMBER 1 */}
            <div class="group bg-white rounded-3xl p-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                <div class="relative overflow-hidden rounded-2xl h-64 mb-6 bg-gray-200">
                    <img src="\images\Gevin.jpg" alt="Gevin" class="w-full h-full object-cover object-top transition duration-500 transform group-hover:scale-105" />
                </div>
                <div class="text-center">
                    <h3 class="text-2xl font-heading font-bold text-neskiBlack">Gevin Madharha</h3>
                    <p class="text-xs font-bold text-neskiGreen uppercase tracking-widest mb-4">Developer</p>
                    <a href="https://www.linkedin.com/in/gevinm/" target="_blank" class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-600 hover:bg-[#0077b5] hover:text-white transition duration-300">
                        <i class="fa-brands fa-linkedin-in"></i>
                    </a>
                </div>
            </div>

            {/* TEAM MEMBER 2*/}
            <div class="group bg-white rounded-3xl p-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                <div class="relative overflow-hidden rounded-2xl h-64 mb-6 bg-gray-200">
                    <img src="\images\Reyan.png" alt="Reyan" class="w-full h-full object-cover object-top transition duration-500 transform group-hover:scale-105" />
                </div>
                <div class="text-center">
                    <h3 class="text-2xl font-heading font-bold text-neskiBlack">Reyan Arshad</h3>
                    <p class="text-xs font-bold text-neskiGreen uppercase tracking-widest mb-4">Developer</p>
                    <a href="https://www.linkedin.com/in/reyan36/" target="_blank" class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-600 hover:bg-[#0077b5] hover:text-white transition duration-300">
                        <i class="fa-brands fa-linkedin-in"></i>
                    </a>
                </div>
            </div>


        </div>
      </section>

      {/* FOOTER */}
      <footer class="bg-neskiGreen text-white py-10 text-center">
        <div class="mb-4">
            <span class="text-2xl font-heading font-bold">Neski</span>
        </div>
        <p class="text-green-200 text-sm mb-6">Neski helps neighbors to connect, share skills, and trade time.</p>
        <p class="text-xs text-white opacity-80">&copy; 2026 Neski Inc. All Rights Reserved.</p>
      </footer>

    </div>
  );
}