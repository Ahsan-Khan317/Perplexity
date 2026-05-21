import { useRef } from "react";
import { useState } from "react";
import Chat_container from "../components/chat_container.jsx";
import Logo from "../../../shared/components/logo.jsx";
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
  const { titles } = useSelector((state) => state.Chat);

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
      className={`h-full pt-3 sm:pt-9 w-full fixed z-30 md:relative bg-black/90 top-0 left-0  md:w-[18%] transition-all duration-200 gap-2 ${slidestate ? "not-sm:translate-x-0" : "not-sm:-translate-x-full"} flex flex-col justify-start items-center border-r border-r-amber-50 `}
    >
      {/* //upper part of sidebar */}
      <div className="flex  sm:flex-col gap-5 justify-between sm:justify-start w-full px-4 ">
        <Logo />

        {/* //for pc */}
        <button
          onClick={() => {
            setactive("newchat");
            const res = newChat();
            if (res) return navigate("/chat");
          }}
          className={` ${active == "newchat" ? "bg-amber-300 text-gray-700" : ""} rounded-2xl   text-amber-50 flex justify-start sm:text-sm gap-2 cursor-pointer px-2 items-center w-full not-sm:hidden  hover:bg-amber-200 hover:text-gray-700 active:scale-90 p-1 hover:rounded-2xl `}
        >
          <span className="text-2xl">📝</span> New Chat{" "}
        </button>

        <button
          onClick={() => {
            setactive("search");
          }}
          className={`${active == "search" ? "bg-amber-300 text-gray-700" : ""} text-amber-50 rounded-2xl flex justify-start sm:text-md gap-2 cursor-pointer px-2 items-center w-full not-sm:hidden hover:bg-amber-200 p-1 hover:text-gray-700 hover:rounded-2xl active:scale-90`}
        >
          <span className="text-2xl">🔍</span> Search{" "}
        </button>

        {/* //for mobile */}

        <div
          onClick={() => {
            const res = newChat();
            if (res) return navigate("/chat");
          }}
          className="flex gap-2 justify-center sm:hidden  items-center px-3 rounded-2xl bg-gray-900 text-white"
        >
          {" "}
          <button className="text-[20px] active:scale-90">📝</button> |{" "}
          <button className="text-2xl active:scale-90">🔍</button>
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
          {titles.data.map((e, _) => {
            return (
              <Chat_container
                key={e._id}
                id={e._id}
                intro={intro}
                setintro={setintro}
                title={e.title}
              />
            );
          })}
        </div>
      </div>

      {/* //bottom part of sidebar */}

      <div className=" py-1   w-full flex flex-col justify-start items-center ">
        <div className=" text-white flex justify-start items-center gap-3 w-full px-4   flex-1/2">
          <div className="py-1 px-1.5 rounded-full bg-amber-400 text-gray-600 border-double border-white border-9">
            HK
          </div>

          <div className="flex text-gray-400 flex-col">
            <span>username</span>
            <span>sk6582757@gmail.com</span>
          </div>
        </div>

        <div className="flex flex-1/2 w-full justify-center p-3 ">
          <button
            onClick={async () => {
              await logout();
            }}
            className="text-red-600 text-md w-[90%] sm:w-[90%] text-center z-31 px-8 py-2  gap-3 items-center   tracking-widest cursor-pointer active:scale-90 transition-all duration-150 flex rounded-md border-red-600 border"
          >
            <LogOut /> Log out{" "}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
