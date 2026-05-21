import express from "express";
import { Createchat, getAllMessage, deleteChat, getAllChats } from "./chat.controller.js";
import auth_middleware from "../auth/auth.middleware.js";
const chatRouter = express.Router();

chatRouter.post("/message", auth_middleware, Createchat);
chatRouter.get("/:chatid/message", auth_middleware, getAllMessage);
chatRouter.get("/", auth_middleware, getAllChats);
chatRouter.delete("/:chatid/delete", auth_middleware, deleteChat);

export default chatRouter;
