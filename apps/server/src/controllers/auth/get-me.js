import ApiError from "../../middleware/Error/Error_handler/ApiError.js";
import asyncHandler from "../../middleware/Error/Error_handler/asyncHandler.js";
import userModel from "../../models/user.model.js";

const get_me = asyncHandler(async (req, res, next) => {
  const id = req.user.userid;

  const user = await userModel.findById(id);

  if (!user) return next(new ApiError(404, "user not found"));

  res.status(200).json({
    message: "data fetched successfully",
    data: user,
    success: true,
  });
});

export default get_me;
