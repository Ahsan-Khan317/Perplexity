import express from "express";
import authRouter from "./routes/auth.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import Error_middleware from "./middleware/Error/error.middleware.js";

const app = express();

//middleware

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/perplexity/auth", authRouter);

//Error_middleware
app.use(Error_middleware);

export default app;
