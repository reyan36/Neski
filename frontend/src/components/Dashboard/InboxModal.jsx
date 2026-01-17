import { createSignal, onMount, Show, For, createEffect } from "solid-js";
import supabase from "../../lib/supabase";
import ReviewModal from "./ReviewModal"; // Import ReviewModal

export default function InboxModal(props) {
  const [activeTab, setActiveTab] = createSignal("received");
  const [messages, setMessages] = createSignal([]);
  const [loading, setLoading] = createSignal(true);

  // Review Modal State
  const [showReviewModal, setShowReviewModal] = createSignal(false);
  const [reviewTarget, setReviewTarget] = createSignal(null); // { revieweeId, messageId }

  createEffect(() => {
    if (props.isOpen && props.userId) { // Load messages when modal is opened
      loadMessages("received");
    }
  });

  const loadMessages = async (type) => {
    setActiveTab(type);
    setLoading(true);
    
    const column = type === 'received' ? 'recipient_id' : 'sender_id';
    
    const { data } = await supabase
        .from('messages')
        .select('*')
        .eq(column, props.userId)
        .order('created_at', { ascending: false });
        
    setMessages(data || []);
    setLoading(false);
  };

  const updateStatus = async (msgId, newStatus, serviceId) => {
    await supabase.from('messages').update({ status: newStatus }).eq('id', msgId);
    
    if (newStatus === 'accepted' && serviceId) {
        // Mark service as booked if a request is accepted
        await supabase.from('services').update({ status: 'booked' }).eq('id', serviceId);
        alert("Service marked as booked.");
    }
    alert(`Request ${newStatus}!`);
    loadMessages(activeTab()); // Refresh inbox
  };

  const checkReviewStatus = async (messageId) => {
      const { count } = await supabase
          .from('reviews')
          .select('*', { count: 'exact', head: true })
          .eq('message_id', messageId);
      return count > 0;
  };

  const openReviewModal = (revieweeId, messageId) => {
    setReviewTarget({ revieweeId, messageId });
    setShowReviewModal(true);
  };

  return (
    <div class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999] flex items-center justify-center p-4">
        <div class="bg-white rounded-3xl max-w-lg w-full p-6 relative shadow-2xl h-[600px] flex flex-col">
            <button onClick={props.onClose} class="absolute top-4 right-4 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200">
                <i class="fa-solid fa-xmark"></i>
            </button>
            
            <h2 class="text-2xl font-bold font-heading mb-4">Messages</h2>
            
            <div class="flex gap-4 mb-4 border-b border-gray-100">
                <button 
                    onClick={() => loadMessages('received')} 
                    class={`pb-2 font-bold ${activeTab() === 'received' ? 'text-neskiGreen border-b-2 border-neskiGreen' : 'text-gray-400'}`}
                >Received</button>
                <button 
                    onClick={() => loadMessages('sent')} 
                    class={`pb-2 font-bold ${activeTab() === 'sent' ? 'text-neskiGreen border-b-2 border-neskiGreen' : 'text-gray-400'}`}
                >Sent</button>
            </div>

            <div class="flex-1 overflow-y-auto space-y-3 p-1">
                <Show when={!loading()} fallback={<p>Loading...</p>}>
                    <For each={messages()}>{(msg) => {
                        return (
                            <div class="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                                <div class="flex justify-between mb-1">
                                    <span class="font-bold text-neskiBlack">{activeTab() === 'received' ? msg.sender_name : 'To Neighbor'}</span>
                                    <span class={`text-[10px] px-2 py-0.5 rounded-full ${
                                        msg.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                                        msg.status === 'accepted' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    }`}>{msg.status}</span>
                                </div>
                                <p class="text-xs font-bold text-neskiGreen mb-1">Re: {msg.service_title}</p>
                                <p class="text-sm text-gray-600">{msg.content}</p>
                                
                                {/* Action buttons/info for RECEIVED messages */}
                                <Show when={activeTab() === 'received'}>
                                    <Show when={msg.status === 'pending'}>
                                        <div class="mt-3 flex gap-2">
                                            <button onClick={() => updateStatus(msg.id, 'accepted', msg.service_id)} class="bg-neskiGreen text-white px-3 py-1 rounded-lg text-xs font-bold">Accept</button>
                                            <button onClick={() => updateStatus(msg.id, 'rejected')} class="bg-gray-200 text-gray-600 px-3 py-1 rounded-lg text-xs font-bold">Reject</button>
                                        </div>
                                    </Show>
                                    <Show when={msg.status === 'accepted'}>
                                        <p class="mt-2 text-xs font-bold text-green-700">Service Accepted!</p>
                                        {/* Contact info and Review button for accepted RECIPIENT */}
                                        <Show when={msg.sender_id && msg.service_type}>
                                            <GetContactAndReview 
                                                msg={msg} 
                                                currentUser={props.currentUser} 
                                                openReviewModal={openReviewModal}
                                                targetUserId={msg.sender_id} // Who to review
                                                isReviewerFor={'request'} // Type they completed for
                                            />
                                        </Show>
                                    </Show>
                                </Show>
                                
                                {/* Action buttons/info for SENT messages */}
                                <Show when={activeTab() === 'sent'}>
                                    <Show when={msg.status === 'accepted'}>
                                        <p class="mt-2 text-xs font-bold text-green-700">Request Accepted!</p>
                                        {/* Contact info and Review button for accepted SENDER */}
                                        <Show when={msg.recipient_id && msg.service_type}>
                                            <GetContactAndReview 
                                                msg={msg} 
                                                currentUser={props.currentUser} 
                                                openReviewModal={openReviewModal}
                                                targetUserId={msg.recipient_id} // Who to review
                                                isReviewerFor={'offer'} // Type they provided
                                            />
                                        </Show>
                                    </Show>
                                </Show>
                            </div>
                        );
                    }}</For>
                </Show>
                <Show when={!loading() && messages().length === 0}>
                    <p class="text-center text-gray-400 mt-10">No messages.</p>
                </Show>
            </div>
        </div>

        <Show when={showReviewModal()}>
            <ReviewModal
                currentUser={props.currentUser}
                revieweeId={reviewTarget().revieweeId}
                messageId={reviewTarget().messageId}
                onClose={() => setShowReviewModal(false)}
                onSuccess={() => loadMessages(activeTab())}
            />
        </Show>
    </div>
  );
}

