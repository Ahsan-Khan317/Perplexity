import cors from "cors";
const allowedorigin = process.env.ALLOWED_ORIGIN;

export const corsOption = {
  origin:allowedorigin,
  methods: ["POST", "GET", "PATCH", "DELETE"],
  credentials: true,
  allowedHeaders: ["content-type", "authorization"],
};

export const corsMiddleware = cors(corsOption);
