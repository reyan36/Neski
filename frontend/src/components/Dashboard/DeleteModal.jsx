import { createSignal } from "solid-js";

export default function DeleteModal(props) {
  const [loading, setLoading] = createSignal(false);

  const handleConfirm = async () => {
    setLoading(true);
    await props.onConfirm();
    setLoading(false);
    props.onClose();
  };

  return (
    <div class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[3000] flex items-center justify-center p-4">
        <div class="bg-white rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl relative">
            
            {/* Warning Icon */}
            <div class="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl border border-red-200">
                <i class="fa-solid fa-trash-can"></i>
            </div>
            
            <h2 class="text-2xl font-bold font-heading mb-2">Delete Service?</h2>
            <p class="text-sm text-gray-500 mb-6">
                Are you sure you want to remove this service? This action cannot be undone.
            </p>
            
            <div class="flex gap-3">
                <button 
                    onClick={props.onClose} 
                    class="flex-1 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition"
                >
                    Cancel
                </button>
                <button 
                    onClick={handleConfirm} 
                    disabled={loading()}
                    class="flex-1 py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition shadow-lg"
                >
                    {loading() ? "Deleting..." : "Yes, Delete"}
                </button>
            </div>
        </div>
    </div>
  );
}