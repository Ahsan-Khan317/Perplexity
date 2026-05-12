import ApiError from "../../middleware/Error/Error_handler/ApiError.js";
import asyncHandler from "../../middleware/Error/Error_handler/asyncHandler.js";
import userModel from "../../models/user.model.js";
import { accessToken, refreshToken } from "../../utils/generateToken.js";
import sessionModel from "../../models/session.model.js";
const login = asyncHandler(async (req, res, next) => {
  const { identifier, password } = req.body;

  const isuser = await userModel
    .findOne({
      $or: [{ email: identifier }, { username: identifier }],
    })
    .select("+password");
  if (!isuser) return next(new ApiError(404, "user not found"));
  if (!isuser.isverify)
    return next(new ApiError(403, "not verified user.verify user from gmail"));
  const compare = await isuser.comparePassword(password);
  if (!compare) return next(new ApiError(400, "wrong password"));

  const refreshtoken = refreshToken(isuser._id);
  res.cookie("refreshtoken", refreshtoken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  const session = await sessionModel.create({
    user: isuser._id,
    ip: req.ip,
    agent: req.headers["user-agent"],
    refreshtoken: refreshtoken,
  });

  const accesstoken = accessToken(isuser._id, session._id);
  res.status(200).json({
    message: "login successfully",
    accesstoken,
    success: true,
  });
});

export default login;
