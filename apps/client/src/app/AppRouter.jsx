import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
const Signup = lazy(() => import("../features/auth/pages/signup.jsx"));
import Login from "../features/auth/pages/login.jsx";
import HomePage from "../features/home/home.page.jsx";
const Chat = lazy(() => import("../features/chat/pages/chat.jsx"));
const VerifyAccount = lazy(() => import("../features/auth/pages/verify_account.jsx"));
import Protect_routes from "../features/auth/components/Authorization.jsx";
const SelectAIBattle = lazy(()=>import("../features/AiBattle/page/selectBattle.jsx"))
const Ai_Battle = lazy(()=>import("../features/AiBattle/page/battle_interface.jsx"))

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
        // <Protect_routes>
          
        //   <Chat />
        // </Protect_routes>
        <Chat/>
      ),
    },

    {
      path: "/verify_account",
      element: <VerifyAccount />,
    },
     {
      path: "/ai_battle",
      element: <SelectAIBattle />,
    },
       {
      path: "/ai_battle_arena",
      element: <Ai_Battle />,
    },
    {
      path: "*",
      element: <HomePage />,
    },
  ]);
};

export default AppRouter;
