import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UseAuth from "../auth/useAuth.jsx";

import { Bot, Sparkles, ArrowRight } from "lucide-react";
import Logo from "../../shared/components/logo.jsx";
import { useSelector } from "react-redux";

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.Auth);

  return (
    <div className="h-screen bg-[#0b1120] text-white overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-yellow-400/10 blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-500/10 blur-[120px]" />

      {/* ================= NAVBAR ================= */}

      <header className="relative z-30 border-b border-white/10 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-3 flex items-center justify-between">
          {/* Logo */}
          <Logo />
          {/* Desktop Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => navigate("/login")}
              disabled={isAuthenticated}
              className={` ${isAuthenticated ? "opacity-0" : "opacity-full"}  px-5 py-2 rounded-xl border cursor-pointer border-white/10 bg-white/5 hover:bg-white/10 transition duration-300`}
            >
              Login
            </button>

            <button
              onClick={() => navigate("/chat")}
              className="px-5 py-2 rounded-xl cursor-pointer bg-yellow-400 hover:bg-yellow-300 text-black font-semibold transition duration-300 shadow-lg shadow-yellow-500/20"
            >
              Open Chat
            </button>
          </div>
        </div>
      </header>

      {/* ================= HERO SECTION ================= */}

      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-[calc(100vh-120px)] sm:h-[calc(100vh-72px)] flex items-center">
        <div className="grid lg:grid-cols-2 gap-10 items-center w-full">
          {/* ================= LEFT CONTENT ================= */}

          <div className="relative z-20 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-300 text-[10px] sm:text-sm mb-3">
              <Sparkles size={12} />
              Powered by Real-Time AI Research
            </div>

            {/* Heading */}
            <h1 className="text-[30px] sm:text-5xl md:text-6xl font-bold leading-tight">
              Smart AI for
              <span className="text-yellow-400"> Real-Time </span>
              Research
            </h1>

            {/* ================= MOBILE CHAT UI ================= */}

            <div className="lg:hidden mt-4">
              <div className="bg-white/5 border border-white/10 rounded-3xl p-3 backdrop-blur-xl shadow-2xl shadow-black/40 max-w-[320px] mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-xl bg-yellow-400 flex items-center justify-center">
                      <Bot className="text-black" size={13} />
                    </div>

                    <div className="text-left">
                      <h2 className="font-semibold text-[11px]">PerplexAI Assistant</h2>

                      <p className="text-[9px] text-gray-400">Researching official contacts...</p>
                    </div>
                  </div>

                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                </div>

                {/* Chat */}
                <div className="mt-3 space-y-3">
                  {/* User */}
                  <div className="flex justify-end">
                    <div className="bg-yellow-400 text-black px-3 py-2 rounded-2xl rounded-br-md max-w-[85%] text-[10px] font-medium leading-relaxed">
                      Send an email to the Education Minister regarding the NEET paper leak issue.
                    </div>
                  </div>

                  {/* AI */}
                  <div className="flex gap-2 items-start">
                    <div className="w-6 h-6 rounded-lg bg-yellow-400 flex items-center justify-center shrink-0">
                      <Bot className="text-black" size={11} />
                    </div>

                    <div className="bg-white/5 border border-white/10 px-3 py-2 rounded-2xl rounded-tl-md text-[10px] text-gray-300 leading-relaxed max-w-[88%]">
                      <p className="text-green-400 font-medium mb-2">✓ Email sent successfully</p>

                      <div className="space-y-1">
                        <p>
                          <span className="text-gray-500">To:</span> educationminister@gov.in
                        </p>

                        <p>
                          <span className="text-gray-500">Subject:</span> Concern Regarding NEET
                          Paper Leak
                        </p>
                      </div>

                      <div className="border-t border-white/10 mt-2 pt-2">
                        <p>
                          Verified government contact researched, professional email generated, and
                          successfully delivered to the official ministry email address.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="mt-4 text-gray-300 text-[12px] sm:text-base md:text-lg leading-relaxed max-w-md mx-auto lg:mx-0">
              Ask anything and get researched, structured, and accurate responses instantly. Send
              emails, generate coding solutions, summaries, and AI-powered answers with live web
              intelligence.
            </p>

            {/* Buttons */}
            <div className="mt-5 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={() => navigate("/chat")}
                className="px-6 py-3 rounded-2xl cursor-pointer bg-yellow-400 hover:bg-yellow-300 text-black text-sm font-semibold transition duration-300 shadow-lg shadow-yellow-500/20 flex items-center justify-center gap-2"
              >
                Start Researching
                <ArrowRight size={18} />
              </button>

              {/* Desktop Only */}
              <button
                onClick={() => navigate("/signup")}
                className="hidden sm:block px-7 cursor-pointer py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition duration-300"
              >
                Create Account
              </button>
            </div>
          </div>

          {/* ================= DESKTOP CHAT UI ================= */}

          <div className="hidden lg:flex items-center justify-center">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-5 backdrop-blur-xl shadow-2xl shadow-black/40 w-full max-w-xl">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-yellow-400 flex items-center justify-center shadow-lg shadow-yellow-500/20">
                    <Bot className="text-black" size={18} />
                  </div>

                  <div>
                    <h2 className="font-semibold">PerplexAI Assistant</h2>

                    <p className="text-xs text-gray-400">
                      Researching official government contacts...
                    </p>
                  </div>
                </div>

                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
              </div>
              Chat
              <div className="mt-6 space-y-5">
                {/* User */}
                <div className="flex justify-end">
                  <div className="bg-yellow-400 text-black px-4 py-3 rounded-2xl rounded-br-md max-w-[85%] text-sm font-medium leading-relaxed shadow-lg">
                    Send a professional email to the Education Minister regarding the NEET paper
                    leak issue after researching the official contact details.
                  </div>
                </div>

                {/* AI */}
                <div className="flex gap-3 items-start">
                  <div className="w-9 h-9 rounded-2xl bg-yellow-400 flex items-center justify-center shrink-0 shadow-lg shadow-yellow-500/20">
                    <Bot className="text-black" size={16} />
                  </div>

                  <div className="bg-white/5 border border-white/10 px-4 py-4 rounded-2xl rounded-tl-md text-sm text-gray-300 leading-relaxed max-w-[88%]">
                    <p className="text-green-400 font-medium mb-4">✓ Email sent successfully</p>

                    <div className="space-y-2">
                      <p>
                        <span className="text-gray-500">To:</span> educationminister@gov.in
                      </p>

                      <p>
                        <span className="text-gray-500">Subject:</span> Concern Regarding NEET Paper
                        Leak
                      </p>
                    </div>

                    <div className="border-t border-white/10 mt-4 pt-4">
                      <p>
                        Dear Education Minister,
                        <br />
                        <br />
                        I would like to express concern regarding the NEET paper leak issue
                        affecting thousands of students. Kindly investigate the matter and ensure
                        fair examination practices.
                        <br />
                        <br />
                        Thank you.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
