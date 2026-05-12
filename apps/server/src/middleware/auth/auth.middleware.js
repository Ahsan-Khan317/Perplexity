import asyncHandler from "../Error/Error_handler/asyncHandler.js";
import ApiError from "../Error/Error_handler/ApiError.js";
import jwt from "jsonwebtoken";
const auth_middleware = asyncHandler(async (req, res, next) => {
  const authheader = req.headers.authorization;
  if (!authheader) return next(new ApiError(404, "unauthorized access"));
  const token = authheader.split(" ")[1];

  const decode = jwt.verify(token, process.env.KEY);
  req.user = decode;

  next();
});

export default auth_middleware;
