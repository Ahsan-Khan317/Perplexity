import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_API_BASE_URL, {
  withCredentials: true,
  autoConnect: false,
});

socket.on("connect", () => {
  console.log("socket io connected successfully with server");
});

socket.on("disconnect", () => {
  console.log("socket disconnected");
});

export default socket;
