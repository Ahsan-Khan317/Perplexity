import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
const Signup = lazy(() => import("../features/auth/pages/signup.jsx"));
import Login from "../features/auth/pages/login.jsx";
import HomePage from "../features/home/home.page.jsx";
const Chat = lazy(() => import("../features/chat/pages/chat.jsx"));
const VerifyAccount = lazy(() => import("../features/auth/pages/verify_account.jsx"));
import Protect_routes from "../features/auth/components/Authorization.jsx";

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
          {" "}
          <Chat />
        </Protect_routes>
      ),
    },

    {
      path: "/verify_account",
      element: <VerifyAccount />,
    },
    {
      path: "*",
      element: <HomePage />,
    },
  ]);
};

export default AppRouter;
