import { createBrowserRouter, Navigate } from "react-router-dom";
import Signup from "../features/auth/pages/signup.jsx";
import Login from "../features/auth/pages/login.jsx";
import HomePage from "../features/home/home.page.jsx";
import Chat from "../features/chat/pages/chat.jsx";
import VerifyAccount from "../features/auth/pages/verify_account.jsx";
import Protect_routes from "../features/auth/components/Authorization.jsx";
import ComingSoonModal from "../features/chat/pages/chats_search.jsx";
import NotFound from "../shared/components/404.jsx";
const AppRouter = (isAuthenticated) => {
  return createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/login",
      element: isAuthenticated ? <Navigate to="/" replace /> : <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/chat",
      element: (
        <Protect_routes>
          <Chat />
        </Protect_routes>
      ),
    },
    {
      path: "/chat/search",
      element: (
        <Protect_routes>
          <ComingSoonModal />
        </Protect_routes>
      ),
    },
    {
      path: "/verify_account",
      element: <VerifyAccount />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
};

export default AppRouter;
