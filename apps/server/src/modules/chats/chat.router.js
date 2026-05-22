import express from "express";
import { Createchat, getAllMessage, deleteChat, getAllChats } from "./chat.controller.js";
import auth_middleware from "../auth/auth.middleware.js";
import { Ailimiter } from "../../shared/utils/ratelimit.js";
const chatRouter = express.Router();

chatRouter.post("/message", Ailimiter, auth_middleware, Createchat);
chatRouter.get("/:chatid/message", auth_middleware, getAllMessage);
chatRouter.get("/", auth_middleware, getAllChats);
chatRouter.delete("/:chatid/delete", auth_middleware, deleteChat);

export default chatRouter;
