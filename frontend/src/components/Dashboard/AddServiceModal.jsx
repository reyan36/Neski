import { createSignal, onMount } from "solid-js";
import supabase from "../../lib/supabase"; 
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import toast from "solid-toast";
// Blue Icon for the new Service Pin
const blueIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Green Icon for "You" (Home Base)
const greenIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

export default function AddServiceModal(props) {
  const [loading, setLoading] = createSignal(false);
  const [aiLoading, setAiLoading] = createSignal(false); // --- NEW: State for Wand Spinner ---
  
  // Form State
  let titleRef, descRef, hoursRef, typeRef, swapRef;
  const [coords, setCoords] = createSignal("");
  const [showSwap, setShowSwap] = createSignal(false);

  // Map Refs
  let mapContainer;
  let mapInstance;
  let marker;

  onMount(() => {
    const lat = props.currentUser?.lat || 40.7128;
    const lng = props.currentUser?.lng || -74.0060;
    const radiusMeters = (props.radius || 50) * 1000; // Default to 50km if missing
    
    setTimeout(() => {
        if (!mapContainer) return;
        
        mapInstance = L.map(mapContainer).setView([lat, lng], 10);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapInstance);

        // 1. Draw "You" Marker (Green)
        L.marker([lat, lng], { icon: greenIcon })
         .addTo(mapInstance)
         .bindPopup("<b>Your Location</b>");

        // 2. Draw Neighborhood Circle
        const circle = L.circle([lat, lng], {
            color: '#1A4D2E', 
            fillColor: '#1A4D2E', 
            fillOpacity: 0.1, 
            radius: radiusMeters
        }).addTo(mapInstance);

        // Fit map to show the whole circle
        mapInstance.fitBounds(circle.getBounds());

        // 3. Click to Pin Logic
        mapInstance.on('click', (e) => {
            const { lat, lng } = e.latlng;
            setCoords(`${lat.toFixed(5)}, ${lng.toFixed(5)}`);
            
            if (marker) mapInstance.removeLayer(marker);
            marker = L.marker([lat, lng], { icon: blueIcon }).addTo(mapInstance);
            marker.bindPopup("<b>Service Location</b>").openPopup();
        });
    }, 100);
  });

  // --- NEW: AI WAND FUNCTION ---
  // --- AI WAND FUNCTION ---
  const handleAiGenerate = async () => {
    // 1. Get values from refs
    const title = titleRef.value;
    const type = typeRef.value;
    const hours = hoursRef.value;
    const currentDraft = descRef.value; // Get whatever text is currently in the box

    // 2. Validate Title
    if (!title || title.length < 3) {
        // Use toast if available, or alert
        try { toast.error("Please enter a Title first!"); } catch(e) { alert("Please enter a Title first!"); }
        return;
    }

    setAiLoading(true);
    try {
        const res = await fetch('https://neski.onrender.com/api/generate-description', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                title: title,
                type: type,
                hours: hours,
                userDraft: currentDraft // Send the draft so backend knows whether to Create or Rewrite
            })
        });
        
        const data = await res.json();
        
        if (data.description) {
            descRef.value = data.description; // Update the UI
        } else {
            console.error("No description returned");
        }
    } catch (err) {
        console.error("Wand failed", err);
    } finally {
        setAiLoading(false);
    }
  };
  // -----------------------------

  const handleSubmit = async () => {
    setLoading(true);
    
    const coordParts = coords().split(',');
    if (coordParts.length !== 2) {
        toast.error("Please click the map to set a location.");
        setLoading(false);
        return;
    }

    const lat = parseFloat(coordParts[0]);
    const lng = parseFloat(coordParts[1]);

    const { error } = await supabase.from('services').insert([{
        title: titleRef.value,
        description: descRef.value,
        hours: hoursRef.value,
        type: typeRef.value,
        swap_wants: showSwap() ? swapRef.value : null,
        author_id: props.currentUser.id,
        author_name: props.currentUser.name,
        zip: props.currentUser.zip,
        lat: lat,
        lng: lng
    }]);

    setLoading(false);
    if (error) {
        toast.error("Error: " + error.message);
    } else {
        toast.success("Service Posted!");
        props.onClose();
        props.onSuccess(); 
    }
  };

  return (
    <div class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999] flex items-center justify-center p-4">
        <div class="bg-white rounded-3xl max-w-5xl w-full p-6 md:p-8 relative shadow-2xl overflow-y-auto max-h-[90vh] flex flex-col md:flex-row gap-8">
            
            <button onClick={props.onClose} class="absolute top-4 right-4 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 z-50">
                <i class="fa-solid fa-xmark"></i>
            </button>

            {/* LEFT: FORM */}
            <div class="flex-1 space-y-4">
                <h2 class="text-2xl font-bold font-heading mb-4">Post Service</h2>
                <input ref={titleRef} type="text" placeholder="Title (e.g. PC Repair)" class="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 outline-none" />
                
                {/* --- NEW: TEXTAREA WITH MAGIC BUTTON --- */}
                <div class="relative">
                    <textarea 
                        ref={descRef} 
                        rows="4" 
                        placeholder="Description..." 
                        class="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 outline-none pr-10 resize-none"
                    ></textarea>
                    
                    <button 
                        onClick={handleAiGenerate}
                        disabled={aiLoading()}
                        class="absolute bottom-3 right-3 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center hover:bg-purple-700 hover:scale-110 transition shadow-md z-10"
                        title="Auto-write with AI"
                    >
                        {aiLoading() ? (
                            <i class="fa-solid fa-spinner fa-spin text-xs"></i>
                        ) : (
                            <i class="fa-solid fa-wand-magic-sparkles text-xs"></i>
                        )}
                    </button>
                </div>
                {/* ------------------------------------------ */}

                <div class="flex gap-4">
                    <input ref={hoursRef} type="number" placeholder="Hrs" class="w-1/3 p-3 bg-gray-50 rounded-xl border border-gray-200 outline-none" />
                    <select 
                        ref={typeRef} 
                        onChange={(e) => setShowSwap(e.target.value === 'swap')}
                        class="w-2/3 p-3 bg-gray-50 rounded-xl border border-gray-200 outline-none"
                    >
                        <option value="offer">I am Offering</option>
                        <option value="request">I am Requesting</option>
                        <option value="volunteer">Free Work</option>
                        <option value="swap">Skill Swap</option>
                    </select>
                </div>

                {showSwap() && (
                     <div class="transition-all duration-300">
                        <label class="text-[10px] font-bold uppercase text-purple-600 ml-1">What do you want in return?</label>
                        <input ref={swapRef} type="text" placeholder="e.g. English Lessons..." class="w-full p-3 bg-purple-50 text-purple-900 rounded-xl border border-purple-200 outline-none" />
                    </div>
                )}
                
                <div class="bg-gray-100 p-2 rounded-lg text-xs">
                    <span class="font-bold text-gray-500">Selected Location:</span> <span class="font-mono">{coords() || "Click on map"}</span>
                </div>

                <button 
                    onClick={handleSubmit} 
                    disabled={loading()}
                    class="w-full py-3 bg-neskiBlack text-white rounded-xl font-bold hover:bg-opacity-90"
                >
                    {loading() ? "Posting..." : "Post Service"}
                </button>
            </div>

            {/* RIGHT: MAP */}
            <div class="flex-1 min-h-[300px] bg-gray-100 rounded-2xl overflow-hidden relative border border-gray-200">
                <div ref={mapContainer} class="w-full h-full z-0"></div>
                <div class="absolute bottom-4 left-0 w-full text-center pointer-events-none z-[400]">
                    <span class="bg-white/80 px-3 py-1 rounded-full text-xs font-bold text-gray-600 shadow-sm backdrop-blur">
                        Click map to pin location
                    </span>
                </div>
            </div>
        </div>
    </div>
  );
}