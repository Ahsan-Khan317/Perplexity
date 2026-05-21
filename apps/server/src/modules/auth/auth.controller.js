import asyncHandler from "../../shared/middleware/asyncHandler.js";
import { AuthServices } from "./services/auth.services.js";
import ApiError from "../../shared/utils/apiError.js";
import ApiResponse from "../../shared/utils/apiResponse.js";
import { emailVerifiedmsg } from "./services/Email/email_msg.js";

export const registerUser = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;

  const user = await AuthServices.registerUser(username, email, password);

  if (!user) return next(new ApiError(403, "user not registered"));

  res.send(new ApiResponse(201, "user registered successfully", user));
});

export const verify_email = asyncHandler(async (req, res, next) => {
  const { token } = req.query;

  const VerifyUser = await AuthServices.verify_email(token);

  if (VerifyUser.userverified) return res.send(emailVerifiedmsg);

  res.send(emailVerifiedmsg);
});

export const login = asyncHandler(async (req, res, next) => {
  const { identifier, password } = req.body;

  const isuserValid = await AuthServices.login(identifier, password);

  res.cookie("refreshToken", isuserValid.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  const data = {
    username: isuserValid.isuser.username,
    email: isuserValid.isuser.email,
    accessToken: isuserValid.accessToken,
  };

  res.status(200).send(new ApiResponse(200, " loggedIn successfully", data));
});

export const get_me = asyncHandler(async (req, res, next) => {
  const id = req.user.userid;

  const user = await AuthServices.get_me(id);

  res.send(new ApiResponse(200, "data fetched successfully", user));
});

export const get_accessToken = asyncHandler(async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) throw new ApiError(409, "token not recieved");

  const accessToken = await AuthServices.get_accessToken(refreshToken);

  res.send(new ApiResponse(200, "accessToken recieved successfully", { accessToken }));
});

export const logout = asyncHandler(async (req, res, next) => {
  res.clearCookie("refreshToken");
  const authorization = req.headers.authorization;
  if (!authorization) throw new ApiError(401, "user already logout");

  const logoutService = await AuthServices.logout(authorization);

  res.send(new ApiResponse(200, "logout successfull"));
});
