import { onMount, onCleanup } from "solid-js";
import { A } from "@solidjs/router";

export default function Landing() {
  
  // Logic for Scroll Animation and Navbar
  onMount(() => {
    // 1. Reveal Elements on Scroll
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                observer.unobserve(entry.target);
            }
        });
    };
    const observer = new IntersectionObserver(revealCallback, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });
    revealElements.forEach(el => observer.observe(el));

    // 2. Navbar Styling on Scroll
    const handleScroll = () => {
        const navbar = document.getElementById('navbar');
        if (!navbar) return;
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-sm');
            navbar.classList.replace('bg-neskiBeige/80', 'bg-white/95');
        } else {
            navbar.classList.remove('shadow-sm');
            navbar.classList.replace('bg-white/95', 'bg-neskiBeige/80');
        }
    };

    window.addEventListener('scroll', handleScroll);
    onCleanup(() => window.removeEventListener('scroll', handleScroll));
  });

  return (
    <div class="bg-neskiBeige text-neskiBlack font-body overflow-x-hidden selection:bg-neskiGreen selection:text-white">

        {/* NAVBAR */}
        <nav class="w-full py-4 md:py-6 px-6 md:px-12 flex justify-between items-center fixed top-0 bg-neskiBeige/80 backdrop-blur-md z-50 border-b border-black/5 transition-all duration-300" id="navbar">
            <A href="/" class="text-2xl md:text-3xl font-heading font-bold tracking-tight z-50">Neski</A>
            <div class="flex gap-4">
                <A href="/login" class="px-5 md:px-6 py-2 bg-neskiGreen text-white text-sm md:text-base rounded-full font-medium hover:bg-neskiLightGreen transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    Login
                </A>
            </div>
        </nav>

        {/* HERO SECTION */}
        <section class="min-h-screen relative flex flex-col justify-center items-center text-center overflow-hidden pt-20 md:pt-0">
            <div class="absolute inset-0 z-0 bg-grid"></div>
            <div class="blob-1 absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
            <div class="blob-2 absolute bottom-1/4 right-1/4 w-64 h-64 md:w-[500px] md:h-[500px] rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>

            <div class="relative z-10 max-w-4xl px-4 md:px-6">
                <div class="reveal-on-scroll mb-6 md:mb-8 flex justify-center">
                    <div class="backdrop-blur-sm bg-white/40 border border-neskiBlack/10 px-4 py-1.5 rounded-full flex items-center gap-2 shadow-sm">
                        <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        <span class="text-sm font-semibold tracking-wide text-gray-800 uppercase text-[10px] md:text-[11px]">Always Free</span>
                    </div>
                </div>

                <h1 class="text-5xl md:text-6xl lg:text-8xl font-heading font-extrabold mb-6 md:mb-8 reveal-on-scroll leading-[1.1] md:leading-[0.95] tracking-tight">
                    Empower <br />
                    Your <span class="relative inline-block text-neskiGreen">Community
                        <svg class="absolute w-full h-2 md:h-3 -bottom-1 left-0 text-neskiGreen opacity-40" viewBox="0 0 100 10" preserveAspectRatio="none">
                            <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                        </svg>
                    </span>
                </h1>

                <p class="text-base md:text-xl text-gray-700 mb-8 md:mb-10 reveal-on-scroll delay-100 max-w-xl mx-auto font-light leading-relaxed px-2">
                    Neski helps neighbors to connect, share skills, and trade time.
                </p>

                <div class="reveal-on-scroll delay-200 flex flex-col sm:flex-row justify-center gap-4">
                    <A href="/login" class="px-8 py-4 bg-neskiBlack text-white text-lg rounded-full font-bold hover:bg-gray-800 transition-all transform hover:scale-105 shadow-2xl flex items-center justify-center gap-3 group">
                        Get Started <i class="fa-solid fa-arrow-right -rotate-45 group-hover:rotate-0 transition-transform"></i>
                    </A>
                </div>
            </div>

            <div class="absolute bottom-10 animate-bounce cursor-pointer opacity-50 hover:opacity-100 transition-opacity hidden md:block">
                <i class="fa-solid fa-chevron-down text-2xl text-neskiBlack"></i>
            </div>
        </section>

        {/* FEATURES GRID SMALL */}
        <section class="py-12 border-y border-black/5 bg-white/60 backdrop-blur-sm reveal-on-scroll z-20 relative">
            <div class="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div class="group cursor-default">
                    <h3 class="text-3xl md:text-4xl font-heading font-bold text-neskiGreen group-hover:scale-110 transition-transform duration-300">Free</h3>
                    <p class="text-sm text-gray-600 font-medium uppercase mt-2 tracking-widest text-[10px]">to Use</p>
                </div>
                <div class="group cursor-default">
                    <h3 class="text-3xl md:text-4xl font-heading font-bold text-neskiGreen group-hover:scale-110 transition-transform duration-300">Maps</h3>
                    <p class="text-sm text-gray-600 font-medium uppercase mt-2 tracking-widest text-[10px]">Integrated</p>
                </div>
                <div class="group cursor-default">
                    <h3 class="text-3xl md:text-4xl font-heading font-bold text-neskiGreen group-hover:scale-110 transition-transform duration-300">Verified</h3>
                    <p class="text-sm text-gray-600 font-medium uppercase mt-2 tracking-widest text-[10px]">Members</p>
                </div>
                <div class="group cursor-default">
                    <h3 class="text-3xl md:text-4xl font-heading font-bold text-neskiGreen group-hover:scale-110 transition-transform duration-300">User</h3>
                    <p class="text-sm text-gray-600 font-medium uppercase mt-2 tracking-widest text-[10px]">Friendly</p>
                </div>
            </div>
        </section>

        {/* PURPOSE SECTION */}
        <section class="py-16 md:py-24 px-6 bg-neskiBeige relative">
            <div class="max-w-3xl mx-auto text-center reveal-on-scroll">
                <div class="flex justify-center mb-8">
                    <div class="w-12 h-12 rounded-full border border-neskiGreen flex items-center justify-center text-neskiGreen">
                        <i class="fa-solid fa-compass text-xl"></i>
                    </div>
                </div>
                <h2 class="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-gray-500 mb-6">Our Purpose</h2>
                <p class="text-2xl md:text-4xl font-heading font-bold leading-tight text-neskiBlack mb-8">
                    "We believe modern services are too complex. Our purpose is to bring <span class="text-neskiGreen italic">simplicity</span> back to community connections."
                </p>
                <p class="text-base md:text-lg text-gray-600 leading-relaxed">
                    We remove the barriers, the noise, and the complexity. Whether you're offering help with gardening or
                    seeking a tutor, Neski connects neighbors effortlessly, providing only what matters that is your skills,
                    and the services you need. <strong class="text-neskiBlack">Where you share, and where you get help</strong>
                </p>
                <div class="mt-10 opacity-50">
                    <span class="font-heading font-bold text-2xl tracking-tighter">Neski</span>
                </div>
            </div>
        </section>

        {/* MAP SECTION */}
        <section class="py-16 md:py-24 px-6 md:px-12 bg-white/50 overflow-hidden">
            <div class="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
                <div class="reveal-on-scroll order-2 md:order-1">
                    <div class="inline-block px-3 py-1 mb-4 border border-neskiGreen text-neskiGreen rounded-full text-sm font-bold uppercase tracking-wide">
                        Live Infrastructure
                    </div>
                    <h2 class="text-3xl md:text-5xl font-heading font-bold mb-6">Real Time Precision in<br /> Your Neighborhood.</h2>
                    <p class="text-base md:text-lg text-gray-700 leading-relaxed mb-8">
                        Neski is built directly on top of robust, real time infrastructure. By integrating with Google Maps,
                        we provide live updates on skill sharing activities and local services in real time.
                    </p>
                    <div class="space-y-6">
                        <div class="flex items-start gap-4">
                            <div class="w-12 h-12 bg-neskiGreen rounded-full flex items-center justify-center flex-shrink-0 text-white shadow-lg">
                                <i class="fa-solid fa-location-crosshairs text-xl"></i>
                            </div>
                            <div>
                                <h4 class="font-bold text-xl">Pinpoint Accuracy</h4>
                                <p class="text-sm text-gray-600">GPS data refreshed every second.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="reveal-on-scroll relative order-1 md:order-2">
                    <div class="map-container relative w-full h-[350px] md:h-[500px] border-2 border-neskiBlack rounded-3xl overflow-hidden bg-gray-200">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1689620000000!5m2!1sen!2s"
                            width="100%" height="100%"
                            style="border:0; margin-top: -150px; height: calc(100% + 150px); position: relative;"
                            allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                            class="grayscale hover:grayscale-0 transition duration-700 ease-in-out"></iframe>

                        <div class="absolute bottom-6 left-6 bg-white/90 backdrop-blur px-4 py-2 rounded-lg shadow-lg border border-gray-200 flex items-center gap-2">
                            <span class="relative flex h-3 w-3">
                                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </span>
                            <span class="text-xs font-bold text-neskiBlack uppercase">New York</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* FEATURES BIG GRID */}
        <section class="py-16 md:py-24 px-6 md:px-12 bg-neskiBeige">
            <div class="max-w-7xl mx-auto">
                <div class="text-center mb-12 md:mb-16 reveal-on-scroll">
                    <span class="uppercase tracking-widest text-xs font-bold text-neskiGreen mb-2 block">Features</span>
                    <h2 class="text-3xl md:text-5xl font-heading font-extrabold mb-4 text-neskiBlack">Neski Dashboard</h2>
                    <p class="text-gray-600 max-w-lg mx-auto text-sm md:text-base">A modern dashboard to easily navigate.</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Live Skill Sharing */}
                    <div class="md:col-span-2 bg-neskiBlack rounded-3xl p-8 md:p-10 relative overflow-hidden group hover:shadow-2xl transition-all duration-500 reveal-on-scroll cursor-pointer flex flex-col justify-between min-h-[280px]">
                        <div class="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl transform translate-x-10 -translate-y-10 group-hover:bg-neskiGreen/20 transition-colors"></div>
                        <div class="relative z-10 flex justify-between items-start w-full">
                            <div class="p-3 bg-white/10 rounded-xl w-fit backdrop-blur-sm">
                                <i class="fa-solid fa-fingerprint text-white text-2xl"></i>
                            </div>
                            <div class="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:bg-neskiGreen group-hover:border-neskiGreen transition-all duration-300">
                                <i class="fa-solid fa-arrow-right -rotate-45 group-hover:rotate-0 transition-transform"></i>
                            </div>
                        </div>
                        <div class="relative z-10 mt-12 md:mt-0">
                            <h3 class="text-2xl md:text-3xl font-heading font-bold text-white mb-3">Live Skill Sharing</h3>
                            <p class="text-gray-400 text-sm md:text-base max-w-lg leading-relaxed group-hover:text-gray-200 transition-colors">
                                Forget classifieds. Instantly broadcast your skills to verified neighbors. Cooking, coding, or carpentry instantly.
                            </p>
                        </div>
                    </div>

                    {/* Eco Sync */}
                    <div class="md:col-span-1 bg-neskiGreen rounded-3xl p-8 md:p-10 relative overflow-hidden group hover:shadow-2xl transition-all duration-500 reveal-on-scroll delay-100 cursor-pointer flex flex-col justify-between min-h-[280px]">
                        <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                        <div class="relative z-10">
                            <div class="p-3 bg-white/20 rounded-xl w-fit backdrop-blur-sm">
                                <i class="fa-solid fa-leaf text-white text-2xl"></i>
                            </div>
                        </div>
                        <div class="relative z-10 mt-12 md:mt-0">
                            <h3 class="text-2xl font-heading font-bold text-white mb-3">Eco Sync</h3>
                            <p class="text-green-100 text-sm leading-relaxed">
                                Localized exchanges reduce carbon footprints. Share tools, not car rides.
                            </p>
                        </div>
                    </div>

                    {/* Open Data */}
                    <div class="md:col-span-1 border-2 border-neskiBlack rounded-3xl p-8 md:p-10 hover:bg-neskiBlack hover:text-white group transition-all duration-300 reveal-on-scroll delay-200 cursor-pointer flex flex-col justify-between min-h-[280px]">
                        <div>
                            <div class="w-12 h-12 rounded-full border border-current flex items-center justify-center">
                                <i class="fa-brands fa-github text-2xl"></i>
                            </div>
                        </div>
                        <div class="mt-12 md:mt-0">
                            <h3 class="text-xl font-heading font-bold mb-3">Open Data</h3>
                            <p class="text-sm opacity-80 leading-relaxed">
                                Built transparently. Access our project data and contribute to the code.
                            </p>
                        </div>
                    </div>

                    {/* Neighborhood Reviews */}
                    <div class="md:col-span-2 bg-white border border-gray-200 rounded-3xl p-8 md:p-10 relative overflow-hidden group hover:border-neskiGreen transition-all duration-300 reveal-on-scroll delay-100 cursor-pointer flex flex-col justify-center min-h-[200px]">
                        <div class="flex flex-col md:flex-row items-center gap-6">
                            <div class="flex-1 text-left">
                                <h3 class="text-2xl font-heading font-bold text-neskiBlack mb-3">Neighborhood Reviews</h3>
                                <p class="text-gray-600 text-sm leading-relaxed">
                                    Our unique review system ensures safety without invasive checks. Build reputation through real contributions and community verification.
                                </p>
                            </div>
                            <div class="flex items-center gap-2 mt-4 md:mt-0">
                                <div class="flex -space-x-4">
                                    <img class="w-10 h-10 rounded-full border-2 border-white" src="https://i.pravatar.cc/100?img=1" alt="User" />
                                    <img class="w-10 h-10 rounded-full border-2 border-white" src="https://i.pravatar.cc/100?img=2" alt="User" />
                                    <img class="w-10 h-10 rounded-full border-2 border-white" src="https://i.pravatar.cc/100?img=3" alt="User" />
                                </div>
                                <div class="w-10 h-10 rounded-full bg-neskiBeige flex items-center justify-center text-xs font-bold text-neskiBlack">
                                    +2k
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* PROGRESS / GITHUB SECTION */}
        <section class="py-16 md:py-20 px-6">
            <div class="max-w-5xl mx-auto bg-neskiGreen rounded-3xl p-10 md:p-16 text-center relative overflow-hidden reveal-on-scroll shadow-2xl">
                <div class="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
                <h2 class="text-3xl md:text-5xl font-heading font-bold text-white mb-6 relative z-10">
                    View Project's Progress
                </h2>
                <div class="relative z-10 flex flex-col sm:flex-row justify-center gap-4">
                    <button class="px-8 py-3 bg-neskiBeige text-neskiGreen rounded-full font-bold hover:bg-white transition-all shadow-md">
                        <a href="https://linkedin.com/in/reyan36/" target="_blank">Github</a>
                    </button>
                </div>
            </div>
        </section>

        {/* FOOTER */}
        <footer class="bg-neskiBeige border-t border-black/10 py-8 px-6 md:px-12 mt-8">
            <div class="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4 text-sm font-medium text-gray-600">
                <div class="w-full md:w-1/3 text-center md:text-left order-2 md:order-1">
                    &copy; 2026 Neski Inc. All Rights Reserved.
                </div>
                <div class="w-full md:w-1/3 text-center text-neskiBlack text-lg font-bold font-heading tracking-widest order-1 md:order-2">
                    NESKI
                </div>
                <div class="w-full md:w-1/3 text-center md:text-right flex flex-col md:flex-row justify-center md:justify-end items-center gap-3 order-3">
                    <span>Developed by <span class="text-neskiGreen font-bold"><A href="/team">Neski Team</A></span></span>
                    <A href="/blueprint" target="_blank" class="group flex items-center gap-1.5 px-3 py-1 bg-white border border-gray-200 rounded text-[10px] uppercase tracking-widest font-bold hover:border-neskiGreen hover:text-neskiGreen transition-all duration-300">
                        <i class="fa-solid fa-palette text-gray-400 group-hover:text-neskiGreen"></i>
                        Blueprint
                    </A>
                </div>
            </div>
        </footer>
    </div>
  );
}