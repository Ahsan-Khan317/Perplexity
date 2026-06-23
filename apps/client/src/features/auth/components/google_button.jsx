const Google_button = () => {
  return (
    <>
      {/* Divider */}
      <div className="flex items-center gap-3 my-4">
        <div className="h-px flex-1 bg-white/10" />
        <span className="text-xs text-gray-400">OR</span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      {/* Google Button (Dark + Yellow Theme) */}
      <button
        type="button"
        onClick={() => {
          console.log("Google login clicked");
        }}
        className="w-full flex items-center justify-center gap-3 py-3 rounded-xl
  bg-white/5 border border-white/10
  text-white font-medium
  hover:border-yellow-400/40 hover:bg-yellow-400/10
  active:scale-95 transition-all duration-200
  shadow-lg shadow-black/20"
      >
        <svg width="18" height="18" viewBox="0 0 48 48">
          <path
            fill="#EA4335"
            d="M24 9.5c3.5 0 6.6 1.2 9.1 3.5l6.8-6.8C35.7 2.4 30.3 0 24 0 14.6 0 6.6 5.4 2.6 13.3l7.9 6.1C12.2 13.1 17.6 9.5 24 9.5z"
          />
          <path
            fill="#34A853"
            d="M46.5 24.5c0-1.6-.2-3.1-.5-4.5H24v9h12.7c-.6 3.2-2.4 5.9-5.2 7.7l7.9 6.1C43.8 37.8 46.5 31.8 46.5 24.5z"
          />
          <path
            fill="#4A90E2"
            d="M11.5 28.1c-.5-1.6-.8-3.3-.8-5.1s.3-3.5.8-5.1l-7.9-6.1C1.9 16.1 0 19.9 0 24s1.9 7.9 4.9 10.9l7.9-6.8z"
          />
          <path
            fill="#FBBC05"
            d="M24 48c6.5 0 12-2.1 16-5.7l-7.9-6.1c-2.2 1.5-5.1 2.3-8.1 2.3-6.4 0-11.8-3.6-14.4-8.8l-7.9 6.1C6.6 42.6 14.6 48 24 48z"
          />
        </svg>

        <span className="text-sm tracking-wide">Continue with Google</span>
      </button>
    </>
  );
};

export default Google_button;
