import { createSignal } from "solid-js";
import supabase from "../../lib/supabase";

export default function ContactModal(props) {
  const [loading, setLoading] = createSignal(false);
  const [messageContent, setMessageContent] = createSignal("");

  const handleSubmitMessage = async () => {
    if (!messageContent().trim()) {
      alert("Message cannot be empty.");
      return;
    }
    setLoading(true);

    const { error } = await supabase.from('messages').insert([{
      sender_id: props.currentUser.id,
      sender_name: props.currentUser.name,
      recipient_id: props.recipientId,
      service_title: props.serviceTitle,
      service_type: props.serviceType,
      service_id: props.serviceId,
      content: messageContent(),
      status: 'pending'
    }]);

    setLoading(false);
    if (error) {
      alert("Error sending message: " + error.message);
    } else {
      alert("Message Sent!");
      props.onClose();
      setMessageContent(""); // Clear form
    }
  };

  return (
    <div class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1100] flex items-center justify-center p-4">
      <div class="bg-white rounded-3xl max-w-md w-full p-6 relative shadow-2xl">
        <button onClick={props.onClose} class="absolute top-4 right-4 text-gray-400 hover:text-black">
          <i class="fa-solid fa-xmark"></i>
        </button>
        <h2 class="text-xl font-bold font-heading mb-1">Contact Neighbor</h2>
        <p class="text-sm text-gray-500 mb-4">Re: <span class="font-bold text-black">{props.serviceTitle}</span></p>
        
        <textarea 
          rows="4" 
          value={messageContent()} 
          onInput={(e) => setMessageContent(e.target.value)} 
          placeholder="Hi, I'm interested in your service..." 
          class="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 outline-none mb-4"
        ></textarea>
        
        <button 
          onClick={handleSubmitMessage} 
          disabled={loading()} 
          class="w-full py-3 bg-neskiBlack text-white rounded-xl font-bold hover:bg-opacity-90"
        >
          {loading() ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
}