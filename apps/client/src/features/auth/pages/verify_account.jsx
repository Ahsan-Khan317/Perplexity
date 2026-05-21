import { MailCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const VerifyAccount = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="max-w-md w-full bg-[#111111] border border-[#222] rounded-2xl p-8 text-center shadow-lg">
        {/* Icon */}
        <div className="flex justify-center mb-5">
          <div className="p-4 rounded-full bg-yellow-400/10">
            <MailCheck className="text-yellow-400 w-10 h-10" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold mb-2">Verify your account</h1>

        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed mb-6">
          We’ve sent a verification link to your registered email address. Please click the link to
          activate your account and continue.
        </p>

        {/* Highlight box */}
        <div className="bg-[#0d0d0d] border border-[#222] rounded-xl p-4 text-sm text-gray-300 mb-6">
          Didn’t receive the email? Check your spam folder or try resending it.
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3 ">
          <button
            onClick={() => navigate("/")}
            className=" bg-yellow-400 cursor-pointer text-black font-medium py-2 rounded-lg hover:bg-yellow-300 transition "
          >
            Go to Home
          </button>
        </div>

        {/* Footer hint */}
        <p className="text-xs text-gray-500 mt-6">This step helps us keep your account secure 🔐</p>
      </div>
    </div>
  );
};

export default VerifyAccount;
