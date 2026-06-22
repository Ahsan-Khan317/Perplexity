import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Logo from "../../../shared/components/logo.jsx";
import { Copy, Check, ThumbsUp, ThumbsDown, Sparkles, Trophy, Clock, FileText, Brain, Zap, Send, Mic, MessageCircle, ArrowRight, Lightbulb, Target, Users } from "lucide-react";
import UseAIBAttle from "../UseAIBattle.js";
import { useSelector } from "react-redux";

// Initial Welcome Content
const WelcomeContent = ({titles}) => {
  const suggestions = [
    {
      icon: <Lightbulb className="w-5 h-5 text-yellow-400" />,
      title: "Ask Anything",
      description: "Get answers from AI models"
    },
    {
      icon: <Target className="w-5 h-5 text-yellow-400" />,
      title: "Compare Results",
      description: "See how different AI models perform"
    },
    {
      icon: <Users className="w-5 h-5 text-yellow-400" />,
      title: "AI Battle",
      description: "Watch AI models compete for the best answer"
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto mt-1">
      <div className="flex flex-col items-center justify-center py-16 px-4">
        {/* Hero Icon */}
        <div className="relative mb-8">
          <div className="w-24 h-24 rounded-full bg-linear-to-r from-yellow-400/20 to-amber-500/20 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-linear-to-r from-yellow-400 to-amber-500 flex items-center justify-center shadow-2xl shadow-yellow-500/30">
              <Sparkles className="w-8 h-8 text-black" />
            </div>
          </div>
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full animate-ping opacity-75"></div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-3xl sm:text-4xl py-1 font-bold text-center bg-linear-to-r from-yellow-300 via-yellow-400 to-amber-500 text-transparent bg-clip-text mb-3">
          {`Welcome to AI ${titles || ""} Arena`}
        </h2>
        <p className="text-zinc-400 text-center max-w-md mb-10">
          Ask a question and watch two AI models compete to provide the best answer
        </p>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl">
          {suggestions.map((item, index) => (
            <div 
              key={index}
              className="p-4 rounded-xl bg-black/50 border border-yellow-400/10 hover:border-yellow-400/30 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/10"
            >
              <div className="flex flex-col items-center text-center gap-2">
                <div className="p-2 rounded-lg bg-yellow-400/10">
                  {item.icon}
                </div>
                <h4 className="text-zinc-200 font-semibold text-sm">{item.title}</h4>
                <p className="text-zinc-500 text-xs">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 flex items-center gap-3 text-zinc-500 text-sm animate-pulse">
          <MessageCircle className="w-4 h-4 text-yellow-400" />
          <span>Type your question below to start the battle</span>
          <ArrowRight className="w-4 h-4 text-yellow-400" />
        </div>
      </div>
    </div>
  );
};

const ResponseDisplay = ({ isLoading, userQuestion }) => {
  const [copied, setCopied] = useState(false);
  const [selectedSolution, setSelectedSolution] = useState("solution_1");
  const { data, titles } = useSelector((state) => state.battle);

  if (isLoading) {
    return (
      <div className="w-full max-w-6xl mx-auto mt-8 p-8 rounded-2xl bg-black/50 border border-yellow-400/10">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-yellow-400/20 border-t-yellow-400 rounded-full animate-spin"></div>
            <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-yellow-400 animate-pulse" />
          </div>
          <p className="mt-6 text-zinc-400 text-sm">AI is analyzing your question...</p>
          {userQuestion && (
            <p className="mt-2 text-zinc-500 text-xs">"{userQuestion}"</p>
          )}
        </div>
      </div>
    );
  }

  if (!data) return <WelcomeContent titles={titles} />;

  const { question, solution_1, solution_2, judgement } = data.data;
  const currentSolution = selectedSolution === "solution_1" ? solution_1 : solution_2;
  const isWinner = judgement?.winner === selectedSolution;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentSolution.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-6xl mx-auto mt-3 space-y-6 pb-2">
      {/* Question Header */}
      <div className="px-6 py-4 rounded-2xl bg-black/50 border border-yellow-400/20">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-yellow-400/10 flex items-center justify-center shrink-0">
            <Brain className="w-5 h-5 text-yellow-400" />
          </div>
          <div>
            <p className="text-zinc-400 text-xs uppercase tracking-wider mb-1">Your Question</p>
            <p className="text-zinc-100 text-lg font-medium">{question || userQuestion}</p>
          </div>
        </div>
      </div>

      {/* Two Column Layout for PC */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Solutions */}
        <div className="space-y-6">
          {/* Solution Selector */}
          <div className="flex gap-3 p-1 bg-black/50 rounded-2xl border border-yellow-400/10">
            <button
              onClick={() => setSelectedSolution("solution_1")}
              className={`flex-1 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                selectedSolution === "solution_1"
                  ? "bg-linear-to-r from-yellow-400 to-amber-500 text-black shadow-lg shadow-yellow-500/20"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <span>🤖 AI Model 1</span>
                {judgement?.winner === "solution_1" && (
                  <Trophy className="w-4 h-4 text-amber-400" />
                )}
              </div>
            </button>
            <button
              onClick={() => setSelectedSolution("solution_2")}
              className={`flex-1 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                selectedSolution === "solution_2"
                  ? "bg-linear-to-r from-yellow-400 to-amber-500 text-black shadow-lg shadow-yellow-500/20"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <span>🧠 AI Model 2</span>
                {judgement?.winner === "solution_2" && (
                  <Trophy className="w-4 h-4 text-amber-400" />
                )}
              </div>
            </button>
          </div>

          {/* Solution Content */}
          <div className="relative p-6 rounded-2xl bg-black/50 border border-yellow-400/10">
            {/* Winner Badge */}
            {isWinner && (
              <div className="absolute -top-3 right-4 px-4 py-1 bg-linear-to-r from-yellow-400 to-amber-500 text-black text-xs font-bold rounded-full shadow-lg shadow-yellow-500/30 flex items-center gap-2">
                <Trophy className="w-3 h-3" />
                Winner
              </div>
            )}

            {/* Markdown Content */}
            <div className="prose prose-invert max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ node, ...props }) => <h1 className="text-2xl font-bold text-yellow-300 mt-6 mb-4" {...props} />,
                  h2: ({ node, ...props }) => <h2 className="text-xl font-bold text-yellow-300 mt-5 mb-3" {...props} />,
                  h3: ({ node, ...props }) => <h3 className="text-lg font-bold text-yellow-300 mt-4 mb-2" {...props} />,
                  h4: ({ node, ...props }) => <h4 className="text-base font-bold text-yellow-300 mt-3 mb-2" {...props} />,
                  p: ({ node, ...props }) => <p className="text-zinc-200 text-sm leading-relaxed mb-3" {...props} />,
                  ul: ({ node, ...props }) => <ul className="list-disc list-inside space-y-1 mb-3 text-zinc-200" {...props} />,
                  ol: ({ node, ...props }) => <ol className="list-decimal list-inside space-y-1 mb-3 text-zinc-200" {...props} />,
                  li: ({ node, ...props }) => <li className="text-sm leading-relaxed" {...props} />,
                  strong: ({ node, ...props }) => <strong className="text-yellow-300 font-bold" {...props} />,
                  em: ({ node, ...props }) => <em className="text-zinc-300 italic" {...props} />,
                  code: ({ node, inline, ...props }) => 
                    inline ? (
                      <code className="bg-zinc-800/50 px-2 py-0.5 rounded text-yellow-300 text-sm" {...props} />
                    ) : (
                      <code className="block bg-zinc-800/50 p-4 rounded-xl text-yellow-300 text-sm overflow-x-auto" {...props} />
                    ),
                  blockquote: ({ node, ...props }) => (
                    <blockquote className="border-l-4 border-yellow-400/30 pl-4 py-2 my-3 bg-yellow-400/5 rounded-r-xl" {...props} />
                  ),
                  a: ({ node, ...props }) => <a className="text-yellow-400 hover:text-yellow-300 underline" {...props} />,
                  hr: ({ node, ...props }) => <hr className="border-yellow-400/20 my-4" {...props} />,
                  table: ({ node, ...props }) => (
                    <div className="overflow-x-auto my-3">
                      <table className="min-w-full border-collapse" {...props} />
                    </div>
                  ),
                  th: ({ node, ...props }) => <th className="border border-yellow-400/20 px-3 py-2 text-left text-yellow-300 font-bold" {...props} />,
                  td: ({ node, ...props }) => <td className="border border-yellow-400/20 px-3 py-2 text-zinc-200" {...props} />,
                  img: ({ node, ...props }) => <img className="max-w-full rounded-xl my-3" {...props} />,
                }}
              >
                {currentSolution.content}
              </ReactMarkdown>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-zinc-800/50">
              <div className="flex items-center gap-4 text-xs text-zinc-500">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{currentSolution.timeTaken}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FileText className="w-3 h-3" />
                  <span>{currentSolution.token} tokens</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="p-2 rounded-xl bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-400 hover:text-yellow-400 transition-all duration-300"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
                <button className="p-2 rounded-xl bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-400 hover:text-green-400 transition-all duration-300">
                  <ThumbsUp className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-xl bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-400 hover:text-red-400 transition-all duration-300">
                  <ThumbsDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Judgement */}
        {judgement && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-black/50 border border-yellow-400/10 sticky top-4">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-5 h-5 text-yellow-400" />
                <h3 className="text-zinc-100 font-semibold">AI Judge's Verdict</h3>
              </div>

              <div className="space-y-4">
                {/* Solution 1 Scores */}
                <div className="p-4 rounded-xl bg-zinc-800/30">
                  <p className="text-zinc-400 text-xs uppercase tracking-wider mb-2">AI Model 1 Scores</p>
                  <div className="space-y-1">
                    {Object.entries(judgement?.solution_1_score || {}).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="text-zinc-400">{key}</span>
                        <span className="text-yellow-400 font-bold">{value}/10</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Solution 2 Scores */}
                <div className="p-4 rounded-xl bg-zinc-800/30">
                  <p className="text-zinc-400 text-xs uppercase tracking-wider mb-2">AI Model 2 Scores</p>
                  <div className="space-y-1">
                    {Object.entries(judgement?.solution_2_score || {}).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="text-zinc-400">{key}</span>
                        <span className="text-yellow-400 font-bold">{value}/10</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reasoning */}
                <div className="space-y-2">
                  <div className="p-3 rounded-xl bg-zinc-800/20">
                    <p className="text-zinc-400 text-xs uppercase tracking-wider mb-1">Solution 1 Reasoning</p>
                    <p className="text-zinc-300 text-sm">{judgement?.solution_1_reasoning}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-800/20">
                    <p className="text-zinc-400 text-xs uppercase tracking-wider mb-1">Solution 2 Reasoning</p>
                    <p className="text-zinc-300 text-sm">{judgement?.solution_2_reasoning}</p>
                  </div>
                </div>

                {/* Winner Highlight */}
                <div className="p-4 rounded-xl bg-linear-to-r from-yellow-400/10 to-amber-500/10 border border-yellow-400/20">
                  <div className="flex items-center gap-3">
                    <Trophy className="w-6 h-6 text-yellow-400" />
                    <div>
                      <p className="text-zinc-400 text-xs uppercase tracking-wider">Winner</p>
                      <p className="text-yellow-300 font-semibold">
                        {judgement?.winner === "solution_1" ? "AI Model 1" : "AI Model 2"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Custom Search Bar Component
const CustomSearchBar = ({ onSend, isLoading }) => {
  const [question, setQuestion] = useState("");
  const textareaRef = useRef(null);
  const { Ai_battle } = UseAIBAttle();

  const handleSend = () => {
    if (question.trim() && !isLoading) {
      console.log("Question sent:", question);
      Ai_battle(question);
      onSend?.(question);
      setQuestion("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = () => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      const maxHeight = 120;
      const newHeight = el.scrollHeight;
      if (newHeight <= maxHeight) {
        el.style.overflowY = "hidden";
        el.style.height = newHeight + "px";
      } else {
        el.style.height = maxHeight + "px";
        el.style.overflowY = "auto";
      }
    }
  };

  return (
    <div className="relative w-full bg-zinc-900/95 border border-yellow-400/20 rounded-[30px] backdrop-blur-2xl shadow-[0_0_40px_rgba(255,200,0,0.10)] px-4 py-3 transition-all duration-300">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-xl bg-zinc-800 border border-yellow-400/10 flex items-center justify-center shrink-0 relative overflow-hidden">
          <span className="absolute top-0 -left-full w-[120%] h-full rotate-12 bg-linear-to-r from-transparent via-white/20 to-transparent animate-[shine_3s_linear_infinite]" />
          <span className="text-yellow-400 text-sm relative z-10">✦</span>
        </div>

        <textarea
          ref={textareaRef}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
          rows={1}
          placeholder={isLoading ? "AI is thinking..." : "Ask anything..."}
          disabled={isLoading}
          className="w-full bg-transparent pt-1 resize-none outline-none text-zinc-100 placeholder:text-zinc-500 text-[15px] leading-6 tracking-[0.02em] overflow-hidden scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent disabled:opacity-50"
        />
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <button className="relative w-11 h-11 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-300 overflow-hidden hover:border-yellow-400/20 hover:text-yellow-400 hover:scale-105 active:scale-95 transition-all duration-300">
            <span className="absolute inset-0 bg-yellow-400/0 hover:bg-yellow-400/10 transition-all duration-300" />
            <span className="absolute top-0 -left-full w-[120%] h-full rotate-12 bg-linear-to-r from-transparent via-white/10 to-transparent animate-[shine_4s_linear_infinite]" />
            <Mic size={18} className="relative z-10" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSend}
            disabled={isLoading}
            className={`relative h-11 w-11 cursor-pointer rounded-2xl bg-linear-to-r from-[#FFD84D] to-[#FFBF00] text-black font-bold flex items-center justify-center shadow-lg shadow-yellow-500/20 hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <span className="absolute top-0 -left-full w-[120%] h-full rotate-12 bg-linear-to-r from-transparent via-white/30 to-transparent animate-[shine_3s_linear_infinite]" />
            <Send size={18} className="relative z-10" />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes shine {
          0% { left: -120%; }
          100% { left: 150%; }
        }
      `}</style>
    </div>
  );
};

// Main Component
const AiBattle = () => {
  const [active, setActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showResponse, setShowResponse] = useState(true);
  const [userQuestion, setUserQuestion] = useState("");
  const contentRef = useRef(null);
  const { data, titles } = useSelector((state) => state.battle);

  // Reset loading state when data arrives
  useEffect(() => {
    if (data) {
      setIsLoading(false);
      setShowResponse(true);
      if (contentRef.current) {
        contentRef.current.scrollTop = 0;
      }
    }
  }, [data]);

  const handleSearch = (question) => {
    console.log("Search triggered with:", question);
    setUserQuestion(question);
    setIsLoading(true);
    setShowResponse(false);
  };

  // Show welcome if no data and not loading
  const showWelcome = !data && !isLoading;

  return (
    <div className="h-screen sm:h-[100 dvh] pb-4   text-white flex flex-col overflow-X-hidden">
      {/* Header with Logo - with safe area padding */}
      <div className="relative z-10 flex shrink-0 w-full px-4 pt-safe  ">
        <div className="w-full max-w-6xl mx-auto flex items-center py-2 justify-between">
          <Logo 
            title="AI Battle Arena"
            desc="Watch AI models compete"
            variant="zap"
          />
          <div className="flex items-center gap-3 text-xs text-zinc-500">
            <span className="hidden sm:inline">⚡ Live</span>
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          </div>
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div 
        ref={contentRef}
        className="relative z-10 flex-1 overflow-y-auto px-4 py-4 scrollbar-thin scrollbar-thumb-yellow-400/20 scrollbar-track-transparent bg-black"
      >
        {showWelcome && <WelcomeContent titles={titles || ""} />}
        {!showWelcome && (
          <ResponseDisplay 
            isLoading={isLoading} 
            userQuestion={userQuestion}
          />
        )}
        <div className="h-4"></div>
      </div>

      {/* Custom Search Bar - Fixed at bottom */}
      <div className="relative z-10 flex justify-center shrink-0 px-4 pt-1 pb-safe sm:pb-4 bg-linear-to-t from-black via-black/95 to-transparent">
        <div className="max-w-4xl mx-auto w-full flex justify-center">
          <div className="w-full lg:w-full flex justify-center">
            <CustomSearchBar 
              onSend={handleSearch} 
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiBattle;