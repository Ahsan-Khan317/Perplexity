import ApiError from "../../middleware/Error/Error_handler/ApiError.js";
import asyncHandler from "../../middleware/Error/Error_handler/asyncHandler.js";
import sessionModel from "../../models/session.model.js";

const logout = asyncHandler(async (req, res, next) => {
  const { refreshtoken } = req.cookies;
  if (!refreshtoken)
    return next(new ApiError(404, "you have to login first..  for logout"));

  const session = await sessionModel.findOne({ refreshtoken });

  if (!session)
    return next(new ApiError(404, "you have to login first for logout"));

  res.clearCookie("refreshtoken");

  const result = await sessionModel.findByIdAndDelete(session._id);

  res.status(200).json({
    message: "logged out successfully",
    success: true,
  });
});

export default logout;
