import { Bot, Sparkles, Zap, Cpu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Logo = ({ title, desc, variant = "default", onClick }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate("/");
    }
  };

  // Different icon variants
  const icons = {
    default: Bot,
    sparkle: Sparkles,
    zap: Zap,
    cpu: Cpu,
  };

  const IconComponent = icons[variant] || Bot;

  useEffect(() => {
    // Infinite rotation interval
    const interval = setInterval(() => {
      setIsHovered((prev) => !prev);
    }, 1000); // Change every 1.5 seconds for smoother effect

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      onClick={handleClick}
      className="group relative top-3 flex cursor-pointer items-center gap-3 transition-all duration-300"
    >
      {/* Animated gradient background */}
      <div className="relative">
        <div
          className={`
          absolute inset-0 rounded-2xl bg-linear-to-br from-yellow-400 to-amber-500
          opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500
        `}
        />

        <div
          className={`
          relative w-11 h-11 rounded-2xl bg-linear-to-br from-yellow-400 to-amber-500
          flex items-center justify-center shadow-lg shadow-yellow-500/30
          transition-all duration-500 ease-in-out
          group-hover:scale-105 group-hover:shadow-yellow-500/50
          ${isHovered ? "rotate-6 scale-105" : "rotate-0 scale-100"}
        `}
        >
          {/* Shine effect */}
          <div className="absolute inset-0 rounded-2xl bg-linear-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Pulse ring - now infinite */}
          <div className="absolute inset-0 rounded-2xl border-2 border-yellow-400/50 animate-pulse" />

          {/* Infinite ripple effect */}
          <div className="absolute inset-0 rounded-2xl border-2 border-yellow-400/30 animate-ripple" />
          <div className="absolute inset-0 rounded-2xl border-2 border-yellow-400/20 animate-ripple-delayed" />

          <IconComponent
            className="text-black relative z-10 transition-all duration-300 group-hover:scale-110"
            size={22}
            strokeWidth={1.8}
          />
        </div>
      </div>

      {/* Text section */}
      <div className="relative">
        <h1
          className={`
          font-bold text-lg tracking-wide transition-all duration-500 ease-in-out
          bg-linear-to-r from-white to-zinc-300 bg-clip-text text-transparent
          group-hover:from-yellow-400 group-hover:to-amber-400
          ${isHovered ? "translate-x-1 text-yellow-400" : "translate-x-0"}
        `}
        >
          {title || "PerplexAI"}
        </h1>

        <div className="flex items-center gap-1">
          <p className="text-[11px] text-zinc-500 transition-colors duration-300 group-hover:text-zinc-400">
            {desc || "AI Research Assistant"}
          </p>

          {/* Infinite blinking dot */}
          <span className="w-1 h-1 rounded-full bg-yellow-400 animate-pulse-dot" />
        </div>

        {/* Flowing underline animation */}
        <div className="absolute -bottom-1 left-0 h-0.5 bg-linear-to-r from-yellow-400 via-amber-400 to-yellow-400 animate-flowing-line w-0 group-hover:w-full transition-all duration-500" />
      </div>

      <style>{`
        @keyframes ripple {
          0% {
            transform: scale(1);
            opacity: 0.6;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        
        @keyframes ripple-delayed {
          0% {
            transform: scale(1);
            opacity: 0.4;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        
        @keyframes pulse-dot {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
          }
        }
        
        @keyframes flowing-line {
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: 200% 0%;
          }
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .animate-ripple {
          animation: ripple 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .animate-ripple-delayed {
          animation: ripple-delayed 2s cubic-bezier(0.4, 0, 0.6, 1) infinite 1s;
        }
        
        .animate-pulse-dot {
          animation: pulse-dot 1.5s ease-in-out infinite;
        }
        
        .animate-flowing-line {
          background-size: 200% 100%;
          animation: flowing-line 2s linear infinite;
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
};

export default Logo;
