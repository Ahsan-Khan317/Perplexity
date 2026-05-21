import { useRef, useState, useEffect } from "react";
import { Plus, Mic, Image, FileText, Link2, SendHorizontal } from "lucide-react";
import UseChat from "../UseChat.js";
import { useSelector } from "react-redux";

const SearchBar = ({ active, setactive }) => {
  const textref = useRef(null);

  const { messages } = useSelector((state) => state.Chat);
  const { sendMessage } = UseChat();

  const [open, setopen] = useState(false);
  const [data, setdata] = useState({
    question: null,
    chatid: "",
  });

  const handleData = (e) => {
    setdata({ question: e.target.value, chatid: messages?.[1]?.chat || "" });
  };

  /* ================= AUTO HEIGHT ================= */
  const handleInput = () => {
    const el = textref.current;

    el.style.height = "auto";

    const maxHeight = 160;
    const newHeight = el.scrollHeight;

    if (newHeight <= maxHeight) {
      el.style.overflowY = "hidden";
      el.style.height = newHeight + "px";
    } else {
      el.style.height = maxHeight + "px";
      el.style.overflowY = "auto";
    }
  };

  /* ================= SEND ================= */
  const handleSend = async () => {
    setactive(true);

    sendMessage(data);

    textref.current.value = "";
    textref.current.style.height = "auto";
  };

  /* ================= ENTER ================= */
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      handleSend();
    }
  };

  /* ================= CLOSE DROPUP ================= */
  useEffect(() => {
    const close = () => setopen(false);

    window.addEventListener("click", close);

    return () => window.removeEventListener("click", close);
  }, []);

  return (
    <div
      className="
        relative
        
        sm:w-[60%]
        w-[92%]
        
        bg-zinc-900/95
        
        border border-yellow-400/20
        
        rounded-[30px]
        
        backdrop-blur-2xl
        
        shadow-[0_0_40px_rgba(255,200,0,0.10)]
        
        px-4 py-3
        
        transition-all duration-300
      "
    >
      {/* ================= TEXTAREA ================= */}
      <div className="flex items-start gap-3">
        {/* LEFT ICON */}
        <div
          className="
            
            
            w-8 h-8
            
            rounded-xl
            
            bg-zinc-800
            
            border border-yellow-400/10
            
            flex items-center justify-center
            
            shrink-0
            
            relative
            overflow-hidden
          "
        >
          {/* shine */}
          <span
            className="
              absolute
              top-0
              -left-full
              w-[120%]
              h-full
              rotate-12
              
              bg-linear-to-r
              from-transparent
              via-white/20
              to-transparent
              
              animate-[shine_3s_linear_infinite]
            "
          />

          <span className="text-yellow-400 text-sm relative z-10">✦</span>
        </div>

        {/* TEXTAREA */}
        <textarea
          ref={textref}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
          onChange={(e) => {
            handleData(e);
          }}
          rows={1}
          placeholder="Ask anything..."
          className="
            w-full
            
            bg-transparent
            
            pt-1
            
            resize-none
            outline-none
            
            text-zinc-100
            placeholder:text-zinc-500
            
            text-[15px]
            leading-6
            tracking-[0.02em]
            
            overflow-hidden
            
            scrollbar-thin
            scrollbar-thumb-zinc-700
            scrollbar-track-transparent
          "
        />
      </div>

      {/* ================= ACTIONS ================= */}
      <div className="flex items-center justify-between mt-4">
        {/* LEFT SIDE */}
        <div className="flex items-center gap-2 relative">
          {/* ATTACH BUTTON */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setopen(!open);
            }}
            className="
              h-10 px-3
              
              rounded-2xl
              
              bg-zinc-800/90
              
              border border-zinc-700
              
              text-zinc-300
              
              flex items-center gap-2
              
              hover:border-yellow-400/20
              hover:text-white
              
              transition-all duration-300
            "
          >
            <Plus size={16} />

            <span className="text-sm hidden sm:block">Attach</span>
          </button>

          {/* DROPUP */}
          {open && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="
                absolute
                
                bottom-14
                left-0
                
                w-56
                
                rounded-3xl
                
                bg-zinc-900/95
                
                border border-zinc-800
                
                backdrop-blur-2xl
                
                shadow-[0_0_35px_rgba(0,0,0,0.45)]
                
                p-2
                
                flex flex-col gap-1
                
                animate-in fade-in zoom-in-95 duration-200
              "
            >
              {[
                {
                  icon: <Image size={16} />,
                  label: "Upload Image",
                },
                {
                  icon: <FileText size={16} />,
                  label: "Upload File",
                },
                {
                  icon: <Link2 size={16} />,
                  label: "Add Link",
                },
              ].map((item, i) => (
                <button
                  key={i}
                  className="
                    flex items-center gap-3
                    
                    px-4 py-3
                    
                    rounded-2xl
                    
                    text-zinc-300
                    text-sm
                    
                    hover:bg-zinc-800
                    hover:text-white
                    
                    transition-all duration-300
                  "
                >
                  <span className="text-yellow-400">{item.icon}</span>

                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-2">
          {/* MIC */}
          <button
            className="
              relative
              
              w-11 h-11
              
              rounded-2xl
              
              bg-zinc-800
              
              border border-zinc-700
              
              flex items-center justify-center
              
              text-zinc-300
              
              overflow-hidden
              
              hover:border-yellow-400/20
              hover:text-yellow-400
              hover:scale-105
              
              active:scale-95
              
              transition-all duration-300
            "
          >
            {/* glow */}
            <span
              className="
                absolute inset-0
                bg-yellow-400/0
                hover:bg-yellow-400/10
                transition-all duration-300
              "
            />

            {/* shine */}
            <span
              className="
                absolute
                top-0
                -left-full
                w-[120%]
                h-full
                rotate-12
                
                bg-linear-to-r
                from-transparent
                via-white/10
                to-transparent
                
                animate-[shine_4s_linear_infinite]
              "
            />

            <Mic size={18} className="relative z-10" />
          </button>

          {/* SEND */}
          <button
            onClick={handleSend}
            className="
              relative
              
              h-11 w-11
              
              cursor-pointer
              
              rounded-2xl
              
              bg-linear-to-r
              from-[#FFD84D]
              to-[#FFBF00]
              
              text-black
              
              font-bold
              
              flex items-center justify-center
              
              shadow-lg shadow-yellow-500/20
              
              hover:scale-105
              active:scale-95
              
              transition-all duration-300
              
              overflow-hidden
            "
          >
            {/* shine */}
            <span
              className="
                absolute
                top-0
                -left-full
                w-[120%]
                h-full
                rotate-12
                
                bg-linear-to-r
                from-transparent
                via-white/30
                to-transparent
                
                animate-[shine_3s_linear_infinite]
              "
            />

            <SendHorizontal size={18} className="relative z-10" />
          </button>
        </div>
      </div>

      {/* ================= ANIMATION ================= */}
      <style>{`
        @keyframes shine {
          0% {
            left: -120%;
          }
          100% {
            left: 150%;
          }
        }
      `}</style>
    </div>
  );
};

export default SearchBar;
