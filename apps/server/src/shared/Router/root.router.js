import AuthRouter from "../../modules/auth/auth.router.js";
import express from "express";
import chatRouter from "../../modules/chats/chat.router.js";
import aiBattle_route from "../../modules/ai_battle_arena/route.js";
const rootRouter = express.Router();

rootRouter.use("/auth", AuthRouter);
rootRouter.use("/chat", chatRouter);
rootRouter.use("/ai",aiBattle_route)

export default rootRouter;
