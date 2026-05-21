import React from "react";
import Logo from "../../../shared/components/logo.jsx";
const AuthLayout = ({ title, subtitle, children, bottomText, bottomLinkText, bottomLinkHref }) => {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center px-4 py-10">
      {/* Background Blur */}
      <div className="absolute -top-30 -left-30 w-72 h-72 bg-yellow-500/20 blur-3xl rounded-full"></div>
      <div className="absolute -bottom-30 -right-30 w-72 h-72 bg-yellow-300/10 blur-3xl rounded-full"></div>

      <div className="w-full max-w-6xl grid lg:grid-cols-2 overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
        {/* Left Section */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-linear-to-br from-yellow-500/20 via-black to-black relative">
          <div>
            <Logo />

            <h1 className="text-5xl font-bold text-white mt-10 leading-tight">
              Welcome to the <br />
              Future of AI
            </h1>

            <p className="text-gray-300 mt-6 text-lg leading-8 max-w-md">
              Securely access your intelligent workspace with a premium modern authentication
              experience.
            </p>
          </div>

          <div className="border border-yellow-500/20 bg-white/5 rounded-2xl p-5 backdrop-blur-lg">
            <p className="text-gray-300 text-sm leading-7">
              Experience a futuristic AI platform crafted with performance, security, and elegant
              user experience in mind.
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center justify-center p-6 sm:p-10 bg-[#0b0b0b]">
          <div className="w-full max-w-md">
            <h2 className="text-4xl font-bold text-white">{title}</h2>

            <p className="text-gray-400 mt-3 leading-7">{subtitle}</p>

            <div className="mt-10">{children}</div>

            <div className="mt-8 text-sm text-gray-400 text-center">
              {bottomText}{" "}
              <a
                href={bottomLinkHref}
                className="text-yellow-400 hover:text-yellow-300 transition font-medium"
              >
                {bottomLinkText}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
