import { createSignal, onMount, Show, For, createEffect } from "solid-js";
import supabase from "../lib/supabase";
import toast from "solid-toast";
import Sidebar from "../components/Dashboard/Sidebar";
import Navbar from "../components/Dashboard/Navbar";
import Map from "../components/Dashboard/Map";
import AddServiceModal from "../components/Dashboard/AddServiceModal";
import LocationModal from "../components/Dashboard/LocationModal";
import InboxModal from "../components/Dashboard/InboxModal";
import EditProfileModal from "../components/Dashboard/EditProfileModal";
import MyReviewsModal from "../components/Dashboard/MyReviewsModal";
import ContactModal from "../components/Dashboard/ContactModal";
import ServiceCard from "../components/Dashboard/ServiceCard";
import DeleteModal from "../components/Dashboard/DeleteModal";

export default function Dashboard() {
  const [currentUser, setCurrentUser] = createSignal(null);
  const [services, setServices] = createSignal([]);
  const [filteredServices, setFilteredServices] = createSignal([]);
  const [sidebarOpen, setSidebarOpen] = createSignal(false);
  const [loading, setLoading] = createSignal(true);
  const [currentRadius, setCurrentRadius] = createSignal(50); // Default radius

  // --- NEW: AI Recommendations State ---
  const [recommended, setRecommended] = createSignal([]);

  // Modal States
  const [showAddModal, setShowAddModal] = createSignal(false);
  const [showLocationModal, setShowLocationModal] = createSignal(false);
  const [showInboxModal, setShowInboxModal] = createSignal(false);
  const [showEditProfileModal, setShowEditProfileModal] = createSignal(false);
  const [showMyReviewsModal, setShowMyReviewsModal] = createSignal(false);
  const [showContactModal, setShowContactModal] = createSignal(false);
  const [showDeleteModal, setShowDeleteModal] = createSignal(false);
  const [serviceToDelete, setServiceToDelete] = createSignal(null);
  const [contactDetails, setContactDetails] = createSignal({
    recipientId: null, serviceTitle: '', serviceType: '', serviceId: null
  });

  // --- Initial Load and Data Fetching ---
  onMount(() => {
    checkSession();
  });

  const checkSession = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { window.location.href = "/"; return; }

    const { data: profile } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
    if (profile) {
      setCurrentUser(profile);
      if (!profile.lat || !profile.lng) setShowLocationModal(true);
      
      // --- NEW: Fetch AI Recommendations after user is loaded ---
      fetchRecommendations();
    }
    loadServices();
  };

  const loadServices = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('services').select('*').order('created_at', { ascending: false });
    if (error) console.error("Error loading services:", error);
    else setServices(data || []);
    setLoading(false);
  };

  // --- NEW: Fetch Recommendations Function ---
  const fetchRecommendations = async () => {
    if (!currentUser()) return;

    try {
        // Ensure backend is running via Docker or locally on port 3000
        const res = await fetch('https://neski.onrender.com/api/recommendations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: currentUser().id })
        });
        const data = await res.json();
        if (data.recommendations) {
            setRecommended(data.recommendations);
        }
    } catch (err) {
        console.error("Failed to load AI recommendations", err);
    }
  };

  // --- Filtering Logic ---
  createEffect(() => {
    filterServices();
  });

  const [searchQuery, setSearchQuery] = createSignal('');

  const filterServices = () => {
    const all = services();
    const query = searchQuery().toLowerCase();
    const radius = currentRadius();
    const userLat = currentUser()?.lat;
    const userLng = currentUser()?.lng;

    let filtered = all.filter(service => {
      const matchesSearch = service.title.toLowerCase().includes(query) || service.description.toLowerCase().includes(query);
      if (!userLat || !userLng || !service.lat || !service.lng) {
        return matchesSearch;
      }
      const dist = getDistanceFromLatLonInKm(userLat, userLng, service.lat, service.lng);
      return matchesSearch && dist <= radius;
    });
    setFilteredServices(filtered);
  };

  // --- Utility Functions ---
  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    if (!lat2 || !lon2) return Infinity;
    var R = 6371; 
    var dLat = deg2rad(lat2 - lat1);
    var dLon = deg2rad(lon2 - lon1);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
  }
  function deg2rad(deg) { return deg * (Math.PI / 180); }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  const confirmDelete = (serviceId) => {
    setServiceToDelete(serviceId);
    setShowDeleteModal(true);
  };

  const executeDelete = async () => {
    if (serviceToDelete()) {
      const { error } = await supabase.from('services').delete().eq('id', serviceToDelete());
      if (error) toast.error("Error deleting service: " + error.message);
      else loadServices();
    }
  };

  const handleContactClick = (serviceId, recipientId, serviceTitle, serviceType) => {
    setContactDetails({ recipientId, serviceTitle, serviceType, serviceId });
    setShowContactModal(true);
  };

  return (
    <div class="bg-neskiBeige text-neskiBlack h-screen flex overflow-hidden font-body">
      <Sidebar
        user={currentUser()}
        isOpen={sidebarOpen()}
        toggle={() => setSidebarOpen(!sidebarOpen())}
        onLogout={handleLogout}
        openInbox={() => setShowInboxModal(true)}
        openLocation={() => setShowLocationModal(true)}
        openProfile={() => setShowEditProfileModal(true)}
        openMyReviews={() => setShowMyReviewsModal(true)}
      />

      <main class="flex-1 flex flex-col h-full relative w-full">
        <Navbar
          toggleSidebar={() => setSidebarOpen(!sidebarOpen())}
          count={filteredServices().length}
          onSearch={setSearchQuery}
          onRefresh={loadServices}
          openAddModal={() => setShowAddModal(true)}
          currentRadius={currentRadius()}
          onRadiusChange={setCurrentRadius}
        />

        <div class="flex-1 overflow-y-auto p-4 md:p-10 pb-20">
          
          {/* --- NEW: AI RECOMMENDATIONS SECTION --- */}
{/* AI RECOMMENDATIONS SECTION */}
          <Show when={recommended().length > 0}>
            <div class="max-w-7xl mx-auto mb-8">
                <div class="flex items-center gap-2 mb-4 px-1">
                    <i class="fa-solid fa-wand-magic-sparkles text-purple-600"></i>
                    <h2 class="text-xl font-bold font-heading">Picked for You</h2>
                </div>
                
                {/* HORIZONTAL SCROLL CONTAINER */}
                <div class="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                    <For each={recommended()}>{(service) => (
                        <div class="bg-purple-50 border border-purple-100 p-5 rounded-3xl relative shadow-sm min-w-[280px] w-[280px] flex-shrink-0 flex flex-col justify-between">
                            
                            <div class="mb-3">
                                <div class="flex justify-between items-start mb-2">
                                    <span class="bg-white text-purple-700 text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">
                                        AI Match
                                    </span>
                                    {/* Optional: Add Service Type Badge here if you want */}
                                </div>
                                <h3 class="font-bold text-lg leading-tight mb-1">{service.title}</h3>
                                <p class="text-sm text-gray-600 line-clamp-2">{service.description}</p>
                            </div>

                            <button 
                                onClick={() => handleContactClick(service.id, service.author_id, service.title, service.type)}
                                class="w-full py-3 bg-white text-purple-700 font-bold text-sm rounded-xl hover:bg-purple-100 transition shadow-sm"
                            >
                                Contact
                            </button>
                        </div>
                    )}</For>
                </div>
            </div>
          </Show>

          <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT: Services List */}
            <div class="lg:col-span-2">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <Show when={!loading()} fallback={<p class="p-4 text-gray-500">Loading services...</p>}>
                  <For each={filteredServices()}>{(service) => (
                    <ServiceCard
                      service={service}
                      currentUserId={currentUser()?.id}
                      onDelete={confirmDelete}
                      onContact={handleContactClick}
                    />
                  )}</For>
                </Show>
                <Show when={!loading() && filteredServices().length === 0}>
                  <div class="col-span-2 text-center py-10 opacity-50">
                    <p>No services found matching your criteria.</p>
                  </div>
                </Show>
              </div>
            </div>

            {/* RIGHT: Map */}
            <div class="lg:col-span-1 space-y-6">
              <div class="bg-white p-2 rounded-3xl border border-gray-200 shadow-sm sticky top-6">
                <div class="relative h-64 md:h-72 w-full rounded-2xl overflow-hidden z-0">
                  <Show when={currentUser()?.lat}>
                    <Map
                      lat={currentUser().lat}
                      lng={currentUser().lng}
                      services={filteredServices()}
                      radius={currentRadius()}
                    />
                  </Show>
                  <Show when={!currentUser()?.lat}>
                    <div class="h-full flex flex-col items-center justify-center bg-gray-50 text-gray-400 text-xs">
                        <i class="fa-solid fa-map-location-dot text-2xl mb-2"></i>
                        Location not detected
                    </div>
                   </Show>
                </div>
                <div class="px-4 py-3 flex justify-between items-center">
                  <span class="text-xs font-bold text-gray-500 uppercase">My Neighborhood</span>
                  <div class="flex items-center gap-2 text-[10px] font-bold">
                    <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-green-600"></span> You</span>
                    <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-blue-500"></span> Service</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MODALS RENDERED HERE */}
        <Show when={showAddModal()}>
          <AddServiceModal
            currentUser={currentUser()}
            radius={currentRadius()}
            onClose={() => setShowAddModal(false)}
            onSuccess={loadServices}
          />
        </Show>
        <Show when={showLocationModal()}>
          <LocationModal
            userId={currentUser()?.id}
            onClose={() => setShowLocationModal(false)}
            onSuccess={() => checkSession()}
          />
        </Show>
        <Show when={showInboxModal()}>
          <InboxModal
            userId={currentUser()?.id}
            currentUser={currentUser()}
            isOpen={showInboxModal()}
            onClose={() => setShowInboxModal(false)}
          />
        </Show>
        <Show when={showEditProfileModal()}>
          <EditProfileModal
            currentUser={currentUser()}
            onClose={() => setShowEditProfileModal(false)}
            onSuccess={() => checkSession()}
          />
        </Show>
        <Show when={showMyReviewsModal()}>
          <MyReviewsModal
            userId={currentUser()?.id}
            isOpen={showMyReviewsModal()}
            onClose={() => setShowMyReviewsModal(false)}
          />
        </Show>
        <Show when={showContactModal()}>
          <ContactModal
            currentUser={currentUser()}
            recipientId={contactDetails().recipientId}
            serviceTitle={contactDetails().serviceTitle}
            serviceType={contactDetails().serviceType}
            serviceId={contactDetails().serviceId}
            onClose={() => setShowContactModal(false)}
          />
        </Show>
        <Show when={showDeleteModal()}>
          <DeleteModal onClose={() => setShowDeleteModal(false)} onConfirm={executeDelete} />
        </Show>
      </main>
    </div>
  );
}