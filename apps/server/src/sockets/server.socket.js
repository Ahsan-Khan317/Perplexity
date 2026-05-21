import { Server } from "socket.io";
import ApiError from "../shared/utils/apiError.js";

let io;

export const initSocket = (httpserver) => {
  io = new Server(httpserver, {
    cors: {
      origin: process.env.ALLOWED_ORIGIN,
      credentials: true,
    },
  });
  console.log("socket io server started");

  io.on("connection", (socket) => {
    console.log("A user connected " + socket.id);

    socket.on("disconnect", () => {
      console.log("A user disconnected " + socket.id);
    });
  });
};

export const getIo = () => {
  if (!io) throw new ApiError(500, "server not initialized");
  return io;
};
