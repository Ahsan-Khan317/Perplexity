import { useEffect, useRef } from "react";
import { useState } from "react";
import Sidebar from "../components/sidebar";
import Chat_section from "../components/chat_section";
import socket from "../../../shared/socket/socketio.js";

const Chat = () => {
  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  const [active, setactive] = useState(false);

  const [slidestate, setslidestate] = useState(false);

  // slide logic for mobile

  const Start = useRef(0);
  const End = useRef(0);

  const handleStart = (e) => {
    Start.current = e.changedTouches[0].screenX;
  };
  const handleEnd = (e) => {
    End.current = e.changedTouches[0].screenX;

    const distance = Start.current - End.current;

    if (distance < -50) {
      return setslidestate(!slidestate);
    }
  };

  return (
    <main className=" h-dvh min-h-0 flex overflow-hidden justify-center items-center scrollbar bg-black/90 w-full">
      {/* //sidebar */}
      <Sidebar
        slidestate={slidestate}
        setslidestate={setslidestate}
        setintro={setactive}
        intro={active}
      />

      {/* //chat section */}

      <section
        onTouchStart={(e) => {
          handleStart(e);
        }}
        onTouchEnd={(e) => {
          handleEnd(e);
        }}
        className="
 h-full
 min-h-0
 flex-1
 flex
 flex-col
 overflow-hidden
 
 sm:p-4
 text-white
 "
      >
        <Chat_section
          onclick={() => setslidestate(!slidestate)}
          active={active}
          setactive={setactive}
          setslidestate={setslidestate}
        />
      </section>
    </main>
  );
};

export default Chat;
