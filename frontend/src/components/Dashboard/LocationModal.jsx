import { createSignal } from "solid-js";
import supabase from "../../lib/supabase";

export default function LocationModal(props) {
  const [loading, setLoading] = createSignal(false);
  const [results, setResults] = createSignal([]);
  const [query, setQuery] = createSignal("");

  // Auto-detect using Browser API
  const handleAutoDetect = () => {
    setLoading(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          await saveLocation(latitude, longitude);
        },
        (error) => {
          alert("Error: " + error.message);
          setLoading(false);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser");
      setLoading(false);
    }
  };

  // Search using OpenStreetMap
  const handleSearch = async () => {
    if (!query()) return;
    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query()}`);
    const data = await res.json();
    setResults(data.slice(0, 3)); // Show top 3 results
  };

  const saveLocation = async (lat, lng) => {
    setLoading(true);
    const { error } = await supabase
      .from('profiles')
      .update({ lat: parseFloat(lat), lng: parseFloat(lng) })
      .eq('id', props.userId);

    setLoading(false);
    if (error) {
      alert("Error saving location: " + error.message);
    } else {
      props.onSuccess(); // Refresh dashboard
      props.onClose();
    }
  };

  return (
    <div class="fixed inset-0 bg-black/80 backdrop-blur-sm z-[1000] flex items-center justify-center p-4">
        <div class="bg-white rounded-3xl max-w-md w-full p-6 md:p-8 text-center shadow-2xl relative">
            <button onClick={props.onClose} class="absolute top-4 right-4 text-gray-400 hover:text-black">
                <i class="fa-solid fa-xmark text-xl"></i>
            </button>
            
            <h2 class="text-2xl font-bold font-heading mb-4">Set Location</h2>
            
            <button 
                onClick={handleAutoDetect} 
                disabled={loading()}
                class="w-full mb-4 py-3 border-2 border-neskiGreen text-neskiGreen rounded-xl font-bold hover:bg-neskiGreen hover:text-white transition flex items-center justify-center gap-2"
            >
                {loading() ? "Detecting..." : <><i class="fa-solid fa-crosshairs"></i> Use Current Location</>}
            </button>

            <div class="relative mb-4 flex gap-2">
                <input 
                    type="text" 
                    value={query()}
                    onInput={(e) => setQuery(e.target.value)}
                    placeholder="Type city name..." 
                    class="w-full p-3 border border-gray-300 rounded-xl outline-none" 
                />
                <button onClick={handleSearch} class="bg-neskiBlack text-white px-4 rounded-xl font-bold">Search</button>
            </div>

            <div class="text-left space-y-1">
                {results().map(item => (
                    <button 
                        onClick={() => saveLocation(item.lat, item.lon)}
                        class="w-full p-2 text-xs border rounded hover:bg-gray-50 text-left"
                    >
                        {item.display_name}
                    </button>
                ))}
            </div>
        </div>
    </div>
  );
}