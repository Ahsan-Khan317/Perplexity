import { useEffect, useState } from "react";

export default function NotFound() {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "." : prev + "."));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen w-full flex items-center justify-center bg-black relative overflow-hidden px-4">
      {/* glowing AI background */}
      <div className="absolute w-[500px] h-[500px] bg-purple-600/30 blur-[140px] rounded-full top-10 left-10 animate-pulse" />
      <div className="absolute w-[400px] h-[400px] bg-blue-600/30 blur-[140px] rounded-full bottom-10 right-10 animate-pulse" />

      {/* main card */}
      <div className="relative w-full max-w-md text-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 md:p-10 shadow-2xl">
        <h1 className="text-white text-6xl font-bold mb-3">404</h1>

        <h2 className="text-white text-xl md:text-2xl font-semibold">
          Perplex AI couldn’t find this page{dots}
        </h2>

        <p className="text-white/60 text-sm mt-3">
          The requested route does not exist in the system.
        </p>

        {/* AI scan bar */}
        <div className="mt-6 w-full h-1 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full w-1/2 bg-gradient-to-r from-purple-500 to-blue-500 animate-pulse" />
        </div>

        {/* CTA button */}
        <a
          href="https://perplex-one.vercel.app/"
          className="mt-6 inline-block w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold hover:opacity-90 transition"
        >
          Return to Perplex AI
        </a>

        <p className="text-white/40 text-xs mt-4">Routing system failed to locate this path</p>
      </div>
    </div>
  );
}
