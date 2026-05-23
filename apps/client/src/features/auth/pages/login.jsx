import React, { useState } from "react";
import AuthLayout from "../components/AuthLayout.jsx";
import { Eye, EyeOff } from "lucide-react";
import UseAuth from "../useAuth.jsx";
import { useSelector } from "react-redux";
import { ApiLoader } from "../../../shared/components/apiLoader.jsx";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const { login } = UseAuth();
  const { isloading, accessToken } = useSelector((state) => state.Auth);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [data, setdata] = useState({ identifier: "", password: "" });
  const handleChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(data);
    if (result) return navigate("/chat");
  };

  return isloading ? (
    <ApiLoader />
  ) : (
    <AuthLayout
      title="Welcome Back"
      subtitle="Login to continue accessing your AI workspace."
      bottomText="Don't have an account?"
      bottomLinkText="Signup"
      bottomLinkHref="/signup"
    >
      <form
        className="space-y-5"
        method="post"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div>
          <label className="text-sm text-gray-300 block mb-2">Username or Email</label>

          <input
            type="text"
            onChange={(e) => {
              handleChange(e);
            }}
            name="identifier"
            placeholder="Enter username or email"
            className="w-full bg-white/5 border border-white/10 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 outline-none transition px-4 py-3 rounded-xl text-white placeholder:text-gray-500"
          />
        </div>

        {/* Password */}
        <div>
          <label className="text-sm text-gray-300 block mb-2">Password</label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              onChange={(e) => {
                handleChange(e);
              }}
              name="password"
              placeholder="Enter password"
              className="w-full bg-white/5 border border-white/10 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 outline-none transition px-4 py-3 rounded-xl text-white placeholder:text-gray-500 pr-12"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-yellow-400 transition"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* <div className="text-right">
          <a
            href="/forgot-password"
            className="text-sm text-yellow-400 hover:text-yellow-300 transition"
          >
            Forgot Password?
          </a>
        </div> */}

        <button
          disabled={isloading}
          className="w-full py-3 rounded-xl cursor-pointer bg-yellow-400 hover:bg-yellow-300 text-black font-semibold transition duration-300 shadow-lg shadow-yellow-500/20"
        >
          Login
        </button>
      </form>
    </AuthLayout>
  );
};

export default Login;
