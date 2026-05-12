import asyncHandler from "../../middleware/Error/Error_handler/asyncHandler.js";
import usermodel from "../../models/user.model.js";
import ApiError from "../../middleware/Error/Error_handler/ApiError.js";
import jwt from "jsonwebtoken";
import { emailVerifiedmsg } from "../../services/Email/email_msg.js";

const verify_email = asyncHandler(async (req, res, next) => {
  const { token } = req.query;
  console.log(token);
  if (!token) return next(new ApiError(404, "token not recieved"));

  const decode = jwt.verify(token, process.env.KEY);
  const id = decode.userid;
  console.log(id);
  if (!id) return next(new ApiError(404, "invalid token"));

  const isuser = await usermodel.findById(id);

  if (!isuser) return next(new ApiError(404, "user not found"));

  const update = await usermodel.findByIdAndUpdate(id, {
    $set: { isverify: true },
  });

  if (!update) return next(new ApiError(400, "Account not verified."));

  res.status(201).send(emailVerifiedmsg);
});

export default verify_email;
