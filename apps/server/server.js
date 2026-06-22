import "./src/config/env.js";
import app from "./src/app.js";
import dbconnect from "./src/config/dbconnect.js";
import http from "http";
import { initSocket } from "./src/sockets/server.socket.js";


const httpServer = http.createServer(app);

initSocket(httpServer);

dbconnect().then(() => {
  httpServer.listen(process.env.PORT, () => {
    console.log("Server started successfully");
    

  });
});
