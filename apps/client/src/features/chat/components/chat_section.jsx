import { useEffect, useRef } from "react";
import { GripHorizontal } from "lucide-react";
import SearchBar from "./searchbar.jsx";
import Chatintro from "./chat_intro.jsx";
import ChatMessage from "./chat_message.jsx";
import { useSelector } from "react-redux";

const Chat_section = ({ onclick, active, setactive, setslidestate }) => {
  const { messages } = useSelector((state) => state.Chat);
  const messagesRef = useRef(null);

  useEffect(() => {
    const container = messagesRef.current;
    if (!container) return;

    const timer = setTimeout(() => {
      container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
    }, 100);

    return () => clearTimeout(timer);
  }, [messages]);

  return (
    <div className="flex flex-1 flex-col  bg-linear-to-b from-zinc-950 to-black ">
      {/* Mobile Header Bar - icon only, no extra text */}

      <button
        onClick={onclick}
        className="p-2.5  sm:hidden relative z-20 top-9.5 left-3.5 size-10 rounded-xl bg-zinc-900 border border-zinc-800/80 text-zinc-300 hover:text-white active:scale-95 transition-all duration-200"
        aria-label="Toggle sidebar"
      >
        <GripHorizontal size={20} />
      </button>

      {/* Chat Messages Area */}
      <div
        ref={messagesRef}
        className="flex flex-1 min-h-0 overflow-y-auto overscroll-contain scrollbar"
      >
        {active ? (
          <ChatMessage messages={messages} setslidestate={setslidestate} />
        ) : (
          <Chatintro active={active} setslidestate={setslidestate} />
        )}
      </div>

      {/* Search Bar Area */}
      <div
        className={`
          ${active ? "shrink-0 pb-1 items-end" : "flex-1 items-start"}
          flex justify-center transition-all duration-300
        `}
      >
        <SearchBar active={active} setactive={setactive} />
      </div>
    </div>
  );
};

export default Chat_section;
