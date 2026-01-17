import { For } from "solid-js";

export default function Navbar(props) {
  const radiusOptions = [5, 15, 50, 100]; // In kilometers

  return (
    <header class="h-20 bg-white/80 backdrop-blur-md border-b border-black/5 flex justify-between items-center px-4 md:px-10 z-10 gap-2 md:gap-4">
        
        <button onClick={props.toggleSidebar} class="md:hidden text-2xl text-neskiBlack p-2">
            <i class="fa-solid fa-bars"></i>
        </button>

        <div class="hidden md:flex flex-col">
            <span class="text-[10px] font-bold uppercase text-gray-400">Services Nearby</span>
            <span class="text-xl font-heading font-bold text-neskiGreen">{props.count || 0}</span>
        </div>

        {/* Search Bar */}
        <div class="flex-1 max-w-xl relative">
            <i class="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input 
                type="search" 
                onInput={(e) => props.onSearch(e.target.value)}
                placeholder="Search skills, neighbors..." 
                class="w-full pl-10 pr-4 py-2.5 bg-neskiBeige/50 border border-gray-200 rounded-full text-sm focus:border-neskiGreen outline-none"
            />
        </div>
        
        {/* Buttons and Radius Filter */}
        <div class="flex items-center gap-2">
            <button 
                onClick={props.onRefresh}
                class="w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-500 hover:text-neskiGreen transition flex items-center justify-center flex-shrink-0" 
                title="Refresh"
            >
                <i class="fa-solid fa-rotate-right"></i>
            </button>

            {/* NEW: Radius Selector */}
            <div class="hidden sm:flex items-center gap-2">
                <span class="text-xs font-bold text-gray-500 uppercase">Radius:</span>
                <select 
                    value={props.currentRadius}
                    onChange={(e) => props.onRadiusChange(parseFloat(e.target.value))} 
                    class="bg-white border border-gray-200 text-sm rounded-full px-2 py-2 outline-none font-bold cursor-pointer hover:border-neskiGreen"
                >
                    <For each={radiusOptions}>{(radius) => (
                        <option value={radius}>{radius} km</option>
                    )}</For>
                </select>
            </div>

            <button 
                onClick={props.openAddModal}
                class="flex items-center gap-2 px-6 py-3 bg-neskiGreen text-white rounded-full font-bold hover:bg-[#113820] transition shadow-lg flex-shrink-0"
            >
                <i class="fa-solid fa-plus"></i> <span class="hidden md:inline">Post Service</span>
            </button>
        </div>
    </header>
  );
}