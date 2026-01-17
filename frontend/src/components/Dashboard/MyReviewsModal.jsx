import { createSignal, onMount, For, Show, createEffect } from "solid-js";
import supabase from "../../lib/supabase";

export default function MyReviewsModal(props) {
  const [reviews, setReviews] = createSignal([]);
  const [loading, setLoading] = createSignal(true);
  const [averageRating, setAverageRating] = createSignal(0);
  const [reviewCount, setReviewCount] = createSignal(0);

  createEffect(() => {
    // Reload reviews if modal becomes visible
    if (props.isOpen && props.userId) {
      fetchReviews();
    }
  });

  const fetchReviews = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('reviewee_id', props.userId)
      .order('created_at', { ascending: false });

    if (error) {
      alert("Error loading reviews: " + error.message);
    } else {
      setReviews(data || []);
      const count = data ? data.length : 0;
      const total = data ? data.reduce((sum, r) => sum + r.rating, 0) : 0;
      setReviewCount(count);
      setAverageRating(count > 0 ? (total / count).toFixed(1) : "0.0");
    }
    setLoading(false);
  };

  const renderStars = (rating) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i class={`fa-star ${i <= rating ? 'fa-solid text-yellow-400' : 'fa-regular text-gray-300'}`}></i>
      );
    }
    return stars;
  };

  return (
    <div class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[2200] flex items-center justify-center p-4">
      <div class="bg-white rounded-3xl max-w-lg w-full p-6 relative shadow-2xl h-[500px] flex flex-col">
        <button onClick={props.onClose} class="absolute top-4 right-4 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200">
          <i class="fa-solid fa-xmark"></i>
        </button>
        <h2 class="text-2xl font-bold font-heading mb-4">Reviews About Me</h2>

        {/* Reviews Summary */}
        <div class="flex flex-col items-center justify-center mb-4 pb-4 border-b border-gray-100">
            <h3 class="text-5xl font-heading font-bold text-neskiBlack">{averageRating()}</h3>
            <div class="text-lg my-1 flex gap-1">
                {renderStars(Math.round(averageRating()))}
            </div>
            <p class="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Based on {reviewCount()} Reviews</p>
        </div>

        {/* Reviews List */}
        <div class="flex-1 overflow-y-auto space-y-3 p-1">
          <Show when={!loading()} fallback={<p class="text-center p-4">Loading reviews...</p>}>
            <Show when={reviews().length > 0} fallback={<div class="text-center text-gray-400 mt-4">No reviews yet.</div>}>
              <For each={reviews()}>{(review) => (
                <div class="bg-gray-50 p-3 rounded-lg border mb-2">
                  <div class="flex justify-between mb-1">
                    <div>{renderStars(review.rating)}</div>
                    <span class="text-[10px] text-gray-400">{new Date(review.created_at).toLocaleDateString()}</span>
                  </div>
                  <p class="text-sm text-gray-600">"{review.comment}"</p>
                </div>
              )}</For>
            </Show>
          </Show>
        </div>
      </div>
    </div>
  );
}