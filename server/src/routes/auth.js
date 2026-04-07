import express from "express"
import signup_validator from "../validators/auth/register.validator.js"
import validate from "../middleware/validate/validate.js"
import signup from "../controllers/auth/signup.js"

const authRouter = express.Router()

authRouter.post("/signup",signup_validator,validate,signup)

export default authRouter