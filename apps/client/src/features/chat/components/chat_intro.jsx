const Chatintro = (active) => {
  return (
    <div className="w-full  flex justify-center overflow-hidden items-end pb-10 px-4 ">
      <div className="text-center">
        {/* TITLE WRAPPER */}
        <div className="relative   inline-block">
          <h1
            className="
              relative
              text-4xl sm:text-6xl md:text-7xl
              font-semibold
              tracking-[0.12em]
              leading-tight
              text-white
            "
          >
            Perplex{" "}
            <span
              className="
                relative
                bg-linear-to-r
                from-yellow-300
                to-yellow-500
                bg-clip-text
                text-transparent
              "
            >
              AI
              {/* soft glow behind AI */}
              <span className="absolute inset-0 blur-lg opacity-30 bg-yellow-400 -z-10" />
            </span>
          </h1>

          {/* ambient glow */}
          <div className="absolute inset-0 blur-3xl opacity-20 bg-yellow-400 -z-10" />

          {/* moving shine */}
          <div className="shine" />
        </div>

        {/* DESCRIPTION */}
        <p
          className="
            mt-5
            text-zinc-400
            text-sm sm:text-base
            leading-relaxed
            tracking-wide
            max-w-md
            mx-auto
          "
        >
          AI-powered real-time research and reasoning engine.
        </p>
      </div>

      {/* ANIMATION STYLES */}
      <style>{`
        .shine {
          position: absolute;
          top: 0;
          left: -70%;
          width: 40%;
          height: 100%;

          background: linear-gradient(
            120deg,
            transparent,
            rgba(255, 255, 255, 0.35),
            transparent
          );

          transform: skewX(-20deg);
          animation: shineMove 3s infinite ease-in-out;
          pointer-events: none;
        }

        @keyframes shineMove {
          0% {
            left: -70%;
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          50% {
            opacity: 0.6;
          }
          100% {
            left: 130%;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Chatintro;
