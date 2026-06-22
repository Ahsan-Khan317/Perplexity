import { Router } from "express";
import ai_battle_arena from "./controller.js";
const aiBattle_route = Router()
import auth_middleware from "../auth/auth.middleware.js";
aiBattle_route.post("/battle_arena",auth_middleware,ai_battle_arena)

export default aiBattle_route