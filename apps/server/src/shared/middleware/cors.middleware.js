import cors from "cors";
import ApiError from "../utils/apiError.js";
const allowedorigin = process.env.ALLOWED_ORIGIN;

export const corsOption = {
  origin: (requestOrigin, callback) => {
    if (!requestOrigin) return callback(null, true);
    if (allowedorigin?.includes(requestOrigin) || requestOrigin?.includes("*"))
      return callback(null, true);

    callback(new ApiError(403, "CORS policy does not allow access from this origin."));
  },
  methods: ["POST", "GET", "PATCH", "DELETE"],
  credentials: true,
  allowedHeaders: ["content-type", "authorization"],
};

export const corsMiddleware = cors(corsOption);
