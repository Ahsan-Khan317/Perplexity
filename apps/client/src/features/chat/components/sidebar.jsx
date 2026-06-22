import { useRef, lazy } from "react";
import { useState } from "react";
import Chat_container from "../components/chat_container.jsx";
import Logo from "../../../shared/components/logo.jsx";
const ChatSearchPage = lazy(() => import("../pages/chats_search.jsx"));
import { Brain } from "lucide-react";
import {
  SquarePen,
  Search,
  Briefcase,
  ChevronRight,
  ChevronDown,
  LogOut,
  Trash2,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

import UseAuth from "../../auth/useAuth.jsx";
import { useSelector } from "react-redux";
import UseChat from "../UseChat.js";

const Sidebar = ({ slidestate, setslidestate, intro, setintro }) => {
  const [showsearchpage, setshowsearchpage] = useState(false);
  const { titles } = useSelector((state) => state.Chat);
  const { data } = useSelector((state) => state.Auth);
  const navigate = useNavigate();
  const { newChat } = UseChat();
  const { logout } = UseAuth();
  const [active, setactive] = useState("chat" || true);
  const Start = useRef(0);
  const End = useRef(0);

  // slide logic for mobile

  const handleStart = (e) => {
    Start.current = e.changedTouches[0].screenX;
  };
  const handleEnd = (e) => {
    if (showsearchpage) return;
    End.current = e.changedTouches[0].screenX;

    const distance = Start.current - End.current;

    if (distance > 50) {
      return setslidestate(!slidestate);
    }
  };

  const text = "exploring data analytics";

  return (
    <section
      onTouchStart={(e) => {
        handleStart(e);
      }}
      onTouchEnd={(e) => {
        handleEnd(e);
      }}
      className={`h-full pt-3 sm:pt-9 w-full fixed z-30 md:relative bg-black top-0 left-0  md:w-[18%] transition-all duration-200 gap-2 ${slidestate ? "max-md:translate-x-0" : "max-md:-translate-x-full"} flex flex-col justify-start items-center border-r border-r-amber-50 `}
    >
      <ChatSearchPage
        setshowsearchpage={setshowsearchpage}
        showsearchpage={showsearchpage}
        titles={titles}
        setslidestate={setslidestate}
        setintro={setintro}
      />

      {/* //upper part of sidebar */}
      <div className="flex  sm:flex-col gap-5 justify-between sm:justify-start w-full px-4 pt-4 sm:pt-6">
        <Logo />

        {/* //for pc */}
        <button
          onClick={() => {
            setintro(false);
            setactive("newchat");
            const res = newChat();
            if (res) return navigate("/chat");
          }}
          className={` ${active == "newchat" ? "bg-amber-300 text-gray-700" : ""} rounded-2xl   text-amber-50 hidden sm:flex justify-start sm:text-sm gap-2 cursor-pointer px-2 items-center w-full  hover:bg-amber-200 hover:text-gray-700 active:scale-90 p-1 hover:rounded-2xl `}
        >
          <span className="text-2xl">📝</span> New Chat{" "}
        </button>

        <button
          onClick={() => {
            setactive("search");

            setshowsearchpage(true);
          }}
          className={`${active == "search" ? "bg-amber-300 text-gray-700" : ""} text-amber-50 rounded-2xl hidden sm:flex justify-start sm:text-md gap-2 cursor-pointer px-2 items-center w-full hover:bg-amber-200 p-1 hover:text-gray-700 hover:rounded-2xl active:scale-90`}
        >
          <span className="text-2xl">🔍</span> Search{" "}
        </button>


<button
          onClick={() => {
            setactive("battle");

            navigate("/ai_battle")
          }}
          className={`${active == "battle" ? "bg-amber-300 text-gray-700" : ""} text-amber-50 rounded-2xl hidden sm:flex justify-start sm:text-md gap-2 cursor-pointer px-2 items-center w-full hover:bg-amber-200 p-1 hover:text-gray-700 hover:rounded-2xl active:scale-90`}
        >
          <span className="text-2xl">⚔️</span>    AI vs AI Battle
        </button>

        {/* //for mobile */}

        <div className="flex gap-2 justify-center sm:hidden  items-center px-3 rounded-2xl bg-gray-900 text-white">
          {" "}
          <button
            onClick={() => {
              setintro(false);
              setslidestate(!slidestate);
              const res = newChat();

              if (res) return navigate("/chat");
            }}
            className="text-[20px] active:scale-90"
          >
            📝
          </button>{" "}
          |{" "}
          <button
            onClick={() => {
              setshowsearchpage(true);
            }}
            className="text-2xl active:scale-90"
          >
            🔍
          </button>{" "}
          |{" "}
           <button
  onClick={() => {
    navigate("/ai_battle")
  }}
  aria-label="Open AI Battle"
  className="
    relative
    flex
    items-center
    justify-center
  
    
   
    shadow-[0_0_15px_rgba(250,204,21,0.15)]
    active:scale-90
    transition-transform
    duration-150
  "
>
  <Brain
    size={24}
    color="#e8d44f"
    strokeWidth={3}
  />

  <span
    className="
      absolute
      -top-1
      -right-1
      w-2
      h-2
      rounded-full
      bg-yellow-400
      shadow-[0_0_8px_rgba(250,204,21,0.8)]
    "
  />
</button>
          
        </div>
      </div>

      {/* //middle part of sidebar */}

      <div className="flex-1 w-full flex flex-col justify-start items-center   min-h-0   text-white ">
        <div
          className="w-full cursor-pointer px-5 py-2 
 flex justify-start gap-2 items-center"
        >
          {" "}
          <span className="text-2xl">💼</span> <span>WorkSpace</span>{" "}
          <button
            className="cursor-pointer"
            onClick={() => {
              setactive(!active);
            }}
          >
            {!active ? <ChevronRight /> : <ChevronDown />}{" "}
          </button>{" "}
        </div>

        <div
          className={` ${!active ? "hidden" : "flex"} flex-1  w-full  flex-col gap-2 pl-6  items-start justify-start p-1  scrollbar  overflow-y-auto `}
        >
          {titles?.data?.map((e, _) => {
            return (
              <Chat_container
                key={e?._id}
                id={e?._id}
                intro={intro}
                setintro={setintro}
                title={e.title}
                setslidestate={setslidestate}
              />
            );
          })}
        </div>
      </div>

      {/* //bottom part of sidebar */}

      <div className=" py-1   w-full flex flex-col justify-start items-center ">
        <div className=" text-white flex justify-start items-center gap-3 w-full px-4   flex-1/2">
          <div className="py-1 px-1.5 rounded-full bg-amber-400 text-gray-600 border-double border-white border-9">
            {data?.username.slice(0, 2)}
          </div>

          <div className="flex text-gray-400 flex-col">
            <span>{data?.username}</span>
            <span>{data?.email}</span>
          </div>
        </div>

        {/* //logout */}

        <div className="flex flex-1/2 w-full justify-center p-3">
          <button
            onClick={async () => {
              await logout();
            }}
            className="
      group relative overflow-hidden

      w-auto sm:w-[90%]
      min-w-40

      flex items-center justify-center gap-3

      rounded-2xl
      border border-red-500/20
      bg-linear-to-br from-zinc-900 to-zinc-950

      px-5 py-3
      text-sm font-medium tracking-wide
      text-red-400

      shadow-lg shadow-black/20
      backdrop-blur-xl

      transition-all duration-300 ease-out

      hover:border-red-500/40
      hover:bg-red-500/5
      hover:shadow-red-500/10
      hover:scale-[1.02]

      active:scale-[0.98]
    "
          >
            {/* Glow Effect */}
            <div
              className="
        absolute inset-0
        opacity-0 group-hover:opacity-100
        transition-opacity duration-300
        bg-linear-to-r
        from-transparent
        via-red-500/10
        to-transparent
      "
            />

            {/* Icon */}
            <LogOut
              size={18}
              className="
        relative z-10
        transition-transform duration-300
        group-hover:-translate-x-1
      "
            />

            {/* Text */}
            <span className="relative z-10">Log out</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
