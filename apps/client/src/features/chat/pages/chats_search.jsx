export default function ComingSoonModal() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-zinc-900/80 backdrop-blur-xl p-6 md:p-8 text-center shadow-2xl">
        {/* small loader dots */}
        <div className="flex justify-center gap-2 mb-5">
          <span className="w-2 h-2 bg-white rounded-full animate-bounce" />
          <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-150" />
          <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-300" />
        </div>

        {/* main text */}
        <h1 className="text-white text-xl md:text-3xl font-semibold">abhi kaam baaki h bro</h1>

        {/* subtitle */}
        <p className="text-white/60 text-sm md:text-base mt-3">This feature is under development</p>

        {/* progress bar */}
        <div className="mt-6 w-full h-1 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full w-1/2 bg-gradient-to-r from-purple-500 to-blue-500 animate-pulse" />
        </div>

        {/* button */}
        <button className="mt-6 w-full py-2 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition">
          Got it
        </button>
      </div>
    </div>
  );
}
