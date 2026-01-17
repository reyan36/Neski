function WelcomePanel() {
  return (
    <div class="w-full md:w-1/2 bg-neskiGreen text-white p-8 md:p-12 flex flex-col justify-between relative overflow-hidden min-h-[250px] md:min-h-[600px]">
      <div class="z-10 relative">
        <h2 class="text-3xl md:text-4xl font-heading font-bold mb-2 md:mb-4">
          Welcome Neighbor.
        </h2>
        <p class="text-green-100/80 text-sm md:text-base">
          Join the community where time is the only currency you need.
        </p>
      </div>

      <div class="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-white/5 rounded-full blur-3xl transform translate-x-10 -translate-y-10"></div>
      <div class="absolute bottom-0 left-0 w-32 h-32 md:w-48 md:h-48 bg-white/5 rounded-full blur-2xl transform -translate-x-10 translate-y-10"></div>

      <div class="z-10 mt-8 md:mt-0">
        <p class="text-[10px] md:text-xs uppercase tracking-widest opacity-50 font-bold">
          Developed By {/* TODO: Update routing */}
          <a href="team.html" class="underline">
            Neski Team
          </a>
        </p>
      </div>
    </div>
  )
}

export default WelcomePanel