// Helper component to display contact info and review button
function GetContactAndReview(props) {
    const [contactPhone, setContactPhone] = createSignal(null);
    const [hasReviewed, setHasReviewed] = createSignal(false);

    createEffect(async () => {
        if (props.msg?.status === 'accepted' && props.targetUserId) {
            // Fetch phone number
            const { data: profileData } = await supabase.from('profiles').select('phone').eq('id', props.targetUserId).single();
            if (profileData) setContactPhone(profileData.phone);
            
            // Check if already reviewed
            const reviewed = await checkReviewStatus(props.msg.id);
            setHasReviewed(reviewed);
        }
    });

    const checkReviewStatus = async (messageId) => {
        const { count } = await supabase
            .from('reviews')
            .select('*', { count: 'exact', head: true })
            .eq('message_id', messageId);
        return count > 0;
    };

    return (
        <>
            <Show when={contactPhone()}>
                <div class="mt-2 p-2 bg-green-50 text-neskiGreen text-xs font-bold border border-green-200 rounded">
                    Phone: {contactPhone()}
                </div>
            </Show>
            <Show when={!hasReviewed() && ['offer', 'volunteer', 'swap'].includes(props.msg.service_type)}>
                <button 
                    onClick={() => props.openReviewModal(props.targetUserId, props.msg.id)} 
                    class="mt-2 w-full py-1 bg-neskiBlack text-white text-xs rounded hover:bg-gray-800"
                >
                    Rate Provider
                </button>
            </Show>
        </>
    );
}