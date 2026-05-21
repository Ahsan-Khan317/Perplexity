import {
  registerUser,
  verify_email,
  login,
  get_me,
  get_accessToken,
  logout,
} from "./auth.controller.js";
import express from "express";
import {
  signup_validator,
  query_validator,
  login_validator,
  id_validator,
} from "./auth.validator.js";
import validate from "../../shared/middleware/validate.middleware.js";
import auth_middleware from "./auth.middleware.js";

const AuthRouter = express.Router();

AuthRouter.post("/signup", signup_validator, validate, registerUser);
AuthRouter.get("/verify_email", verify_email);
AuthRouter.post("/login", login_validator, validate, login);
AuthRouter.get("/get_me", auth_middleware, get_me);
AuthRouter.get("/get_accessToken", get_accessToken);
AuthRouter.get("/logout", logout);

export default AuthRouter;
