import asyncHandler from "../../shared/middleware/asyncHandler.js";
import ApiError from "../../shared/utils/apiError.js";
import { Token } from "./utils/generateToken.js";
import blacklist_model from "./models/blacklist.model.js";

const auth_middleware = asyncHandler(async (req, res, next) => {
  const authheader = req.headers.authorization;
  if (!authheader) return next(new ApiError(401, "unauthorized access"));
  const token = authheader.split(" ")[1];

  const isTokenBlacklisted = await blacklist_model.findOne({ blacklist_token: token });
  if (isTokenBlacklisted) return next(new ApiError(403, "unauthorized access"));

  const decode = Token.verify_accessToken(token);
  req.user = decode;

  next();
});

export default auth_middleware;
