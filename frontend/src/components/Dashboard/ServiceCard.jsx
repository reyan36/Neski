import { Show } from "solid-js";

export default function ServiceCard(props) {
    const service = props.service;
    const isMine = service.author_id === props.currentUserId;
    const isBooked = service.status === 'booked';
    
    let badgeClass = ''; 
    let icon = '';
    switch(service.type) {
        case 'request': badgeClass = 'bg-neskiBlack text-white'; icon = '<i class="fa-solid fa-hand-holding"></i>'; break;
        case 'offer': badgeClass = 'bg-green-100 text-neskiGreen'; icon = '<i class="fa-solid fa-hand-holding-heart"></i>'; break;
        case 'volunteer': badgeClass = 'bg-orange-100 text-orange-800'; icon = '<i class="fa-solid fa-heart"></i>'; break;
        case 'swap': badgeClass = 'bg-purple-100 text-purple-800'; icon = '<i class="fa-solid fa-rotate"></i>'; break;
        default: badgeClass = 'bg-gray-100 text-gray-800';
    }

    return (
        <div class="relative bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-xl transition flex flex-col h-full">
            {isMine && (
                <button onClick={() => props.onDelete(service.id)} class="absolute top-4 right-4 text-gray-400 hover:text-red-500">
                    <i class="fa-solid fa-trash"></i>
                </button>
            )}
            
            <span class={`text-[10px] font-bold px-3 py-1 rounded-full mb-2 inline-block w-fit uppercase ${badgeClass}`} innerHTML={`${icon} ${service.type}`}>
            </span>
            <h3 class="text-xl font-bold font-heading mb-1 leading-tight">{service.title}</h3>
            
            <Show when={service.type === 'swap' && service.swap_wants}>
                <div class="mt-2 mb-2 bg-purple-50 border border-purple-100 p-2 rounded-xl flex items-start gap-2">
                    <div class="bg-purple-100 text-purple-600 rounded-full w-5 h-5 flex items-center justify-center shrink-0">
                        <i class="fa-solid fa-arrow-right-arrow-left text-[10px]"></i>
                    </div>
                    <div>
                        <span class="text-[10px] font-bold text-purple-400 uppercase block">Wants in return</span>
                        <span class="text-xs font-bold text-purple-900 block">{service.swap_wants}</span>
                    </div>
                </div>
            </Show>

            <p class="text-sm opacity-70 mb-4 h-10 line-clamp-2 mt-2">{service.description}</p>
            
            <div class="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                <div class="flex items-center text-xs font-bold gap-1">
                    <i class="fa-regular fa-user"></i> {service.author_name}
                </div>
                <span class="font-bold text-xs"><i class="fa-regular fa-clock"></i> {service.hours} Hrs</span>
            </div>
            
            <Show when={!isMine}>
                <Show when={!isBooked} fallback={
                    <button class="w-full mt-4 py-3 bg-gray-200 text-gray-500 cursor-not-allowed rounded-xl font-bold text-sm">
                        Taken / Closed
                    </button>
                }>
                    <button onClick={() => props.onContact(service.id, service.author_id, service.title, service.type)} class="w-full mt-4 py-3 bg-neskiBeige text-neskiBlack hover:bg-neskiGreen hover:text-white rounded-xl font-bold text-sm transition">
                        Contact
                    </button>
                </Show>
            </Show>
            <Show when={isMine}>
                <button class="w-full mt-4 py-3 bg-gray-100 text-gray-400 cursor-not-allowed rounded-xl font-bold text-sm">
                    {isBooked ? 'Closed' : 'Your Post'}
                </button>
            </Show>
        </div>
    );
}