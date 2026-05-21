import { useEffect, useState } from "react";
import { Zap, Sparkles } from "lucide-react";
import SearchBar from "./searchbar.jsx";
import Logo from "../../../shared/components/logo.jsx";
import Chatintro from "./chat_intro.jsx";
import ChatMessage from "./chat_message.jsx";
import UseChat from "../UseChat.js";
import { useSelector } from "react-redux";

const Chat_section = ({ onclick, active, setactive }) => {
  const { messages } = useSelector((state) => state.Chat);
  {
    messages;
  }

  return (
    <>
      {/* Chat Middle Section */}
      <div className="flex flex-1 flex-col min-h-0 justify-start pt-18 sm:py-5 ">
        {/* Chat Messages Area */}
        <div className="flex flex-1 min-h-0 overflow-y-auto overscroll-contain scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
          {active ? <ChatMessage messages={messages} /> : <Chatintro active={active} />}
        </div>

        {/* Search Bar Area */}
        <div
          className={`
          ${active ? "min-h-auto  pb-1 items-end" : "flex-1  items-start"}
          flex justify-center transition-all duration-300
        `}
        >
          <SearchBar active={active} setactive={setactive} />
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style>{`
        @keyframes shine {
          0% { left: -120%; }
          100% { left: 150%; }
        }
        
        .scrollbar-thin {
          scrollbar-width: thin;
        }
        
        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(63, 63, 70, 0.5);
          border-radius: 20px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(63, 63, 70, 0.8);
        }
      `}</style>
    </>
  );
};

export default Chat_section;
