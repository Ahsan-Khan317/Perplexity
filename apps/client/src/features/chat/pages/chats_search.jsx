import { Search, X, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import Logo from "../../../shared/components/logo.jsx";
import UseChat from "../UseChat.js";
const ChatSearchPage = ({ showsearchpage, setshowsearchpage, titles, setslidestate, setintro }) => {
  const [search, setSearch] = useState("");

  // Prevent background scrolling on mobile
  useEffect(() => {
    if (showsearchpage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showsearchpage]);

  {
    console.log(titles);
  }
  const { deleteChat, getMessage } = UseChat();

  return (
    <div
      onClick={() => {
        setshowsearchpage(false);
      }}
      className={`
        ${showsearchpage ? "fixed" : "hidden"}

        inset-0
        z-50

        bg-black/80
        backdrop-blur-md

        overflow-hidden

        overscroll-none
        touch-none
      `}
    >
      {/* Main Wrapper */}
      <div
        className="
          h-full
          w-full

          overflow-hidden

          md:flex
          md:items-center
          md:justify-center

          px-3
          py-4
          sm:px-5
        "
      >
        {/* Modal */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="
            relative

            h-full
            md:h-auto
            md:max-h-[calc(100dvh-4rem)]

            w-full
            max-w-3xl

            rounded-none
            md:rounded-3xl

            border border-zinc-800
            bg-zinc-950/95

            md:shadow-2xl
            md:shadow-black/40

            px-4 py-5
            sm:px-6 sm:py-6

            overflow-hidden

            flex
            flex-col
            min-h-0
          "
        >
          {/* Close Button */}
          <button
            type="button"
            aria-label="Close search"
            onClick={() => setshowsearchpage(false)}
            className="
              absolute
              top-4 right-4

              flex items-center justify-center

              w-10 h-10
              rounded-xl

              border border-zinc-800
              bg-zinc-900/80

              text-zinc-400

              transition-all duration-300

              hover:text-white
              hover:border-zinc-700

              active:scale-90
            "
          >
            <X size={18} />
          </button>

          {/* Header */}
          <div className="shrink-0">
            <div className="pt-2 sm:pt-3">
              <Logo />
            </div>

            <div className="mt-6 sm:mt-7">
              <h1
                className="
                  text-2xl
                  sm:text-3xl
                  text-white

                  font-semibold
                  tracking-tight
                "
              >
                Search Chats
              </h1>

              <p className="mt-2 text-sm text-zinc-500">Quickly find your previous conversations</p>
            </div>

            {/* Search Input */}
            <div className="relative mt-6 sm:mt-7">
              <Search
                size={18}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2

                  text-zinc-500
                "
              />

              <input
                type="text"
                aria-label="Search chats"
                placeholder="Search chats..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="
                  w-full

                  rounded-2xl
                  border border-zinc-800

                  bg-zinc-900/90

                  py-3.5
                  sm:py-4

                  pl-11
                  pr-4

                  text-sm
                  text-white

                  placeholder:text-zinc-500

                  outline-none

                  transition-all duration-300

                  focus:border-yellow-400/30
                  focus:ring-2
                  focus:ring-yellow-400/10
                "
              />
            </div>
          </div>

          {/* Chat List */}
          <div
            className="
            scrollbar
              mt-6

              flex-1
              min-h-0

              overflow-y-auto
              overscroll-contain

              flex flex-col
              gap-3

              pr-1
            "
          >
            {/* Example Chat */}
            {titles?.data
              ?.filter(({ title }) => title?.toLowerCase()?.includes(search.toLowerCase()))
              ?.map((chat, i) => {
                return (
                  <div
                    key={chat._id}
                    className="
                group

                flex items-center
                gap-3

                rounded-2xl

                border border-zinc-800
                bg-zinc-900/70

                px-3 py-3
                sm:px-5 sm:py-4

                transition-all duration-300

                hover:border-zinc-700

                active:scale-[0.99]
              "
                  >
                    <button
                      type="button"
                      onClick={async (e) => {
                        e.stopPropagation();
                        await getMessage(chat?._id);
                        setshowsearchpage(false);

                        setslidestate(false);
                        setintro(true);
                        setSearch("");
                      }}
                      className="flex-1 min-w-0"
                    >
                      <p
                        className="
                    text-sm
                    sm:text-[15px]

                    text-zinc-200
                    leading-relaxed

                    line-clamp-2
                    wrap-break-words
                  "
                      >
                        {chat?.title}
                      </p>
                    </button>

                    <button
                      onClick={() => {
                        deleteChat(chat?._id);
                      }}
                      type="button"
                      aria-label="Delete chat"
                      className="
                  shrink-0

                  flex items-center justify-center

                  rounded-xl
                  border

                  p-2.5

                  border-zinc-700
                  bg-zinc-800/80

                  text-zinc-400

                  transition-all duration-300

                  hover:border-red-500/30
                  hover:text-red-400

                  active:scale-90
                "
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSearchPage;
