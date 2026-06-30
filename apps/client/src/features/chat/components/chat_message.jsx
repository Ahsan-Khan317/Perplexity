import { Bot, User2 } from "lucide-react";
import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ApiLoader } from "../../../shared/components/apiLoader.jsx";
const ChatMessage = ({ messages, isTyping = false, setslidestate }) => {
  const messagesEndRef = useRef(null);
  const messageRefs = useRef({});

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Format timestamp
  const formatTime = (time) => {
    return new Date(time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="w-full flex scrollbar  flex-col gap-6 px-3 sm:pt-6 pb-6 bg-linear-to-b from-zinc-950 to-black overflow-x-hidden">
      {messages?.map((msg, index) => {
        const isAI = msg.role === "ai";
        const isLast = index === messages.length - 1;

        return (
          <div
            key={index}
            ref={(el) => (messageRefs.current[index] = el)}
            className={`w-full flex animate-fadeIn ${
              isAI ? "justify-start" : "justify-end"
            } ${!isLast ? "mb-2" : ""}`}
          >
            {/* ================= AI MESSAGE ================= */}
            {isAI ? (
              <div className="group flex items-start gap-3 max-w-full hover:translate-x-0.5 transition-transform duration-200">
                {/* AI LOGO with hover effect */}
                <div
                  className="
                    relative
                    w-9 h-9
                    rounded-xl
                    bg-linear-to-br from-zinc-900 to-black
                    border border-yellow-400/30
                    flex items-center justify-center
                    shadow-lg shadow-yellow-500/20
                    shrink-0 mt-1
                    overflow-hidden
                    transition-all duration-300
                    group-hover:border-yellow-400/60
                    group-hover:shadow-yellow-500/30
                  "
                >
                  {/* Animated linear shine */}
                  <span className="absolute inset-0 bg-linear-to-r from-yellow-400/0 via-yellow-400/10 to-yellow-400/0 animate-shine" />

                  {/* Pulse ring */}
                  <span className="absolute inset-0 rounded-xl bg-yellow-400/20 animate-ping opacity-20" />

                  <Bot className="text-yellow-400 relative z-10" size={18} strokeWidth={1.8} />
                </div>

                {/* AI TEXT with typing animation for current message */}
                <div className="flex flex-col gap-1 max-w-[85%] sm:max-w-[75%]">
                  <div className="flex items-center gap-2 px-1">
                    <span className="text-xs font-medium text-yellow-400/80">Perplex AI</span>
                    <span className="text-[10px] text-zinc-500">{formatTime(msg?.createdAt)}</span>
                  </div>

                  <div
                    className="
                      relative
                      overflow-x-hidden
                      wrap-break-words whitespace-pre-wrap
                      bg-zinc-900/95
                      backdrop-blur-xl
                      border border-zinc-800/50
                      rounded-3xl rounded-tl-md
                      px-5 py-4
                      text-zinc-100 text-[15px] leading-relaxed
                      shadow-xl
                      scrollbar
                      transition-all duration-200
                      hover:border-zinc-700/50
                    "
                  >
                    {isLast && isTyping ? (
                      <div className="flex items-center gap-1 py-2">
                        <span
                          className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        />
                        <span
                          className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        />
                        <span
                          className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        />
                      </div>
                    ) : (
                      <div className="prose prose-invert prose-sm max-w-none">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg?.content}</ReactMarkdown>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              /* ================= USER MESSAGE ================= */
              <div className="group flex items-start gap-3 max-w-full justify-end hover:-translate-x-0.5 transition-transform duration-200">
                {/* USER TEXT */}
                <div className="flex flex-col gap-1 max-w-[85%] sm:max-w-[75%] items-end">
                  <div className="flex items-center gap-2 px-1">
                    <span className="text-[10px] text-zinc-500">{formatTime(msg?.createdAt)}</span>
                    <span className="text-xs font-medium text-zinc-400">You</span>
                  </div>

                  <div
                    className="
                      overflow-x-hidden
                      wrap-break-words whitespace-pre-wrap
                      bg-yellow-400/5
                      backdrop-blur-xl
                      border border-yellow-400/20
                      rounded-3xl rounded-br-md
                      px-5 py-4
                      text-zinc-100 text-[15px] leading-relaxed
                      shadow-lg
                      scrollbar
                      transition-all duration-200
                      hover:border-yellow-400/40
                      hover:shadow-yellow-500/10
                    "
                  >
                    <div className="prose prose-invert prose-sm max-w-none wrap-break-words whitespace-pre-wrap">
                      {msg.content}
                    </div>
                  </div>
                </div>

                {/* USER LOGO with hover effect */}
                <div
                  className="
                    w-9 h-9
                    rounded-xl
                    bg-zinc-800
                    border border-zinc-700/50
                    flex items-center justify-center
                    shadow-md
                    shrink-0 mt-1
                    transition-all duration-300
                    group-hover:border-zinc-600
                    group-hover:shadow-lg
                  "
                >
                  <User2 className="text-zinc-300" size={18} strokeWidth={1.8} />
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Typing indicator for AI (when no message yet) */}
      {isTyping && messages?.length === 0 && (
        <div className="flex justify-start animate-fadeIn">
          <div className="flex items-start gap-3">
            <div className="relative w-9 h-9 rounded-xl bg-zinc-900 border border-yellow-400/30 flex items-center justify-center">
              <span className="absolute inset-0 bg-yellow-400/20 animate-pulse rounded-xl" />
              <Bot className="text-yellow-400 relative z-10" size={18} />
            </div>
            <div className="bg-zinc-900/90 backdrop-blur-xl border border-zinc-800 rounded-3xl rounded-tl-md px-5 py-4">
              <div className="flex items-center gap-1">
                <span
                  className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                />
                <span
                  className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <span
                  className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scroll anchor */}
      <div ref={messagesEndRef} />

      {/* Global animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes shine {
          0% {
            transform: translateX(-100%) rotate(25deg);
          }
          100% {
            transform: translateX(200%) rotate(25deg);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        .animate-shine {
          animation: shine 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        /* Tailwind v4 prose overrides */
        .prose {
          color: inherit;
          max-width: none;
        }
        
        .prose-invert {
          color: #f4f4f5;
        }
        
        .prose-sm {
          font-size: 0.875rem;
          line-height: 1.5;
        }
        
        .prose p {
          margin-top: 0.5em;
          margin-bottom: 0.5em;
        }
        
        .prose p:first-child {
          margin-top: 0;
        }
        
        .prose p:last-child {
          margin-bottom: 0;
        }
      `}</style>
    </div>
  );
};

export default ChatMessage;
