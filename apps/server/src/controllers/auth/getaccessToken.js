import ApiError from "../../middleware/Error/Error_handler/ApiError.js";
import asyncHandler from "../../middleware/Error/Error_handler/asyncHandler.js";
import jwt from "jsonwebtoken";
import { accessToken } from "../../utils/generateToken.js";

const getAccessToken = asyncHandler(async (req, res, next) => {
  const { refreshtoken } = req.cookies;

  if (!refreshtoken) return next(new ApiError(404, "token not found"));

  const verify = jwt.verify(refreshtoken, process.env.Key);

  if (!verify) return next(new ApiError(400, "token expired"));

  const newAccessToken = accessToken(verify.userid);

  res.status(200).json({
    message: "accessToken recieved",
    accesstoken: newAccessToken,
    success: true,
  });
});

export default getAccessToken;
