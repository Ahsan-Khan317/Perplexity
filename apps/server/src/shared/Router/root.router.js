import AuthRouter from "../../modules/auth/auth.router.js";
import express from "express";
import chatRouter from "../../modules/chats/chat.router.js";

const rootRouter = express.Router();

rootRouter.use("/auth", AuthRouter);
rootRouter.use("/chat", chatRouter);

export default rootRouter;
