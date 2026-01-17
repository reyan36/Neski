import { Show } from "solid-js";

export default function Sidebar(props) {
  return (
    <>
      {/* Mobile Overlay */}
      <div 
        onClick={props.toggle} 
        class={`fixed inset-0 bg-black/50 z-20 md:hidden glass ${props.isOpen ? "block" : "hidden"}`}
      ></div>

      <aside 
        class={`fixed inset-y-0 left-0 w-64 bg-white border-r border-black/5 transform transition duration-200 ease-in-out flex flex-col justify-between p-6 z-30 shadow-2xl md:shadow-none md:translate-x-0 ${
          props.isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          <div class="mb-10 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="text-2xl font-extrabold font-heading text-neskiGreen">Neski</span>
            </div>
            <button onClick={props.toggle} class="md:hidden text-gray-500">
              <i class="fa-solid fa-xmark text-xl"></i>
            </button>
          </div>
          
          <nav class="space-y-2">
            <button class="w-full flex items-center gap-3 px-4 py-3 bg-neskiBeige text-neskiGreen rounded-xl font-bold text-left">
                <i class="fa-solid fa-layer-group w-5"></i> Browse
            </button>
            
            <button onClick={props.openInbox} class="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-xl font-medium text-left">
                <i class="fa-regular fa-comments w-5"></i> Messages
            </button>
            
            <button onClick={props.openLocation} class="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-xl font-medium text-left">
                <i class="fa-solid fa-location-dot w-5"></i> My Location
            </button>

            <button onClick={props.openProfile} class="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-xl font-medium text-left">
                <i class="fa-solid fa-user-gear w-5"></i> Edit Profile
            </button>
            
            <button onClick={props.openMyReviews} class="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-xl font-medium text-left">
                <i class="fa-solid fa-star w-5"></i> My Reviews
            </button>
          </nav>
        </div>

        <div class="border-t border-gray-100 pt-6">
            <div class="flex items-center gap-3">
                <Show when={props.user?.avatar_url} fallback={
                    <div class="w-10 h-10 rounded-full bg-neskiGreen flex items-center justify-center text-white font-bold">
                        {props.user?.name?.charAt(0) || "U"}
                    </div>
                }>
                    <img src={props.user?.avatar_url} class="w-10 h-10 rounded-full object-cover border" />
                </Show>
                
                <div>
                    <p class="text-sm font-bold font-heading">{props.user?.name || "Loading..."}</p>
                    <button onClick={props.onLogout} class="text-xs text-gray-400 hover:text-red-500 font-bold uppercase tracking-widest">Sign Out</button>
                </div>
            </div>
        </div>
      </aside>
    </>
  );
}