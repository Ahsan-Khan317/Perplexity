import { Trash2 } from "lucide-react";
import UseChat from "../UseChat.js";
const Chat_container = ({ id, title, intro, setintro, setslidestate }) => {
  const { deleteChat, getMessage } = UseChat();

  return (
    <div
      key={id}
      onClick={() => {
        getMessage(id);
        setintro(true);
        setslidestate(false);
      }}
      className="
    group relative overflow-hidden
    flex items-center justify-between
    rounded-xl
    border border-zinc-800
    bg-zinc-900/70 
    px-4 py-4
    cursor-pointer
    backdrop-blur-sm
    transition-all duration-300
    hover:border-zinc-700
    hover:bg-zinc-900
    active:scale-95
    sm:w-[95%] w-[80%]
  "
    >
      <p
        className="
      truncate
      pr-10
      text-[15px]
      font-medium
      tracking-wide
      text-zinc-200
    "
      >
        {title.slice(0, 20)}...
      </p>

      <button
        onClick={(e) => {
          e.stopPropagation();
          deleteChat(id);
        }}
        className="
      absolute right-3
      flex h-9 w-9 items-center justify-center
      rounded-lg
      transition-all duration-300
      hover:bg-red-950/40
    "
      >
        <Trash2
          size={18}
          className="
        text-zinc-500
        transition-all duration-300
        hover:text-red-500
        active:text-red-500
        cursor-pointer
      "
        />
      </button>
    </div>
  );
};
export default Chat_container;
