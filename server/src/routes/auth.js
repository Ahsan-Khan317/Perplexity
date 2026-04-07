import express from "express"
import signup_validator from "../validators/auth/register.validator.js"
import validate from "../middleware/validate/validate.js"
import signup from "../controllers/auth/signup.js"
import id_validator from "../validators/auth/id.validator.js"
import verify_email from "../controllers/auth/verify_email.js"

const authRouter = express.Router()

authRouter.post("/signup",signup_validator,validate,signup)
authRouter.get("/verify/email/:id",id_validator,validate,verify_email)
export default authRouter