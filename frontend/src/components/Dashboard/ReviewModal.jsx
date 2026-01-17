import { createSignal, For } from "solid-js";
import supabase from "../../lib/supabase";

export default function ReviewModal(props) {
  const [currentRating, setCurrentRating] = createSignal(0);
  const [comment, setComment] = createSignal("");
  const [loading, setLoading] = createSignal(false);

  const setRating = (n) => setCurrentRating(n);

  const submitReview = async () => {
    if (currentRating() === 0) {
      alert("Please select a star rating.");
      return;
    }
    setLoading(true);

    const { error } = await supabase.from('reviews').insert([{
      reviewer_id: props.currentUser.id,
      reviewee_id: props.revieweeId,
      rating: currentRating(),
      comment: comment(),
      message_id: props.messageId
    }]);

    if (error) {
      alert("Error submitting review: " + error.message);
      setLoading(false);
      return;
    }

    // Update reviewee's average rating and count
    const { data: reviewsData } = await supabase.from('reviews').select('rating').eq('reviewee_id', props.revieweeId);
    const total = reviewsData.reduce((sum, r) => sum + r.rating, 0);
    const avg = total / reviewsData.length;

    await supabase.from('profiles').update({
      rating_avg: avg,
      rating_count: reviewsData.length
    }).eq('id', props.revieweeId);

    alert("Review Submitted!");
    props.onSuccess(); // Re-fetch messages in inbox
    props.onClose();
    setLoading(false);
    setCurrentRating(0);
    setComment("");
  };

  return (
    <div class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[2100] flex items-center justify-center p-4">
      <div class="bg-white rounded-3xl max-w-md w-full p-6 relative shadow-2xl text-center">
        <button onClick={props.onClose} class="absolute top-4 right-4 text-gray-400 hover:text-black">
          <i class="fa-solid fa-xmark"></i>
        </button>
        <h2 class="text-xl font-bold font-heading mb-4">Rate User</h2>
        
        <div class="flex justify-center gap-2 mb-6 text-3xl text-gray-300 cursor-pointer">
          <For each={[1, 2, 3, 4, 5]}>{(starNum) => (
            <i 
              class={`fa-solid fa-star transition ${starNum <= currentRating() ? 'star-active text-yellow-400' : ''}`} 
              onClick={() => setRating(starNum)}
            ></i>
          )}</For>
        </div>

        <textarea 
          rows="3" 
          value={comment()} 
          onInput={(e) => setComment(e.target.value)} 
          placeholder="Comment..." 
          class="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 outline-none mb-4"
        ></textarea>
        
        <button 
          onClick={submitReview} 
          disabled={loading()} 
          class="w-full py-3 bg-neskiBlack text-white rounded-xl font-bold hover:bg-opacity-90"
        >
          {loading() ? "Submitting..." : "Submit Review"}
        </button>
      </div>
    </div>
  );
}