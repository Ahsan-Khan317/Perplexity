import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import rootRouter from "./shared/Router/root.router.js";
import { corsMiddleware } from "./shared/middleware/cors.middleware.js";
import { Error_middleware } from "./shared/middleware/error.middleware.js";
const app = express();

//middleware
app.use(morgan("dev"));
app.use(cookieParser());
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/perplexity", rootRouter);

//Error_middleware
app.use(Error_middleware);

export default app;
