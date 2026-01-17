import { createSignal, onMount, Show } from "solid-js";
import supabase from "../../lib/supabase";
import toast from "solid-toast";

export default function EditProfileModal(props) {
  const [loading, setLoading] = createSignal(false);
  
  // Existing Phone State
  const [phone, setPhone] = createSignal(props.currentUser?.phone || '');
  
  // --- NEW: Interests State ---
  // We convert the database Array ["coding", "garden"] into a String "coding, garden" for the input box
  const [interests, setInterests] = createSignal(
    props.currentUser?.interests ? props.currentUser.interests.join(', ') : ''
  );

  // Existing Avatar State
  const [avatarUrl, setAvatarUrl] = createSignal(props.currentUser?.avatar_url || '');
  const [stagedAvatarFile, setStagedAvatarFile] = createSignal(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2000000) { // Max 2MB
      toast.error("File too large (Max 2MB)");
      return;
    }

    setStagedAvatarFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setAvatarUrl(e.target.result); // Show preview
    reader.readAsDataURL(file);
  };

  const saveProfile = async () => {
    setLoading(true);
    let newAvatarPath = avatarUrl(); // Default to existing URL

    // 1. Handle Avatar Upload (Existing Logic)
    if (stagedAvatarFile()) {
      const file = stagedAvatarFile();
      const fileExt = file.name.split('.').pop();
      const fileName = `${props.currentUser.id}-${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars') 
        .upload(filePath, file);

      if (uploadError) {
        toast.error("Avatar upload error: " + uploadError.message);
        setLoading(false);
        return;
      }
      
      // Get the public URL
      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
      newAvatarPath = data.publicUrl;
    }

    // --- NEW: Process Interests ---
    // Convert string "coding, gardening" back to Array ["coding", "gardening"]
    const interestArray = interests()
        .split(',')
        .map(i => i.trim()) // Remove extra spaces
        .filter(i => i.length > 0); // Remove empty items

    // 2. Update Database with Phone, Avatar AND Interests
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ 
          phone: phone(), 
          avatar_url: newAvatarPath,
          interests: interestArray // <--- Saving to DB
      })
      .eq('id', props.currentUser.id);

    setLoading(false);
    if (updateError) {
      toast.error("Error saving profile: " + updateError.message);
    } else {
      toast.success("Profile Updated!");
      props.onSuccess(); // Refresh dashboard data
      props.onClose();
    }
  };

  return (
    <div class="fixed inset-0 bg-black/80 backdrop-blur-sm z-[2000] flex items-center justify-center p-4">
      <div class="bg-white rounded-3xl max-w-md w-full p-6 md:p-8 relative shadow-2xl">
        <button onClick={props.onClose} class="absolute top-4 right-4 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200">
          <i class="fa-solid fa-xmark"></i>
        </button>
        <h2 class="text-2xl font-bold font-heading mb-2">Edit Profile</h2>
        <p class="text-sm text-gray-500 mb-6">Update your details.</p>

        {/* PHONE INPUT */}
        <label class="block text-xs font-bold uppercase text-gray-500 mb-1">Phone Number</label>
        <input 
          type="text" 
          value={phone()} 
          onInput={(e) => setPhone(e.target.value)} 
          placeholder="+1 234..." 
          class="w-full p-3 mb-4 border border-gray-300 rounded-xl outline-none" 
        />

        {/* --- NEW: INTERESTS INPUT --- */}
        <label class="block text-xs font-bold uppercase text-gray-500 mb-1">My Interests</label>
        <input 
          type="text" 
          value={interests()} 
          onInput={(e) => setInterests(e.target.value)} 
          placeholder="e.g. Gardening, Coding, Cooking" 
          class="w-full p-3 mb-1 border border-gray-300 rounded-xl outline-none" 
        />
        <p class="text-[10px] text-gray-400 mb-4">Separate multiple interests with commas.</p>

        {/* AVATAR INPUT */}
        <label class="block text-xs font-bold uppercase text-gray-500 mb-1">Profile Photo</label>
        <div class="flex items-center gap-3 mb-6">
          <img 
            src={avatarUrl() || `https://ui-avatars.com/api/?name=${props.currentUser?.name || 'U'}&background=random`} 
            class="w-12 h-12 rounded-full bg-gray-100 object-cover border" 
          />
          <label class="cursor-pointer bg-gray-100 text-xs font-bold px-4 py-2 rounded-lg hover:bg-gray-200">
            Upload
            <input type="file" class="hidden" accept="image/*" onChange={handleFileSelect} />
          </label>
        </div>

        <button 
          onClick={saveProfile} 
          disabled={loading()} 
          class="w-full py-3 bg-neskiGreen text-white rounded-xl font-bold hover:bg-[#113820] transition shadow-lg"
        >
          {loading() ? "Saving..." : "Save Profile"}
        </button>
      </div>
    </div>
  );
}