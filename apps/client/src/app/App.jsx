import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "react-loading-skeleton/dist/skeleton.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshToken, SetAccessToken } from "../shared/Api/axiosInstance.js";
import UseAuth from "../features/auth/useAuth.jsx";
import { ApiLoader } from "../shared/components/apiLoader.jsx";
import AppRouter from "./AppRouter.jsx";
import UseChat from "../features/chat/UseChat.js";
function App() {
  const { data, isAuthenticated } = useSelector((state) => state.Auth);
  const { get_me } = UseAuth();
  const { getAllChat } = UseChat();
  const Router = AppRouter(isAuthenticated);

  useEffect(() => {
    const initAuth = async () => {
      try {
        if (data) {
          await getAllChat();
          await get_me();
          return;
        }

        const token = await refreshToken();
        if (!token) return;

        SetAccessToken(token);

        await get_me();
        await getAllChat();
      } catch (err) {
        console.log(err);
      }
    };

    initAuth();
  }, []);

  return (
    <>
      <RouterProvider router={Router} />
      <Toaster position="top-center" />
    </>
  );
}

export default App;
