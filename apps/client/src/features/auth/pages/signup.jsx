// pages/Signup.jsx

import React, { useState } from "react";
import AuthLayout from "../components/AuthLayout.jsx";
import { Eye, EyeOff } from "lucide-react";
import UseAuth from "../useAuth.jsx";
import { useSelector } from "react-redux";
import { ApiLoader } from "../../../shared/components/apiLoader.jsx";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { signup } = UseAuth();
  const { isloading } = useSelector((state) => state.Auth);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [data, setdata] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setdata({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signup(data);
    if (result) return navigate("/verify_account");
  };

  return isloading ? (
    <ApiLoader />
  ) : (
    <AuthLayout
      title="Create Account"
      subtitle="Start your AI journey with a secure and modern platform."
      bottomText="Already have an account?"
      bottomLinkText="Login"
      bottomLinkHref="/login"
    >
      <form
        className="space-y-5"
        method="post"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div>
          <label className="text-sm text-gray-300 block mb-2">Username</label>

          <input
            type="text"
            name="username"
            onChange={(e) => {
              handleChange(e);
            }}
            placeholder="Enter your username"
            className="w-full bg-white/5 border border-white/10 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 outline-none transition px-4 py-3 rounded-xl text-white placeholder:text-gray-500"
          />
        </div>

        <div>
          <label className="text-sm text-gray-300 block mb-2">Email</label>

          <input
            type="email"
            name="email"
            onChange={(e) => {
              handleChange(e);
            }}
            placeholder="Enter your email"
            className="w-full bg-white/5 border border-white/10 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 outline-none transition px-4 py-3 rounded-xl text-white placeholder:text-gray-500"
          />
        </div>

        {/* Password */}
        <div>
          <label className="text-sm text-gray-300 block mb-2">Password</label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create password"
              name="password"
              onChange={(e) => {
                handleChange(e);
              }}
              className="w-full bg-white/5 border border-white/10 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 outline-none transition px-4 py-3 rounded-xl text-white placeholder:text-gray-500 pr-12"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-yellow-400 transition"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <button
          disabled={isloading}
          className="w-full py-3 rounded-xl bg-yellow-400 cursor-pointer hover:bg-yellow-300 text-black font-semibold transition duration-300 shadow-lg shadow-yellow-500/20"
        >
          Create Account
        </button>
      </form>
    </AuthLayout>
  );
};

export default Signup;
