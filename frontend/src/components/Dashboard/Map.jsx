import { onMount, onCleanup, createEffect } from "solid-js";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// --- DEFINE CUSTOM ICONS ---
const greenIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const blueIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

export default function Map(props) {
  let mapContainer;
  let mapInstance;
  let markersLayer;
  let userCircle;
  let userMarker;

  onMount(() => {
    // Default coordinates (New York) if nothing provided
    const lat = props.lat || 40.7128;
    const lng = props.lng || -74.0060;

    mapInstance = L.map(mapContainer).setView([lat, lng], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapInstance);
    
    markersLayer = L.layerGroup().addTo(mapInstance);
    
    // Create User Marker (Green)
    userMarker = L.marker([lat, lng], { icon: greenIcon }).addTo(mapInstance).bindPopup("<b>You</b>");
    
    // Create Radius Circle
    userCircle = L.circle([lat, lng], {
        color: '#1A4D2E', 
        fillColor: '#1A4D2E', 
        fillOpacity: 0.1, 
        radius: (props.radius || 50) * 1000
    }).addTo(mapInstance);
    
    mapInstance.fitBounds(userCircle.getBounds());
  });

  // Update User Position & Radius
  createEffect(() => {
    if (!mapInstance || !props.lat || !props.lng) return;

    const lat = props.lat;
    const lng = props.lng;
    const radiusMeters = (props.radius || 50) * 1000;

    // Move User Marker
    if (userMarker) userMarker.setLatLng([lat, lng]);
    
    // Move Circle
    if (userCircle) {
        userCircle.setLatLng([lat, lng]);
        userCircle.setRadius(radiusMeters);
        mapInstance.fitBounds(userCircle.getBounds());
    }
  });

  // Update Service Pins (Blue)
  createEffect(() => {
    if (!mapInstance || !markersLayer) return;
    
    markersLayer.clearLayers(); // Clear old pins

    if (props.services) {
        props.services.forEach(service => {
            if (service.lat && service.lng) {
                // Use Blue Icon for services
                L.marker([service.lat, service.lng], { icon: blueIcon })
                 .addTo(markersLayer)
                 .bindPopup(`<b>${service.title}</b><br>${service.type}`);
            }
        });
    }
  });

  onCleanup(() => {
    if (mapInstance) mapInstance.remove();
  });

  return <div ref={mapContainer} class="h-full w-full bg-gray-100 rounded-2xl z-0" />;
}